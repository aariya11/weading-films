"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PopButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  coverClassName?: string;
}

export function PopButton({
  className,
  variant = "primary",
  children = "Learn More",
  coverClassName,
  ...props
}: PopButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center font-mono text-xs tracking-[0.22em] uppercase font-bold select-none",
        "px-8 py-4 transition-all duration-300 ease-out cursor-pointer touch-manipulation",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ",
        "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
        variant === "primary" &&
          "bg-ink text-white border border-ink shadow-[0_4px_16px_rgba(15,15,15,0.15)] hover:shadow-[0_8px_24px_rgba(15,15,15,0.25)] hover:-translate-y-0.5 active:translate-y-0",
        variant === "secondary" &&
          "bg-champagne/20 text-ink border border-champagne-deep/40 hover:bg-champagne hover:text-ink",
        variant === "outline" &&
          "bg-transparent text-ink border border-ink/30 hover:border-ink hover:bg-ink hover:text-white",
        coverClassName,
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-3">
        <span>{children}</span>
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </button>
  );
}

export const CreepyButton = PopButton;
export type CreepyButtonProps = PopButtonProps;

export default PopButton;
