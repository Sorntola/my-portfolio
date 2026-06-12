"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Gallery() {
  const { t } = useLanguage();

  const gallery = [
    {
      title: t("galleryDesign"),
      image: "/gallery/design.jpg",
    },
    {
      title: t("galleryPhoto"),
      image: "/gallery/photographer.JPG",
    },
    {
      title: t("galleryVideo"),
      image: "/gallery/video.jpg",
    },
  ];

  return (
    <section id="gallery" className="fade-up mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          {t("galleryTitle")}
        </p>

        <h2 className="text-3xl font-bold md:text-4xl">
          {t("galleryTitle")}
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-slate-400">
          {t("gallerySubtitle")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {gallery.map((item) => (
          <div
            key={item.title}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}