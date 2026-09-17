"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PopButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  coverClassName?: string;
  href?: string;
  showArrow?: boolean;
}

export function PopButton({
  className,
  variant = "primary",
  children = "Learn More",
  coverClassName,
  href,
  showArrow = true,
  ...props
}: PopButtonProps) {
  const content = (
    <span className="relative z-10 flex items-center justify-center gap-3 w-full">
      <span className="truncate">{children}</span>
      {showArrow && (
        <span className="inline-block shrink-0 font-sans" aria-hidden="true">
          →
        </span>
      )}
    </span>
  );

  const baseStyles = cn(
    "btn group relative inline-flex items-center justify-center font-mono text-xs tracking-[0.16em] uppercase font-bold select-none text-center max-w-full",
    "min-h-[48px] px-6 sm:px-8 py-3.5 rounded-xs cursor-pointer touch-manipulation",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
    "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
    variant === "primary" &&
      "!bg-[#0f0f0f] !text-[#ffffff] !border !border-[#0f0f0f] shadow-xs hover:!bg-[#2d2d2d] hover:!text-[#ffffff]",
    variant === "secondary" &&
      "!bg-[#c4a87a] !text-[#0f0f0f] !border !border-[#7a5e3d] hover:!bg-[#0f0f0f] hover:!text-[#ffffff]",
    variant === "outline" &&
      "!bg-transparent !text-[#0f0f0f] !border !border-[#0f0f0f]/30 hover:!border-[#0f0f0f] hover:!bg-[#0f0f0f] hover:!text-[#ffffff]",
    coverClassName,
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseStyles} {...props}>
      {content}
    </button>
  );
}

export const CreepyButton = PopButton;
export type CreepyButtonProps = PopButtonProps;

export default PopButton;

