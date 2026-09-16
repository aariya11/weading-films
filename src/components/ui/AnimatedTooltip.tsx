"use client";

import * as React from "react";
import { useState, useId } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Animated Tooltip
 * Bouncy, playful tooltip shapes with SVG bubbles and spring animations.
 * Inspired by Codrops' "Tooltip Animations" (originally anime.js), rebuilt
 * on framer-motion with theme-adaptive colors.
 */

export type AnimatedTooltipVariant =
  | "cora"
  | "smaug"
  | "dori"
  | "gram"
  | "indis"
  | "malva"
  | "sadoc";

interface VariantConfig {
  /** Bubble size in px. */
  width: number;
  height: number;
  /** Distance of the bubble above the trigger (CSS `bottom`). */
  bottom: string;
  /** transform-origin for the entrance animation. */
  transformOrigin: string;
  /** SVG path(s) rendered inside a `0 0 400 300` viewBox. */
  shape: (fill: string) => React.ReactNode;
  /** Bubble (base) entrance/exit animation, transitions embedded per state. */
  base: Variants;
  /** Inner content entrance/exit animation, transitions embedded per state. */
  content: Variants;
  /** Extra styles for the content wrapper. */
  contentStyle?: React.CSSProperties;
}

const EASE_OUT_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_IN: [number, number, number, number] = [0.55, 0, 1, 0.45];

const VARIANTS: Record<AnimatedTooltipVariant, VariantConfig> = {
  // Blobby heart — scales up while un-rotating.
  cora: {
    width: 232,
    height: 174,
    bottom: "calc(100% + 0.5rem)",
    transformOrigin: "50% 100%",
    shape: (fill) => (
      <path
        d="M 199,21.9 C 152,22.2 109,35.7 78.8,57.4 48,79.1 29,109 29,142 29,172 45.9,201 73.6,222 101,243 140,258 183,260 189,270 200,282 200,282 200,282 211,270 217,260 261,258 299,243 327,222 354,201 371,172 371,142 371,109 352,78.7 321,57 290,35.3 247,21.9 199,21.9 Z"
        fill={fill}
      />
    ),
    base: {
      initial: { scale: 0, rotate: -180, opacity: 0 },
      animate: { scale: 1, rotate: 0, opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_QUINT } },
      exit: { scale: 0, opacity: 0, transition: { duration: 0.18, ease: EASE_IN } },
    },
    content: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.25, ease: EASE_OUT_QUINT } },
      exit: { y: 20, opacity: 0, transition: { duration: 0.1, ease: EASE_IN } },
    },
    contentStyle: { marginBottom: "0.75em" },
  },

  // Rounded pill with a downward pointer — tips in with a slide.
  smaug: {
    width: 240,
    height: 180,
    bottom: "calc(100% - 0.25rem)",
    transformOrigin: "50% 100%",
    shape: (fill) => (
      <path
        d="M 314,100 C 313,100 312,100 311,100 L 89.5,100 C 55.9,100 29.1,121 29.1,150 29.1,178 53.1,201 89.5,201 L 184,201 200,223 217,201 311,201 C 344,201 371,178 371,150 371,122 346,99 314,100 Z"
        fill={fill}
      />
    ),
    base: {
      initial: { rotate: 35, opacity: 0 },
      animate: { rotate: 0, opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
      exit: { rotate: -35, opacity: 0, transition: { duration: 0.2, ease: EASE_IN } },
    },
    content: {
      initial: { x: 50, rotate: 6, opacity: 0 },
      animate: { x: 0, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 12, delay: 0.05 } },
      exit: { x: -30, rotate: -6, opacity: 0, transition: { duration: 0.2, ease: EASE_IN } },
    },
  },

  // Banner ribbon with a pointer — drops in with elastic bounce.
  dori: {
    width: 240,
    height: 180,
    bottom: "calc(100% - 0.25rem)",
    transformOrigin: "50% 0%",
    shape: (fill) => (
      <path
        d="M 22,108 22,236 C 22,236 64,216 103,212 142,208 184,212 184,212 L 200,226 216,212 C 216,212 258,208 297,212 336,216 378,236 378,236 L 378,108 C 378,108 318,127 200,127 82,127 22,108 22,108 Z"
        fill={fill}
      />
    ),
    base: {
      initial: { scaleY: 0, opacity: 0 },
      animate: { scaleY: 1, opacity: 1, transition: { type: "spring", stiffness: 350, damping: 14 } },
      exit: { scaleY: 0, opacity: 0, transition: { duration: 0.15, ease: EASE_IN } },
    },
    content: {
      initial: { y: -20, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { duration: 0.2, delay: 0.1, ease: "easeOut" } },
      exit: { y: -20, opacity: 0, transition: { duration: 0.1, ease: EASE_IN } },
    },
  },

  // Asymmetric rounded speech bubble — flips in horizontally with elastic snap.
  gram: {
    width: 240,
    height: 180,
    bottom: "calc(100% + 0.5rem)",
    transformOrigin: "50% 100%",
    shape: (fill) => (
      <path
        d="M 334,103 C 334,103 334,103 334,103 334,103 261,90.4 200,90.4 139,90.4 66,103 66,103 66,103 35.8,111 35.8,154 35.8,197 66,205 66,205 L 140,205 158,237 186,205 334,205 C 334,205 364,197 364,154 364,111 334,103 334,103 Z"
        fill={fill}
      />
    ),
    base: {
      initial: { scaleX: 0, opacity: 0 },
      animate: { scaleX: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 15 } },
      exit: { scaleX: 0, opacity: 0, transition: { duration: 0.15, ease: EASE_IN } },
    },
    content: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1, transition: { duration: 0.25, delay: 0.1, ease: EASE_OUT_QUINT } },
      exit: { scale: 0.8, opacity: 0, transition: { duration: 0.1, ease: EASE_IN } },
    },
  },

  // Jagged comic-book bubble — explodes outwards.
  indis: {
    width: 260,
    height: 195,
    bottom: "calc(100% + 0.25rem)",
    transformOrigin: "50% 100%",
    shape: (fill) => (
      <path
        d="M 197,11.2 C 160,11.5 125,23.3 98.1,43.2 71.3,63.1 52.4,90.4 48,121 43.6,151 53.6,183 75.8,206 98,229 130,243 165,247 L 180,288 214,249 C 248,247 281,235 306,214 331,192 346,162 348,131 350,100 338,69.5 315,47.3 292,25.1 245,11 197,11.2 Z"
        fill={fill}
      />
    ),
    base: {
      initial: { scale: 0.4, rotate: -25, opacity: 0 },
      animate: { scale: 1, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 320, damping: 16 } },
      exit: { scale: 0.4, opacity: 0, transition: { duration: 0.15, ease: EASE_IN } },
    },
    content: {
      initial: { scale: 0.5, opacity: 0 },
      animate: { scale: 1, opacity: 1, transition: { duration: 0.2, delay: 0.12, ease: "easeOut" } },
      exit: { scale: 0.5, opacity: 0, transition: { duration: 0.1, ease: EASE_IN } },
    },
    contentStyle: { marginBottom: "0.5em" },
  },

  // Slanted parallelogram bubble — skews and slides up.
  malva: {
    width: 240,
    height: 180,
    bottom: "calc(100% - 0.25rem)",
    transformOrigin: "50% 100%",
    shape: (fill) => (
      <path
        d="M 60,105 L 340,105 C 355,105 365,115 365,130 L 365,185 C 365,200 355,210 340,210 L 220,210 200,230 180,210 60,210 C 45,210 35,200 35,185 L 35,130 C 35,115 45,105 60,105 Z"
        fill={fill}
      />
    ),
    base: {
      initial: { y: 25, skewX: -15, opacity: 0 },
      animate: { y: 0, skewX: 0, opacity: 1, transition: { duration: 0.3, ease: EASE_OUT_QUINT } },
      exit: { y: 15, opacity: 0, transition: { duration: 0.15, ease: EASE_IN } },
    },
    content: {
      initial: { y: 10, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { duration: 0.2, delay: 0.1, ease: "easeOut" } },
      exit: { y: 10, opacity: 0, transition: { duration: 0.1, ease: EASE_IN } },
    },
  },

  // Rounded dialog box with double ears — pops straight in with slight overshoot.
  sadoc: {
    width: 240,
    height: 180,
    bottom: "calc(100% - 0.25rem)",
    transformOrigin: "50% 100%",
    shape: (fill) => (
      <path
        d="M 334,103 C 334,103 334,103 334,103 334,103 261,90.4 200,90.4 139,90.4 66,103 66,103 66,103 35.8,111 35.8,154 35.8,197 66,205 66,205 L 180,205 200,235 220,205 334,205 C 334,205 364,197 364,154 364,111 334,103 334,103 Z"
        fill={fill}
      />
    ),
    base: {
      initial: { scale: 0.7, opacity: 0 },
      animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 18 } },
      exit: { scale: 0.7, opacity: 0, transition: { duration: 0.15, ease: EASE_IN } },
    },
    content: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.2, delay: 0.1 } },
      exit: { opacity: 0, transition: { duration: 0.1 } },
    },
  },
};

export interface AnimatedTooltipProps {
  /** The hoverable trigger element. */
  children: React.ReactNode;
  /** Content rendered inside the tooltip bubble. */
  content: React.ReactNode;
  /** Visual theme preset. Defaults to "cora". */
  variant?: AnimatedTooltipVariant;
  /** Hover color for the trigger text. Defaults to "#6fbb95". */
  accentColor?: string;
  /** SVG bubble fill color. Defaults to "var(--foreground)". */
  shapeColor?: string;
  /** Inner content text color. Defaults to "var(--background)". */
  textColor?: string;
  /** Extra class names for the outer wrapper. */
  className?: string;
}

export function AnimatedTooltip({
  children,
  content,
  variant = "cora",
  accentColor = "#d4c4a8",
  shapeColor = "#1a1a1a",
  textColor = "#ffffff",
  className,
}: AnimatedTooltipProps) {
  const [open, setOpen] = useState(false);
  const cfg = VARIANTS[variant] ?? VARIANTS.cora;
  const id = useId().replace(/:/g, "");

  return (
    <span
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <motion.span
        role="button"
        tabIndex={0}
        aria-describedby={open ? id : undefined}
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer select-none inline-block px-1.5 py-1 font-medium focus-visible:outline-none"
        animate={{ color: open ? accentColor : "inherit" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.span>

      {/* Static anchor keeps the bubble centered above the trigger;
          the inner motion element only handles the entrance transforms. */}
      <span
        aria-hidden={!open}
        className="pointer-events-none"
        style={{
          position: "absolute",
          bottom: cfg.bottom,
          left: "50%",
          width: cfg.width,
          height: cfg.height,
          marginLeft: -cfg.width / 2,
          zIndex: 50,
        }}
      >
        <AnimatePresence>
          {open && (
            <motion.span
              key="base"
              id={id}
              role="tooltip"
              variants={cfg.base}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transformOrigin: cfg.transformOrigin,
                filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.25))",
              }}
            >
              <svg
                viewBox="0 0 400 300"
                preserveAspectRatio="xMidYMid meet"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                aria-hidden="true"
              >
                {cfg.shape(shapeColor)}
              </svg>
              <motion.span
                variants={cfg.content}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                  position: "relative",
                  width: "65%",
                  textAlign: "center",
                  fontSize: "0.825rem",
                  lineHeight: 1.4,
                  color: textColor,
                  ...cfg.contentStyle,
                }}
              >
                {content}
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </span>
  );
}

export default AnimatedTooltip;
