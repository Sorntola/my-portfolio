"use client";

import ProfilePortrait from "./ProfilePortrait";
import { ArrowDown, ArrowUpRight, Code2, MapPin } from "lucide-react";
import { FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiFigma } from "react-icons/si";
import { useLanguage } from "@/app/context/LanguageContext";

const technologies = [
  { name: "React", icon: FaReact }, { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript }, { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Node.js", icon: FaNodeJs }, { name: "Figma", icon: SiFigma }, { name: "Git", icon: FaGitAlt },
];

export default function Hero({ alternatePortrait }: { alternatePortrait?: string }) {
  const { t } = useLanguage();
  return (
    <section id="home" className="hero-section">
      <div className="site-container hero-grid">
        <div className="hero-copy reveal">
          <p className="eyebrow hero-eyebrow"><span className="status-dot" />{t("introRole")}</p>
          <h1>{t("introHello")} <span className="gradient-text">{t("introName")}</span></h1>
          <h2>{t("introHeadline")}</h2>
          <p className="hero-description">{t("introDescription")}</p>
          <div className="hero-actions">
            <a className="button-primary" href="#projects">{t("heroViewProjects")}<ArrowUpRight size={18} /></a>
            <a className="button-secondary" href="#contact">{t("heroContactMe")}<ArrowUpRight size={18} /></a>
          </div>
          <div className="technology-strip">
            <p>{t("technologiesLabel")}</p>
            <div>{technologies.map(({ name, icon: Icon }) => <span key={name} title={name} aria-label={name}><Icon aria-hidden="true" /></span>)}</div>
          </div>
        </div>
        <div className="hero-visual reveal">
          <div className="portrait-halo" aria-hidden="true" />
          <div className="dot-pattern" aria-hidden="true" />
          <ProfilePortrait alternateSrc={alternatePortrait} />
          <div className="code-card float-slow" aria-label="Developer profile">
            <div className="code-title"><span><Code2 size={13} /> developer.ts</span><span className="status-dot" /></div>
            <pre><span className="code-purple">const</span>{" developer = {\n"}<span className="code-muted">  name: </span><span className="code-string">&quot;Tola&quot;</span>{",\n"}<span className="code-muted">  focus: </span><span className="code-string">&quot;Full-Stack&quot;</span>{",\n"}<span className="code-muted">  passion: </span><span className="code-string">&quot;Design + Code&quot;</span>{",\n"}<span className="code-muted">  alwaysLearning: </span><span className="code-purple">true</span>{"\n};"}</pre>
          </div>
          <div className="portrait-caption"><MapPin size={14} /><span>{t("heroLocation")}</span><i /><span>{t("heroAvailable")}</span></div>
          <span className="hero-orbit" aria-hidden="true">+</span>
        </div>
      </div>
      <div className="site-container hero-bottom"><span>01 / PORTFOLIO</span><a href="#about" aria-label={t("navAbout")}><ArrowDown size={16} /></a><span>DESIGN. DEVELOP. CREATE.</span></div>
    </section>
  );
}
