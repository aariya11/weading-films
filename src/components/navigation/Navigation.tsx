"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useViewport } from "@/hooks/useViewport";
import { navigationItems, studioInfo } from "@/data";
import { cn } from "@/lib/utils";
import { WhatsAppCTA } from "@/components/ui/WhatsAppButton";

export function Navigation() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const { isMobile } = useViewport();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const contactBtnRef = useRef<HTMLAnchorElement>(null);

  // Magnetic interaction on desktop contact button
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || isMobile || !contactBtnRef.current) return;
    const rect = contactBtnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.28;
    const deltaY = (e.clientY - centerY) * 0.28;
    contactBtnRef.current.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (!contactBtnRef.current) return;
    contactBtnRef.current.style.transform = "translate3d(0, 0, 0)";
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = navigationItems.slice(0, 4);

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          scrolled
            ? "bg-ink/90 backdrop-blur-md border-b border-white/10 py-3.5"
            : "bg-transparent py-5 lg:py-7"
        )}
      >
        <div className="container flex items-center justify-between">
          {/* Studio Name & Location */}
          <Link
            href="/"
            className="group flex flex-col focus-visible:focus-visible"
            aria-label={`${studioInfo.name} — Bhubaneswar, Odisha`}
          >
            <div className="flex items-center gap-2">
              <span className="font-display text-xl sm:text-2xl tracking-[0.18em] font-light text-white group-hover:text-champagne transition-colors duration-300">
                {studioInfo.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-champagne opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-champagne/80">
              BHUBANESWAR, ODISHA
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-6 lg:gap-10"
          >
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative font-ui text-xs tracking-[0.25em] uppercase transition-colors duration-300 py-1",
                    isActive
                      ? "text-champagne font-medium"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-champagne" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA & WhatsApp Quick Button */}
          <div className="hidden md:flex items-center gap-3.5">
            <WhatsAppCTA
              variant="outline"
              label="+91 9124885729"
              className="py-2 px-3 text-[10px] border-white/20 text-white hover:bg-[#25D366] hover:text-white hover:border-[#25D366]"
            />

            <Link
              ref={contactBtnRef}
              href="/contact"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={cn(
                "relative inline-flex items-center justify-center px-5 py-2.5",
                "text-[10px] tracking-[0.25em] uppercase font-medium",
                "text-ink bg-white hover:bg-champagne hover:text-ink",
                "border border-white/20 transition-all duration-300 ease-out",
                "will-change-transform"
              )}
            >
              BOOK DATE
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href="https://wa.me/919124885729?text=Hello%20WEDDING%20FILMS%2C%20I%20would%20like%20to%20inquire%20about%20wedding%20photography%20and%20films."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#25D366] text-white"
              aria-label="WhatsApp Chat"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.772.822 2.791.822 3.18 0 5.766-2.587 5.766-5.766.001-3.182-2.585-5.808-5.766-5.808zm3.387 8.248c-.147.412-.857.77-1.196.819-.34.049-.785.074-2.285-.544-1.802-.74-2.955-2.57-3.044-2.69-.09-.12-.727-.967-.727-1.845 0-.877.46-1.308.623-1.485.164-.176.357-.221.477-.221.12 0 .24.002.345.007.11.006.257-.042.402.308.147.352.503 1.229.547 1.319.045.09.075.195.015.315-.06.12-.09.195-.18.3-.09.105-.189.234-.27.315-.09.09-.184.188-.079.368.105.18.468.772 1.005 1.25.69.615 1.272.806 1.452.896.18.09.285.075.39-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.102.847z" />
              </svg>
            </a>

            <button
              type="button"
              className="text-white p-2 focus-visible:focus-visible z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">Toggle navigation</span>
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={cn(
                    "block h-0.5 w-full bg-white transition-transform duration-300 origin-center",
                    mobileMenuOpen && "rotate-45 translate-y-2 bg-champagne"
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-full bg-white transition-opacity duration-300",
                    mobileMenuOpen && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-full bg-white transition-transform duration-300 origin-center",
                    mobileMenuOpen && "-rotate-45 -translate-y-2 bg-champagne"
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-navigation"
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-ink/98 backdrop-blur-xl flex flex-col justify-between px-8 py-24",
          "transition-all duration-500 ease-out",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-6"
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col gap-6 pt-4">
          <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-1">
            WEDDING FILMS // BHUBANESWAR
          </p>
          {navigationItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "font-display text-3xl sm:text-4xl tracking-tight transition-colors duration-200",
                  isActive ? "text-champagne" : "text-white hover:text-champagne"
                )}
              >
                <span className="text-xs font-mono mr-3 text-white/40">
                  0{index + 1}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Drawer Bottom Info */}
        <div className="border-t border-white/10 pt-6 space-y-4">
          <WhatsAppCTA
            variant="primary"
            label="WhatsApp: +91 9124885729"
            className="w-full justify-center py-3.5"
          />

          <div className="space-y-1 text-xs font-mono text-white/60">
            <p className="text-champagne font-medium">BHUBANESWAR, ODISHA, INDIA</p>
            <p>{studioInfo.phone}</p>
          </div>
        </div>
      </div>
    </>
  );
}
