"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export default function Education() {
  const { t, language } = useLanguage();

  return (
    <section id="education" className="fade-up mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          {t("educationTitle")}
        </p>

        <h2 className="text-3xl font-bold md:text-4xl">
          {t("educationTitle")}
        </h2>

        <p className={`mx-auto mt-3 max-w-2xl text-slate-400 ${language === "kh" ? "leading-8" : ""}`}>
          {t("educationSubtitle")}
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur">
        <p className="mb-2 text-sm text-cyan-400">{t("educationPeriod")}</p>

        <h3 className={`text-2xl font-bold ${language === "kh" ? "leading-10" : ""}`}>
          {t("educationDegree")}
        </h3>

        <p className="mt-2 text-slate-400">{t("educationSchool")}</p>

        <p className={`mt-5 max-w-4xl text-slate-300 ${language === "kh" ? "leading-9" : "leading-8"}`}>
          {t("educationDescription")}
        </p>
      </div>
    </section>
  );
}