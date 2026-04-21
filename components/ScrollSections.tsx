"use client";

export default function ScrollSections() {
  return (
    <>
      {/* ===== Progress Bar ===== */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/[0.03]">
        <div
          className="scroll-progress h-full bg-gradient-to-r from-violet-500 to-violet-400 origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* ===== Hero Counter ===== */}
      <div className="hero-counter fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[100] text-sm md:text-base tracking-[0.2em] font-light text-white opacity-0">
        0%
      </div>

      {/* ===== Navigation ===== */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6 pointer-events-none">
        <div className="pointer-events-auto">
          <span className="text-sm font-light tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-300 cursor-pointer">
            SW
          </span>
        </div>
        <div className="pointer-events-auto hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-[11px] tracking-[0.15em] uppercase text-white/35 hover:text-white/80 transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#"
            className="text-[11px] tracking-[0.15em] uppercase text-white/35 hover:text-white/80 transition-colors duration-300"
          >
            Work
          </a>
          <a
            href="#"
            className="text-[11px] tracking-[0.15em] uppercase text-white/35 hover:text-white/80 transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* ===== Scroll Content ===== */}
      <div className="scroll-wrapper relative z-10">
        {/* ---------- Section 1: Hero ---------- */}
        <section className="hero-section h-screen flex flex-col items-center justify-center px-6 relative">
          <div className="text-center hero-content">
            <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/90 mb-6 md:mb-8">
              Interactive 3D Experience
            </p>
            <h1
              className="hero-title leading-[0.85]"
              style={{
                fontSize: "clamp(3rem, 9vw, 9rem)",
                fontWeight: 100,
                letterSpacing: "-0.02em",
              }}
            >
              SCROLL
              <br />
              <span className="text-gradient-violet font-light">WAYPOINTS</span>
            </h1>
            <p className="hero-subtitle mt-6 md:mt-8 text-xs md:text-sm tracking-[0.2em] text-white/60 max-w-md mx-auto font-light">
              A high-performance technical showcase of modern web immersive design
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator-wrap absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <span className="text-[9px] tracking-[0.35em] uppercase text-white/25 font-light">
              Scroll
            </span>
            <div className="w-[1px] h-10 bg-white/[0.08] relative overflow-hidden rounded-full">
              <div
                className="absolute inset-x-0 h-4 bg-white/40 rounded-full"
                style={{
                  animation: "scroll-line 2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                }}
              />
            </div>
          </div>
        </section>

        {/* ---------- Section 2: Formation ---------- */}
        <section className="formation-section h-screen flex items-center px-6 md:px-16 lg:px-24">
          <div className="section-text max-w-lg opacity-0">
            <span className="text-[10px] tracking-[0.5em] uppercase text-violet-400/90 block mb-4 font-light">
              01 &mdash; Formation
            </span>
            <h2
              className="leading-[1.05] tracking-tight"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                fontWeight: 200,
              }}
            >
              Built with
              <br />
              <span className="text-violet-300/90">Three.js</span>
            </h2>
            <p className="mt-5 md:mt-6 text-sm leading-relaxed text-white/90 max-w-sm font-light">
              Leveraging WebGL through Three.js to render over 12,000 particles at 60 FPS.
              Using custom BufferGeometries for efficient memory management and rapid state morphing.
            </p>
          </div>
        </section>

        {/* ---------- Section 3: Transformation ---------- */}
        <section className="transform-section h-screen flex items-center justify-end px-6 md:px-16 lg:px-24">
          <div className="section-text max-w-lg text-right opacity-0">
            <span className="text-[10px] tracking-[0.5em] uppercase text-violet-400/90 block mb-4 font-light">
              02 &mdash; Metamorphosis
            </span>
            <h2
              className="leading-[1.05] tracking-tight"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                fontWeight: 200,
              }}
            >
              GSAP
              <br />
              <span className="text-violet-300/90">Orchestration</span>
            </h2>
            <p className="mt-5 md:mt-6 text-sm leading-relaxed text-white/90 max-w-sm ml-auto font-light">
              Seamlessly choreographed with GSAP ScrollTrigger. Every particle's position
              is interpolated through complex timelines, ensuring pixel-perfect
              synchronization with user interaction.
            </p>
          </div>
        </section>

        {/* ---------- Section 4: Ribbon ---------- */}
        <section className="ribbon-section h-screen flex items-center px-6 md:px-16 lg:px-24">
          <div className="section-text max-w-lg opacity-0">
            <span className="text-[10px] tracking-[0.5em] uppercase text-violet-400/90 block mb-4 font-light">
              03 &mdash; Flow
            </span>
            <h2
              className="leading-[1.05] tracking-tight"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                fontWeight: 200,
              }}
            >
              GLSL
              <br />
              <span className="text-violet-300/90">Shader Power</span>
            </h2>
            <p className="mt-5 md:mt-6 text-sm leading-relaxed text-white/90 max-w-sm font-light">
              Custom Vertex and Fragment Shaders drive the visual aesthetic.
              The ribbon effect uses parametric equations executed directly
              on the GPU for maximum performance and fluid motion.
            </p>
          </div>
        </section>

        {/* ---------- Section 5: Reform ---------- */}
        <section className="reform-section h-screen flex items-center justify-end px-6 md:px-16 lg:px-24">
          <div className="section-text max-w-lg text-right opacity-0">
            <span className="text-[10px] tracking-[0.5em] uppercase text-violet-400/90 block mb-4 font-light">
              04 &mdash; Evolution
            </span>
            <h2
              className="leading-[1.05] tracking-tight"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                fontWeight: 200,
              }}
            >
              Next.js
              <br />
              <span className="text-violet-300/90">Foundation</span>
            </h2>
            <p className="mt-5 md:mt-6 text-sm leading-relaxed text-white/90 max-w-sm ml-auto font-light">
              Wrapped in a robust Next.js application, utilizing the App Router
              and Tailwind CSS for a scalable, developer-friendly architecture
              that doesn't compromise on creative freedom.
            </p>
          </div>
        </section>

        {/* ---------- Section 6: CTA ---------- */}
        <section className="cta-section h-screen flex flex-col items-center justify-center px-6">
          <div className="text-center opacity-0">
            <p className="text-[10px] tracking-[0.5em] uppercase text-violet-400/90 mb-5 md:mb-6 font-light">
              Ready for your next project?
            </p>
            <h2
              className="leading-[1.05] tracking-tight mb-6 md:mb-8"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                fontWeight: 200,
              }}
            >
              Let's
              <br />
              <span className="text-gradient-violet font-light">
                Collaborate
              </span>
            </h2>
            <p className="text-sm text-white/90 max-w-md mx-auto mb-10 md:mb-12 font-light leading-relaxed">
              Experience the future of interactive web design. I'm currently
              available for freelance opportunities and full-stack partnerships.
            </p>
            <button
              id="cta-get-started"
              onClick={() => window.location.href = "mailto:kishanvishwakarma6414@gmail.com"}
              className="glow-button px-10 py-4 rounded-full text-[11px] tracking-[0.25em] uppercase text-white/90 cursor-pointer pointer-events-auto"
            >
              Contact Developer
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
