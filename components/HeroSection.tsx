"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface HeroSectionProps {
  shouldPlay?: boolean;
}

export default function HeroSection({ shouldPlay = true }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (shouldPlay) {
        videoRef.current.play().catch(err => console.log("Video play failed:", err));
      } else {
        videoRef.current.pause();
      }
    }
  }, [shouldPlay]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        muted
        playsInline
        title="Moto Edge 60 Fusion Showcase Video"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/mov1.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="absolute bottom-16 right-16 z-10 text-right max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Brand Logo/Title */}
          <div className="flex flex-col items-end gap-0">
            <h1 className="flex flex-col items-end">
              <span className="sr-only">Moto Edge 60 Fusion</span>
              <span className="text-6xl md:text-8xl font-medium text-white tracking-[-0.04em] leading-none mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                edge 60
              </span>
              <span className="text-5xl md:text-7xl font-light tracking-[0.15em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                FUSION
              </span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="space-y-1"
          >
            <p className="text-white text-xl md:text-2xl font-light tracking-wide leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              Intelligence meets <span className="font-normal">elegance.</span>
            </p>
            <p className="text-white/50 text-lg md:text-xl font-light tracking-wider">
              Experience the next generation of Edge.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Font Injection */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;400;500;700&display=swap');
      `}</style>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
    </section>
  );
}
