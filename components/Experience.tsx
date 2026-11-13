"use client";
import { useLanguage } from "@/app/context/LanguageContext";
import { BriefcaseBusiness, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
export default function Experience() {
  const { t } = useLanguage();
  const entries = [
    { role: t("exp1Role"), company: t("exp1Company"), period: t("exp1Period"), description: t("exp1Description") },
    { role: t("exp2Role"), company: t("exp2Company"), period: t("exp2Period"), description: t("exp2Description") },
    { role: t("exp3Role"), company: t("exp3Company"), period: t("exp3Period"), description: t("exp3Description") },
  ];
  return <section id="experience" className="site-container section-space"><SectionHeading eyebrow={t("experienceEyebrow")} title={t("experienceTitle")} />
    <div className="experience-list">{entries.map((entry, i) => <article key={entry.role} className="experience-row reveal"><div className="experience-date"><span className="timeline-marker"><BriefcaseBusiness size={18} /></span><span>{entry.period}</span></div><div className="experience-role"><span className="eyebrow">0{i + 1} / {entry.company}</span><h3>{entry.role}</h3></div><p>{entry.description}</p><ArrowUpRight className="experience-arrow" size={20} aria-hidden="true" /></article>)}</div>
  </section>;
}
