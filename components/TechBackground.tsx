"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { CodeXml, Database } from "lucide-react";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { SiDotnet, SiFigma, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import BinaryBackground from "./BinaryBackground";
import styles from "./TechBackground.module.css";

const planets = [
  { name: "React", icon: FaReact, orbit: 1, duration: 36, phase: -4, color: "#67e8f9" },
  { name: "Next.js", icon: SiNextdotjs, orbit: 1, duration: 36, phase: -22, color: "#e2e8f0" },
  { name: "Tailwind CSS", icon: SiTailwindcss, orbit: 2, duration: 54, phase: -12, color: "#22d3ee" },
  { name: "Node.js", icon: FaNodeJs, orbit: 2, duration: 54, phase: -39, color: "#6ee7b7" },
  { name: "C# / .NET", icon: SiDotnet, orbit: 3, duration: 76, phase: -8, color: "#7dd3fc" },
  { name: "SQL Server", icon: Database, orbit: 3, duration: 76, phase: -46, color: "#38bdf8" },
  { name: "Photoshop", icon: null, orbit: 4, duration: 100, phase: -33, color: "#60a5fa" },
  { name: "Figma", icon: SiFigma, orbit: 4, duration: 100, phase: -83, color: "#a5f3fc" },
];

type OrbitStyle = CSSProperties & {
  "--orbit": number;
  "--duration": string;
  "--phase": string;
  "--planet-color": string;
};

export default function TechBackground() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateVisibility = () => {
      root.current?.classList.toggle(styles.paused, document.hidden);
    };
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  return (
    <>
      <BinaryBackground />
      <div ref={root} className={styles.background} aria-hidden="true">
        <div className={styles.nebula} />
        <div className={styles.stars}>
          {Array.from({ length: 28 }, (_, i) => (
            <i key={i} style={{ left: `${(i * 37 + 7) % 100}%`, top: `${(i * 53 + 11) % 100}%`, animationDelay: `${-(i % 7)}s`, width: i % 4 === 0 ? 3 : 2, height: i % 4 === 0 ? 3 : 2 }} />
          ))}
        </div>
        <div className={styles.system}>
          <div className={styles.sun}>
            <span className={styles.corona} />
            <span className={styles.sunBody}><CodeXml strokeWidth={1.25} /><span>TOLA</span></span>
          </div>
          {[1, 2, 3, 4].map((orbit) => (
            <div key={orbit} className={styles.track} style={{ "--orbit": orbit } as CSSProperties} />
          ))}
          {planets.map(({ name, icon: Icon, orbit, duration, phase, color }) => (
            <div key={name} className={styles.orbit} style={{ "--orbit": orbit, "--duration": `${duration}s`, "--phase": `${phase}s`, "--planet-color": color } as OrbitStyle}>
              <div className={styles.planetPosition}>
                <div className={styles.planet}>
                  <span className={styles.planetBody}>{Icon ? <Icon /> : <span className={styles.photoshop}>Ps</span>}</span>
                  <span className={styles.label}>{name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.edgeShade} />
      </div>
    </>
  );
}
