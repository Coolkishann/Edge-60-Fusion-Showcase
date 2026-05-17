"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ParallaxAppleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[120vh] w-full flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Parallax Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
      >
        <img
          src="/img2.webp"
          alt="Apple Parallax"
          className="w-full h-full object-cover opacity-80"
        />
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <Image
            src="/logo-m.webp"
            alt="Motorola Logo"
            width={72}
            height={72}
            className="h-18 w-auto object-contain"
          />

          <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-b from-white via-white/80 to-white/20 bg-clip-text text-transparent">
              Hello Moto.
            </span>
          </h2>

          <p className="text-white/40 text-xl md:text-2xl max-w-2xl font-light">
            Innovation that moves you. Performance that empowers you. The future is Edge.
          </p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  );
}
