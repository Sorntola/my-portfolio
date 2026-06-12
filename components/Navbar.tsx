"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const mainMenuItems = [
  { label: "navHome", href: "#home", id: "home" },
  { label: "navAbout", href: "#about", id: "about" },
  { label: "navExperience", href: "#experience", id: "experience" },
  { label: "navProjects", href: "#projects", id: "projects" },
  { label: "navContact", href: "#contact", id: "contact" },
] as const;

const moreMenuItems = [
  { label: "navEducation", href: "#education", id: "education" },
  { label: "navCertificates", href: "#certificates", id: "certificates" },
  { label: "navSkills", href: "#skills", id: "skills" },
  { label: "navGallery", href: "#gallery", id: "gallery" },
] as const;

const allMenuItems = [...mainMenuItems, ...moreMenuItems] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { t, language } = useLanguage();

  useEffect(() => {
    function handleScroll() {
      const currentSection = allMenuItems.find((item) => {
        const section = document.getElementById(item.id);
        if (!section) return false;

        const rect = section.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function isMoreActive() {
    return moreMenuItems.some((item) => item.id === activeSection);
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="text-xl font-bold tracking-widest text-white">
          TOLA
        </a>

        <div className="hidden items-center gap-5 text-sm text-slate-300 lg:flex">
          {mainMenuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`transition ${
                activeSection === item.id
                  ? "text-cyan-400"
                  : "hover:text-cyan-400"
              }`}
            >
              {t(item.label)}
            </a>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMoreOpen((prev) => !prev)}
              className={`rounded-full px-4 py-2 transition ${
                isMoreActive()
                  ? "bg-cyan-400 text-slate-950"
                  : "border border-white/10 text-slate-300 hover:border-cyan-400 hover:text-cyan-400"
              }`}
            >
              {language === "kh" ? "ផ្សេងៗ" : "More"} ▾
            </button>

            {isMoreOpen && (
              <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
                {moreMenuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMoreOpen(false)}
                    className={`block px-5 py-3 transition ${
                      activeSection === item.id
                        ? "bg-cyan-400 text-slate-950"
                        : "text-slate-300 hover:bg-white/10 hover:text-cyan-400"
                    }`}
                  >
                    {t(item.label)}
                  </a>
                ))}
              </div>
            )}
          </div>

          <LanguageSwitcher />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl border border-white/10 px-3 py-2 text-xl text-white lg:hidden"
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="animate-slide-down border-t border-white/10 px-6 py-4 lg:hidden">
          <div className="grid gap-4 text-sm text-slate-300">
            {allMenuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`transition ${
                  activeSection === item.id
                    ? "text-cyan-400"
                    : "hover:text-cyan-400"
                }`}
              >
                {t(item.label)}
              </a>
            ))}

            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}