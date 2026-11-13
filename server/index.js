const express = require("express");
const cors = require("cors");
const fs = require("node:fs");
const path = require("node:path");
const { timingSafeEqual } = require("node:crypto");
require("dotenv").config({ path: path.join(__dirname, ".env") });

function createApp({ dataDir = process.env.DATA_DIR || path.join(__dirname, "data"), adminToken = process.env.ADMIN_TOKEN } = {}) {
  const app = express();
  app.disable("x-powered-by");
  app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000" }));
  app.use(express.json({ limit: "32kb" }));
  fs.mkdirSync(dataDir, { recursive: true });
  const projectFile = path.join(dataDir, "projects.json");
  const seed = [{ title: "BLS School Management System", description: "Student, Attendance, Payment, Score and Report Management System", tech: "C#, WinForms, SQL Server", image: "/BLS.png", category: "Desktop" }];
  let projects = fs.existsSync(projectFile) ? JSON.parse(fs.readFileSync(projectFile, "utf8")) : seed;
  function saveProjects(next) {
    fs.writeFileSync(`${projectFile}.tmp`, JSON.stringify(next, null, 2));
    fs.renameSync(`${projectFile}.tmp`, projectFile);
    projects = next;
  }
  function authorize(req, res, next) {
    if (!adminToken) return res.status(503).json({ message: "Set ADMIN_TOKEN on the API server to enable project changes." });
    const supplied = Buffer.from(req.get("authorization") || "");
    const expected = Buffer.from(`Bearer ${adminToken}`);
    if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
      return res.status(401).json({ message: "A valid admin token is required." });
    }
    next();
  }
  function validateProject(req, res, next) {
    const body = req.body;
    const limits = { title: 160, description: 5000, tech: 500, image: 500, category: 20 };
    if (!body || !Object.entries(limits).every(([key, limit]) => typeof body[key] === "string" && body[key].trim().length > 0 && body[key].length <= limit)) {
      return res.status(400).json({ message: "All project fields must contain text within the allowed length." });
    }
    const project = Object.fromEntries(Object.keys(limits).map((key) => [key, body[key].trim()]));
    if (!["Web", "Desktop", "Design", "IT"].includes(project.category) || !/^\/(?!\/)[\w/.-]+\.(png|jpe?g|webp|gif|svg)$/i.test(project.image) || project.image.includes("..")) {
      return res.status(400).json({ message: "Choose a valid category and a local image path." });
    }
    if (!fs.existsSync(path.join(__dirname, "..", "public", project.image))) return res.status(400).json({ message: "The image must exist in the public folder." });
    req.project = project;
    next();
  }
  app.get("/", (req, res) => res.send("TOLA Portfolio API is running"));
  app.get("/api/projects", (req, res) => res.json(projects));
  app.post("/api/projects", authorize, validateProject, (req, res) => {
    if (projects.some((project) => project.title === req.project.title)) return res.status(409).json({ message: "A project with this title already exists." });
    saveProjects([...projects, req.project]);
    res.status(201).json({ success: true, project: req.project });
  });
  app.put("/api/projects/:title", authorize, validateProject, (req, res) => {
    const index = projects.findIndex((project) => project.title === req.params.title);
    if (index === -1) return res.status(404).json({ message: "Project not found" });
    if (projects.some((project, i) => i !== index && project.title === req.project.title)) return res.status(409).json({ message: "A project with this title already exists." });
    saveProjects(projects.map((project, i) => i === index ? req.project : project));
    res.json({ success: true, project: req.project });
  });
  app.delete("/api/projects/:title", authorize, (req, res) => {
    if (!projects.some((project) => project.title === req.params.title)) return res.status(404).json({ message: "Project not found" });
    saveProjects(projects.filter((project) => project.title !== req.params.title));
    res.json({ success: true });
  });
  app.post("/api/contact", (req, res) => {
    const body = req.body;
    const limits = { name: 120, email: 254, message: 5000 };
    if (!body || !Object.entries(limits).every(([key, limit]) => typeof body[key] === "string" && body[key].trim().length > 0 && body[key].length <= limit) || !/^\S+@\S+\.\S+$/.test(body.email.trim())) {
      return res.status(400).json({ success: false, message: "Enter a valid name, email, and message." });
    }
    const contact = Object.fromEntries(Object.keys(limits).map((key) => [key, body[key].trim()]));
    fs.appendFileSync(path.join(dataDir, "messages.jsonl"), `${JSON.stringify({ ...contact, receivedAt: new Date().toISOString() })}\n`);
    res.status(201).json({ success: true, message: "Message saved successfully" });
  });
  app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    const status = error.status === 400 || error.status === 413 ? error.status : 500;
    res.status(status).json({ success: false, message: status === 500 ? "Unable to save data. Please try again." : "Invalid request body." });
  });
  return app;
}

if (require.main === module) {
  const port = process.env.PORT || 5000;
  createApp().listen(port, process.env.HOST || "127.0.0.1", () => console.log(`Portfolio API listening on port ${port}`));
}
module.exports = { createApp };
