"use client";

import { useEffect, useState } from "react";

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

  const [editingTitle, setEditingTitle] = useState("");

  async function loadProjects() {
    const response = await fetch("http://localhost:5000/api/projects");
    const data = await response.json();
    setProjects(data);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const projectData = {
      title,
      description,
      tech,
      image: "/projects/bls.png",
      category,
    };

    const url = editingTitle
      ? `http://localhost:5000/api/projects/${encodeURIComponent(editingTitle)}`
      : "http://localhost:5000/api/projects";

    const method = editingTitle ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (response.ok) {
      setMessage(editingTitle ? "Project updated successfully." : "Project added successfully.");

      setTitle("");
      setDescription("");
      setTech("");
      setCategory("Web");
      setEditingTitle("");

      loadProjects();
    }
  }

  function handleEdit(project: Project) {
    setEditingTitle(project.title);
    setTitle(project.title);
    setDescription(project.description);
    setTech(project.tech);
    setCategory(project.category);
    setMessage("");
  }

  async function handleDelete(title: string) {
    const confirmed = confirm(`Delete "${title}"?`);
    if (!confirmed) return;

    const response = await fetch(
      `http://localhost:5000/api/projects/${encodeURIComponent(title)}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      setMessage("Project deleted successfully.");
      loadProjects();
    }
  }

  function handleCancelEdit() {
    setEditingTitle("");
    setTitle("");
    setDescription("");
    setTech("");
    setCategory("Web");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold">Admin - Manage Projects</h1>

        {message && (
          <div className="mb-6 rounded-xl bg-green-400/10 px-5 py-4 text-green-300">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mb-12 grid gap-5 rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <h2 className="text-2xl font-bold">
            {editingTitle ? "Edit Project" : "Add Project"}
          </h2>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 outline-none"
            placeholder="Project Title"
            required
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-32 rounded-xl border border-white/10 bg-white/5 px-5 py-4 outline-none"
            placeholder="Project Description"
            required
          />

          <input
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 outline-none"
            placeholder="Tech Stack"
            required
          />

          <select
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
                    onClick={() => handleEdit(project)}
                    className="rounded-full bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300 hover:bg-yellow-500/20"
                  >
                    Edit
                  </button>

                  <button
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
    </main>
  );
}