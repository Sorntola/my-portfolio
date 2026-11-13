"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import ProjectCard from "./projectcard";
import type { TranslationKey } from "@/Data/translations";
import { projects as defaultProjects, type Category, type Project } from "@/Data/projects";
import { fetchProjects } from "@/lib/projects";

const categories: { value: Category; labelKey: TranslationKey }[] = [
  { value: "All", labelKey: "categoryAll" },
  { value: "Web", labelKey: "categoryWeb" },
  { value: "Desktop", labelKey: "categoryDesktop" },
  { value: "Design", labelKey: "categoryDesign" },
  { value: "IT", labelKey: "categoryIT" },
];

export default function Projects() {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    async function getProjects() {
      try {
        const data = await fetchProjects(AbortSignal.any([controller.signal, AbortSignal.timeout(15000)]));
        if (!controller.signal.aborted) setProjects(data);
      } catch {
        // Keep the bundled portfolio available when the API is offline.
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    getProjects();
    return () => controller.abort();
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold">{t("projectsTitle")}</h2>
          <p
            className={`mt-2 text-slate-400 ${
              language === "kh" ? "leading-8" : ""
            }`}
          >
            {t("projectsSubtitle")}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => setActiveCategory(category.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                activeCategory === category.value
                  ? "bg-cyan-500 text-slate-950"
                  : "border border-white/20 text-slate-300 hover:border-cyan-400 hover:text-cyan-400"
              }`}
            >
              {t(category.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-slate-400">{t("projectsLoading")}</p>
      ) : filteredProjects.length === 0 ? (
        <p role="status" className="text-slate-400">{t("projectsEmpty")}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tech={project.tech}
              image={project.image}
            />
          ))}
        </div>
      )}
    </section>
  );
}
