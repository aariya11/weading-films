"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Home, User, Calendar, Zap, CreditCard, Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import LogoIcon from "@/assets/logo/logo-icon";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

// Helper component for navigation links
const NavLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) => (
  <Link
    href={href}
    className="group flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase font-semibold text-charcoal/80 hover:text-ink dark:text-white/75 dark:hover:text-white transition-colors whitespace-nowrap py-1"
  >
    <Icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
    <span>{label}</span>
  </Link>
);

// High-contrast Mobile Theme Toggle with >=44px tap target
const MobileThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10" />;

  const isDark = theme === "dark" || resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-full hover:bg-ink/5 dark:hover:bg-white/10 transition-colors text-ink dark:text-white touch-manipulation cursor-pointer select-none"
      aria-label="Toggle visual theme"
    >
      {isDark ? <Sun className="w-4 h-4 text-champagne" /> : <Moon className="w-4 h-4 text-ink" />}
    </button>
  );
};

export interface NavItemConfig {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface NotchNavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  items?: {
    left: NavItemConfig[];
    right: NavItemConfig[];
  };
  loginHref?: string;
  signupHref?: string;
  loginLabel?: string;
  signupLabel?: string;
}

export function NotchNavbar({
  className,
  logo,
  items: customItems,
  loginHref = "/contact",
  signupHref = "https://wa.me/919124885729",
  loginLabel = "Book Date",
  signupLabel = "WhatsApp ↗",
  ...props
}: NotchNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Navigation items configuration
  const items = customItems || {
    left: [
      { label: "Home", href: "/", icon: Home },
      { label: "Work", href: "/work", icon: Calendar },
      { label: "Studio", href: "/studio", icon: User },
    ],
    right: [
      { label: "Services", href: "/services", icon: Zap },
      { label: "Journal", href: "/journal", icon: CreditCard },
    ],
  };

  return (
    <>
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. MOBILE HEADER: Ultra-polished, clean minimal bar (NO NOTCH) */}
      {/* ──────────────────────────────────────────────────────────── */}
      <header
        className={cn(
          "md:hidden fixed top-0 inset-x-0 z-50 h-16 px-4 sm:px-6 flex items-center justify-between select-none",
          "bg-paper/95 dark:bg-ink/95 backdrop-blur-sm border-b border-ink/10 dark:border-white/10",
          className
        )}
        {...props}
      >
        {/* Left: Menu Toggle Button with >=44px tap target */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="min-w-[44px] min-h-[44px] -ml-2 p-2.5 flex items-center justify-center text-ink dark:text-white cursor-pointer touch-manipulation focus-visible:outline-none"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <div className="flex flex-col gap-1.5 w-5">
              <span className="block h-0.5 w-5 bg-current transition-transform" />
              <span className="block h-0.5 w-3.5 bg-current transition-transform" />
            </div>
          )}
        </button>

        {/* Center: Branding & Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group p-1"
          aria-label="WEDDING FILMS — Home"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <LogoIcon className="w-5 h-5 text-ink dark:text-champagne rotate-180" />
          <div className="flex flex-col items-center">
            <span className="font-display text-xs tracking-[0.24em] font-semibold text-ink dark:text-white uppercase whitespace-nowrap">
              WEDDING FILMS
            </span>
            <span className="font-mono text-[7px] tracking-[0.3em] text-champagne-deep dark:text-champagne uppercase -mt-0.5">
              BHUBANESWAR
            </span>
          </div>
        </Link>

        {/* Right: Theme Toggle & WhatsApp Action */}
        <div className="flex items-center gap-1 -mr-2">
          <MobileThemeToggle />
          <a
            href={signupHref}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[44px] min-h-[44px] p-2 flex items-center justify-center text-[#1b7a43] dark:text-[#4ade80] touch-manipulation cursor-pointer"
            aria-label="Direct WhatsApp concierge"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.772.822 2.791.822 3.18 0 5.766-2.587 5.766-5.766.001-3.182-2.585-5.808-5.766-5.808zm3.387 8.248c-.147.412-.857.77-1.196.819-.34.049-.785.074-2.285-.544-1.802-.74-2.955-2.57-3.044-2.69-.09-.12-.727-.967-.727-1.845 0-.877.46-1.308.623-1.485.164-.176.357-.221.477-.221.12 0 .24.002.345.007.11.006.257-.042.402.308.147.352.503 1.229.547 1.319.045.09.075.195.015.315-.06.12-.09.195-.18.3-.09.105-.189.234-.27.315-.09.09-.184.188-.079.368.105.18.468.772 1.005 1.25.69.615 1.272.806 1.452.896.18.09.285.075.39-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.102.847z" />
            </svg>
          </a>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 2. DESKTOP HEADER: Architectural Sculptural Notch Navbar     */}
      {/* ──────────────────────────────────────────────────────────── */}
      <header
        className={cn(
          "hidden md:flex fixed top-0 inset-x-0 z-50 h-16 items-start px-0 select-none",
          "bg-paper/90 dark:bg-ink/90 backdrop-blur-md border-b border-ink/10 dark:border-white/10",
          className
        )}
        {...props}
      >
        {/* Left Side Baseline Bar */}
        <div className="flex-1 h-10 bg-paper dark:bg-ink z-20 relative min-w-0">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line
              x1="0"
              y1="39.5"
              x2="100%"
              y2="39.5"
              stroke="currentColor"
              strokeWidth="1"
              className="text-ink/15 dark:text-white/20"
            />
          </svg>
        </div>

        {/* Sculptural Architectural Notch Container */}
        <div className="flex h-16 relative z-10 shrink-0 -ml-px">
          {/* Left Slice Corner */}
          <div className="w-[50px] h-full relative shrink-0">
            <div
              className="absolute inset-0 bg-paper dark:bg-ink"
              style={{ clipPath: "path('M0 0 H50 V64 C25 64 25 40 0 40 Z')" }}
            />
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 50 64"
            >
              <path
                d="M0 39.5 C25 39.5 25 63.5 50 63.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-ink/15 dark:text-white/20"
              />
            </svg>
          </div>

          {/* Center Notch Content Area */}
          <div className="flex-1 h-full relative min-w-0 -ml-px">
            <div className="absolute inset-0 bg-paper dark:bg-ink">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <line
                  x1="0"
                  y1="63.5"
                  x2="100%"
                  y2="63.5"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-ink/15 dark:text-white/20"
                />
              </svg>
            </div>

            {/* Nav Content Layer */}
            <div className="relative w-full h-full flex items-center justify-between pb-1 px-8 gap-6">
              {/* Desktop Left Nav Links */}
              <nav className="flex items-center gap-7 shrink-0">
                {items.left.map((item) => (
                  <NavLink key={item.label} {...item} />
                ))}
              </nav>

              {/* Center Logo */}
              <div className="flex justify-center shrink-0 mx-3">
                {logo || (
                  <Link
                    href="/"
                    className="flex items-center gap-2.5 group p-1"
                    aria-label="WEDDING FILMS — Home"
                  >
                    <LogoIcon className="w-6 h-6 text-ink dark:text-champagne rotate-180 group-hover:scale-105 transition-transform" />
                    <div className="flex flex-col items-start">
                      <span className="font-display text-sm tracking-[0.25em] font-semibold text-ink dark:text-white uppercase whitespace-nowrap">
                        WEDDING FILMS
                      </span>
                      <span className="font-mono text-[8px] tracking-[0.3em] text-champagne-deep dark:text-champagne uppercase -mt-0.5">
                        BHUBANESWAR
                      </span>
                    </div>
                  </Link>
                )}
              </div>

              {/* Desktop Right Nav Links & CTAs */}
              <nav className="flex items-center gap-6 shrink-0">
                {items.right.map((item) => (
                  <NavLink key={item.label} {...item} />
                ))}

                <div className="flex items-center gap-3 pl-4 border-l border-ink/15 dark:border-white/15 shrink-0">
                  <ThemeToggle />

                  <Link
                    href={loginHref}
                    className="px-3.5 py-1.5 rounded-full border border-ink/30 hover:border-ink hover:bg-ink hover:text-white dark:border-white/30 dark:hover:border-white dark:text-white dark:hover:bg-white dark:hover:text-ink text-ink font-mono text-[11px] tracking-wider uppercase font-semibold transition-all whitespace-nowrap"
                  >
                    {loginLabel}
                  </Link>

                  <Link
                    href={signupHref}
                    target={signupHref.startsWith("http") ? "_blank" : undefined}
                    rel={signupHref.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="px-3.5 py-1.5 rounded-full bg-[#1b7a43] hover:bg-[#156336] text-white font-mono text-[11px] tracking-wider uppercase font-semibold transition-all shadow-sm whitespace-nowrap inline-flex items-center gap-1.5"
                  >
                    <span>{signupLabel}</span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>

          {/* Right Slice Corner */}
          <div className="w-[50px] h-full relative shrink-0 -ml-px">
            <div
              className="absolute inset-0 bg-paper dark:bg-ink"
              style={{ clipPath: "path('M0 0 H50 V40 C25 40 25 64 0 64 Z')" }}
            />
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 50 64"
            >
              <path
                d="M0 63.5 C25 63.5 25 39.5 50 39.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-ink/15 dark:text-white/20"
              />
            </svg>
          </div>
        </div>

        {/* Right Side Baseline Bar */}
        <div className="flex-1 h-10 bg-paper dark:bg-ink z-20 relative min-w-0 -ml-px">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line
              x1="0"
              y1="39.5"
              x2="100%"
              y2="39.5"
              stroke="currentColor"
              strokeWidth="1"
              className="text-ink/15 dark:text-white/20"
            />
          </svg>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 3. MOBILE MENU DRAWER: Ultra-smooth, hardware-accelerated    */}
      {/* ──────────────────────────────────────────────────────────── */}
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
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            {/* Editorial Drawer Panel */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-x-0 top-16 z-50 bg-paper dark:bg-ink border-b border-ink/15 dark:border-white/15 p-6 md:hidden shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="mb-5 pb-3 border-b border-ink/10 dark:border-white/10">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-champagne-deep dark:text-champagne font-semibold block mb-1">
                  BHUBANESWAR, ODISHA // DIRECTORY
                </span>
                <span className="font-display text-base text-ink dark:text-white tracking-wider font-semibold">
                  WEDDING FILMS
                </span>
              </div>

              <nav className="flex flex-col gap-2.5">
                {[...items.left, ...items.right].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between py-2.5 px-3 rounded-md hover:bg-ink/5 dark:hover:bg-white/5 transition-colors touch-manipulation min-h-[44px]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-display text-xl text-ink dark:text-white tracking-wide">
                      {item.label}
                    </span>
                    <item.icon className="w-4 h-4 text-charcoal/50 dark:text-white/50" />
                  </Link>
                ))}

                <div className="h-px bg-ink/10 dark:bg-white/10 my-2" />

                <div className="flex flex-col gap-2.5">
                  <Link
                    href={loginHref}
                    className="flex items-center justify-center p-3 rounded-none border border-ink dark:border-white text-ink dark:text-white font-mono text-xs tracking-[0.2em] uppercase font-semibold transition-colors touch-manipulation min-h-[44px]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {loginLabel}
                  </Link>

                  <a
                    href={signupHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-none bg-[#1b7a43] hover:bg-[#156336] text-white font-mono text-xs tracking-[0.2em] uppercase font-semibold transition-all touch-manipulation min-h-[44px]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{signupLabel}</span>
                  </a>
                </div>

                <div className="mt-5 pt-3 border-t border-ink/10 dark:border-white/10 text-center">
                  <p className="font-mono text-[9px] tracking-widest text-charcoal/60 dark:text-white/50 uppercase">
                    BHUBANESWAR, ODISHA · +91 9124885729
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

export default NotchNavbar;
