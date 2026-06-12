"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="mb-4 text-2xl font-bold">
        Counter Example
      </h3>

      <p className="mb-4 text-cyan-400">
        Count: {count}
      </p>

      <button
        onClick={() => setCount(count + 1)}
        className="rounded-full bg-cyan-500 px-5 py-2 text-slate-950"
      >
        Increase
      </button>
    </div>
  );
}