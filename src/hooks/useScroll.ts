"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollProgress } from "@/types";

export function useScrollProgress(): ScrollProgress {
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    y: 0,
    progress: 0,
    direction: "none",
    velocity: 0,
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateScrollProgress = () => {
      const y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(y / maxScroll, 1) : 0;
      const now = performance.now();
      const timeDelta = now - lastTime.current;
      const velocity = timeDelta > 0 ? (y - lastScrollY.current) / timeDelta : 0;

      let direction: "up" | "down" | "none" = "none";
      if (y > lastScrollY.current) direction = "down";
      else if (y < lastScrollY.current) direction = "up";

      setScrollProgress({
        y,
        progress,
        direction,
        velocity,
      });

      lastScrollY.current = y;
      lastTime.current = now;
    };

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return scrollProgress;
}

export function useElementScrollProgress(
  elementRef: React.RefObject<HTMLElement | null>,
  offsetTop = 0,
  offsetBottom = 0
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || !elementRef.current) return;

    const updateProgress = () => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementHeight = rect.height;

      const start = -elementHeight - offsetTop;
      const end = viewportHeight + offsetBottom;
      const current = rect.top;

      const rawProgress = 1 - (current - start) / (end - start);
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    const handleScroll = () => {
      requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [elementRef, offsetTop, offsetBottom]);

  return progress;
}

export function useScrollLock(lock: boolean): void {
  const scrollPosition = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (lock) {
      scrollPosition.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollPosition.current);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollPosition.current);
    };
  }, [lock]);
}

export function useScrollTo(): (target: number | HTMLElement, options?: ScrollToOptions) => void {
  const scrollTo = (target: number | HTMLElement, options?: ScrollToOptions) => {
    if (typeof window === "undefined") return;

    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth", ...options });
    } else {
      target.scrollIntoView({ behavior: "smooth", ...options });
    }
  };

  return scrollTo;
}