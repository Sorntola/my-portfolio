"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import styles from "./ProfilePortrait.module.css";

export default function ProfilePortrait({ alternateSrc }: { alternateSrc?: string }) {
  const { t } = useLanguage();
  const frame = useRef<HTMLButtonElement>(null);
  const raf = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const move = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      frame.current?.style.setProperty("--reveal-x", `${x}px`);
      frame.current?.style.setProperty("--reveal-y", `${y}px`);
    });
  };

  if (!alternateSrc) {
    return <div className="portrait-frame"><Image src="/profile.png" alt="Sorn Tola" fill preload sizes="(min-width: 1024px) 480px, (min-width: 600px) 430px, 85vw" className="hero-portrait" /></div>;
  }

  return (
    <button
      ref={frame}
      type="button"
      className={`portrait-frame ${styles.frame}`}
      data-revealed={revealed}
      data-ready={ready}
      aria-label={t("portraitToggle")}
      aria-pressed={revealed}
      onPointerMove={move}
      onClick={() => { if (ready) setRevealed((value) => !value); }}
      onKeyDown={(event) => { if (event.key === "Escape") setRevealed(false); }}
    >
      <Image src="/profile.png" alt="Sorn Tola" fill preload sizes="(min-width: 1024px) 480px, (min-width: 600px) 430px, 85vw" className="hero-portrait" />
      <span className={styles.alternate} aria-hidden="true">
        <Image src={alternateSrc} alt="" fill loading="eager" sizes="(min-width: 1024px) 480px, (min-width: 600px) 430px, 85vw" className={styles.alternatePortrait} onLoad={() => setReady(true)} onError={() => { setReady(false); setRevealed(false); }} />
      </span>
      <span className={styles.edge} aria-hidden="true" />
      {ready && <span className={styles.hint}><Sparkles size={12} /><span className={styles.hoverHint}>{t("portraitHover")}</span><span className={styles.tapHint}>{t("portraitTap")}</span></span>}
    </button>
  );
}
