"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollRevealText from "./ScrollRevealText";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    id: 1,
    title: "144Hz pOLED Curved Display.",
    subtitle: "Immersive beyond boundaries.",
    video: "/mov2.mp4",
  },
  {
    id: 2,
    title: "50MP OIS Ultra Pixel Camera.",
    subtitle: "Crystal clear shots, every time.",
    video: "/mov6.mp4",
  },
  {
    id: 3,
    title: "68W TurboPower™ Charging.",
    subtitle: "Power for the day in minutes.",
    image: "/img6.webp",
  },
];

export default function HighlightsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;

    if (!section || !trigger) return;

    const pin = gsap.to(section, {
      x: () => -(section.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${section.scrollWidth}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <div ref={triggerRef} className="overflow-hidden bg-[#f5f5f7]">
      <div className="pt-36 px-10 md:px-20 max-w-7xl mx-auto flex justify-between items-end mb-8">
        <ScrollRevealText 
            text={"Get the highlights."}
          className="text-4xl md:text-5xl font-semibold tracking-tight"
        />
        <a href="#" className="text-[#0066cc] text-lg font-medium hover:underline flex items-center gap-1">
          Watch the film
        </a>
      </div>

      <div ref={sectionRef} className="flex w-max px-10 md:px-20 gap-8 pb-20">
        {highlights.map((item) => (
          <div
            key={item.id}
            className="w-[85vw] md:w-[70vw] h-[70vh] flex-shrink-0 bg-white rounded-[32px] overflow-hidden relative shadow-sm"
          >
            <div className="absolute top-12 left-12 z-10 max-w-sm">
              <h3 className="text-3xl font-semibold text-[#fff] leading-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-xl text-[#fff]/80">{item.subtitle}</p>
            </div>

            {item.video ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={item.video} type="video/mp4" />
              </video>
            ) : (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
