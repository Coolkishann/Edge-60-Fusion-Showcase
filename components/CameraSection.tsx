"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import ScrollRevealText from "./ScrollRevealText";

const MotionImage = motion(Image);

export default function CameraSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Moves the image slightly up/down based on scroll position
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={sectionRef} className="bg-[#f2f2f2] py-32 flex flex-col items-center overflow-hidden">
      {/* Top Text Section */}
      <div className="max-w-7xl w-full px-6 mb-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-[#1d1d1f] leading-tight" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
            Smile.<br />
            It's the world's<br />
            <span className="text-[#86868b]">favourite camera.</span>
          </h2>
        </motion.div>
      </div>

      {/* Camera Close-up Image */}
      <div className="w-full max-w-6xl px-6 mb-32 relative">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative w-full rounded-[40px] overflow-hidden"
        >
          <MotionImage
            src="/img7.png"
            alt="Moto Edge 60 Fusion Camera Close-up"
            width={1200}
            height={800}
            style={{ y: imgY, scale: 1.2 }}
            className="w-full h-auto object-cover transform-gpu origin-center"
          />
        </motion.div>
      </div>

      {/* Bottom Text & Button Section */}
      <div className="max-w-4xl w-full px-6 flex flex-col items-center text-center relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-[#6e6e73] leading-relaxed mb-12"
        >
          With over a decade of hardware and software innovations, Moto Edge has become a photography powerhouse. The Edge 60 Fusion continues this legacy with its powerful 50MP camera system that works like multiple advanced cameras in one. Shoot in super-high-resolution, capture stunning low-light portraits, and record cinematic video effortlessly.
        </motion.p>
      
      </div>
      <div className="max-w-4xl w-full px-6 flex flex-col items-center text-center relative mt-12">
        {/* Floating Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          aria-label="Compare Moto Edge 60 Fusion cameras"
          className="group relative flex items-center gap-3 bg-[#e8e8ed]/80 hover:bg-[#d2d2d7]/80 backdrop-blur-md px-6 py-3 rounded-full text-[#1d1d1f] font-medium transition-all shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
        >
          Compare Edge cameras
          <span className="w-6 h-6 bg-[#0071e3] text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform" aria-hidden="true">
            +
          </span>
        </motion.button>
      </div>
    </section>
  );
}
