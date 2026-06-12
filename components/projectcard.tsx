"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

type ProjectCardProps = {
  title: string;
  description: string;
  tech: string;
  image: string;
};

export default function ProjectCard({
  title,
  description,
  tech,
  image,
}: ProjectCardProps) {
  const { t, language } = useLanguage();

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-2 hover:border-cyan-400">
      <div className="relative h-44 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="p-6">
        <h3 className="mb-3 text-xl font-bold">{title}</h3>

        <p className={`mb-4 text-slate-300 ${language === "kh" ? "leading-8" : ""}`}>
          {description}
        </p>

        <p className="mb-5 text-sm text-cyan-400">{tech}</p>

        <button className="rounded-full border border-white/20 px-5 py-2 text-sm hover:border-cyan-400 hover:text-cyan-400">
          {t("projectViewDetails")}
        </button>
      </div>
    </div>
  );
}