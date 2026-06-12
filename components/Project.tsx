"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import ProjectCard from "./projectcard";

type Category = "All" | "Web" | "Desktop" | "Design" | "IT";

type Project = {
  title: string;
  description: string;
  tech: string;
  image: string;
  category: Category;
};

const categories: { value: Category; labelKey: string }[] = [
  { value: "All", labelKey: "categoryAll" },
  { value: "Web", labelKey: "categoryWeb" },
  { value: "Desktop", labelKey: "categoryDesktop" },
  { value: "Design", labelKey: "categoryDesign" },
  { value: "IT", labelKey: "categoryIT" },
];

export default function Projects() {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProjects() {
      try {
        const response = await fetch("http://localhost:5000/api/projects");
        const data: Project[] = await response.json();

        setProjects(data);
      } catch (error) {
        console.log("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }

    getProjects();
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
              {t(category.labelKey as any)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-slate-400">{t("projectsLoading")}</p>
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