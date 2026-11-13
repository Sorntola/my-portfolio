"use client";
import { ArrowUpRight, CalendarDays, Code2, Layers, Palette } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const stats = [
    { value: t("aboutYearsNumber"), label: t("aboutYearsLabel"), icon: CalendarDays },
    { value: t("aboutProjectsNumber"), label: t("aboutProjectsLabel"), icon: Code2 },
    { value: t("aboutPathNumber"), label: t("aboutPathLabel"), icon: Layers },
    { value: t("aboutFocus"), label: t("aboutFocusLabel"), icon: Palette },
  ];
  return <section id="about" className="about-band"><div className="site-container about-grid">
    <div className="about-copy reveal"><p className="eyebrow">{t("navAbout")}</p><h2>{t("aboutHeadline")}</h2><p className="body-copy">{t("aboutDescription")}</p><a href="#experience" className="button-secondary">{t("aboutMore")}<ArrowUpRight size={16} /></a></div>
    <div className="stats-grid reveal">{stats.map(({ value, label, icon: Icon }) => <div className="stat" key={label}><span className="stat-icon"><Icon size={24} /></span><div><strong>{value}</strong><span>{label}</span></div></div>)}</div>
  </div></section>;
}
