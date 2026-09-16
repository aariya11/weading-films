"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface KineticTextLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  subtext?: string;
}

export function KineticTextLoader({
  className,
  text = "LOADING",
  subtext,
  ...props
}: KineticTextLoaderProps) {
  const cleanText = text.toUpperCase();

  return (
    <div
      className={cn("flex flex-col items-center justify-center p-4 select-none", className)}
      role="status"
      aria-live="polite"
      {...props}
    >
      <div className="flex items-center gap-3">
        {/* Subtle breathing amber/emerald dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne-deep dark:bg-champagne opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-champagne-deep dark:bg-champagne" />
        </span>

        {/* Crisp editorial uppercase label */}
        <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-ink dark:text-white uppercase font-medium">
          {cleanText}
        </span>
      </div>

      {subtext && (
        <span className="font-mono text-[9px] tracking-[0.25em] text-charcoal/60 dark:text-white/50 uppercase mt-2">
          {subtext}
        </span>
      )}
    </div>
  );
}

export default KineticTextLoader;
