"use client";

import { motion } from "framer-motion";
import ScrollRevealText from "./ScrollRevealText";

const valueCards = [
  {
    id: 1,
    icon: (
      <svg className="w-8 h-8 text-[#5E35B1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Made with",
    highlight: "35% recycled material",
    detail: "by weight.",
    bgColor: "bg-white",
  },
  {
    id: 2,
    icon: (
      <svg className="w-8 h-8 text-[#FF6D00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Manufactured with",
    highlight: "45% renewable electricity.",
    detail: "",
    bgColor: "bg-white",
  },
  {
    id: 3,
    icon: (
      <svg className="w-8 h-8 text-[#00ACC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Ships in compact",
    highlight: "10% more units",
    detail: "per trip.",
    bgColor: "bg-white",
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-[#f5f5f7] py-32 px-6 flex flex-col items-center overflow-hidden">
      <div className="max-w-7xl w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <ScrollRevealText 
            text={"Moto Edge 60 Fusion\nand the environment."}
            className="text-4xl md:text-6xl font-semibold tracking-tight"
          />
          <a href="#" className="text-[#0066cc] text-lg font-medium hover:underline pb-2">
            Learn more in our report (PDF)
          </a>
        </div>

        {/* Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valueCards.map((card) => (
            <div
              key={card.id}
              className={`${card.bgColor} p-12 rounded-[32px] shadow-sm flex flex-col justify-between min-h-[350px] relative group hover:shadow-md transition-shadow`}
            >
              <div>
                <div className="mb-8">{card.icon}</div>
                <h3 className="text-2xl font-semibold text-[#1d1d1f] leading-tight">
                  {card.title} <br />
                  <span className={card.id === 1 ? "text-[#5E35B1]" : card.id === 2 ? "text-[#FF6D00]" : "text-[#00ACC1]"}>
                    {card.highlight}
                  </span> <br />
                  {card.detail}
                </h3>
              </div>
              
              <div className="absolute bottom-10 right-10">
                <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <span className="text-xl">+</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
