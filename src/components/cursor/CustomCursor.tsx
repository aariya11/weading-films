"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer || prefersReducedMotion) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Explicit data-cursor
      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const customText = cursorTarget.getAttribute("data-cursor") || "";
        setLabel(customText);
        setIsHovering(true);
        return;
      }

      // 2. Video element
      if (target.closest("video")) {
        setLabel("PLAY");
        setIsHovering(true);
        return;
      }

      // 3. External link
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (anchor) {
        const isExternal =
          anchor.target === "_blank" ||
          (anchor.href && !anchor.href.startsWith(window.location.origin) && !anchor.href.startsWith("/"));
        if (isExternal) {
          setLabel("OPEN");
          setIsHovering(true);
          return;
        }
      }

      // 4. General interactive elements
      const interactive = target.closest("button, a, input, textarea, select, [role='button']");
      if (interactive) {
        setLabel("");
        setIsHovering(true);
        return;
      }

      // 5. Normal state
      setLabel("");
      setIsHovering(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const animate = () => {
      // Smooth lerp physics
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.18;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.18;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [prefersReducedMotion, isVisible]);

  if (!enabled) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Central micro-dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-champagne rounded-full will-change-transform transition-opacity duration-200"
        style={{
          opacity: isVisible && !label ? 1 : 0,
        }}
      />

      {/* Floating interactive ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 flex items-center justify-center rounded-full will-change-transform border transition-all duration-300 ease-out"
        style={{
          width: label ? "74px" : isHovering ? "48px" : "28px",
          height: label ? "74px" : isHovering ? "48px" : "28px",
          borderColor: label ? "rgba(212, 196, 168, 0.9)" : isHovering ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.35)",
          backgroundColor: label ? "rgba(15, 15, 15, 0.85)" : isHovering ? "rgba(212, 196, 168, 0.12)" : "transparent",
          backdropFilter: label ? "blur(6px)" : "none",
          opacity: isVisible ? 1 : 0,
        }}
      >
        {label && (
          <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-champagne font-mono select-none pointer-events-none">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
