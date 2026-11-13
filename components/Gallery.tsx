"use client";
import Image from "next/image";
import { ArrowUpRight, Camera, Palette } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import SectionHeading from "./SectionHeading";
export default function Gallery() {
  const { t } = useLanguage();
  const items = [{ title: t("galleryDesign"), image: "/gallery/design.jpg", icon: Palette }, { title: t("galleryPhoto"), image: "/gallery/photographer.JPG", icon: Camera }];
  return <section id="gallery" className="site-container section-space"><SectionHeading eyebrow={t("galleryTitle")} title={t("galleryHeadline")} /><div className="gallery-grid">{items.map(({ title, image, icon: Icon }, i) => <a key={title} href={image} target="_blank" rel="noopener noreferrer" className="gallery-card reveal" aria-label={title}><Image src={image} alt={title} fill sizes="(min-width: 768px) 550px, 100vw" className="object-cover" /><span className="gallery-index">0{i + 1}</span><div className="gallery-caption"><div><span className="eyebrow"><Icon size={14} />{t("galleryTitle")}</span><h3>{title}</h3></div><span className="gallery-arrow"><ArrowUpRight size={22} /></span></div></a>)}</div></section>;
}
