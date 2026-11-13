"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import ProjectCard from "./projectcard";
import type { TranslationKey } from "@/Data/translations";
import { projects as defaultProjects, type Category, type Project } from "@/Data/projects";
import { fetchProjects } from "@/lib/projects";
import SectionHeading from "./SectionHeading";

const categories: { value: Category; labelKey: TranslationKey }[] = [
  { value: "All", labelKey: "categoryAll" },
  { value: "Web", labelKey: "categoryWeb" },
  { value: "Desktop", labelKey: "categoryDesktop" },
  { value: "Design", labelKey: "categoryDesign" },
  { value: "IT", labelKey: "categoryIT" },
];

export default function Projects() {
  const { t } = useLanguage();
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
    <section id="projects" className="projects-band section-space">
      <div className="site-container">
        <SectionHeading eyebrow={t("projectsTitle")} title={t("projectsHeadline")} />
        <div className="project-filters" aria-label={t("projectsSubtitle")}>
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              aria-pressed={activeCategory === category.value}
              onClick={() => setActiveCategory(category.value)}
              className={activeCategory === category.value ? "filter-active" : ""}
            >
              {t(category.labelKey)}
            </button>
          ))}
        </div>
      {loading && <span className="sr-only" role="status">{t("projectsLoading")}</span>}
      {filteredProjects.length === 0 ? (
        <p role="status" className="text-slate-400">{t("projectsEmpty")}</p>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tech={project.tech}
              image={project.image}
              index={index}
            />
          ))}
        </div>
      )}
      </div>
    </section>
  );
}
