"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section
      id="home"
      className="fade-up mx-auto grid min-h-[85vh] max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2"
    >
      <div className="relative z-10">
        <p className="mb-4 text-lg font-medium text-cyan-400">
          {t("heroGreeting")}
        </p>

        <h1
          className={`mb-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl ${
            language === "kh" ? "leading-[1.45] md:leading-[1.35]" : ""
          }`}
        >
          {t("heroTitle")}
        </h1>

        <p
          className={`mb-8 max-w-xl text-lg text-slate-300 ${
            language === "kh" ? "leading-9" : "leading-8"
          }`}
        >
          {t("heroDescription")}
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-full bg-cyan-500 px-7 py-3 font-semibold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-400"
          >
            {t("heroViewProjects")}
          </a>

          <a
            href="#contact"
            className="rounded-full border border-white/20 px-7 py-3 font-semibold text-white transition hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-400"
          >
            {t("heroContactMe")}
          </a>

          <a
            href="/cv/tola-cv.pdf"
            download
            className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-7 py-3 font-semibold text-cyan-300 transition hover:-translate-y-1 hover:bg-cyan-400 hover:text-slate-950"
          >
            {t("heroDownloadCV")}
          </a>
        </div>
      </div>

      <div className="relative flex justify-center md:justify-end">
        <div className="pointer-events-none absolute right-0 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[130px]" />
        <div className="pointer-events-none absolute right-10 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="float-slow relative h-[360px] w-[290px] md:h-[500px] md:w-[390px]">
          <div className="absolute -inset-5 rounded-[2.7rem] bg-cyan-400/15 blur-2xl" />

          <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br from-cyan-400/80 via-blue-500/35 to-cyan-400/10" />

          <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-cyan-300/25 bg-slate-950 shadow-2xl shadow-cyan-500/20">
            <Image
              src="/profile.png"
              alt="Tola"
              fill
              priority
              className="object-cover object-top"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />

            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-cyan-300/25" />

            <div className="absolute left-5 top-5 rounded-xl border border-cyan-300/30 bg-slate-950/70 px-4 py-2 text-xs text-cyan-200 backdrop-blur">
              &lt;/&gt; FULL-STACK
            </div>

            <div className="absolute bottom-24 left-5 rounded-full border border-white/10 bg-slate-950/75 px-4 py-2 text-sm text-white backdrop-blur">
              📍 {t("heroLocation")}
            </div>

            <div className="absolute bottom-24 right-5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300 backdrop-blur">
              ● {t("heroAvailable")}
            </div>

            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-slate-950/80 p-4 backdrop-blur">
              <p className="text-center text-2xl font-bold tracking-[0.35em] text-white">
                TOLA
              </p>
              <p className="mt-1 text-center text-xs font-medium uppercase tracking-[0.18em] text-cyan-300">
                Digital Media Officer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}