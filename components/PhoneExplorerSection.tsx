// "use client";

// import { Canvas, useFrame } from "@react-three/fiber";
// import { ContactShadows } from "@react-three/drei";
// import { Suspense, useRef, useState, useEffect, useCallback, useMemo } from "react";
// import * as THREE from "three";
// import { motion, AnimatePresence } from "framer-motion";
// import { Environment, Lightformer, OrbitControls, useGLTF, useProgress } from "@react-three/drei";

// // ─── GLB Paths (URL-encoded for spaces) ────────────────────────────
// const MODELS = {
//   cinza: {
//     path: "/Edge60_Fusion_Cinza_V2-v1.glb",
//     label: "Cinza Grey",
//     swatch: "#A8B0B8",
//   },
//   mocha: {
//     path: "/Edge60_Fusion_Mocha_V2-v1.glb",
//     label: "Mocha Brown",
//     swatch: "#8B6F5E",
//   },
//   rosa: {
//     path: "/Edge60_Fusion_Rosa_V4-v1.glb",
//     label: "Rosa Pink",
//     swatch: "#E8B4B8",
//   },
// } as const;

// type ModelKey = keyof typeof MODELS;

// // ─── Feature Definitions ───────────────────────────────────────────
// const FEATURES = [
//   {
//     id: "colours",
//     label: "Colours",
//     description: "Available in three stunning finishes.",
//     icon: "palette",
//     modelRotation: [0, 0, 0] as [number, number, number],
//   },
//   {
//     id: "camera",
//     label: "50MP Camera System",
//     description:
//       "Advanced 50MP OIS camera with AI-enhanced night photography. Capture every detail in stunning clarity.",
//     icon: "camera",
//     modelRotation: [0, Math.PI, 0] as [number, number, number],
//   },
//   {
//     id: "display",
//     label: "Quad-Curve Display",
//     description:
//       "1.5K pOLED display with 120Hz refresh rate. Vivid colours flow edge to edge with quad-curved design.",
//     icon: "display",
//     modelRotation: [0, -0.35, 0] as [number, number, number],
//   },
//   {
//     id: "frame",
//     label: "Ultra Thin Frame",
//     description:
//       "Just 7.6mm thin with a precision-crafted aluminium frame. Feels impossibly light in your hand.",
//     icon: "frame",
//     modelRotation: [0, -Math.PI / 2, 0] as [number, number, number],
//   },
//   {
//     id: "charging",
//     label: "68W Hyper Charging",
//     description:
//       "68W TurboPower charging gets you from 0 to 50% in just 15 minutes. Full charge in under 50 minutes.",
//     icon: "charging",
//     modelRotation: [0.3, Math.PI, 0] as [number, number, number],
//   },
//   {
//     id: "water",
//     label: "IP68 Water Resistant",
//     description:
//       "IP68 dust and water resistance. Engineered to handle everyday splashes and spills with confidence.",
//     icon: "water",
//     modelRotation: [0.15, 0.5, -0.05] as [number, number, number],
//   },
// ];

// // ─── Icon Components ───────────────────────────────────────────────
// function FeatureIcon({ type }: { type: string }) {
//   const icons: Record<string, React.ReactNode> = {
//     palette: (
//       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//         <circle cx="12" cy="12" r="10" />
//         <circle cx="8" cy="9" r="1.5" fill="currentColor" />
//         <circle cx="15" cy="8" r="1.5" fill="currentColor" />
//         <circle cx="16" cy="13" r="1.5" fill="currentColor" />
//         <circle cx="9" cy="14" r="1.5" fill="currentColor" />
//       </svg>
//     ),
//     camera: (
//       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
//         <circle cx="12" cy="13" r="4" />
//       </svg>
//     ),
//     display: (
//       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//         <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
//         <line x1="12" y1="18" x2="12.01" y2="18" />
//       </svg>
//     ),
//     frame: (
//       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
//       </svg>
//     ),
//     charging: (
//       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//         <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
//       </svg>
//     ),
//     water: (
//       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
//       </svg>
//     ),
//   };
//   return <>{icons[type] || null}</>;
// }

// // ─── 3D Phone Model ────────────────────────────────────────────────
// function PhoneModel({
//   modelPath,
//   targetRotation,
// }: {
//   modelPath: string;
//   targetRotation: [number, number, number];
// }) {
//   const { scene } = useGLTF(modelPath);
//   const groupRef = useRef<THREE.Group>(null);

//   // Auto-scale based on bounding box
//   const { scale, offset } = useMemo(() => {
//     const box = new THREE.Box3().setFromObject(scene);
//     const size = new THREE.Vector3();
//     const center = new THREE.Vector3();
//     box.getSize(size);
//     box.getCenter(center);

//     const maxDim = Math.max(size.x, size.y, size.z);
//     const s = maxDim > 0 ? 3 / maxDim : 1;

//     return {
//       scale: s,
//       offset: [-center.x * s, -center.y * s, -center.z * s] as [number, number, number],
//     };
//   }, [scene]);

//   useFrame((_, delta) => {
//     if (!groupRef.current) return;

//     const speed = 2.5 * delta;
//     groupRef.current.rotation.x += (targetRotation[0] - groupRef.current.rotation.x) * speed;
//     groupRef.current.rotation.y += (targetRotation[1] - groupRef.current.rotation.y) * speed;
//     groupRef.current.rotation.z += (targetRotation[2] - groupRef.current.rotation.z) * speed;
//   });

//   return (
//     <group ref={groupRef} scale={[scale, scale, scale]} position={offset}>
//       <primitive object={scene} />
//     </group>
//   );
// }

// // ─── Loading Indicator ─────────────────────────────────────────────
// function ModelLoader() {
//   return (
//     <div className="absolute inset-0 flex items-center justify-center">
//       <div className="flex flex-col items-center gap-4">
//         <div className="w-10 h-10 border-2 border-[#1d1d1f]/10 border-t-[#1d1d1f]/60 rounded-full animate-spin" />
//         <span className="text-[#86868b] text-sm font-light tracking-widest uppercase">
//           Loading Model
//         </span>
//       </div>
//     </div>
//   );
// }

// // ─── Scene Content (inside Canvas) ─────────────────────────────────
// function SceneContent({
//   modelPath,
//   targetRotation,
// }: {
//   modelPath: string;
//   targetRotation: [number, number, number];
// }) {
//   return (
//     <>
//       {/* Procedural Environment for Beautiful PBR Reflections without HDR downloads */}
//       <Environment resolution={256}>
//         <group rotation={[-Math.PI / 2, 0, 0]}>
//           <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
//           <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 5, 9]} scale={[10, 10, 1]} />
//           <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-9, 1, 0]} scale={[10, 2, 1]} />
//           <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[9, 1, 0]} scale={[10, 2, 1]} />
//         </group>
//       </Environment>

//       {/* Lighting */}
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={1} />
//       <directionalLight position={[-3, 3, 3]} intensity={0.5} />

//       {/* Shadow */}
//       <ContactShadows
//         position={[0, -1.6, 0]}
//         opacity={0.25}
//         scale={6}
//         blur={2}
//         far={4}
//       />

//       {/* OrbitControls — drag to rotate */}
//       <OrbitControls
//         enablePan={false}
//         enableZoom={false}
//         minDistance={3}
//         maxDistance={8}
//         autoRotate={false}
//         makeDefault
//       />

//       {/* Phone model */}
//       <Suspense fallback={null}>
//         <PhoneModel modelPath={modelPath} targetRotation={targetRotation} />
//       </Suspense>
//     </>
//   );
// }

// // ─── Main Section Component ────────────────────────────────────────
// export default function PhoneExplorerSection() {
//   const [activeFeature, setActiveFeature] = useState(0);
//   const [activeColor, setActiveColor] = useState<ModelKey>("cinza");
//   const [isInView, setIsInView] = useState(true); // Load eagerly on page mount
//   const sectionRef = useRef<HTMLDivElement>(null);

//   const { active, progress } = useProgress();
//   const [modelLoaded, setModelLoaded] = useState(false);

//   useEffect(() => {
//     if (!active && progress === 100) {
//       const timer = setTimeout(() => setModelLoaded(true), 600); // Premium transition delay
//       return () => clearTimeout(timer);
//     } else {
//       setModelLoaded(false);
//     }
//   }, [active, progress]);

//   // Intersection observer — lazy-load the 3D canvas
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsInView(true);
//           observer.disconnect();
//         }
//       },
//       { rootMargin: "300px" }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const currentFeature = FEATURES[activeFeature];
//   const currentModel = MODELS[activeColor];

//   // Dynamic colour description
//   const getDescription = useCallback(
//     (index: number) => {
//       if (index === 0) {
//         return `Available in three stunning finishes. Moto Edge 60 Fusion shown in ${currentModel.label}.`;
//       }
//       return FEATURES[index].description;
//     },
//     [currentModel]
//   );

//   const handleTabClick = (index: number) => {
//     // Toggle: clicking the already-active tab collapses nothing (keep it open)
//     setActiveFeature(index);
//   };

//   return (
//     <section
//       ref={sectionRef}
//       id="explore-phone"
//       className="relative bg-[#f5f5f7] overflow-hidden"
//       style={{ minHeight: "100vh" }}
//     >
//       {/* Section Header */}
//       <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="text-[#86868b] text-lg font-medium mb-4"
//         >
//           Explore
//         </motion.p>
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.1 }}
//           className="text-4xl md:text-6xl font-semibold tracking-tight text-[#1d1d1f] max-w-3xl"
//           style={{
//             fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
//           }}
//         >
//           Take a closer look.
//         </motion.h2>
//       </div>

//       {/* Main Content — Accordion Tabs + 3D Viewer */}
//       <div className="max-w-7xl mx-auto px-6 pb-24">
//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 items-start">
//           {/* Left: Accordion Feature Tabs */}
//           <div className="w-full lg:w-[380px] flex-shrink-0 lg:pt-8">
//             <div className="flex flex-col gap-1.5">
//               {FEATURES.map((feature, index) => {
//                 const isActive = activeFeature === index;

//                 return (
//                   <motion.div
//                     key={feature.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5, delay: index * 0.06 }}
//                     viewport={{ once: true }}
//                     className={`rounded-2xl transition-all duration-400 overflow-hidden ${isActive
//                       ? "bg-white shadow-[0_2px_24px_rgba(0,0,0,0.06)]"
//                       : "bg-transparent hover:bg-white/50"
//                       }`}
//                   >
//                     {/* Tab Header */}
//                     <button
//                       onClick={() => handleTabClick(index)}
//                       className="w-full flex items-center gap-3 px-5 py-3.5 text-left cursor-pointer group"
//                     >
//                       <span
//                         className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isActive
//                           ? "bg-[#1d1d1f] text-white"
//                           : "bg-[#e8e8ed] text-[#86868b] group-hover:bg-[#d2d2d7]"
//                           }`}
//                       >
//                         <FeatureIcon type={feature.icon} />
//                       </span>
//                       <span
//                         className={`text-[15px] font-medium flex-1 transition-colors duration-300 ${isActive
//                           ? "text-[#1d1d1f]"
//                           : "text-[#6e6e73] group-hover:text-[#1d1d1f]"
//                           }`}
//                       >
//                         {feature.label}
//                       </span>
//                       {/* Expand/Collapse indicator */}
//                       {/* <svg
//                         width="16"
//                         height="16"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className={`transition-transform duration-300 flex-shrink-0 ${isActive
//                           ? "rotate-180 text-[#1d1d1f]"
//                           : "rotate-0 text-[#c7c7cc]"
//                           }`}
//                       >
//                         <polyline points="6 9 12 15 18 9" />
//                       </svg> */}
//                     </button>

//                     {/* Expanded Content */}
//                     <AnimatePresence initial={false}>
//                       {isActive && (
//                         <motion.div
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: "auto", opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           transition={{
//                             height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
//                             opacity: { duration: 0.25, delay: 0.1 },
//                           }}
//                           className="overflow-hidden"
//                         >
//                           <div className="px-5 pb-5 pt-1">
//                             <p className="text-[#6e6e73] text-[14px] leading-relaxed">
//                               <span className="text-[#1d1d1f] font-semibold">
//                                 {feature.label}.
//                               </span>{" "}
//                               {getDescription(index)}
//                             </p>

//                             {/* Color Swatches (only for Colours tab) */}
//                             {index === 0 && (
//                               <div className="mt-4 flex items-center gap-3">
//                                 {(
//                                   Object.entries(MODELS) as [
//                                     ModelKey,
//                                     (typeof MODELS)[ModelKey]
//                                   ][]
//                                 ).map(([key, model]) => (
//                                   <button
//                                     key={key}
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       setActiveColor(key);
//                                     }}
//                                     className={`relative w-7 h-7 rounded-full transition-all duration-300 cursor-pointer ${activeColor === key
//                                       ? "ring-2 ring-[#1d1d1f] ring-offset-2"
//                                       : "ring-1 ring-[#d2d2d7] hover:ring-[#86868b]"
//                                       }`}
//                                     style={{ backgroundColor: model.swatch }}
//                                     title={model.label}
//                                   />
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>
//                 );
//               })}
//             </div>

//             {/* Drag hint */}
//             <p className="mt-6 text-[#c7c7cc] text-xs text-center tracking-wide">
//               Drag the model to explore freely
//             </p>
//           </div>

//           {/* Right: 3D Viewer */}
//           <div className="flex-1 relative w-full mt-20" style={{ minHeight: "70vh" }}>
//             <div className="relative w-full cursor-grab overflow-hidden rounded-[24px]" style={{ height: "70vh" }}>
              
//               {/* Beautiful Futuristic Phone Skeleton Loader Overlay */}
//               <AnimatePresence>
//                 {!modelLoaded && (
//                   <motion.div
//                     initial={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.6, ease: "easeInOut" }}
//                     className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#f5f5f7]/95 backdrop-blur-xl border border-white/40 shadow-inner rounded-[24px]"
//                   >
//                     {/* Futuristic Phone Skeleton */}
//                     <div className="relative flex flex-col items-center">
//                       {/* Phone outline SVG */}
//                       <svg width="100" height="200" viewBox="0 0 120 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
//                         <rect x="2" y="2" width="116" height="236" rx="20" stroke="url(#phone-glow)" strokeWidth="3" fill="rgba(255, 255, 255, 0.4)" />
//                         <rect x="6" y="6" width="108" height="228" rx="16" stroke="rgba(29, 29, 31, 0.08)" strokeWidth="1" />
//                         <circle cx="60" cy="16" r="3" fill="rgba(29, 29, 31, 0.15)" />
//                         <rect x="15" y="30" width="30" height="60" rx="8" stroke="rgba(29, 29, 31, 0.06)" strokeWidth="1.5" strokeDasharray="3 3" />
//                         <circle cx="30" cy="45" r="5" fill="rgba(29, 29, 31, 0.05)" />
//                         <circle cx="30" cy="70" r="5" fill="rgba(29, 29, 31, 0.05)" />
//                         <defs>
//                           <linearGradient id="phone-glow" x1="0" y1="0" x2="120" y2="240" gradientUnits="userSpaceOnUse">
//                             <stop offset="0%" stopColor="#1d1d1f" stopOpacity="0.1" />
//                             <stop offset="50%" stopColor="#1d1d1f" stopOpacity="0.5" />
//                             <stop offset="100%" stopColor="#1d1d1f" stopOpacity="0.1" />
//                           </linearGradient>
//                         </defs>
//                       </svg>
                      
//                       {/* Dynamic Status Text */}
//                       <div className="mt-8 flex flex-col items-center">
//                         <div className="w-48 h-1 bg-[#1d1d1f]/10 rounded-full overflow-hidden mb-3">
//                           <motion.div 
//                             className="h-full bg-[#1d1d1f]"
//                             initial={{ width: 0 }}
//                             animate={{ width: `${progress}%` }}
//                             transition={{ duration: 0.3 }}
//                           />
//                         </div>
//                         <span className="text-[#86868b] text-[10px] font-bold tracking-[0.2em] uppercase text-center mb-1">
//                           {progress < 30 ? "Initializing 3D Engine..." : 
//                            progress < 65 ? "Streaming Draco Meshes..." : 
//                            progress < 90 ? "Compiling Materials..." : "Polishing Shader Finishes..."}
//                         </span>
//                         <span className="text-[#1d1d1f] text-sm font-semibold tracking-wide">
//                           {Math.round(progress)}%
//                         </span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {isInView && (
//                 <Canvas
//                   camera={{ position: [0, 0, 5], fov: 35 }}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: "24px",
//                   }}
//                   gl={{
//                     antialias: true,
//                     toneMapping: THREE.ACESFilmicToneMapping,
//                     toneMappingExposure: 1.2,
//                     powerPreference: "high-performance",
//                   }}
//                   dpr={[1, 1.5]}
//                 >
//                   <SceneContent
//                     modelPath={currentModel.path}
//                     targetRotation={currentFeature.modelRotation}
//                   />
//                 </Canvas>
//               )}

//               {/* Floating color switcher (visible on non-Colours tabs) */}
//               {activeFeature !== 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-xl rounded-full px-4 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
//                 >
//                   {(
//                     Object.entries(MODELS) as [
//                       ModelKey,
//                       (typeof MODELS)[ModelKey]
//                     ][]
//                   ).map(([key, model]) => (
//                     <button
//                       key={key}
//                       onClick={() => setActiveColor(key)}
//                       className={`relative w-6 h-6 rounded-full transition-all duration-300 cursor-pointer ${activeColor === key
//                         ? "ring-2 ring-[#1d1d1f] ring-offset-2 scale-110"
//                         : "ring-1 ring-[#d2d2d7] hover:ring-[#86868b]"
//                         }`}
//                       style={{ backgroundColor: model.swatch }}
//                       title={model.label}
//                     />
//                   ))}
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ─── Preload all GLB models ────────────────────────────────────────
// Object.values(MODELS).forEach((model) => {
//   useGLTF.preload(model.path);
// });

"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect, useCallback, useMemo } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Environment, Lightformer, OrbitControls, useGLTF } from "@react-three/drei";

// ─── GLB Paths (URL-encoded for spaces) ────────────────────────────
const MODELS = {
  cinza: {
    path: "/Edge60_Fusion_Cinza_V2-v1.glb",
    label: "Cinza Grey",
    swatch: "#A8B0B8",
  },
  mocha: {
    path: "/Edge60_Fusion_Mocha_V2-v1.glb",
    label: "Mocha Brown",
    swatch: "#8B6F5E",
  },
  rosa: {
    path: "/Edge60_Fusion_Rosa_V4-v1.glb",
    label: "Rosa Pink",
    swatch: "#E8B4B8",
  },
} as const;

type ModelKey = keyof typeof MODELS;

// ─── Feature Definitions ───────────────────────────────────────────
const FEATURES = [
  {
    id: "colours",
    label: "Colours",
    description: "Available in three stunning finishes.",
    icon: "palette",
    modelRotation: [0, 0, 0] as [number, number, number],
  },
  {
    id: "camera",
    label: "50MP Camera System",
    description:
      "Advanced 50MP OIS camera with AI-enhanced night photography. Capture every detail in stunning clarity.",
    icon: "camera",
    modelRotation: [0, Math.PI, 0] as [number, number, number],
  },
  {
    id: "display",
    label: "Quad-Curve Display",
    description:
      "1.5K pOLED display with 120Hz refresh rate. Vivid colours flow edge to edge with quad-curved design.",
    icon: "display",
    modelRotation: [0, -0.35, 0] as [number, number, number],
  },
  {
    id: "frame",
    label: "Ultra Thin Frame",
    description:
      "Just 7.6mm thin with a precision-crafted aluminium frame. Feels impossibly light in your hand.",
    icon: "frame",
    modelRotation: [0, -Math.PI / 2, 0] as [number, number, number],
  },
  {
    id: "charging",
    label: "68W Hyper Charging",
    description:
      "68W TurboPower charging gets you from 0 to 50% in just 15 minutes. Full charge in under 50 minutes.",
    icon: "charging",
    modelRotation: [0.3, Math.PI, 0] as [number, number, number],
  },
  {
    id: "water",
    label: "IP68 Water Resistant",
    description:
      "IP68 dust and water resistance. Engineered to handle everyday splashes and spills with confidence.",
    icon: "water",
    modelRotation: [0.15, 0.5, -0.05] as [number, number, number],
  },
];

// ─── Icon Components ───────────────────────────────────────────────
function FeatureIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    palette: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="8" cy="9" r="1.5" fill="currentColor" />
        <circle cx="15" cy="8" r="1.5" fill="currentColor" />
        <circle cx="16" cy="13" r="1.5" fill="currentColor" />
        <circle cx="9" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
    camera: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    display: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    frame: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    charging: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    water: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  };
  return <>{icons[type] || null}</>;
}

// ─── 3D Phone Model ────────────────────────────────────────────────
function PhoneModel({
  modelPath,
  targetRotation,
}: {
  modelPath: string;
  targetRotation: [number, number, number];
}) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);

  // Auto-scale based on bounding box
  const { scale, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const s = maxDim > 0 ? 3 / maxDim : 1;

    return {
      scale: s,
      offset: [-center.x * s, -center.y * s, -center.z * s] as [number, number, number],
    };
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const speed = 2.5 * delta;
    groupRef.current.rotation.x += (targetRotation[0] - groupRef.current.rotation.x) * speed;
    groupRef.current.rotation.y += (targetRotation[1] - groupRef.current.rotation.y) * speed;
    groupRef.current.rotation.z += (targetRotation[2] - groupRef.current.rotation.z) * speed;
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={offset}>
      <primitive object={scene} />
    </group>
  );
}

// ─── Loading Indicator ─────────────────────────────────────────────
function ModelLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[#1d1d1f]/10 border-t-[#1d1d1f]/60 rounded-full animate-spin" />
        <span className="text-[#86868b] text-sm font-light tracking-widest uppercase">
          Loading Model
        </span>
      </div>
    </div>
  );
}

// ─── Scene Content (inside Canvas) ─────────────────────────────────
function SceneContent({
  modelPath,
  targetRotation,
}: {
  modelPath: string;
  targetRotation: [number, number, number];
}) {
  return (
    <>
      {/* Procedural Environment for Beautiful PBR Reflections without HDR downloads */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 5, 9]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-9, 1, 0]} scale={[10, 2, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[9, 1, 0]} scale={[10, 2, 1]} />
        </group>
      </Environment>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-3, 3, 3]} intensity={0.5} />

      {/* Shadow */}
      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={0.25}
        scale={6}
        blur={2}
        far={4}
      />

      {/* OrbitControls — drag to rotate */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={3}
        maxDistance={8}
        autoRotate={false}
        makeDefault
      />

      {/* Phone model */}
      <Suspense fallback={null}>
        <PhoneModel modelPath={modelPath} targetRotation={targetRotation} />
      </Suspense>
    </>
  );
}

// ─── Main Section Component ────────────────────────────────────────
export default function PhoneExplorerSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeColor, setActiveColor] = useState<ModelKey>("cinza");
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection observer — lazy-load the 3D canvas
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const currentFeature = FEATURES[activeFeature];
  const currentModel = MODELS[activeColor];

  // Dynamic colour description
  const getDescription = useCallback(
    (index: number) => {
      if (index === 0) {
        return `Available in three stunning finishes. Moto Edge 60 Fusion shown in ${currentModel.label}.`;
      }
      return FEATURES[index].description;
    },
    [currentModel]
  );

  const handleTabClick = (index: number) => {
    // Toggle: clicking the already-active tab collapses nothing (keep it open)
    setActiveFeature(index);
  };

  return (
    <section
      ref={sectionRef}
      id="explore-phone"
      className="relative bg-[#f5f5f7] overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[#86868b] text-lg font-medium mb-4"
        >
          Explore
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-semibold tracking-tight text-[#1d1d1f] max-w-3xl"
          style={{
            fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
          }}
        >
          Take a closer look.
        </motion.h2>
      </div>

      {/* Main Content — Accordion Tabs + 3D Viewer */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 items-start">
          {/* Left: Accordion Feature Tabs */}
          <div className="w-full lg:w-[380px] flex-shrink-0 lg:pt-8">
            <div className="flex flex-col gap-1.5">
              {FEATURES.map((feature, index) => {
                const isActive = activeFeature === index;

                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    viewport={{ once: true }}
                    className={`rounded-2xl transition-all duration-400 overflow-hidden ${isActive
                      ? "bg-white shadow-[0_2px_24px_rgba(0,0,0,0.06)]"
                      : "bg-transparent hover:bg-white/50"
                      }`}
                  >
                    {/* Tab Header */}
                    <button
                      onClick={() => handleTabClick(index)}
                      className="w-full flex items-center gap-3 px-5 py-3.5 text-left cursor-pointer group"
                    >
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isActive
                          ? "bg-[#1d1d1f] text-white"
                          : "bg-[#e8e8ed] text-[#86868b] group-hover:bg-[#d2d2d7]"
                          }`}
                      >
                        <FeatureIcon type={feature.icon} />
                      </span>
                      <span
                        className={`text-[15px] font-medium flex-1 transition-colors duration-300 ${isActive
                          ? "text-[#1d1d1f]"
                          : "text-[#6e6e73] group-hover:text-[#1d1d1f]"
                          }`}
                      >
                        {feature.label}
                      </span>
                      {/* Expand/Collapse indicator */}
                      {/* <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform duration-300 flex-shrink-0 ${isActive
                          ? "rotate-180 text-[#1d1d1f]"
                          : "rotate-0 text-[#c7c7cc]"
                          }`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg> */}
                    </button>

                    {/* Expanded Content */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                            opacity: { duration: 0.25, delay: 0.1 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-1">
                            <p className="text-[#6e6e73] text-[14px] leading-relaxed">
                              <span className="text-[#1d1d1f] font-semibold">
                                {feature.label}.
                              </span>{" "}
                              {getDescription(index)}
                            </p>

                            {/* Color Swatches (only for Colours tab) */}
                            {index === 0 && (
                              <div className="mt-4 flex items-center gap-3">
                                {(
                                  Object.entries(MODELS) as [
                                    ModelKey,
                                    (typeof MODELS)[ModelKey]
                                  ][]
                                ).map(([key, model]) => (
                                  <button
                                    key={key}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveColor(key);
                                    }}
                                    className={`relative w-7 h-7 rounded-full transition-all duration-300 cursor-pointer ${activeColor === key
                                      ? "ring-2 ring-[#1d1d1f] ring-offset-2"
                                      : "ring-1 ring-[#d2d2d7] hover:ring-[#86868b]"
                                      }`}
                                    style={{ backgroundColor: model.swatch }}
                                    title={model.label}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Drag hint */}
            <p className="mt-6 text-[#c7c7cc] text-xs text-center tracking-wide">
              Drag the model to explore freely
            </p>
          </div>

          {/* Right: 3D Viewer */}
          <div className="flex-1 relative w-full mt-20" style={{ minHeight: "70vh" }}>
            {isInView ? (
              <div className="relative w-full cursor-grab" style={{ height: "70vh" }}>
                <Canvas
                  camera={{ position: [0, 0, 5], fov: 35 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "24px",
                  }}
                  gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                    powerPreference: "high-performance",
                  }}
                  dpr={[1, 1.5]}
                >
                  <SceneContent
                    modelPath={currentModel.path}
                    targetRotation={currentFeature.modelRotation}
                  />
                </Canvas>

                {/* Floating color switcher (visible on non-Colours tabs) */}
                {activeFeature !== 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-xl rounded-full px-4 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
                  >
                    {(
                      Object.entries(MODELS) as [
                        ModelKey,
                        (typeof MODELS)[ModelKey]
                      ][]
                    ).map(([key, model]) => (
                      <button
                        key={key}
                        onClick={() => setActiveColor(key)}
                        className={`relative w-6 h-6 rounded-full transition-all duration-300 cursor-pointer ${activeColor === key
                          ? "ring-2 ring-[#1d1d1f] ring-offset-2 scale-110"
                          : "ring-1 ring-[#d2d2d7] hover:ring-[#86868b]"
                          }`}
                        style={{ backgroundColor: model.swatch }}
                        title={model.label}
                      />
                    ))}
                  </motion.div>
                )}
              </div>
            ) : (
              <ModelLoader />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Preload all GLB models ────────────────────────────────────────
Object.values(MODELS).forEach((model) => {
  useGLTF.preload(model.path);
});
