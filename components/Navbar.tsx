"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, CodeXml, Menu, X } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const primary = [
  { id: "home", label: "navHome" }, { id: "about", label: "navAbout" },
  { id: "skills", label: "navSkills" }, { id: "projects", label: "navProjects" },
  { id: "contact", label: "navContact" },
] as const;
const more = [
  { id: "experience", label: "navExperience" }, { id: "education", label: "navEducation" },
  { id: "certificates", label: "navCertificates" }, { id: "gallery", label: "navGallery" },
] as const;
const all = [...primary, ...more];

export default function Navbar() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const sections = all.map((item) => ({ ...item, element: document.getElementById(item.id) }));
    const update = () => {
      frame = 0;
      const match = sections.find(({ element }) => {
        const rect = element?.getBoundingClientRect();
        return rect && rect.top <= 160 && rect.bottom > 160;
      });
      if (match) setActive(match.id);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const close = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) { setMoreOpen(false); setOpen(false); }
    };
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    document.addEventListener("pointerdown", close);
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", scheduleUpdate); document.removeEventListener("pointerdown", close); };
  }, []);
  return (
    <nav ref={navRef} className="site-nav" onKeyDown={(event) => { if (event.key === "Escape") { setOpen(false); setMoreOpen(false); } }} aria-label="Main navigation">
      <div className="site-container nav-inner">
        <a href="#home" className="brand"><CodeXml aria-hidden="true" /><span>Tola<span className="brand-dot">.</span></span></a>
        <div className="desktop-links">
          {primary.map(({ id, label }) => <a key={id} href={`#${id}`} className={active === id ? "nav-active" : ""} aria-current={active === id ? "location" : undefined}>{t(label)}</a>)}
          <div className="nav-more">
            <button type="button" aria-expanded={moreOpen} aria-controls="more-navigation" onClick={() => setMoreOpen(!moreOpen)}>{language === "kh" ? t("navExperience") : "More"}<ChevronDown size={12} /></button>
            {moreOpen && <div className="nav-dropdown" id="more-navigation">{more.map(({ id, label }) => <a key={id} href={`#${id}`} onClick={() => setMoreOpen(false)}>{t(label)}</a>)}</div>}
          </div>
        </div>
        <div className="nav-actions"><LanguageSwitcher /><a href="#contact" className="button-primary nav-hire">{t("hireMe")}<ArrowUpRight size={16} /></a><button className="mobile-toggle" aria-label="Navigation menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
      </div>
      {open && <div id="mobile-navigation" className="mobile-navigation site-container">{all.map(({ id, label }) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className={active === id ? "nav-active" : ""}>{t(label)}</a>)}</div>}
    </nav>
  );
}
