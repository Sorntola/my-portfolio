"use client";
import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

type Props = { title: string; description: string; tech: string; image: string; index: number };
export default function ProjectCard({ title, description, tech, image, index }: Props) {
  const { t } = useLanguage();
  const dialog = useRef<HTMLDialogElement>(null);
  return <>
    <article className="project-card reveal">
      <button type="button" className="project-image" onClick={() => dialog.current?.showModal()} aria-label={`${t("projectViewDetails")}: ${title}`}>
        <Image src={image} alt={title} fill sizes="(min-width: 1024px) 350px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        <span className="project-number">{String(index + 1).padStart(2, "0")}</span><span className="image-open"><ArrowUpRight size={20} /></span>
      </button>
      <div className="project-content"><p className="project-tech">{tech}</p><h3>{title}</h3><p>{description}</p><button type="button" className="text-link" onClick={() => dialog.current?.showModal()}>{t("projectViewDetails")}<ArrowUpRight size={15} /></button></div>
    </article>
    <dialog ref={dialog} className="project-dialog" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} aria-label={title}>
      <div className="dialog-inner"><button type="button" className="dialog-close" aria-label="Close" onClick={() => dialog.current?.close()}><X size={20} /></button><div className="dialog-image"><Image src={image} alt={title} fill sizes="(min-width: 800px) 760px, 90vw" className="object-contain" /></div><div className="dialog-copy"><p className="eyebrow">{tech}</p><h2>{title}</h2><p>{description}</p><a className="button-secondary" href="#contact" onClick={() => dialog.current?.close()}>{t("heroContactMe")}<ArrowUpRight size={16} /></a></div></div>
    </dialog>
  </>;
}
