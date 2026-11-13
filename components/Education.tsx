"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export default function Education() {
  const { t, language } = useLanguage();

  return (
    <section id="education" className="credential-section education-section reveal">
      <div className="education-heading">
        <p className="eyebrow">
          {t("educationTitle")}
        </p>

        <h2 className="credential-title">
          {t("educationTitle")}
        </h2>

        <p className={`mx-auto mt-3 max-w-2xl text-slate-400 ${language === "kh" ? "leading-8" : ""}`}>
          {t("educationSubtitle")}
        </p>
      </div>

      <div className="education-detail">
        <p className="mb-2 text-sm text-cyan-400">{t("educationPeriod")}</p>

        <h3 className={`text-xl font-semibold ${language === "kh" ? "leading-10" : ""}`}>
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
