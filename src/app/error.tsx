"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[WEDDING FILMS RUNTIME ERROR]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-paper text-ink flex items-center justify-center p-6">
      <div className="max-w-xl text-center space-y-6">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-semibold">
          SYSTEM NOTICE // APERTURE CALIBRATION
        </p>
        <h1 className="font-display text-4xl sm:text-6xl tracking-tight">
          AN UNEXPECTED <br />
          <span className="italic font-serif font-light text-ink/70">INTERRUPTION OCCURRED.</span>
        </h1>
        <p className="body-small text-charcoal/80 leading-relaxed font-ui">
          Our digital atelier experienced an unexpected interruption loading this sequence. You may re-initialize the lens or return to the main gallery.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="btn btn-primary min-h-[48px] px-8 py-3.5 rounded-xs !bg-[#0f0f0f] !text-white font-mono text-xs tracking-[0.25em] uppercase font-bold hover:!bg-[#2d2d2d] hover:!text-white border border-[#0f0f0f] cursor-pointer flex items-center justify-center shadow-xs"
          >
            RE-INITIALIZE FRAME ↺
          </button>
          <Link
            href="/"
            className="btn min-h-[48px] px-8 py-3.5 rounded-xs bg-transparent !text-[#0f0f0f] font-mono text-xs tracking-[0.25em] uppercase font-bold hover:!bg-[#0f0f0f] hover:!text-white border border-[#0f0f0f]/30 cursor-pointer flex items-center justify-center"
          >
            RETURN HOME →
          </Link>
        </div>
      </div>
    </div>
  );
}
