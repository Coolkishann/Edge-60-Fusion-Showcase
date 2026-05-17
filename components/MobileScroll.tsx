"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, useInView } from "framer-motion";
import { useImageSequence } from "@/hooks/useImageSequence";
import { drawImageContain } from "@/utils/drawImageContain";
import OverlayText from "@/components/OverlayText";

// ─── Frame Configuration ───────────────────────────────────────────
const TOTAL_FRAMES = 240;
const BASE_PATH = "/sequence";

/**
 * Generate the filename for frame index i (0-based).
 * Files: ezgif-frame-001.jpg ... ezgif-frame-240.jpg
 */
const getFrameFilename = (i: number): string => {
  const num = String(i + 1).padStart(3, "0");
  return `ezgif-frame-${num}.jpg`;
};

// ─── Text Overlay Definitions ──────────────────────────────────────
const overlays = [
  {
    id: "display",
    heading: "1.5K\nQuad-Curve Display",
    enterAt: 0.50,
    activeAt: 0.55,
    // exitAt: 0.50,
    align: "left" as const,
    verticalAlign: "top" as const,
  },
  {
    id: "camera",
    heading: "50MP\nNext-gen Camera",
    enterAt: 0.52,
    activeAt: 0.57,
    // exitAt: 0.50,
    align: "right" as const,
    verticalAlign: "top" as const,
  },
  {
    id: "charging",
    heading: "68W\nHyper Charging",
    enterAt: 0.54,
    activeAt: 0.59,
    // exitAt: 0.75,
    align: "left" as const,
    verticalAlign: "center" as const,
  },
  {
    id: "ai",
    heading: "AI\nEnhanced Portraits",
    enterAt: 0.56,
    activeAt: 0.61,
    // exitAt: 0.75,
    align: "right" as const,
    verticalAlign: "center" as const,
  },
  {
    id: "design",
    heading: "Ultra Thin\n7.6mm Frame",
    enterAt: 0.58,
    activeAt: 0.63,
    // exitAt: 0.75,
    align: "left" as const,
    verticalAlign: "bottom" as const,
  },
  {
    id: "water",
    heading: "IP68\nWater Resistant",
    enterAt: 0.60,
    activeAt: 0.65,
    // exitAt: 0.75,
    align: "right" as const,
    verticalAlign: "bottom" as const,
  },
];

// ─── Loading Spinner Component ─────────────────────────────────────
export function LoadingSpinner({ progress }: { progress: number }) {
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f5f5f7]">
      {/* Ambient glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[100px]" />

      {/* Circular progress */}
      <div className="relative w-24 h-24 mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(0,0,0,0.05)"
            strokeWidth="2"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(0,0,0,0.8)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-all duration-150 ease-out"
          />
        </svg>

        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-black/80 text-sm font-light tracking-widest tabular-nums">
            {progress}%
          </span>
        </div>
      </div>

      {/* Loading text */}
      <p className="text-black/40 text-xs uppercase tracking-[0.3em] font-light">
        Loading Moto Experience
      </p>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────
export default function MobileScroll({ onLoadComplete, onProgress }: { onLoadComplete?: () => void, onProgress?: (p: number) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(-1);
  const rafRef = useRef<number | null>(null);

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Load images
  const { images, isLoaded, progress } = useImageSequence(
    BASE_PATH,
    getFrameFilename,
    TOTAL_FRAMES,
    true // load immediately
  );

  useEffect(() => {
    if (onProgress) onProgress(progress);
  }, [progress, onProgress]);

  useEffect(() => {
    if (isLoaded && onLoadComplete) {
      onLoadComplete();
    }
  }, [isLoaded, onLoadComplete]);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to frame index
  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  // Hardware entrance animation (slide from bottom)
  // Settles at center by 0.22 of the scroll
  const canvasY = useTransform(scrollYProgress, [0, 0.22], ["80vh", "0vh"]);
  // const canvasOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const canvasOpacity = 1;
  // Check prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Handle canvas resize
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Set internal resolution higher for sharpness
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    setCanvasSize({ width: width * dpr, height: height * dpr });
  }, []);

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize, { passive: true });
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [updateCanvasSize]);

  // Draw frame function
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !images.length) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const clampedIndex = Math.max(0, Math.min(Math.floor(index), images.length - 1));

      // Only redraw if the frame actually changed
      if (clampedIndex === currentFrameRef.current) return;
      currentFrameRef.current = clampedIndex;

      const img = images[clampedIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Draw at full internal resolution
      drawImageContain(ctx, img, canvas.width, canvas.height);
    },
    [images]
  );

  // If reduced motion, show middle frame
  useEffect(() => {
    if (prefersReducedMotion && isLoaded && images.length > 0) {
      drawFrame(0);
    }
  }, [prefersReducedMotion, isLoaded, images, drawFrame]);

  // Render on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (prefersReducedMotion) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      drawFrame(latest);
      rafRef.current = null;
    });
  });

  // Draw initial frame when loaded
  useEffect(() => {
    if (isLoaded && images.length > 0 && canvasSize.width > 0) {
      drawFrame(0);
    }
  }, [isLoaded, images, canvasSize, drawFrame]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: "600vh",
      }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#f2f2f2]">
        
        {/* Loading screen removed from here since it will be at the app level */}

        <div style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.8s ease-out", width: "100%", height: "100%" }}>
          {/* Canvas */}
          <motion.div
            style={{ y: canvasY, opacity: canvasOpacity }}
            className="absolute inset-0 w-full h-full z-0 flex items-center justify-center"
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain"
              style={{
                display: "block",
              }}
            />
          </motion.div>

          {/* Text Overlays */}
          <div className="absolute inset-0 z-10">
            {overlays.map((overlay) => (
              <OverlayText
                key={overlay.id}
                scrollProgress={scrollYProgress}
                enterAt={overlay.enterAt}
                activeAt={overlay.activeAt}
                align={overlay.align}
                verticalAlign={overlay.verticalAlign}
                heading={overlay.heading}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Scroll Indicator ──────────────────────────────────────────────
// function ScrollIndicator({ scrollProgress }: { scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
//   const opacity = useTransform(scrollProgress, [0, 0.05], [1, 0]);

//   return (
//     <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
//       <div className="relative w-[1px] h-12 overflow-hidden rounded-full bg-black/10">
//         <div
//           className="absolute top-0 left-0 w-full h-1/3 bg-black/50 rounded-full"
//           style={{
//             animation: "scroll-line 2s ease-in-out infinite",
//           }}
//         />
//       </div>
//       <span
//         className="text-[10px] uppercase tracking-[0.25em] text-black/30 font-light"
//         style={{ opacity: "var(--tw-opacity, 1)" }}
//       >
//         Scroll
//       </span>
//     </div>
//   );
// }
