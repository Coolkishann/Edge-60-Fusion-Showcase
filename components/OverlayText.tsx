"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

interface OverlayTextProps {
  scrollProgress: MotionValue<number>;
  enterAt: number;
  activeAt: number;
  align?: "left" | "center" | "right";
  verticalAlign?: "top" | "center" | "bottom";
  label?: string;
  heading: string;
  subheading?: string;
  cta?: {
    label: string;
    href?: string;
  };
}

export default function OverlayText({
  scrollProgress,
  enterAt,
  activeAt,
  align = "left",
  verticalAlign = "center",
  label,
  heading,
  subheading,
  cta,
}: OverlayTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Smooth opacity curve
  const opacity = useTransform(
    scrollProgress,
    [0, enterAt, activeAt, 0.99],
    [0, 0, 1, 1]
  );

  // Very subtle vertical movement
  const y = useTransform(
    scrollProgress,
    [enterAt, activeAt],
    [10, 0]
  );

  const alignClasses = {
    left: "items-start text-left pl-[8vw] md:pl-[12vw]",
    center: "items-center text-center px-6",
    right: "items-end text-right pr-[8vw] md:pr-[12vw]",
  };

  const verticalClasses = {
    top: "justify-start pt-[15vh]",
    center: "justify-center",
    bottom: "justify-end pb-[15vh]",
  };

  const isRight = align === "right";

  return (
    <motion.div
      ref={ref}
      className={`absolute inset-0 z-20 flex flex-col pointer-events-none ${alignClasses[align]} ${verticalClasses[verticalAlign]}`}
      style={{ opacity, y }}
    >
      <div className={`max-w-3xl flex ${isRight ? "items-end text-right" : "items-start"} gap-12 relative`}>
        {/* Side Label (Editorial style) */}
        {label && (
          <div className={`hidden lg:block absolute ${isRight ? "-right-24" : "-left-24"} top-2`}>
            <span className="text-[#86868b] text-sm font-medium tracking-tight whitespace-nowrap">
              {label}
            </span>
          </div>
        )}

        <div className={`flex flex-col ${isRight ? "items-end text-right" : "items-start text-left"}`}>
          {/* Heading */}
          <h2
            className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-[#1d1d1f]"
            style={{
              fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
            }}
          >
            {heading.split('\n').map((line, i) => (
              <span key={i} className={i > 0 ? "text-[#86868b] block text-xl md:text-2xl mt-1 font-medium" : "block"}>
                {line}
              </span>
            ))}
          </h2>
        </div>

        {/* CTA */}
        {cta && (
          <div className="mt-10 pointer-events-auto">
            <a
              href={cta.href || "#"}
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full
                           bg-[#1d1d1f] text-white font-medium text-lg tracking-tight
                           transition-all duration-300 ease-out hover:bg-black hover:scale-[1.02]"
            >
              {cta.label}
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
