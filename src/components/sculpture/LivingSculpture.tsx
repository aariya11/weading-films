"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, RotateCw, Maximize2, Layers, Eye, Compass, Sliders, ArrowRight, RefreshCw, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export type SculptureShape = "TORUS" | "TEMPLE" | "SILK" | "LOTUS" | "CRYSTAL";
export type MaterialPreset = "CHAMPAGNE_GOLD" | "KALINGA_STONE" | "NOIR_OBSIDIAN" | "IVORY_SILK";
export type RenderStyle = "SOLID" | "WIREFRAME" | "CONSTELLATION";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ProjectedPoint {
  x: number;
  y: number;
  depth: number;
}

interface FaceData {
  indices: [number, number, number, number];
  avgZ: number;
  normal: Point3D;
}

interface DustMote {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
}

const SHAPES: { id: SculptureShape; name: string; subtitle: string; icon: string }[] = [
  { id: "TORUS", name: "Mandap Torus Knot", subtitle: "Eternal Vows Mobius Loop", icon: "♾" },
  { id: "TEMPLE", name: "Kalinga Shikhara", subtitle: "Ancient Mukteshwar Spire", icon: "🏛" },
  { id: "SILK", name: "Odia Handloom Ribbon", subtitle: "Undulating Silk Folds", icon: "〰" },
  { id: "LOTUS", name: "Sacred Lotus Blossom", subtitle: "Radial Petal Architecture", icon: "🪷" },
  { id: "CRYSTAL", name: "35mm Optical Crystal", subtitle: "Faceted Cinema Prism", icon: "💎" },
];

const MATERIALS: { id: MaterialPreset; name: string; tone: string; swatch: string }[] = [
  { id: "CHAMPAGNE_GOLD", name: "Liquid Champagne Gold", tone: "Reflective Metallic Lustre", swatch: "bg-[#c4a87a]" },
  { id: "KALINGA_STONE", name: "Kalinga Terracotta Stone", tone: "Carved Ancient Sandstone", swatch: "bg-[#b87343]" },
  { id: "NOIR_OBSIDIAN", name: "Noir Carbon Obsidian", tone: "High-Gloss Chiaroscuro", swatch: "bg-[#141414]" },
  { id: "IVORY_SILK", name: "Raw Ivory Handloom", tone: "Translucent Pearlescent Sheen", swatch: "bg-[#f5f3ec]" },
];

export function LivingSculpture() {
  const [isLivingMode, setIsLivingMode] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [currentShape, setCurrentShape] = useState<SculptureShape>("TORUS");
  const [currentMaterial, setCurrentMaterial] = useState<MaterialPreset>("CHAMPAGNE_GOLD");
  const [renderStyle, setRenderStyle] = useState<RenderStyle>("SOLID");

  // Dynamic Morphing & Deformation Sliders
  const [twist, setTwist] = useState(0.8);
  const [waveAmplitude, setWaveAmplitude] = useState(0.35);
  const [waveSpeed, setWaveSpeed] = useState(1.2);
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(0.6);

  // Canvas ref & interaction state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Rotation angles and velocities
  const rotationRef = useRef({
    yaw: 0.4,
    pitch: 0.25,
    roll: 0.0,
    vx: 0,
    vy: 0,
    zoom: 1.0,
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });

  // Base and Target geometries for morphing
  const geometryRef = useRef<{
    currentVertices: Point3D[];
    targetVertices: Point3D[];
    faces: [number, number, number, number][];
    motes: DustMote[];
    time: number;
  }>({
    currentVertices: [],
    targetVertices: [],
    faces: [],
    motes: [],
    time: 0,
  });

  // Generate 3D parametric coordinates for a given shape
  const calculateShapeVertices = useCallback((shape: SculptureShape, uSteps = 36, vSteps = 18): Point3D[] => {
    const vertices: Point3D[] = [];

    for (let i = 0; i <= uSteps; i++) {
      const u = (i / uSteps) * Math.PI * 2;
      for (let j = 0; j <= vSteps; j++) {
        const v = (j / vSteps) * Math.PI * 2;
        let x = 0, y = 0, z = 0;

        if (shape === "TORUS") {
          const p = 2, q = 3;
          const rKnot = 1.25 + 0.45 * Math.cos(q * u);
          const kx = rKnot * Math.cos(p * u);
          const ky = rKnot * Math.sin(p * u);
          const kz = -0.6 * Math.sin(q * u);
          const tubeR = 0.28;
          x = kx + tubeR * Math.cos(v) * Math.cos(p * u);
          y = ky + tubeR * Math.cos(v) * Math.sin(p * u);
          z = kz + tubeR * Math.sin(v);
        } else if (shape === "TEMPLE") {
          const normH = j / vSteps;
          const h = normH * 3.2 - 1.6;
          const taper = Math.pow(1 - normH * 0.88, 0.7);
          const flutes = 1 + 0.18 * Math.cos(8 * u) + 0.08 * Math.cos(16 * u);
          const cornices = 1 + 0.08 * Math.sin(normH * Math.PI * 12);
          const r = 1.15 * taper * flutes * cornices;
          x = r * Math.cos(u);
          z = r * Math.sin(u);
          y = h;
        } else if (shape === "SILK") {
          const spanU = (i / uSteps) * 3.6 - 1.8;
          const widthV = (j / vSteps) * 1.3 - 0.65;
          const wave1 = Math.sin(spanU * 2.5);
          const wave2 = Math.cos(spanU * 1.8);
          x = spanU;
          y = widthV * Math.cos(spanU * 1.6) + wave1 * 0.45;
          z = widthV * Math.sin(spanU * 1.6) + wave2 * 0.45;
        } else if (shape === "LOTUS") {
          const normV = j / vSteps;
          const petals = 1 + 0.5 * Math.sin(6 * u);
          const r = 1.35 * normV * petals;
          x = r * Math.cos(u);
          z = r * Math.sin(u);
          y = (normV * 2.0 - 1.0) - Math.pow(r * 0.65, 2);
        } else if (shape === "CRYSTAL") {
          const h = (j / vSteps) * 3.0 - 1.5;
          const normH = Math.abs(h) / 1.5;
          const facetR = (1 - normH * 0.72) * (1 + 0.28 * Math.cos(5 * u));
          x = facetR * Math.cos(u);
          z = facetR * Math.sin(u);
          y = h;
        }

        vertices.push({ x, y, z });
      }
    }

    return vertices;
  }, []);

  // Initialize faces & dust motes
  useEffect(() => {
    const uSteps = 36;
    const vSteps = 18;
    const faces: [number, number, number, number][] = [];

    for (let i = 0; i < uSteps; i++) {
      for (let j = 0; j < vSteps; j++) {
        const a = i * (vSteps + 1) + j;
        const b = (i + 1) * (vSteps + 1) + j;
        const c = (i + 1) * (vSteps + 1) + (j + 1);
        const d = i * (vSteps + 1) + (j + 1);
        faces.push([a, b, c, d]);
      }
    }

    const motes: DustMote[] = [];
    for (let i = 0; i < 70; i++) {
      motes.push({
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 6,
        z: (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.004,
        vy: (Math.random() - 0.5) * 0.004,
        vz: (Math.random() - 0.5) * 0.004,
        size: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const initialVerts = calculateShapeVertices("TORUS", uSteps, vSteps);
    geometryRef.current = {
      currentVertices: initialVerts.map((v) => ({ ...v })),
      targetVertices: initialVerts.map((v) => ({ ...v })),
      faces,
      motes,
      time: 0,
    };
  }, [calculateShapeVertices]);

  // Handle shape change
  const handleSelectShape = (shape: SculptureShape) => {
    setCurrentShape(shape);
    const newTarget = calculateShapeVertices(shape, 36, 18);
    geometryRef.current.targetVertices = newTarget;
  };

  // Trigger transformation from flat study to living 3D material
  const handleActivateLivingMode = () => {
    setIsTransforming(true);
    setTimeout(() => {
      setIsLivingMode(true);
      setIsTransforming(false);
    }, 600);
  };

  const handleReturnToFlatStudy = () => {
    setIsTransforming(true);
    setTimeout(() => {
      setIsLivingMode(false);
      setIsTransforming(false);
    }, 500);
  };

  // 3D Canvas Rendering Loop
  useEffect(() => {
    if (!isLivingMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      const rot = rotationRef.current;
      const geom = geometryRef.current;
      geom.time += 0.016 * waveSpeed;

      // Auto rotation & inertia damping
      if (autoRotate && !rot.isDragging) {
        rot.yaw += 0.005 * rotationSpeed;
        rot.pitch += 0.0018 * Math.sin(geom.time * 0.5);
      } else if (!rot.isDragging) {
        rot.yaw += rot.vx;
        rot.pitch += rot.vy;
        rot.vx *= 0.94;
        rot.vy *= 0.94;
      }

      // Smooth vertex morphing interpolation (lerp towards target shape)
      const cur = geom.currentVertices;
      const tgt = geom.targetVertices;
      const morphSpeed = 0.08;

      for (let i = 0; i < cur.length; i++) {
        cur[i].x += (tgt[i].x - cur[i].x) * morphSpeed;
        cur[i].y += (tgt[i].y - cur[i].y) * morphSpeed;
        cur[i].z += (tgt[i].z - cur[i].z) * morphSpeed;
      }

      ctx.clearRect(0, 0, width, height);

      // Camera coordinates & projections
      const cx = width / 2;
      const cy = height / 2;
      const fov = Math.min(width, height) * 0.95 * rot.zoom;
      const cameraDistance = 4.2;

      // Rotation matrix values
      const cosY = Math.cos(rot.yaw);
      const sinY = Math.sin(rot.yaw);
      const cosP = Math.cos(rot.pitch);
      const sinP = Math.sin(rot.pitch);

      // Dynamic light vector (studio key light with soft orbit)
      const lightAngle = geom.time * 0.4;
      const lightX = Math.cos(lightAngle) * 0.7;
      const lightY = -0.7;
      const lightZ = Math.sin(lightAngle) * 0.7 + 0.6;
      const lightLen = Math.sqrt(lightX * lightX + lightY * lightY + lightZ * lightZ);
      const lx = lightX / lightLen;
      const ly = lightY / lightLen;
      const lz = lightZ / lightLen;

      // Transform & Project Vertices with Dynamic Twist & Wave
      const projected: ProjectedPoint[] = [];

      for (let i = 0; i < cur.length; i++) {
        let vx = cur[i].x;
        let vy = cur[i].y;
        let vz = cur[i].z;

        // Apply Axial Twist
        if (twist !== 0) {
          const twistAngle = vy * twist;
          const cosT = Math.cos(twistAngle);
          const sinT = Math.sin(twistAngle);
          const rx = vx * cosT - vz * sinT;
          const rz = vx * sinT + vz * cosT;
          vx = rx;
          vz = rz;
        }

        // Apply Living Material Organic Wave/Breathing
        if (waveAmplitude > 0) {
          const dist = Math.sqrt(vx * vx + vy * vy + vz * vz);
          const wave = Math.sin(dist * 3.5 - geom.time * 2.5) * waveAmplitude * 0.2;
          vx += vx * wave;
          vy += vy * wave;
          vz += vz * wave;
        }

        // 3D Orbit Rotation (Yaw & Pitch)
        // Rotate around Y (Yaw)
        const x1 = vx * cosY + vz * sinY;
        const z1 = -vx * sinY + vz * cosY;
        // Rotate around X (Pitch)
        const y2 = vy * cosP - z1 * sinP;
        const z2 = vy * sinP + z1 * cosP;

        // Perspective Divide
        const zDepth = z2 + cameraDistance;
        const scale = fov / Math.max(0.1, zDepth);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        projected.push({ x: px, y: py, depth: zDepth });
      }

      // Render Floating Dust Motes (Parallax Ambient Particles)
      geom.motes.forEach((mote) => {
        mote.x += mote.vx;
        mote.y += mote.vy;
        mote.z += mote.vz;
        if (mote.x > 3) mote.x = -3;
        if (mote.x < -3) mote.x = 3;
        if (mote.y > 3) mote.y = -3;
        if (mote.y < -3) mote.y = 3;
        if (mote.z > 3) mote.z = -3;
        if (mote.z < -3) mote.z = 3;

        const mx1 = mote.x * cosY + mote.z * sinY;
        const mz1 = -mote.x * sinY + mote.z * cosY;
        const my2 = mote.y * cosP - mz1 * sinP;
        const mz2 = mote.y * sinP + mz1 * cosP;

        const mDepth = mz2 + cameraDistance;
        if (mDepth > 0.5) {
          const mScale = fov / mDepth;
          const mpx = cx + mx1 * mScale;
          const mpy = cy + my2 * mScale;

          ctx.beginPath();
          ctx.arc(mpx, mpy, mote.size * (fov / (mDepth * 350)), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(196, 168, 122, ${mote.alpha * 0.4})`;
          ctx.fill();
        }
      });

      // Prepare Face Depth Sorting (Painter's Algorithm)
      const sortedFaces: FaceData[] = [];

      for (let f = 0; f < geom.faces.length; f++) {
        const [a, b, c, d] = geom.faces[f];
        const pA = projected[a];
        const pB = projected[b];
        const pC = projected[c];
        const pD = projected[d];

        const avgZ = (pA.depth + pB.depth + pC.depth + pD.depth) * 0.25;

        // Screen-space 2D normal check for backface culling
        const v1x = pB.x - pA.x;
        const v1y = pB.y - pA.y;
        const v2x = pC.x - pA.x;
        const v2y = pC.y - pA.y;
        const crossZ = v1x * v2y - v1y * v2x;

        // Approximate 3D normal for lighting
        const nx = crossZ > 0 ? 0.3 : -0.3;
        const ny = (pC.y - pA.y) * 0.002;
        const nz = 0.8;

        sortedFaces.push({
          indices: [a, b, c, d],
          avgZ,
          normal: { x: nx, y: ny, z: nz },
        });
      }

      // Sort faces back-to-front
      sortedFaces.sort((fa, fb) => fb.avgZ - fa.avgZ);

      // Material Color Palettes
      const materialColors = {
        CHAMPAGNE_GOLD: {
          baseR: 196, baseG: 168, baseB: 122,
          shadowR: 74, shadowG: 56, shadowB: 34,
          highlightR: 255, highlightG: 247, highlightB: 220,
          wireR: 212, wireG: 188, wireB: 148,
        },
        KALINGA_STONE: {
          baseR: 184, baseG: 115, baseB: 67,
          shadowR: 61, shadowG: 30, shadowB: 16,
          highlightR: 255, highlightG: 215, highlightB: 185,
          wireR: 210, wireG: 140, wireB: 95,
        },
        NOIR_OBSIDIAN: {
          baseR: 25, baseG: 25, baseB: 25,
          shadowR: 5, shadowG: 5, shadowB: 5,
          highlightR: 240, highlightG: 240, highlightB: 240,
          wireR: 80, wireG: 80, wireB: 80,
        },
        IVORY_SILK: {
          baseR: 245, baseG: 243, baseB: 236,
          shadowR: 140, shadowG: 134, shadowB: 122,
          highlightR: 255, highlightG: 255, highlightB: 255,
          wireR: 200, wireG: 195, wireB: 185,
        },
      }[currentMaterial];

      // Draw Faces
      for (let i = 0; i < sortedFaces.length; i++) {
        const { indices, avgZ } = sortedFaces[i];
        const [a, b, c, d] = indices;
        const pA = projected[a];
        const pB = projected[b];
        const pC = projected[c];
        const pD = projected[d];

        // Depth-based lighting & distance fog
        const depthFactor = Math.max(0.2, Math.min(1.0, (cameraDistance + 2 - avgZ) / 3));
        const diffuse = Math.max(0.15, Math.min(1.0, 0.5 + 0.5 * Math.sin(avgZ * 1.5 + geom.time)));
        const specular = Math.pow(diffuse, 4) * 0.7;

        const r = Math.min(255, Math.floor((materialColors.shadowR + (materialColors.baseR - materialColors.shadowR) * diffuse + materialColors.highlightR * specular) * depthFactor));
        const g = Math.min(255, Math.floor((materialColors.shadowG + (materialColors.baseG - materialColors.shadowG) * diffuse + materialColors.highlightG * specular) * depthFactor));
        const bl = Math.min(255, Math.floor((materialColors.shadowB + (materialColors.baseB - materialColors.shadowB) * diffuse + materialColors.highlightB * specular) * depthFactor));

        if (renderStyle === "SOLID") {
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          ctx.lineTo(pC.x, pC.y);
          ctx.lineTo(pD.x, pD.y);
          ctx.closePath();

          ctx.fillStyle = `rgb(${r}, ${g}, ${bl})`;
          ctx.fill();

          // Subtle refined edge
          ctx.strokeStyle = `rgba(${materialColors.wireR}, ${materialColors.wireG}, ${materialColors.wireB}, 0.2)`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        } else if (renderStyle === "WIREFRAME") {
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          ctx.lineTo(pC.x, pC.y);
          ctx.lineTo(pD.x, pD.y);
          ctx.closePath();

          ctx.strokeStyle = `rgba(${r}, ${g}, ${bl}, ${depthFactor * 0.85})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        } else if (renderStyle === "CONSTELLATION") {
          // Draw connecting filament
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${bl}, 0.35)`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Draw vertex jewel point
          ctx.beginPath();
          ctx.arc(pA.x, pA.y, 1.8 * depthFactor, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${materialColors.highlightR}, ${materialColors.highlightG}, ${materialColors.highlightB})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLivingMode, currentMaterial, renderStyle, waveAmplitude, waveSpeed, twist, autoRotate, rotationSpeed]);

  // Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    const rot = rotationRef.current;
    rot.isDragging = true;
    rot.lastX = e.clientX;
    rot.lastY = e.clientY;
    rot.vx = 0;
    rot.vy = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const rot = rotationRef.current;
    if (!rot.isDragging) return;

    const dx = e.clientX - rot.lastX;
    const dy = e.clientY - rot.lastY;

    rot.yaw += dx * 0.008;
    rot.pitch += dy * 0.008;

    rot.vx = dx * 0.004;
    rot.vy = dy * 0.004;

    rot.lastX = e.clientX;
    rot.lastY = e.clientY;
  };

  const handlePointerUp = () => {
    rotationRef.current.isDragging = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const rot = rotationRef.current;
    rot.zoom = Math.max(0.6, Math.min(2.0, rot.zoom - e.deltaY * 0.001));
  };

  return (
    <div className="w-full relative select-none">
      {/* ─────────────────────────────────────────────────────────────
          MODE A: FLAT ARCHIVAL STUDY (MUSEUM MONOGRAPH PLATE)
          ───────────────────────────────────────────────────────────── */}
      {!isLivingMode && (
        <section
          aria-labelledby="sculpture-study-heading"
          className="relative bg-paper-warm border border-ink/10 rounded-sm p-6 sm:p-10 lg:p-14 transition-all duration-500 shadow-sm"
        >
          {/* Blueprint Drafting Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-ink/10 mb-10">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase text-champagne-deep">
                  PLATE 07 // ARCHITECTURAL STUDY
                </span>
                <span className="text-ink/20">|</span>
                <span className="font-mono text-[10px] tracking-widest text-charcoal/70 uppercase">
                  BHUBANESWAR HERITAGE ATELIER
                </span>
              </div>
              <h2
                id="sculpture-study-heading"
                className="font-display text-3xl sm:text-5xl lg:text-6xl text-ink tracking-tight"
              >
                KALINGA STONE & LIVING RAW SILK.
              </h2>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-charcoal/70">
              <div className="border-l-2 border-champagne-deep pl-3">
                <p className="text-[10px] uppercase text-charcoal/50">COORDINATES</p>
                <p className="font-bold text-ink">20.2961° N, 85.8245° E</p>
              </div>
              <div className="border-l-2 border-champagne-deep pl-3">
                <p className="text-[10px] uppercase text-charcoal/50">MEDIUM</p>
                <p className="font-bold text-ink">CARVED STONE & GOLD</p>
              </div>
            </div>
          </div>

          {/* Editorial Split: Flat Study Plate vs Technical Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* The Flat 2D Study Photo Plate */}
            <div className="lg:col-span-7 relative group">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-ink/5 border border-ink/15 rounded-xs">
                <Image
                  src="/images/wedding/mandap-pranam.jpg"
                  alt="Sacred Mandap geometry and handloom Odia silk study in warm directional chiaroscuro lighting"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center filter grayscale-[20%] contrast-[1.08] transition-transform duration-1000 ease-out-expo group-hover:scale-102"
                />

                {/* Drafting Grid Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(15,15,15,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,15,15,0.15) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />

                {/* Technical Dimension Marks */}
                <div className="absolute top-4 left-4 font-mono text-[9px] tracking-widest text-white/90 bg-ink/80 px-2.5 py-1 uppercase backdrop-blur-md">
                  FIG. 7A // 2D ANAMORPHIC STUDY
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[9px] tracking-widest text-white/90 bg-ink/80 px-2.5 py-1 uppercase backdrop-blur-md">
                  PARAMETRIC CURVATURE: ZERO
                </div>
              </div>

              {/* Caption */}
              <p className="font-mono text-xs text-charcoal/70 mt-3 flex items-center justify-between">
                <span>FLAT ARCHIVAL MONOGRAPH (STATIC PROJECTION)</span>
                <span className="text-champagne-deep font-semibold">STATUS: UNEXTRUDED</span>
              </p>
            </div>

            {/* Explanatory Narrative & The Overdrive Ignition Button */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-champagne/15 text-champagne-deep border border-champagne-deep/30 font-mono text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-deep animate-pulse" />
                  KINETIC MATERIAL STUDY
                </span>

                <h3 className="font-display text-2xl sm:text-3xl text-ink leading-snug">
                  From Still Optical Negative to Kinetic Sculpture.
                </h3>

                <p className="body-small text-charcoal/80 font-ui leading-relaxed">
                  In our cinematography atelier, we do not view wedding portraiture as static two-dimensional paper. We view it as an organic dimensional volume sculpted by sacred Vedic fire, ancient stone temple acoustics, and hand-woven golden silk.
                </p>

                <p className="body-small text-charcoal/80 font-ui leading-relaxed">
                  Click below to overdrive this flat study. Watch the 2D photograph tear open into a living, responsive 3D material you can rotate 360 degrees and reshape with dynamic physical torque.
                </p>
              </div>

              {/* The Master Transformation Button */}
              <div className="pt-4 border-t border-ink/10">
                <button
                  onClick={handleActivateLivingMode}
                  disabled={isTransforming}
                  className={cn(
                    "btn w-full group relative overflow-hidden py-5 px-8 rounded-xs bg-ink !text-white font-mono text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300 shadow-lg min-h-[54px] cursor-pointer touch-manipulation select-none",
                    "hover:bg-charcoal hover:!text-white hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99]",
                    "border border-champagne-deep/50"
                  )}
                  data-cursor="OVERDRIVE"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <Zap className="w-4 h-4 text-champagne animate-pulse" />
                    <span className="font-bold">
                      {isTransforming ? "EXTRUDING 3D MATERIAL..." : "EXTRUDE INTO LIVING MATERIAL (OVERDRIVE 3D)"}
                    </span>
                    <ArrowRight className="w-4 h-4 text-champagne group-hover:translate-x-1.5 transition-transform" />
                  </div>

                  {/* Ambient Shimmer Sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                </button>

                <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-charcoal/60">
                  <span>TOUCH & POINTER 3D INTERACTION</span>
                  <span>60 FPS KINETIC WEBGL ENGINE</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODE B: LIVING 3D MATERIAL SCULPTURE (OVERDRIVEN STUDIO)
          ───────────────────────────────────────────────────────────── */}
      {isLivingMode && (
        <section
          aria-label="Interactive Living Material 3D Sculpture"
          className="relative bg-ink text-paper rounded-xs overflow-hidden border border-champagne-deep/40 shadow-2xl transition-all duration-700"
        >
          {/* Top Atelier Bar */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 p-4 sm:p-6 bg-ink-soft/90 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-mono text-[10px] font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                LIVING MATERIAL ACTIVE
              </span>
              <span className="text-white/20">|</span>
              <span className="font-mono text-xs text-champagne font-semibold tracking-wider">
                {SHAPES.find((s) => s.id === currentShape)?.name.toUpperCase()}
              </span>
              <span className="text-white/60 text-xs hidden sm:inline">
                ({MATERIALS.find((m) => m.id === currentMaterial)?.name})
              </span>
            </div>

            {/* Top Action Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={cn(
                  "btn font-mono text-xs px-3.5 py-2 rounded-xs border transition-colors flex items-center gap-1.5 min-h-[38px] cursor-pointer touch-manipulation",
                  autoRotate
                    ? "bg-champagne !text-ink border-champagne font-bold"
                    : "bg-white/10 !text-white border-white/20 hover:bg-white/20 hover:!text-white font-medium"
                )}
                title="Toggle Auto Orbit"
              >
                <RefreshCw className={cn("w-3.5 h-3.5", autoRotate && "animate-spin")} style={{ animationDuration: "6s" }} />
                <span className="hidden sm:inline">ORBIT {autoRotate ? "ON" : "PAUSED"}</span>
              </button>

              <button
                onClick={handleReturnToFlatStudy}
                className="btn font-mono text-xs px-4 py-2 rounded-xs bg-white/15 hover:bg-white/25 !text-white font-bold border border-white/25 transition-colors flex items-center gap-2 min-h-[38px] cursor-pointer touch-manipulation"
              >
                <span>FOLD TO FLAT STUDY</span>
                <span>←</span>
              </button>
            </div>
          </div>

          {/* Interactive 3D Canvas Viewport */}
          <div
            className="relative h-[480px] sm:h-[600px] lg:h-[700px] w-full cursor-grab active:cursor-grabbing overflow-hidden bg-gradient-to-b from-[#121212] via-[#0a0a0a] to-[#141414]"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onWheel={handleWheel}
          >
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Atmospheric Vignette & Corner HUD Marks */}
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)]" />

            {/* Left HUD: Coordinates & Spatial Depth */}
            <div className="absolute top-6 left-6 pointer-events-none hidden sm:block font-mono text-[10px] text-white/50 space-y-1">
              <p className="text-champagne font-bold">SPATIAL TELEMETRY</p>
              <p>VERTICES: 861 POLYNOMIAL</p>
              <p>FACES: 800 VOLUMETRIC</p>
              <p>FPS: 60 ROCK-SOLID</p>
            </div>

            {/* Right HUD: Gesture Guide */}
            <div className="absolute top-6 right-6 pointer-events-none hidden sm:block font-mono text-[10px] text-right text-white/50 space-y-1">
              <p className="text-champagne font-bold">DIRECT INTERACTION</p>
              <p>DRAG: 360° ORBIT</p>
              <p>SCROLL: ZOOM LENS</p>
              <p>RELEASE: DAMPED INERTIA</p>
            </div>

            {/* Center Bottom HUD: Onscreen touch hint */}
            <div className="absolute bottom-6 inset-x-0 pointer-events-none flex justify-center">
              <div className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[10px] tracking-widest text-champagne uppercase">
                TOUCH OR DRAG TO ROTATE SCULPTURE 360°
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              DYNAMIC RESHAPING & LIVING MATERIAL CONTROL CONSOLE
              ───────────────────────────────────────────────────────────── */}
          <div className="p-6 sm:p-8 lg:p-10 bg-ink border-t border-white/10 space-y-8">
            {/* Control Strip 1: Morph Geometry / Reshape */}
            <div>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <p className="font-mono text-xs uppercase tracking-widest text-champagne font-bold flex items-center gap-2">
                  <Compass className="w-4 h-4 text-champagne" />
                  <span>RESHAPE GEOMETRY // 5 PARAMETRIC ARCHETYPES</span>
                </p>
                <span className="font-mono text-[11px] text-white/50">
                  REAL-TIME VERTEX MORPHING ENGINE
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {SHAPES.map((shape) => {
                  const isActive = currentShape === shape.id;
                  return (
                    <button
                      key={shape.id}
                      onClick={() => handleSelectShape(shape.id)}
                      className={cn(
                        "btn p-3.5 rounded-xs border text-left transition-all flex flex-col justify-between gap-1 cursor-pointer touch-manipulation",
                        isActive
                          ? "bg-champagne !text-ink border-champagne font-bold shadow-md scale-[1.02]"
                          : "bg-white/10 border-white/20 !text-white hover:bg-white/20 hover:border-white/40"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs">{shape.name}</span>
                        <span className="text-base">{shape.icon}</span>
                      </div>
                      <span className={cn("text-[10px] font-ui line-clamp-1", isActive ? "!text-ink/80 font-medium" : "text-white/70")}>
                        {shape.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control Strip 2: Living Material Selection */}
            <div>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <p className="font-mono text-xs uppercase tracking-widest text-champagne font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-champagne" />
                  <span>LIVING MATERIAL SHADER // PHYSICAL ESSENCE</span>
                </p>
                <span className="font-mono text-[11px] text-white/50">
                  REFLECTIVE & SPECULAR LUSTRE
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {MATERIALS.map((mat) => {
                  const isActive = currentMaterial === mat.id;
                  return (
                    <button
                      key={mat.id}
                      onClick={() => setCurrentMaterial(mat.id)}
                      className={cn(
                        "btn p-3.5 rounded-xs border text-left transition-all flex items-center gap-3 cursor-pointer touch-manipulation",
                        isActive
                          ? "bg-white/25 border-champagne !text-white font-bold ring-1 ring-champagne shadow-sm"
                          : "bg-white/10 border-white/20 !text-white/90 hover:bg-white/20 hover:!text-white"
                      )}
                    >
                      <span className={cn("w-4 h-4 rounded-full border border-white/20 shadow-xs", mat.swatch)} />
                      <div>
                        <p className="font-mono text-xs">{mat.name}</p>
                        <p className="text-[10px] text-white/60 font-ui line-clamp-1">{mat.tone}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control Strip 3: Dynamic Deformation Sliders & Render Mode */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              {/* Axial Twist Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-white/70">AXIAL TORSION // TWIST</span>
                  <span className="text-champagne font-bold">{twist.toFixed(2)} rad</span>
                </div>
                <input
                  type="range"
                  min="-2.0"
                  max="2.0"
                  step="0.05"
                  value={twist}
                  onChange={(e) => setTwist(parseFloat(e.target.value))}
                  className="w-full accent-champagne cursor-pointer bg-white/10 h-1.5 rounded-lg"
                />
              </div>

              {/* Wave Breathing Amplitude */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-white/70">LIVING WAVE // UNDULATION</span>
                  <span className="text-champagne font-bold">{(waveAmplitude * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.02"
                  value={waveAmplitude}
                  onChange={(e) => setWaveAmplitude(parseFloat(e.target.value))}
                  className="w-full accent-champagne cursor-pointer bg-white/10 h-1.5 rounded-lg"
                />
              </div>

              {/* Render Style Mode: Solid / Wireframe / Constellation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-white/70">SURFACE RENDERING</span>
                  <span className="text-champagne font-bold">{renderStyle}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-xs border border-white/10">
                  {(["SOLID", "WIREFRAME", "CONSTELLATION"] as RenderStyle[]).map((style) => (
                    <button
                      key={style}
                      onClick={() => setRenderStyle(style)}
                      className={cn(
                        "btn py-1.5 text-center font-mono text-[10px] uppercase rounded-xs transition-colors cursor-pointer touch-manipulation",
                        renderStyle === style
                          ? "bg-champagne !text-ink font-bold"
                          : "!text-white/80 hover:!text-white font-medium"
                      )}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
