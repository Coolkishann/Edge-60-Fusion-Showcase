"use client";

import { motion } from "framer-motion";

export default function FeatureVideoSection() {
  return (
    <section className="bg-white py-32 px-6 flex flex-col items-center overflow-hidden">
      <div className="max-w-6xl w-full">
        <div className="mb-20 mt-10 text-center">
           <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-semibold text-[#1d1d1f] tracking-tight mb-8"
          >
            Performance and <br />
            space to spare.
          </motion.h2>
        </div>
        <div className="relative w-full aspect-video rounded-[40px] overflow-hidden shadow-2xl">
          <video
            preload="none"
            autoPlay
            muted
            loop
            playsInline
            poster="/img1.webp"
            className="w-full h-full object-cover scale-105"
          >
            <source src="/mov2.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="mt-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#6b6b70] max-w-3xl mx-auto leading-relaxed"
          >
            Powered by the <span className="text-[#1d1d1f] font-medium">MediaTek Dimensity processor</span>, Moto Edge 60 Fusion delivers blazing-fast speeds for everything you do. With advanced AI features and massive storage, it's built to keep up with your lifestyle.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
