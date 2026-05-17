"use client";

import Lenis from "@studio-freight/lenis";
import HeroSection from "@/components/HeroSection";
import HighlightsSection from "@/components/HighlightsSection";
import DesignSection from "@/components/DesignSection";
import PhoneExplorerSection from "@/components/PhoneExplorerSection";
import CameraSection from "@/components/CameraSection";
import MobileScroll from "@/components/MobileScroll";
import FeatureVideoSection from "@/components/FeatureVideoSection";
import ParallaxAppleSection from "@/components/ParallaxAppleSection";
import DisplaySection from "@/components/DisplaySection";
import ValuesSection from "@/components/ValuesSection";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-white">
      {/* Premium Initial Page Transition (Curtain Effect) */}
      <motion.div
        initial={{ height: "100vh" }}
        animate={{ height: "0vh" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
        className="fixed top-0 left-0 w-full bg-[#1d1d1f] z-[9999] flex items-center justify-center overflow-hidden pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image src="/motorola-seeklogo.svg" alt="Motorola Logo" width={200} height={48} className="h-12 w-auto invert opacity-80" priority />
        </motion.div>
      </motion.div>

      <Navbar />

      {/* Section 1: Hero */}
      <HeroSection shouldPlay={isLoaded} />
      <HighlightsSection />


      {/* Section 3: Design */}
      <DesignSection />

      {/* Section: Interactive 3D Phone Explorer */}
      <PhoneExplorerSection />

      {/* Section 4: Image Sequence Scroll */}
      <div className="bg-transparent">
        <MobileScroll onLoadComplete={() => setIsLoaded(true)} />
      </div>
      {/* New Section: Camera Deep Dive */}
      {/* <CameraSection /> */}

      {/* Section 5: Feature Video / Performance */}
      <FeatureVideoSection />

      {/* New Section: Display Grid (img4-5, mov5) */}
      <DisplaySection />

      {/* New Section: Values & img1 */}
      <ValuesSection />

      {/* Parallax Section */}
      <ParallaxAppleSection />

      {/* Section 2: Highlights (Moved to bottom) */}

      {/* Footer */}
      <footer className="bg-black py-20 px-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-white/40 text-sm">
            © 2024 Motorola Mobility LLC. All Rights Reserved.
          </div>
          <div className="flex gap-8 text-white/60 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
