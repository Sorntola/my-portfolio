"use client";

import { useEffect, useRef } from "react";

export default function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const registered = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
    const register = () => {
      root.querySelectorAll(".reveal").forEach((element) => {
        if (registered.has(element)) return;
        registered.add(element);
        const rect = element.getBoundingClientRect();
        // Keep initially visible content stable instead of hiding it after hydration.
        if (motion.matches || rect.top < window.innerHeight) {
          element.classList.add("is-visible");
          return;
        }
        element.classList.add("reveal-ready");
        observer.observe(element);
      });
      registered.forEach((element) => {
        if (!root.contains(element)) {
          observer.unobserve(element);
          registered.delete(element);
        }
      });
    };
    const updateMotion = () => {
      if (motion.matches) {
        observer.disconnect();
        registered.forEach((element) => element.classList.add("is-visible"));
      }
    };
    register();
    // Project filters and API responses can insert new cards after mount.
    const mutations = new MutationObserver(register);
    mutations.observe(root, { childList: true, subtree: true });
    motion.addEventListener("change", updateMotion);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      motion.removeEventListener("change", updateMotion);
      registered.forEach((element) => element.classList.remove("reveal-ready"));
    };
  }, []);
  return <div ref={ref}>{children}</div>;
}
