"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  generateScatterPositions,
  generateCubePositions,
  generateSpherePositions,
  generatePyramidPositions,
  generateRibbonPositions,
  generateSizes,
  generateOpacities,
  generateColors,
} from "@/lib/particles";

/* ------------------------------------------------------------------ */
/*  GLSL Shaders — tiny crisp dots, density = brightness              */
/* ------------------------------------------------------------------ */

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aOpacity;
  attribute vec3  aColor;

  uniform float uPixelRatio;
  uniform float uSizeScale;

  varying float vOpacity;
  varying vec3  vColor;

  void main() {
    vOpacity = aOpacity;
    vColor   = aColor;

    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);

    gl_Position  = projectionMatrix * mvPos;
    gl_PointSize = aSize * uPixelRatio * uSizeScale * (28.0 / -mvPos.z);
    gl_PointSize = clamp(gl_PointSize, 0.5, 8.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vOpacity;
  varying vec3  vColor;

  void main() {
    vec2  c    = gl_PointCoord - 0.5;
    float dist = length(c);

    // Small crisp dot with tight soft edge
    float alpha = smoothstep(0.5, 0.3, dist) * vOpacity;

    if (alpha < 0.005) discard;

    gl_FragColor = vec4(vColor, alpha);
  }
`;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function SceneCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    /* ---------- Config ---------- */
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 5000 : 12000;
    const DPR = Math.min(window.devicePixelRatio, 2);

    /* ---------- Scene / Camera / Renderer ---------- */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(DPR);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    /* ---------- Morph targets ---------- */
    const scatterPos = generateScatterPositions(PARTICLE_COUNT, 5);
    const cubePos = generateCubePositions(PARTICLE_COUNT, 2.4);
    const pyramidPos = generatePyramidPositions(PARTICLE_COUNT, 2.8);
    const ribbonPos = generateRibbonPositions(PARTICLE_COUNT, 2.5);
    const spherePos = generateSpherePositions(PARTICLE_COUNT, 2.2);

    // Path: scatter(0) → cube(1) → pyramid(2) → ribbon(3) → sphere(4) → scatter(5)
    // We'll go up to 4 for the sphere, and perhaps just stay. The length is 4 morphs.
    const morphTargets = [
      scatterPos,
      cubePos,
      pyramidPos,
      ribbonPos,
      spherePos,
    ];

    /* ---------- Geometry ---------- */
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    positions.set(scatterPos);

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "aSize",
      new THREE.BufferAttribute(
        generateSizes(PARTICLE_COUNT, isMobile ? 0.6 : 0.7),
        1
      )
    );
    geometry.setAttribute(
      "aOpacity",
      new THREE.BufferAttribute(generateOpacities(PARTICLE_COUNT), 1)
    );
    geometry.setAttribute(
      "aColor",
      new THREE.BufferAttribute(generateColors(PARTICLE_COUNT), 3)
    );

    /* ---------- Material ---------- */
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uPixelRatio: { value: DPR },
        uSizeScale: { value: 1.0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    /* ---------- Points mesh ---------- */
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    /* ---------- Animation state ---------- */
    const state = {
      morphFactor: 0,
      rotationY: 0,
      rotationX: 0,
      cameraZ: 7,
      cameraY: 0,
      posX: 0,
    };

    /* ---------- Mouse ---------- */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ---------- GSAP Timeline ---------- */
    const wrapper = document.querySelector(".scroll-wrapper");

    if (wrapper) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      /* ---- Morph ---- */
      tl.to(state, { morphFactor: 1, duration: 1, ease: "none" }, 0);
      tl.to(state, { morphFactor: 2, duration: 1, ease: "none" }, 1);
      tl.to(state, { morphFactor: 3, duration: 1, ease: "none" }, 2);
      tl.to(state, { morphFactor: 4, duration: 1, ease: "none" }, 3);

      /* ---- Camera + Rotation ---- */
      tl.to(
        state,
        { cameraZ: 5.5, rotationY: Math.PI * 0.6, duration: 1, ease: "none" },
        0
      );
      tl.to(
        state,
        { cameraZ: 6.5, rotationY: Math.PI * 1.5, duration: 1, ease: "none" },
        1
      );
      tl.to(
        state,
        { cameraZ: 7, rotationY: Math.PI * 2.5, duration: 1, ease: "none" },
        2
      );
      tl.to(
        state,
        { cameraZ: 5.2, rotationY: Math.PI * 3.5, duration: 1, ease: "none" },
        3
      );
      tl.to(
        state,
        { rotationY: Math.PI * 4, duration: 1, ease: "none" },
        4
      );

      /* ---- Position: cube right, pyramid far left, ribbon right, sphere center ---- */
      tl.to(state, { posX: 2.0, duration: 1, ease: "none" }, 0); // cube
      tl.to(state, { posX: -1.5, duration: 1, ease: "none" }, 1); // pyramid
      tl.to(state, { posX: 2.0, duration: 1, ease: "none" }, 2); // ribbon
      tl.to(state, { posX: 0, duration: 1, ease: "none" }, 3); // sphere
      // CTA section stays spherical + center

      /* ---- Hero text out ---- */
      tl.to(
        ".hero-title",
        { opacity: 0, y: -80, duration: 0.45, ease: "none" },
        0.05
      );
      tl.to(
        ".hero-subtitle",
        { opacity: 0, y: -50, duration: 0.35, ease: "none" },
        0.1
      );
      tl.to(
        ".scroll-indicator-wrap",
        { opacity: 0, duration: 0.25, ease: "none" },
        0
      );

      /* ---- Formation text ---- */
      tl.fromTo(
        ".formation-section .section-text",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.3, ease: "none" },
        0.65
      );
      tl.to(
        ".formation-section .section-text",
        { opacity: 0, y: -50, duration: 0.3, ease: "none" },
        1.15
      );

      /* ---- Transform text ---- */
      tl.fromTo(
        ".transform-section .section-text",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.3, ease: "none" },
        1.65
      );
      tl.to(
        ".transform-section .section-text",
        { opacity: 0, y: -50, duration: 0.3, ease: "none" },
        2.15
      );

      /* ---- Ribbon text ---- */
      tl.fromTo(
        ".ribbon-section .section-text",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.3, ease: "none" },
        2.65
      );
      tl.to(
        ".ribbon-section .section-text",
        { opacity: 0, y: -50, duration: 0.3, ease: "none" },
        3.15
      );

      /* ---- Reform text ---- */
      tl.fromTo(
        ".reform-section .section-text",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.3, ease: "none" },
        3.65
      );
      tl.to(
        ".reform-section .section-text",
        { opacity: 0, y: -50, duration: 0.3, ease: "none" },
        4.15
      );

      /* ---- CTA ---- */
      tl.fromTo(
        ".cta-section > div",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "none" },
        4.4
      );

      /* ---- Progress bar ---- */
      tl.fromTo(
        ".scroll-progress",
        { scaleX: 0 },
        { scaleX: 1, duration: 5, ease: "none" },
        0
      );
    }

    /* ---------- Resize ---------- */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uPixelRatio.value = Math.min(
        window.devicePixelRatio,
        2
      );
    };
    window.addEventListener("resize", onResize);

    /* ---------- Animation loop ---------- */
    const startTime = performance.now();

    function animate() {
      const t = (performance.now() - startTime) * 0.001;

      // Smooth mouse
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      // --- Morph positions ---
      const factor = Math.max(0, Math.min(state.morphFactor, 4));
      const phase = Math.min(Math.floor(factor), 3);
      const blend = factor - phase;
      const from = morphTargets[phase];
      const to = morphTargets[phase + 1];

      const posArr = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;

        // Smoothstep interpolation
        const s = blend * blend * (3 - 2 * blend);

        const tx = from[i3] + (to[i3] - from[i3]) * s;
        const ty = from[i3 + 1] + (to[i3 + 1] - from[i3 + 1]) * s;
        const tz = from[i3 + 2] + (to[i3 + 2] - from[i3 + 2]) * s;

        // Very subtle organic drift
        const n = 0.006;
        posArr[i3] = tx + Math.sin(t * 0.3 + i * 0.37) * n;
        posArr[i3 + 1] = ty + Math.cos(t * 0.25 + i * 0.41) * n;
        posArr[i3 + 2] = tz + Math.sin(t * 0.35 + i * 0.29) * n;
      }

      geometry.attributes.position.needsUpdate = true;

      // --- Rotation + Position ---
      points.rotation.y = state.rotationY;
      points.rotation.x = state.rotationX;
      points.position.x = state.posX;

      // --- Camera with mouse parallax ---
      camera.position.x += (mouse.x * 0.35 - camera.position.x) * 0.04;
      camera.position.y +=
        (-mouse.y * 0.25 + state.cameraY - camera.position.y) * 0.04;
      camera.position.z += (state.cameraZ - camera.position.z) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    }

    animate();

    /* ---------- Cleanup ---------- */
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
