"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export default function Certificates() {
  const { t } = useLanguage();

  const certificates = [
    t("certificate1"),
    t("certificate2"),
    t("certificate3"),
  ];

  return (
    <section id="certificates" className="fade-up mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          {t("certificatesTitle")}
        </p>

        <h2 className="text-3xl font-bold md:text-4xl">
          {t("certificatesTitle")}
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-slate-400">
          {t("certificatesSubtitle")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {certificates.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-white/10"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-2xl">
              🏆
            </div>

            <h3 className="text-xl font-bold leading-8">{item}</h3>

            <div className="mt-6 h-1 w-16 rounded-full bg-cyan-400" />
          </div>
        ))}
      </div>
    </section>
  );
}