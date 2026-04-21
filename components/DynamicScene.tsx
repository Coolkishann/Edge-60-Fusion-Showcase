"use client";

import dynamic from "next/dynamic";

const SceneCanvas = dynamic(() => import("@/components/SceneCanvas"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-5">
        <div className="w-7 h-7 border border-violet-500/30 border-t-violet-400 rounded-full animate-spin" />
        <span className="text-white/25 text-[11px] tracking-[0.35em] uppercase font-light">
          Loading Experience
        </span>
      </div>
    </div>
  ),
});

export default function DynamicScene() {
  return <SceneCanvas />;
}
