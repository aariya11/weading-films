"use client";

import { NotchNavbar } from "./NotchNavbar";
import { Home, User, Calendar, Zap, CreditCard } from "lucide-react";
import Link from "next/link";
import LogoIcon from "@/assets/logo/logo-icon";

export function Navigation() {
  return (
    <NotchNavbar
      logo={
        <Link href="/" className="flex items-center gap-2 group" aria-label="WEDDING FILMS — Home">
          <LogoIcon className="w-5 h-5 text-ink dark:text-champagne rotate-180 group-hover:scale-105 transition-transform" />
          <span className="font-display text-xs sm:text-sm tracking-[0.22em] font-semibold text-ink dark:text-white uppercase whitespace-nowrap">
            WEDDING FILMS
          </span>
        </Link>
      }
      items={{
        left: [
          { label: "Home", href: "/", icon: Home },
          { label: "Work", href: "/work", icon: Calendar },
          { label: "Studio", href: "/studio", icon: User },
        ],
        right: [
          { label: "Services", href: "/services", icon: Zap },
          { label: "Journal", href: "/journal", icon: CreditCard },
        ],
      }}
      loginHref="/contact"
      loginLabel="Book Date"
      signupHref="https://wa.me/919124885729"
      signupLabel="WhatsApp ↗"
    />
  );
}

export default Navigation;
export { NotchNavbar };
