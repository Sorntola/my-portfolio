"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    const configure = () => {
      lenis?.destroy();
      lenis = undefined;
      if (motion.matches) return;
      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        lerp: 0.065,
        wheelMultiplier: 0.9,
        syncTouch: false,
        anchors: { offset: -90 },
        prevent: (node) => node.matches("dialog, textarea, select, [data-lenis-prevent]"),
      });
    };
    configure();
    motion.addEventListener("change", configure);
    return () => {
      motion.removeEventListener("change", configure);
      lenis?.destroy();
    };
  }, []);
  return null;
}
