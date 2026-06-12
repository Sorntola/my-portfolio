"use client";

import { useLanguage } from "@/app/context/LanguageContext";

type Skill = {
  name: string;
  level: number;
};

const skills: Skill[] = [
  { name: "React", level: 75 },
  { name: "Next.js", level: 70 },
  { name: "Tailwind CSS", level: 85 },
  { name: "Node.js", level: 65 },
  { name: "C#", level: 90 },
  { name: "SQL Server", level: 85 },
  { name: "Photoshop", level: 95 },
  { name: "Figma", level: 80 },
];

export default function Skills() {
  const { t, language } = useLanguage();

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-2 text-center text-3xl font-bold">
        {t("skillsTitle")}
      </h2>

      <p
        className={`mb-10 text-center text-slate-400 ${
          language === "kh" ? "leading-8" : ""
        }`}
      >
        {t("skillsSubtitle")}
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/50 hover:bg-white/10"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-medium">{skill.name}</span>

              <span className="text-cyan-400">{skill.level}%</span>
            </div>

            <div className="h-3 rounded-full bg-slate-800">
              <div
                className="h-3 rounded-full bg-cyan-400"
                style={{
                  width: `${skill.level}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}