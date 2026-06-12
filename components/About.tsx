"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export default function About() {
  const { t, language } = useLanguage();

  return (
    <section id="about" className="fade-up mx-auto max-w-6xl px-6 py-20">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-cyan-500/5 backdrop-blur md:p-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          {t("navAbout")}
        </p>

        <h2
          className={`mb-6 font-bold text-white ${
            language === "kh" ? "text-3xl leading-[1.4] md:text-4xl" : "text-3xl md:text-4xl"
          }`}
        >
          {t("aboutTitle")}
        </h2>

        <p
          className={`max-w-4xl text-slate-300 ${
            language === "kh" ? "text-lg leading-9" : "text-lg leading-8"
          }`}
        >
          {t("aboutDescription")}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
  <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
    <p className="text-2xl font-bold text-cyan-400">
      {t("aboutYearsNumber")}
    </p>
    <p className="mt-1 text-sm text-slate-400">
      {t("aboutYearsLabel")}
    </p>
  </div>

  <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
    <p className="text-2xl font-bold text-cyan-400">
      {t("aboutProjectsNumber")}
    </p>
    <p className="mt-1 text-sm text-slate-400">
      {t("aboutProjectsLabel")}
    </p>
  </div>

  <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
    <p className="text-2xl font-bold text-cyan-400">
      {t("aboutPathNumber")}
    </p>
    <p className="mt-1 text-sm text-slate-400">
      {t("aboutPathLabel")}
    </p>
  </div>
</div>
      </div>
    </section>
  );
}