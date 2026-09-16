"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useViewport } from "@/hooks/useViewport";
import { cn } from "@/lib/utils";

interface ScrollExpandMediaProps {
  backgroundMedia: {
    src: string;
    alt: string;
    poster?: string;
    type: "image" | "video";
  };
  foregroundMedia: {
    src: string;
    alt: string;
    poster?: string;
    type: "image" | "video";
  };
  title: string;
  subtitle?: string;
  scrollIndicator?: string;
  children?: React.ReactNode;
  className?: string;
  onExpandComplete?: () => void;
}

export function ScrollExpandMedia({
  backgroundMedia,
  foregroundMedia,
  title,
  subtitle,
  scrollIndicator = "SCROLL TO ENTER ↓",
  children,
  className,
  onExpandComplete,
}: ScrollExpandMediaProps) {
  const prefersReducedMotion = useReducedMotion();
  const { isMobile, isTablet } = useViewport();
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const titleLeftRef = useRef<HTMLSpanElement>(null);
  const titleCenterRef = useRef<HTMLSpanElement>(null);
  const titleRightRef = useRef<HTMLSpanElement>(null);
  const metaTopRef = useRef<HTMLParagraphElement>(null);
  const metaBottomRef = useRef<HTMLParagraphElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const contentTeaserRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const progressRef = useRef(0);
  const rafId = useRef<number | null>(null);
  const hasTriggeredComplete = useRef(false);

  // Smooth easing function (cubic-bezier like easeOutExpo)
  const easeProgress = (t: number) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  };

  const updateVisuals = useCallback(
    (rawProgress: number) => {
      const p = Math.max(0, Math.min(1, rawProgress));
      progressRef.current = p;

      if (prefersReducedMotion) {
        if (backgroundRef.current) backgroundRef.current.style.opacity = "0";
        if (foregroundRef.current) {
          foregroundRef.current.style.transform = "translate3d(-50%, -50%, 0) scale(1)";
        }
        if (indicatorRef.current) indicatorRef.current.style.opacity = "0";
        if (contentTeaserRef.current) {
          contentTeaserRef.current.style.opacity = "1";
          contentTeaserRef.current.style.transform = "translate3d(-50%, 0, 0)";
        }
        return;
      }

      const eased = easeProgress(p);

      // 1. Background fades away from 1 to 0 on compositor layer
      if (backgroundRef.current) {
        const bgOpacity = Math.max(0, 1 - p * 1.3);
        backgroundRef.current.style.opacity = bgOpacity.toFixed(3);
        backgroundRef.current.style.transform = `scale(${(1 + p * 0.08).toFixed(4)}) translateZ(0)`;
      }

      // 2. Overlay adjusts
      if (overlayRef.current) {
        overlayRef.current.style.opacity = (0.55 - p * 0.35).toFixed(3);
      }

      // 3. Central media expansion via pure GPU transform (Zero Layout Reflow)
      if (foregroundRef.current) {
        const isSmallScreen = window.innerWidth < 768;
        // On mobile base is 76vw, expands to 94vw -> target scale ~ 1.24
        // On desktop base is 38vw, expands to 88vw -> target scale ~ 2.30
        const maxScale = isSmallScreen ? 1.24 : 2.25;
        const currentScale = 1 + (maxScale - 1) * eased;

        foregroundRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${currentScale.toFixed(4)})`;
      }

      // 4. Typography horizontal separation via translate3d
      const isSmallScreen = window.innerWidth < 768;
      const moveDistance = (isSmallScreen ? 16 : 32) * eased;

      if (titleLeftRef.current) {
        titleLeftRef.current.style.transform = `translate3d(-${moveDistance.toFixed(1)}vw, 0, 0)`;
        titleLeftRef.current.style.opacity = (1 - p * 1.15).toFixed(3);
      }
      if (titleRightRef.current) {
        titleRightRef.current.style.transform = `translate3d(${moveDistance.toFixed(1)}vw, 0, 0)`;
        titleRightRef.current.style.opacity = (1 - p * 1.15).toFixed(3);
      }
      if (titleCenterRef.current) {
        titleCenterRef.current.style.transform = `translate3d(${(moveDistance * 0.4).toFixed(1)}vw, 0, 0)`;
        titleCenterRef.current.style.opacity = (1 - p * 1.25).toFixed(3);
      }

      // 5. Metadata subtle counter-motion
      const metaDrift = (isSmallScreen ? 8 : 14) * eased;
      if (metaTopRef.current) {
        metaTopRef.current.style.transform = `translate3d(0, -${metaDrift.toFixed(1)}px, 0)`;
        metaTopRef.current.style.opacity = (1 - p * 1.4).toFixed(3);
      }
      if (metaBottomRef.current) {
        metaBottomRef.current.style.transform = `translate3d(0, ${metaDrift.toFixed(1)}px, 0)`;
        metaBottomRef.current.style.opacity = (1 - p * 1.4).toFixed(3);
      }

      // 6. Scroll indicator fades early
      if (indicatorRef.current) {
        const indOpacity = Math.max(0, 1 - p * 2.8);
        indicatorRef.current.style.opacity = indOpacity.toFixed(3);
        indicatorRef.current.style.transform = `translate3d(-50%, ${(p * 25).toFixed(1)}px, 0)`;
      }

      // 7. At ~70% progress, supporting content begins appearing
      if (contentTeaserRef.current) {
        if (p >= 0.7) {
          const contentProg = Math.min(1, (p - 0.7) / 0.3);
          contentTeaserRef.current.style.opacity = contentProg.toFixed(3);
          contentTeaserRef.current.style.transform = `translate3d(-50%, ${((1 - contentProg) * 20).toFixed(1)}px, 0)`;
        } else {
          contentTeaserRef.current.style.opacity = "0";
          contentTeaserRef.current.style.transform = "translate3d(-50%, 20px, 0)";
        }
      }

      // 8. Completion callback
      if (p >= 0.98 && !hasTriggeredComplete.current) {
        hasTriggeredComplete.current = true;
        onExpandComplete?.();
      } else if (p < 0.95 && hasTriggeredComplete.current) {
        hasTriggeredComplete.current = false;
      }
    },
    [prefersReducedMotion, onExpandComplete]
  );

  useEffect(() => {
    let ticking = false;
    let lastProgress = -1;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId.current = requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            // 1. Offscreen culling: if fully scrolled past, lock to 1 once and stop mutating DOM
            if (rect.bottom < -50) {
              if (lastProgress !== 1) {
                lastProgress = 1;
                updateVisuals(1);
              }
            } else if (rect.top > window.innerHeight + 50) {
              // If hero is below viewport, lock to 0 once and stop mutating DOM
              if (lastProgress !== 0) {
                lastProgress = 0;
                updateVisuals(0);
              }
            } else {
              const scrollableDistance = rect.height - window.innerHeight;
              if (scrollableDistance > 0) {
                const rawProgress = -rect.top / scrollableDistance;
                const clamped = Math.max(0, Math.min(1, rawProgress));
                // Only update DOM if progress has changed significantly or reached boundaries
                if (Math.abs(clamped - lastProgress) > 0.002 || clamped === 0 || clamped === 1) {
                  lastProgress = clamped;
                  updateVisuals(clamped);
                }
              }
            }
          }
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [updateVisuals]);

  // Split title intelligently into words: "IMAGES", "THAT", "STAY."
  const words = title.split(" ").filter(Boolean);
  const wordLeft = words[0] || "IMAGES";
  const wordCenter = words.length > 2 ? words.slice(1, -1).join(" ") : "";
  const wordRight = words.length > 1 ? words[words.length - 1] : "";

  return (
    <section
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{
        height: prefersReducedMotion ? "100vh" : isMobile ? "165vh" : "240vh",
      }}
      aria-label="Hero cinematic presentation"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-ink select-none"
      >
        {/* Full-screen background */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 z-0 will-change-transform will-change-opacity gpu-accelerated pointer-events-none"
          aria-hidden="true"
        >
          {backgroundMedia.type === "video" ? (
            <video
              src={backgroundMedia.src}
              poster={backgroundMedia.poster}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={backgroundMedia.src}
              alt={backgroundMedia.alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          )}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-ink/50 transition-opacity duration-300"
          />
        </div>

        {/* Central expanding foreground media window */}
        <div
          ref={foregroundRef}
          className={cn(
            "absolute z-10 top-1/2 left-1/2 will-change-transform gpu-accelerated",
            "shadow-[0_25px_80px_rgba(0,0,0,0.65)]",
            "overflow-hidden border border-white/10"
          )}
          style={{
            width: prefersReducedMotion ? "94vw" : isMobile ? "76vw" : "38vw",
            height: prefersReducedMotion ? "88vh" : isMobile ? "48vh" : "54vh",
            transform: "translate(-50%, -50%)",
            transition: prefersReducedMotion ? "none" : undefined,
          }}
          data-cursor="VIEW"
        >
          {foregroundMedia.type === "video" ? (
            <video
              src={foregroundMedia.src}
              poster={foregroundMedia.poster}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={foregroundMedia.src}
              alt={foregroundMedia.alt}
              fill
              priority
              className="object-cover transition-transform duration-1000 ease-out-expo"
              sizes="(max-width: 768px) 94vw, 88vw"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

          {/* Frame badge inside foreground */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/80 font-mono">
              01 // STUDIO FRAME
            </span>
          </div>
        </div>

        {/* Cinematic split typography */}
        <div
          className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center text-center px-4"
          aria-hidden={prefersReducedMotion}
        >
          <p
            ref={metaTopRef}
            className="label label-accent mb-3 sm:mb-6 tracking-[0.3em] text-[10px] sm:text-xs text-champagne uppercase font-medium"
          >
            BHUBANESWAR, ODISHA — WEDDING CINEMA & PHOTOGRAPHY
          </p>

          <h1 className="font-display text-white text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.95] flex flex-col items-center">
            <span
              ref={titleLeftRef}
              className="block will-change-transform will-change-opacity gpu-accelerated drop-shadow-2xl"
            >
              {wordLeft}
            </span>
            {wordCenter && (
              <span
                ref={titleCenterRef}
                className="block will-change-transform will-change-opacity gpu-accelerated drop-shadow-2xl text-white/90"
              >
                {wordCenter}
              </span>
            )}
            <span
              ref={titleRightRef}
              className="block will-change-transform will-change-opacity gpu-accelerated drop-shadow-2xl italic font-serif"
            >
              {wordRight}
            </span>
          </h1>

          {subtitle && (
            <p
              ref={metaBottomRef}
              className="metadata text-white/80 mt-6 sm:mt-8 tracking-[0.2em] uppercase text-[11px] sm:text-xs"
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Scroll indicator cue */}
        <div
          ref={indicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 text-white/70"
          aria-hidden="true"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium text-champagne">
            {scrollIndicator}
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
            style={{ animationDuration: "2.2s" }}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </div>

        {/* Supporting content teaser at 75-100% expansion */}
        <div
          ref={contentTeaserRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center opacity-0 transition-opacity duration-300 w-full max-w-lg px-6"
        >
          <p className="text-[11px] tracking-[0.25em] uppercase text-champagne mb-2">
            ENTERING ARCHIVE
          </p>
          <p className="text-white text-base sm:text-lg font-display italic">
            &ldquo;Images born from restraint, sculpted by light.&rdquo;
          </p>
        </div>
      </div>

      {children && (
        <div className="relative z-30 bg-paper">
          {children}
        </div>
      )}
    </section>
  );
}
