"use client";

import Image from "next/image";
import Link from "next/link";
import { studioInfo } from "@/data";
import { ImageTrail } from "@/components/ui/ImageTrail";
import { KineticTextLoader } from "@/components/ui/KineticTextLoader";
import { WhatsAppCTA } from "@/components/ui/WhatsAppButton";

const studioTrailImages = [
  "/images/wedding/whispered-stories.jpg",
  "/images/wedding/the-bride.jpg",
  "/images/wedding/groom-procession.jpg",
  "/images/wedding/mandap-pranam.jpg",
  "/images/wedding/bridal-quad.jpg",
  "/images/wedding/girija-sumitra.jpg",
  "/images/wedding/temple-steps-love.jpg",
  "/images/wedding/sacred-rituals.jpg",
  "/images/wedding/editorial-montage.jpg",
  "/images/wedding/beach-love-story.jpg",
  "/images/wedding/bride-grand-entry.jpg",
  "/images/wedding/bride-golden-saree.jpg",
  "/images/wedding/bride-night-bokeh.jpg",
  "/images/wedding/groom-ivory-sherwani.jpg",
  "/images/wedding/groom-monochrome-profile.jpg",
  "/images/wedding/sangeet-twirl-candles.jpg",
  "/images/wedding/lotus-rose-vows.jpg",
  "/images/wedding/bride-red-heritage.jpg",
  "/images/wedding/temple-pond-couple.jpg",
];

export function StudioSection() {
  return (
    <section id="studio" className="relative py-28 lg:py-44 bg-paper-warm text-ink border-t border-ink/10" aria-labelledby="studio-heading">
      <div className="container">
        {/* Section Header Label */}
        <p className="label label-accent mb-12 tracking-[0.3em] text-xs font-mono text-champagne-deep font-semibold">
          05 // DISCOURSE & PROCESS
        </p>

        {/* Large Statement Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-28 lg:mb-40">
          <div className="lg:col-span-8">
            <h2 id="studio-heading" className="font-display text-4xl sm:text-6xl lg:text-8xl tracking-tight leading-[0.98] mb-10 text-ink ">
              <span className="block">BETWEEN</span>
              <span className="block italic font-serif font-light text-ink/70 ">LIGHT, DEVOTION</span>
              <span className="block">AND ETERNITY.</span>
            </h2>
            <div className="space-y-6 max-w-2xl text-charcoal/80 body-large leading-relaxed">
              <p>{studioInfo.philosophy}</p>
              <p>{studioInfo.approach}</p>
            </div>
            
            <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="btn inline-flex items-center justify-center min-h-[48px] px-8 py-3.5 !bg-[#0f0f0f] !text-white font-mono text-xs tracking-wider uppercase font-bold rounded-xs hover:!bg-[#2d2d2d] hover:!text-white border border-[#0f0f0f] shadow-xs"
              >
                <span>INQUIRE ABOUT YOUR DATE →</span>
              </Link>
              <WhatsAppCTA
                variant="outline"
                label="WhatsApp Concierge"
                className="w-full sm:w-auto justify-center min-h-[48px]"
              />
            </div>
          </div>

          <div className="lg:col-span-4 border-l border-ink/10 lg:pl-12 pt-4 space-y-10">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-champagne mb-4">
                WEDDING DISCIPLINES
              </p>
              <ul className="space-y-3 font-ui text-sm text-charcoal/80">
                {studioInfo.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="font-mono text-xs text-champagne mt-0.5">0{idx + 1}</span>
                    <span>{cap.split(" — ")[0]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-ink/10">
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-champagne mb-3">
                STUDIO BASE
              </p>
              <p className="text-sm font-ui text-charcoal/80 font-medium">
                {studioInfo.location.address}
              </p>
              <p className="text-xs font-mono text-charcoal/60 mt-1">
                AVAILABLE WORLDWIDE FOR DESTINATION WEDDINGS
              </p>
              <p className="text-xs font-mono text-champagne mt-3">
                PHONE / WHATSAPP: {studioInfo.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Image Trail Visual Exploration Area */}
        <div className="relative pt-12 border-t border-ink/10">
          <div className="flex items-center justify-between mb-8">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-champagne">
              WEDDING ARCHIVE // INTERACTIVE TRAIL
            </p>
            <span className="text-[10px] font-mono tracking-widest text-charcoal/60 uppercase">
              MOVE CURSOR TO EXPLORE FRAMES
            </span>
          </div>

          <ImageTrail
            images={studioTrailImages}
            maxItems={4}
            threshold={70}
            duration={1000}
            className="w-full relative"
          >
            {/* Featured Wedding Stories inside ImageTrail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              {[studioInfo.founder, studioInfo.creativeDirector].map((leader) => (
                <div key={leader.id} className="group" data-cursor="VIEW">
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink/5 mb-6">
                    <Image
                      src={leader.portrait.src}
                      alt={leader.portrait.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-2xl sm:text-3xl text-ink">
                      {leader.name}
                    </h3>
                    <span className="font-mono text-xs tracking-wider uppercase text-champagne">
                      {leader.role.split(" & ")[0]}
                    </span>
                  </div>
                  <p className="body-small text-charcoal/70 mt-3 max-w-md">
                    {leader.bio}
                  </p>
                </div>
              ))}
            </div>
          </ImageTrail>
        </div>

        {/* Live Studio Processing Reel */}
        <div className="mt-20 p-8 sm:p-12 border border-ink/10 bg-paper flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-champagne-deep block font-semibold">
              BHUBANESWAR SUITE // LIVE EDITORIAL STATUS
            </span>
            <h4 className="font-display text-2xl text-ink font-light">
              4K Theatrical Wedding Master & Color Suite
            </h4>
            <p className="text-xs font-ui text-charcoal/80 max-w-md">
              Active archival mastering of authentic wedding ceremonies, sacred Vedic vows, and bridal monographs across Odisha.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <KineticTextLoader text="ACTIVE SUITE" subtext="BHUBANESWAR, ODISHA · 2024" />
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/studio"
            className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase text-ink hover:text-champagne transition-colors underline underline-offset-8"
          >
            <span>LEARN MORE ABOUT OUR WEDDING CINEMA CRAFT</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
