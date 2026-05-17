"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export default function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lines = text.split("\n");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.6"]
  });

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <h2 className="leading-tight">
        {lines.map((line, i) => (
          <Line key={i} line={line} index={i} total={lines.length} progress={scrollYProgress} />
        ))}
      </h2>
    </div>
  );
}

function Line({ line, index, total, progress }: { line: string, index: number, total: number, progress: any }) {
  // Stagger the reveal for each line
  const start = (index / total) * 0.5;
  const end = ((index + 1) / total);
  
  const color = useTransform(
    progress,
    [start, end],
    ["#6b6b70", "#1d1d1f"]
  );

  return (
    <motion.span 
      style={{ color }} 
      className="block transition-colors duration-200"
    >
      {line}
    </motion.span>
  );
}
