"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const WHATSAPP_NUMBER = "919124885729";
export const WHATSAPP_FORMATTED = "+91 9124885729";
export const WHATSAPP_DEFAULT_MSG =
  "Hello WEDDING FILMS, I would like to inquire about wedding photography and cinematic film coverage for our wedding in Bhubaneswar, Odisha.";

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MSG
)}`;

export function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

/** Floating quick chat button fixed at bottom-right of viewport */
export function FloatingWhatsApp({ className }: { className?: string }) {
  return (
    <aside
      aria-label="Contact via WhatsApp"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center group",
        className
      )}
    >
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp with WEDDING FILMS at ${WHATSAPP_FORMATTED}`}
        className={cn(
          "relative flex items-center gap-3 px-4 py-3.5 rounded-full",
          "bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)]",
          "hover:bg-[#20ba59] hover:shadow-[0_12px_35px_rgba(37,211,102,0.6)]",
          "hover:-translate-y-0.5 active:translate-y-0",
          "transition-all duration-300 ease-out",
          "border border-white/20 select-none"
        )}
      >
        {/* Pulsing online status indicator */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>

        {/* WhatsApp Icon */}
        <svg
          className="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.772.822 2.791.822 3.18 0 5.766-2.587 5.766-5.766.001-3.182-2.585-5.808-5.766-5.808zm3.387 8.248c-.147.412-.857.77-1.196.819-.34.049-.785.074-2.285-.544-1.802-.74-2.955-2.57-3.044-2.69-.09-.12-.727-.967-.727-1.845 0-.877.46-1.308.623-1.485.164-.176.357-.221.477-.221.12 0 .24.002.345.007.11.006.257-.042.402.308.147.352.503 1.229.547 1.319.045.09.075.195.015.315-.06.12-.09.195-.18.3-.09.105-.189.234-.27.315-.09.09-.184.188-.079.368.105.18.468.772 1.005 1.25.69.615 1.272.806 1.452.896.18.09.285.075.39-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.102.847z" />
        </svg>

        {/* Text for desktop / visible always */}
        <span className="font-mono text-xs font-semibold tracking-wider uppercase">
          WhatsApp Chat
        </span>
      </a>
    </aside>
  );
}

/** Inline WhatsApp CTA for headers, cards, and contact blocks */
export function WhatsAppCTA({
  className,
  variant = "primary",
  label = `WhatsApp: ${WHATSAPP_FORMATTED}`,
}: {
  className?: string;
  variant?: "primary" | "outline" | "compact";
  label?: string;
}) {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open WhatsApp chat with WEDDING FILMS at ${WHATSAPP_FORMATTED}`}
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-xs tracking-wider uppercase transition-all duration-300",
        variant === "primary" &&
          "px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-medium shadow-[0_6px_20px_rgba(37,211,102,0.35)] hover:-translate-y-0.5",
        variant === "outline" &&
          "px-5 py-3 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white",
        variant === "compact" &&
          "text-[#25D366] hover:text-[#20ba59] underline underline-offset-4",
        className
      )}
    >
      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.772.822 2.791.822 3.18 0 5.766-2.587 5.766-5.766.001-3.182-2.585-5.808-5.766-5.808zm3.387 8.248c-.147.412-.857.77-1.196.819-.34.049-.785.074-2.285-.544-1.802-.74-2.955-2.57-3.044-2.69-.09-.12-.727-.967-.727-1.845 0-.877.46-1.308.623-1.485.164-.176.357-.221.477-.221.12 0 .24.002.345.007.11.006.257-.042.402.308.147.352.503 1.229.547 1.319.045.09.075.195.015.315-.06.12-.09.195-.18.3-.09.105-.189.234-.27.315-.09.09-.184.188-.079.368.105.18.468.772 1.005 1.25.69.615 1.272.806 1.452.896.18.09.285.075.39-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.102.847z" />
      </svg>
      <span>{label}</span>
    </a>
  );
}

export default FloatingWhatsApp;
