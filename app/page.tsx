import DynamicScene from "@/components/DynamicScene";
import ScrollSections from "@/components/ScrollSections";

export default function Home() {
  return (
    <main className="relative">
      {/* Three.js canvas — fixed behind everything */}
      <DynamicScene />

      {/* Vignette overlay for cinematic depth */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.35) 100%)",
        }}
      />
      <ScrollSections />
      
    </main>
  );
}
