"use client";

import Link from "next/link";
import { studioInfo, footerNavigation } from "@/data";
import { AnimatedFooter } from "@/components/ui/AnimatedFooter";
import { WhatsAppCTA, WHATSAPP_LINK } from "@/components/ui/WhatsAppButton";

export function Footer() {
  return (
    <footer className="relative bg-ink text-white py-24 lg:py-36 select-none" role="contentinfo">
      <div className="container">
        {/* Massive Statement */}
        <div className="mb-20 lg:mb-28 border-b border-white/10 pb-14 lg:pb-20">
          <p className="font-display text-4xl sm:text-6xl lg:text-[8rem] tracking-tight leading-[0.9] uppercase text-white/95">
            MOMENTS THAT <br className="hidden sm:block" />
            <span className="italic font-serif font-light text-white/70">HAPPEN ONLY</span> <br />
            ONCE.
          </p>
        </div>

        {/* Categorized Navigation Ledger */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
          {/* Studio Meta (col 1-4) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-5">
            <span className="font-display text-2xl tracking-[0.18em] font-light text-white block">
              {studioInfo.name}
            </span>
            <p className="text-xs font-mono tracking-widest uppercase text-champagne">
              BHUBANESWAR, ODISHA · INDIA
            </p>
            <p className="text-sm font-ui text-white/70 max-w-sm leading-relaxed">
              Bhubaneswar, Odisha, India<br />
              Available worldwide for luxury destination weddings
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs tracking-widest text-[#25D366] hover:underline flex items-center gap-1.5"
                >
                  <span>WhatsApp: +91 9124885729 ↗</span>
                </a>
              </p>
              <p>
                <a
                  href={"mailto:" + studioInfo.email}
                  className="font-mono text-xs tracking-widest text-champagne hover:underline"
                >
                  {studioInfo.email}
                </a>
              </p>
            </div>
          </div>

          {/* Work (col 5-6) */}
          <div className="lg:col-span-2 space-y-4">
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-champagne">
              WEDDING STORIES
            </p>
            <ul className="space-y-2.5 font-ui text-xs text-white/70">
              {footerNavigation.work.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio & Services (col 7-8) */}
          <div className="lg:col-span-2 space-y-4">
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-champagne">
              SERVICES
            </p>
            <ul className="space-y-2.5 font-ui text-xs text-white/70">
              {footerNavigation.studio.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Pricing & Rate Card
                </Link>
              </li>
            </ul>
          </div>

          {/* Journal (col 9-10) */}
          <div className="lg:col-span-2 space-y-4">
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-champagne">
              JOURNAL
            </p>
            <ul className="space-y-2.5 font-ui text-xs text-white/70">
              {footerNavigation.journal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp Direct & Inquiries (col 11-12) */}
          <div className="lg:col-span-2 space-y-4">
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-champagne">
              DIRECT INQUIRY
            </p>
            <div className="space-y-3 pt-1">
              <WhatsAppCTA
                variant="primary"
                label="Chat on WhatsApp"
                className="w-full justify-center py-2.5 px-3 text-[11px]"
              />
              <Link
                href="/contact"
                className="inline-block w-full text-center px-4 py-2.5 bg-white/10 hover:bg-champagne hover:text-ink text-white text-[10px] font-mono tracking-widest uppercase transition-colors border border-white/10"
              >
                BOOK WEDDING DATE →
              </Link>
            </div>
          </div>
        </div>

        {/* Cinematic ASCII Interactive Footer Art */}
        <div className="my-16 lg:my-24 border-t border-white/10 pt-12">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-champagne">
              WEDDING FILMS // INTERACTIVE CANVAS
            </p>
            <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
              TOUCH OR HOVER TO ILLUMINATE
            </span>
          </div>
          <div className="relative h-[320px] sm:h-[420px] md:h-[480px] w-full overflow-hidden bg-ink-soft border border-white/10">
            <AnimatedFooter
              headingLines={["WEDDING", "FILMS"]}
              background="#141414"
              textColor="#ffffff"
              charColor="#d4c4a8"
              hoverColor="#f5efe6"
              hoverCharColor="#0f0f0f"
              columns={64}
              parallaxStrength={25}
            />
          </div>
        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-white/60 flex-wrap">
          <p>© {new Date().getFullYear()} WEDDING FILMS. ALL RIGHTS RESERVED.</p>

          <div className="flex flex-wrap items-center gap-6 justify-center">
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-white transition-colors py-1 inline-block"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <p className="text-champagne font-medium tracking-wider">BHUBANESWAR, ODISHA · INDIA</p>
        </div>
      </div>
    </footer>
  );
}
