const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { createApp } = require("./index");

test("API validates, authorizes, persists CRUD, and saves contact messages", async (t) => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-test-"));
  const servers = [];
  t.after(async () => {
    await Promise.all(servers.map((server) => new Promise((resolve) => server.close(resolve))));
    fs.rmSync(dataDir, { recursive: true, force: true });
  });
  async function start(options = {}) {
    const server = createApp({ dataDir, adminToken: "test-secret", ...options }).listen(0, "127.0.0.1");
    servers.push(server);
    await new Promise((resolve) => server.once("listening", resolve));
    return `http://127.0.0.1:${server.address().port}`;
  }
  const base = await start();
  const request = (url, method, body, token = "test-secret") => fetch(`${base}${url}`, {
    method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const project = { title: "Test project", description: "Description", tech: "Next.js", image: "/BLS.png", category: "Web" };
  assert.equal((await request("/api/projects", "POST", project, "wrong")).status, 401);
  assert.equal((await request("/api/projects", "POST", {})).status, 400);
  assert.equal((await request("/api/projects", "POST", { ...project, image: "/missing.png" })).status, 400);
  assert.equal((await request("/api/projects", "POST", project)).status, 201);
  assert.equal((await request("/api/projects", "POST", project)).status, 409);
  const updated = { ...project, title: "Renamed project", description: "Updated" };
  assert.equal((await request("/api/projects/Test%20project", "PUT", updated)).status, 200);
  assert.equal((await request("/api/projects/Renamed%20project", "PUT", { ...updated, title: "BLS School Management System" })).status, 409);
  const restarted = await start();
  const persisted = await (await fetch(`${restarted}/api/projects`)).json();
  assert.deepEqual(persisted.find((item) => item.title === updated.title), updated);
  assert.equal((await request("/api/projects/Renamed%20project", "DELETE")).status, 200);
  assert.equal((await request("/api/projects/Renamed%20project", "DELETE")).status, 404);
  assert.equal((await request("/api/contact", "POST", { name: " ", email: "bad", message: "hello" })).status, 400);
  const contact = { name: "Visitor", email: "visitor@example.com", message: "Hello" };
  assert.equal((await request("/api/contact", "POST", contact)).status, 201);
  const saved = JSON.parse(fs.readFileSync(path.join(dataDir, "messages.jsonl"), "utf8"));
  assert.equal(saved.message, contact.message);
  assert.equal(saved.email, contact.email);
  const malformed = await fetch(`${base}/api/contact`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" });
  assert.equal(malformed.status, 400);
  const locked = await start({ adminToken: "" });
  assert.equal((await fetch(`${locked}/api/projects/anything`, { method: "DELETE" })).status, 503);
});
