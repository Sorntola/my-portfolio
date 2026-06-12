"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export default function Experience() {
  const { t, language } = useLanguage();

  const experiences = [
    {
      role: t("exp1Role"),
      company: t("exp1Company"),
      period: t("exp1Period"),
      description: t("exp1Description"),
    },
    {
      role: t("exp2Role"),
      company: t("exp2Company"),
      period: t("exp2Period"),
      description: t("exp2Description"),
    },
    {
      role: t("exp3Role"),
      company: t("exp3Company"),
      period: t("exp3Period"),
      description: t("exp3Description"),
    },
  ];

  return (
    <section
      id="experience"
      className="fade-up mx-auto max-w-6xl px-6 py-20"
    >
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          {t("navExperience")}
        </p>

        <h2 className="text-3xl font-bold md:text-4xl">
          {t("experienceTitle")}
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-1 rounded-full bg-cyan-400/20 md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-10">
          {experiences.map((item, index) => (
            <div
              key={index}
              className={`relative flex ${
                index % 2 === 0
                  ? "md:justify-start"
                  : "md:justify-end"
              }`}
            >
              <div className="absolute left-4 top-8 h-4 w-4 rounded-full border-4 border-slate-950 bg-cyan-400 md:left-1/2 md:-translate-x-1/2" />

              <div className="ml-12 w-full rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur transition hover:border-cyan-400/50 hover:bg-white/10 md:ml-0 md:w-[45%]">
                <p className="mb-2 text-sm font-medium text-cyan-400">
                  {item.period}
                </p>

                <h3
                  className={`mb-2 font-bold ${
                    language === "kh"
                      ? "text-xl leading-9"
                      : "text-xl"
                  }`}
                >
                  {item.role}
                </h3>

                <p className="mb-4 text-slate-400">
                  {item.company}
                </p>

                <p
                  className={`text-slate-300 ${
                    language === "kh"
                      ? "leading-8"
                      : "leading-8"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}