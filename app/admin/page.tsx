"use client";

import { useEffect, useState } from "react";
import { fetchProjects } from "@/lib/projects";

type Project = {
  title: string;
  description: string;
  tech: string;
  image: string;
  category: string;
};

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [category, setCategory] = useState("Web");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [image, setImage] = useState("/BLS.png");
  const [busy, setBusy] = useState(false);

  const [editingTitle, setEditingTitle] = useState("");

  async function loadProjects() {
    setProjects(await fetchProjects());
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchProjects(AbortSignal.any([controller.signal, AbortSignal.timeout(15000)]))
      .then((data) => { if (!controller.signal.aborted) setProjects(data); })
      .catch(() => { if (!controller.signal.aborted) setMessage("Unable to load projects. Check that the API is running."); });
    return () => controller.abort();
  }, []);

  async function mutate(url: string, method: string, body?: object) {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || "Request failed. Please try again.");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const url = editingTitle ? `/api/projects/${encodeURIComponent(editingTitle)}` : "/api/projects";
    const method = editingTitle ? "PUT" : "POST";
    const projectData = { title, description, tech, image, category };
    setBusy(true);
    try {
      await mutate(url, method, projectData);
      setMessage(editingTitle ? "Project updated successfully." : "Project added successfully.");

      setTitle("");
      setDescription("");
      setTech("");
      setCategory("Web");
      setImage("/BLS.png");
      setEditingTitle("");

      await loadProjects();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Request failed.");
    } finally {
      setBusy(false);
    }
  }

  function handleEdit(project: Project) {
    setEditingTitle(project.title);
    setTitle(project.title);
    setDescription(project.description);
    setTech(project.tech);
    setCategory(project.category);
    setImage(project.image);
    setMessage("");
  }

  async function handleDelete(title: string) {
    const confirmed = confirm(`Delete "${title}"?`);
    if (!confirmed) return;

    setBusy(true);
    try {
      await mutate(`/api/projects/${encodeURIComponent(title)}`, "DELETE");
      if (editingTitle === title) handleCancelEdit();
      setMessage("Project deleted successfully.");
      await loadProjects();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Request failed.");
    } finally {
      setBusy(false);
    }
  }

  function handleCancelEdit() {
    setEditingTitle("");
    setTitle("");
    setDescription("");
    setTech("");
    setCategory("Web");
    setImage("/BLS.png");
  }

  return (
    <section className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold">Admin - Manage Projects</h1>

        <label className="mb-6 block">
          Admin token
          <input type="password" autoComplete="off" value={token} onChange={(event) => setToken(event.target.value)} className="ml-3 rounded border border-white/20 p-2" />
        </label>

        {message && (
          <div role="status" className="mb-6 rounded-xl bg-green-400/10 px-5 py-4 text-green-300">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mb-12 grid gap-5 rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <fieldset disabled={busy} className="contents">
          <h2 className="text-2xl font-bold">
            {editingTitle ? "Edit Project" : "Add Project"}
          </h2>

          <input
            aria-label="Project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 outline-none"
            placeholder="Project Title"
            required
          />

          <textarea
            aria-label="Project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-32 rounded-xl border border-white/10 bg-white/5 px-5 py-4 outline-none"
            placeholder="Project Description"
            required
          />

          <input
            aria-label="Tech stack"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 outline-none"
            placeholder="Tech Stack"
            required
          />

          <input aria-label="Image path" value={image} onChange={(event) => setImage(event.target.value)} required placeholder="/BLS.png" className="rounded-xl border border-white/10 bg-white/5 px-5 py-4" />

          <select
            aria-label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-900 px-5 py-4 outline-none"
          >
            <option>Web</option>
            <option>Desktop</option>
            <option>Design</option>
            <option>IT</option>
          </select>

          <div className="flex gap-3">
            <button className="rounded-xl bg-cyan-500 px-6 py-4 font-semibold text-slate-950">
              {editingTitle ? "Update Project" : "Add Project"}
            </button>

            {editingTitle && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-xl border border-white/20 px-6 py-4 font-semibold text-white"
              >
                Cancel
              </button>
            )}
          </div>
          </fieldset>
        </form>

        <h2 className="mb-6 text-2xl font-bold">Project List</h2>

        <div className="grid gap-4">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="mt-2 text-slate-300">{project.description}</p>
                  <p className="mt-2 text-sm text-cyan-400">{project.tech}</p>
                </div>

                <div className="flex h-fit gap-3">
                  <span className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                    {project.category}
                  </span>

                  <button
                    disabled={busy}
                    onClick={() => handleEdit(project)}
                    className="rounded-full bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300 hover:bg-yellow-500/20"
                  >
                    Edit
                  </button>

                  <button
                    disabled={busy}
                    onClick={() => handleDelete(project.title)}
                    className="rounded-full bg-red-500/10 px-4 py-2 text-sm text-red-300 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
