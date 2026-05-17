"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import ScrollRevealText from "./ScrollRevealText";

const MotionImage = motion(Image);

export default function DesignSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Moves the image slightly up/down based on scroll position
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={sectionRef} className="bg-white py-32 flex flex-col items-center overflow-hidden">
      <div className="max-w-7xl w-full px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <p className="text-[#86868b] text-lg font-medium">Design</p>
          <ScrollRevealText 
            text={"Curved to perfection.\nDesigned to dazzle."}
            className="text-4xl md:text-6xl font-semibold tracking-tight max-w-2xl"
          />
        </div>
      </div>

      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <MotionImage
          src="/img3.png"
          alt="Moto Edge 60 Fusion in hand"
          width={1920}
          height={1080}
          style={{ y: imgY, scale: 1.2 }}
          className="w-full h-full object-cover transform-gpu origin-center"
        />
      </div>

      <div className="max-w-5xl w-full px-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-[#1d1d1f]">
          <p className="text-xl md:text-2xl leading-relaxed text-[#86868b]">
            The <span className="text-[#1d1d1f] font-medium">Moto Edge 60 Fusion</span> features a breathtaking curved pOLED display that flows into a precision-crafted frame. It's thin, light, and feels natural in your hand.
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-[#86868b]">
            Experience the perfect balance of aesthetics and ergonomics. With a glass back and premium finishes, it's not just a phone—it's a statement.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <button aria-label="Explore the design of Moto Edge 60 Fusion" className="flex items-center gap-3 bg-[#f5f5f7] px-8 py-4 rounded-full text-[#1d1d1f] font-medium hover:bg-[#e8e8ed] transition-all group">
            Explore the design <span aria-hidden="true" className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm group-hover:scale-110 transition-transform">+</span>
          </button>
        </div>
      </div>
    </section>
  );
}
