"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-widest text-cyan-400">
          TOLA
        </h1>

        <p className="mt-3 text-sm text-slate-400">
          Digital Media Officer & Full-Stack Developer
        </p>

        <div className="mx-auto mt-6 h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-cyan-400" />
      </div>
    </div>
  );
}