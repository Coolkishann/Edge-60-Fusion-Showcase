"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { label: "Portfolio", href: "https://dev-kishan.vercel.app/", image: "/myomage.jpeg", isRounded: true },
  { label: "Github", href: "https://github.com/coolkishann", image: "/github.png", isRounded: false },
  { label: "Linkedln", href: "https://www.linkedin.com/in/kishanvishwakarma1406/", image: "/linkedin.png", isRounded: false },
  { label: "Instagram", href: "https://www.instagram.com/__kishxnnn/", image: "/instagram.png", isRounded: false },
];

const socialIcons = [
  { id: "x", icon: "𝕏" },
  { id: "instagram", icon: "" },
  { id: "dribbble", icon: "" },
  { id: "linkedin", icon: "" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 px-6 py-4 flex justify-between items-center bg-transparent`}
      >
        {/* Logo */}
        <div className="flex items-center cursor-pointer">
          <img
            src="/motorola-seeklogo.svg"
            alt="Motorola Logo"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative px-6 py-2 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300 z-[101] ${isOpen ? "bg-white" : "bg-white/50 backdrop-blur-md"
            }`}
        >
          <div className="relative w-6 h-6 flex flex-col items-center justify-center">
            <span
              className={`absolute w-5 h-0.5 bg-black transition-all duration-300 ${isOpen ? "rotate-45" : "-translate-y-1"
                }`}
            />
            <span
              className={`absolute w-5 h-0.5 bg-black transition-all duration-300 ${isOpen ? "-rotate-45" : "translate-y-1"
                }`}
            />
          </div>
        </button>
      </nav>

      {/* Full-screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#f3f2f2] z-[99] flex flex-col p-6 md:p-16 overflow-y-auto overflow-x-hidden"
          >
            <div className="min-h-full flex flex-col">
              {/* Header / Menu Label */}
              <div className="mt-8 md:mt-6">
                <span className="text-[#86868b] text-sm uppercase tracking-widest font-medium">Menu</span>
              </div>

              {/* Menu Links */}
              <div className="flex flex-col gap-1 md:gap-2 mt-8 md:mt-4 flex-grow">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-black hover:text-[#86868b] transition-colors duration-300 flex items-center gap-6 group w-max z-10"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              {/* Bottom Section */}
              <div className="mt-12 border-t border-black/10 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
                {/* Contact Info */}
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-[#86868b] text-xs uppercase tracking-widest block mb-2">Let's Talk</span>
                    <a href="mailto:kishanvishwakarma6414@gmail.com" className="text-xl md:text-3xl font-semibold text-black hover:underline decoration-1 underline-offset-8">
                      kishanvishwakarma6414@gmail.com
                    </a>
                  </div>
                  <div className="text-lg text-black font-medium tracking-tight">
                    INDIA (IN) <span className="text-[#86868b] ml-4">
                      {new Date().toLocaleTimeString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>

          
              </div>
            </div>

            {/* Floating Cursor Image */}
            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.img
                  key="cursor-image"
                  src={menuItems[hoveredIndex].image}
                  alt={menuItems[hoveredIndex].label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    left: mousePos.x,
                    top: mousePos.y,
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    left: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
                    top: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                  }}
                  className={`fixed w-32 h-32 md:w-32 md:h-32 object-cover pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 ${
                    menuItems[hoveredIndex].isRounded ? "rounded-full" : "rounded-3xl"
                  }`}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
