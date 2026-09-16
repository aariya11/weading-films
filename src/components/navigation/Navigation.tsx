"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems, studioInfo } from "@/data";
import { cn } from "@/lib/utils";
import { WHATSAPP_LINK } from "@/components/ui/WhatsAppButton";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
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

  // Dark header only on home page before scrolling past hero
  const isDark = isHome && !scrolled;

  const navLinks = [
    { label: "WORK", href: "/work" },
    { label: "STUDIO", href: "/studio" },
    { label: "SERVICES", href: "/services" },
    { label: "JOURNAL", href: "/journal" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          isDark
            ? "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 lg:py-6 border-b border-white/10"
            : "bg-paper/95 text-ink py-3.5 lg:py-4 border-b border-ink/10 backdrop-blur-md shadow-[0_1px_2px_rgba(15,15,15,0.03)]"
        )}
      >
        <div className="container flex items-center justify-between">
          {/* Logo & Studio Location */}
          <Link
            href="/"
            className="group flex flex-col focus-visible:focus-visible"
            aria-label={`${studioInfo.name} — Bhubaneswar, Odisha`}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "font-display text-xl sm:text-2xl tracking-[0.16em] font-normal transition-colors duration-300",
                  isDark ? "text-white group-hover:text-champagne" : "text-ink group-hover:text-[#7a5e3d]"
                )}
              >
                {studioInfo.name}
              </span>
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-opacity",
                  isDark ? "bg-champagne opacity-80" : "bg-ink opacity-40"
                )}
              />
            </div>
            <span
              className={cn(
                "font-mono text-[9px] tracking-[0.25em] uppercase transition-colors",
                isDark ? "text-champagne/90" : "text-[#7a5e3d]"
              )}
            >
              BHUBANESWAR, ODISHA
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 lg:gap-12"
          >
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative font-mono text-xs tracking-[0.25em] uppercase transition-colors duration-200 py-1.5",
                    isDark
                      ? isActive
                        ? "text-white font-semibold"
                        : "text-white/70 hover:text-white"
                      : isActive
                      ? "text-ink font-semibold"
                      : "text-charcoal/70 hover:text-ink"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-[1.5px]",
                        isDark ? "bg-champagne" : "bg-ink"
                      )}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions: WhatsApp + Book Date CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 px-3 py-2 text-[11px] font-mono tracking-widest uppercase transition-colors border",
                isDark
                  ? "border-white/20 text-white/90 hover:bg-white hover:text-ink"
                  : "border-ink/15 text-charcoal hover:border-ink hover:text-ink"
              )}
              aria-label="Inquire on WhatsApp"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.772.822 2.791.822 3.18 0 5.766-2.587 5.766-5.766.001-3.182-2.585-5.808-5.766-5.808zm3.387 8.248c-.147.412-.857.77-1.196.819-.34.049-.785.074-2.285-.544-1.802-.74-2.955-2.57-3.044-2.69-.09-.12-.727-.967-.727-1.845 0-.877.46-1.308.623-1.485.164-.176.357-.221.477-.221.12 0 .24.002.345.007.11.006.257-.042.402.308.147.352.503 1.229.547 1.319.045.09.075.195.015.315-.06.12-.09.195-.18.3-.09.105-.189.234-.27.315-.09.09-.184.188-.079.368.105.18.468.772 1.005 1.25.69.615 1.272.806 1.452.896.18.09.285.075.39-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.102.847z" />
              </svg>
              <span>WHATSAPP</span>
            </a>

            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center px-5 py-2 text-[11px] font-mono tracking-[0.25em] uppercase font-semibold transition-all duration-200 border",
                isDark
                  ? "bg-white text-ink border-white hover:bg-transparent hover:text-white"
                  : "bg-ink text-white border-ink hover:bg-transparent hover:text-ink"
              )}
            >
              BOOK DATE
            </Link>
          </div>

          {/* Mobile Menu & WhatsApp Quick Button */}
          <div className="md:hidden flex items-center gap-2.5">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-2 border transition-colors",
                isDark ? "border-white/20 text-white" : "border-ink/20 text-ink"
              )}
              aria-label="WhatsApp Chat"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.772.822 2.791.822 3.18 0 5.766-2.587 5.766-5.766.001-3.182-2.585-5.808-5.766-5.808zm3.387 8.248c-.147.412-.857.77-1.196.819-.34.049-.785.074-2.285-.544-1.802-.74-2.955-2.57-3.044-2.69-.09-.12-.727-.967-.727-1.845 0-.877.46-1.308.623-1.485.164-.176.357-.221.477-.221.12 0 .24.002.345.007.11.006.257-.042.402.308.147.352.503 1.229.547 1.319.045.09.075.195.015.315-.06.12-.09.195-.18.3-.09.105-.189.234-.27.315-.09.09-.184.188-.079.368.105.18.468.772 1.005 1.25.69.615 1.272.806 1.452.896.18.09.285.075.39-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.102.847z" />
              </svg>
            </a>

            <button
              type="button"
              className={cn(
                "p-2 focus-visible:focus-visible z-50 transition-colors",
                isDark ? "text-white" : "text-ink"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">Toggle navigation</span>
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={cn(
                    "block h-0.5 w-full transition-transform duration-300 origin-center",
                    isDark ? "bg-white" : "bg-ink",
                    mobileMenuOpen && "rotate-45 translate-y-2 bg-champagne"
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-full transition-opacity duration-300",
                    isDark ? "bg-white" : "bg-ink",
                    mobileMenuOpen && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-full transition-transform duration-300 origin-center",
                    isDark ? "bg-white" : "bg-ink",
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
          "transition-all duration-300 ease-out",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col gap-6 pt-4">
          <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-1 font-mono">
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
                  "font-display text-3xl tracking-tight transition-colors duration-200",
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
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center py-3 bg-white text-ink font-mono text-xs tracking-widest uppercase font-semibold hover:bg-champagne transition-colors"
          >
            BOOK WEDDING DATE
          </Link>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-3 border border-white/20 text-white font-mono text-xs tracking-widest uppercase hover:border-[#25D366] hover:text-[#25D366] transition-colors"
          >
            CHAT ON WHATSAPP (+91 9124885729)
          </a>

          <div className="text-xs font-mono text-white/60 text-center pt-2">
            <p className="text-champagne">BHUBANESWAR, ODISHA, INDIA</p>
            <p className="mt-1">{studioInfo.phone}</p>
          </div>
        </div>
      </div>
    </>
  );
}
