"use client";

import { motion } from "framer-motion";
import ScrollRevealText from "./ScrollRevealText";

export default function DisplaySection() {
  return (
    <section className="bg-white py-48 px-6 flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col gap-10">
        {/* ... media grid ... */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Large Video Container */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden group shadow-sm bg-[#f5f5f7] aspect-video">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            >
              <source src="/mov5.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Right: Stacked Images */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative rounded-3xl overflow-hidden shadow-sm bg-[#f5f5f7] aspect-[4/2.5]">
              <img
                src="/img4.webp"
                alt="Display detail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-sm bg-[#f5f5f7] aspect-[4/2.5]">
              <img
                src="/img5.webp"
                alt="Display detail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Text Content - Centered and Spaced */}
        <div className="text-center">
          <ScrollRevealText 
            text={"Best-in-class 1.5K\nQuad-Curve display"}
            className="text-2xl md:text-4xl font-bold tracking-tight mb-4"
          />
          <div className="max-w-3xl mx-auto">
            <p className="text-sm md:text-base text-[#86868b] leading-relaxed">
              The <span className="text-black font-semibold">6.7" Super HD pOLED display</span> has a brightness of <span className="text-black font-semibold">up to 4500 nits<sup>1</sup>, 2.8x more than previous generations<sup>3</sup></span>, ensuring clear images even in bright light. With <span className="text-black font-semibold">HDR10+ and Pantone™ Validated Colors</span>, it displays more than 1 billion colors with cinematic accuracy and true skin tones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
