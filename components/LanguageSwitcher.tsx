"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
      <button
        type="button"
        onClick={() => setLanguage("kh")}
        className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
          language === "kh"
            ? "bg-cyan-400 text-slate-950"
            : "text-slate-300 hover:text-cyan-400"
        }`}
      >
        🇰🇭 ខ្មែរ
      </button>

      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
          language === "en"
            ? "bg-cyan-400 text-slate-950"
            : "text-slate-300 hover:text-cyan-400"
        }`}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}