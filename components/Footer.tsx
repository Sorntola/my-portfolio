"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p
          className={`text-slate-400 ${
            language === "kh"
              ? "text-base leading-8"
              : ""
          }`}
        >
          {t("footerCopyright")}
        </p>

        <p
          className={`mt-2 text-slate-500 ${
            language === "kh"
              ? "text-sm leading-7"
              : ""
          }`}
        >
          {t("footerBuilt")}
        </p>
      </div>
    </footer>
  );
}