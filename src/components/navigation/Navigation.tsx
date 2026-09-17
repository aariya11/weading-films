"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import LogoIcon from "@/assets/logo/logo-icon";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Services", href: "/services" },
  { label: "Journal", href: "/journal" },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Track scroll state for subtle elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 select-none",
          "bg-paper/90 backdrop-blur-md border-b",
          isScrolled
            ? "h-16 sm:h-20 border-ink/10 shadow-xs"
            : "h-16 sm:h-20 border-ink/6"
        )}
      >
        <div className="container h-full flex items-center justify-between">
          {/* Left: Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group p-1 -ml-1 touch-manipulation"
            aria-label="WEDDING FILMS — Home"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <LogoIcon className="w-5 h-5 sm:w-6 sm:h-6 text-ink rotate-180 group-hover:scale-105 transition-transform duration-300" />
            <div className="flex flex-col items-start">
              <span className="font-display text-xs sm:text-sm tracking-[0.24em] font-semibold text-ink uppercase whitespace-nowrap">
                WEDDING FILMS
              </span>
              <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.3em] text-champagne-deep uppercase -mt-0.5 font-medium">
                BHUBANESWAR · ODISHA
              </span>
            </div>
          </Link>

          {/* Center: Desktop Editorial Nav Links */}
          <nav
            className="hidden md:flex items-center gap-8 lg:gap-12"
            aria-label="Primary Navigation"
          >
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative font-mono text-xs tracking-[0.22em] uppercase transition-colors duration-200 py-1 font-semibold group",
                    isActive
                      ? "text-ink font-bold"
                      : "text-charcoal/75 hover:text-ink"
                  )}
                >
                  <span>{item.label}</span>
                  {/* Subtle active / hover baseline indicator */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-[1.5px] bg-ink transition-all duration-300",
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions & CTAs */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* WhatsApp Concierge Link (Desktop/Tablet) */}
            <a
              href="https://wa.me/919124885729"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#1b7a43]/30 text-[#1b7a43] hover:bg-[#1b7a43] hover:text-white font-mono text-[11px] tracking-wider uppercase font-semibold transition-all duration-200 whitespace-nowrap"
              aria-label="Direct WhatsApp Concierge"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.772.822 2.791.822 3.18 0 5.766-2.587 5.766-5.766.001-3.182-2.585-5.808-5.766-5.808zm3.387 8.248c-.147.412-.857.77-1.196.819-.34.049-.785.074-2.285-.544-1.802-.74-2.955-2.57-3.044-2.69-.09-.12-.727-.967-.727-1.845 0-.877.46-1.308.623-1.485.164-.176.357-.221.477-.221.12 0 .24.002.345.007.11.006.257-.042.402.308.147.352.503 1.229.547 1.319.045.09.075.195.015.315-.06.12-.09.195-.18.3-.09.105-.189.234-.27.315-.09.09-.184.188-.079.368.105.18.468.772 1.005 1.25.69.615 1.272.806 1.452.896.18.09.285.075.39-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.102.847z" />
              </svg>
              <span>WHATSAPP ↗</span>
            </a>

            {/* Primary Action Button */}
            <Link
              href="/contact"
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-ink text-paper font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase font-semibold hover:bg-charcoal transition-all duration-200 shadow-xs hover:shadow-sm whitespace-nowrap"
            >
              INQUIRE
            </Link>

            {/* Mobile WhatsApp Quick Icon */}
            <a
              href="https://wa.me/919124885729"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden min-w-[40px] min-h-[40px] flex items-center justify-center text-[#1b7a43] touch-manipulation cursor-pointer"
              aria-label="Direct WhatsApp Concierge"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.772.822 2.791.822 3.18 0 5.766-2.587 5.766-5.766.001-3.182-2.585-5.808-5.766-5.808zm3.387 8.248c-.147.412-.857.77-1.196.819-.34.049-.785.074-2.285-.544-1.802-.74-2.955-2.57-3.044-2.69-.09-.12-.727-.967-.727-1.845 0-.877.46-1.308.623-1.485.164-.176.357-.221.477-.221.12 0 .24.002.345.007.11.006.257-.042.402.308.147.352.503 1.229.547 1.319.045.09.075.195.015.315-.06.12-.09.195-.18.3-.09.105-.189.234-.27.315-.09.09-.184.188-.079.368.105.18.468.772 1.005 1.25.69.615 1.272.806 1.452.896.18.09.285.075.39-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.102.847z" />
              </svg>
            </a>

            {/* Mobile Menu Trigger (Hamburger) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] -mr-2 p-2.5 flex items-center justify-center text-ink cursor-pointer touch-manipulation focus-visible:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <div className="flex flex-col gap-1.5 w-5">
                  <span className="block h-0.5 w-5 bg-ink transition-transform" />
                  <span className="block h-0.5 w-3.5 bg-ink transition-transform" />
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Editorial Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
              aria-hidden="true"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-x-0 top-16 z-50 bg-paper border-b border-ink/15 p-6 md:hidden shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="mb-5 pb-3 border-b border-ink/10">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-champagne-deep font-semibold block mb-1">
                  BHUBANESWAR, ODISHA // DIRECTORY
                </span>
                <span className="font-display text-base text-ink tracking-wider font-semibold">
                  WEDDING FILMS
                </span>
              </div>

              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between py-2.5 px-3 rounded-md hover:bg-ink/5 transition-colors touch-manipulation min-h-[44px]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-display text-2xl text-ink tracking-wide">
                      {item.label}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-charcoal/50" />
                  </Link>
                ))}

                <Link
                  href="/contact"
                  className="flex items-center justify-between py-2.5 px-3 rounded-md hover:bg-ink/5 transition-colors touch-manipulation min-h-[44px]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="font-display text-2xl text-ink tracking-wide">
                    Contact & Commissions
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-charcoal/50" />
                </Link>

                <div className="h-px bg-ink/10 my-3" />

                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center p-3 bg-ink text-paper font-mono text-xs tracking-[0.2em] uppercase font-semibold transition-colors touch-manipulation min-h-[44px] rounded-full shadow-xs"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    INQUIRE ABOUT YOUR DATE
                  </Link>

                  <a
                    href="https://wa.me/919124885729"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 bg-[#1b7a43] hover:bg-[#156336] text-white font-mono text-xs tracking-[0.2em] uppercase font-semibold transition-all touch-manipulation min-h-[44px] rounded-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.772.822 2.791.822 3.18 0 5.766-2.587 5.766-5.766.001-3.182-2.585-5.808-5.766-5.808zm3.387 8.248c-.147.412-.857.77-1.196.819-.34.049-.785.074-2.285-.544-1.802-.74-2.955-2.57-3.044-2.69-.09-.12-.727-.967-.727-1.845 0-.877.46-1.308.623-1.485.164-.176.357-.221.477-.221.12 0 .24.002.345.007.11.006.257-.042.402.308.147.352.503 1.229.547 1.319.045.09.075.195.015.315-.06.12-.09.195-.18.3-.09.105-.189.234-.27.315-.09.09-.184.188-.079.368.105.18.468.772 1.005 1.25.69.615 1.272.806 1.452.896.18.09.285.075.39-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.102.847z" />
                    </svg>
                    <span>WHATSAPP (+91 9124885729)</span>
                  </a>
                </div>

                <div className="mt-5 pt-3 border-t border-ink/10 text-center">
                  <p className="font-mono text-[9px] tracking-widest text-charcoal/60 uppercase">
                    BHUBANESWAR, ODISHA · CONTACT@WEDDINGFILMS.IN
                  </p>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;
export { Navigation as NotchNavbar };
