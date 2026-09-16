import React from "react";
import { cn } from "@/lib/utils";

export interface PopButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export function PopButton({
  className,
  variant = "primary",
  children = "Learn More",
  ...props
}: PopButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center font-mono text-xs tracking-[0.22em] uppercase font-medium",
        "px-7 py-4 transition-all duration-300 ease-out select-none",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        "disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        variant === "primary" &&
          "bg-ink text-white border border-ink hover:bg-transparent hover:text-ink shadow-sm hover:shadow",
        variant === "secondary" &&
          "bg-champagne/15 text-ink border border-champagne/40 hover:bg-champagne hover:text-white",
        variant === "outline" &&
          "bg-transparent text-ink border border-ink/30 hover:border-ink hover:bg-ink hover:text-white",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}

export default PopButton;
