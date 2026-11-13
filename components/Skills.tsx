"use client";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiFigma, SiDotnet } from "react-icons/si";
import { Database, Image } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import SectionHeading from "./SectionHeading";
const skills = [
  { name: "React", level: 10, icon: FaReact }, { name: "Next.js", level: 10, icon: SiNextdotjs },
  { name: "Tailwind CSS", level: 40, icon: SiTailwindcss }, { name: "Node.js", level: 10, icon: FaNodeJs },
  { name: "C# / .NET", level: 90, icon: SiDotnet }, { name: "SQL Server", level: 85, icon: Database },
  { name: "Photoshop", level: 95, icon: Image }, { name: "Figma", level: 90, icon: SiFigma },
];
export default function Skills() {
  const { t } = useLanguage();
  return <section id="skills" className="site-container section-space"><SectionHeading eyebrow={t("skillsTitle")} title={t("skillsHeadline")} />
    <div className="skills-grid">{skills.map(({ name, level, icon: Icon }, index) => <div key={name} className="skill-item reveal" style={{ transitionDelay: `${index % 3 * 80}ms` }}>
      <Icon className="skill-icon" aria-hidden="true" /><div className="skill-content"><div className="skill-label"><span>{name}</span><span>{level}%</span></div><div className="skill-track" role="progressbar" aria-label={name} aria-valuenow={level} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${level}%` }} /></div></div>
    </div>)}</div>
  </section>;
}
