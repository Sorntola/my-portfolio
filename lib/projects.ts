import type { Project } from "@/Data/projects";

export async function fetchProjects(signal?: AbortSignal): Promise<Project[]> {
  const response = await fetch("/api/projects", { signal: signal ?? AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error("Unable to load projects. Please try again.");
  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every((item) =>
    item && ["title", "description", "tech", "image", "category"].every(
      (key) => typeof item[key] === "string"
    )
  )) throw new Error("The server returned invalid project data.");
  return data;
}
