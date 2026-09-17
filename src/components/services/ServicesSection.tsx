"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data";
import { cn } from "@/lib/utils";
import { PopButton } from "@/components/ui/PopButton";
import { WhatsAppCTA } from "@/components/ui/WhatsAppButton";

export function ServicesSection() {
  const [activeServiceId, setActiveServiceId] = useState<string>(services[0].id);

  const activeService = services.find((s) => s.id === activeServiceId) || services[0];

  return (
    <section id="services" className="relative py-28 lg:py-44 bg-paper text-ink border-t border-ink/10" aria-labelledby="services-heading">
      <div className="container">
        {/* Section Header */}
        <header className="mb-20 lg:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-ink/10 pb-8">
          <div>
            <p className="label label-accent mb-4 tracking-[0.3em] text-xs font-mono text-champagne-deep font-semibold">
              04 // DISCIPLINES & COVERAGE
            </p>
            <h2 id="services-heading" className="font-display text-4xl sm:text-6xl lg:text-8xl tracking-tight leading-[0.95] text-ink ">
              SERVICES.
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="body-small text-charcoal/80 leading-relaxed font-ui">
              Complete wedding visual production from initial pre-wedding concept through 4K cinema teasers, master feature films, and handcrafted heirloom albums.
            </p>
          </div>
        </header>

        {/* Large Vertical Interactive List with Preview Mirror */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Vertical Interactive List */}
          <div className="lg:col-span-7">
            <ul className="divide-y divide-ink/10" role="list">
              {services.map((service, index) => {
                const isActive = activeService.id === service.id;
                const num = String(index + 1).padStart(2, "0");

                return (
                  <li key={service.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveServiceId(service.id)}
                      onFocus={() => setActiveServiceId(service.id)}
                      onClick={() => setActiveServiceId(service.id)}
                      className={cn(
                        "w-full text-left py-8 sm:py-10 transition-all duration-300 ease-out group",
                        "flex items-baseline justify-between",
                        "focus-visible:focus-visible"
                      )}
                      aria-current={isActive ? "true" : undefined}
                      data-cursor="VIEW"
                    >
                      <div className="flex items-baseline gap-4 sm:gap-8">
                        <span className={cn(
                          "font-mono text-xs tracking-[0.25em] transition-colors duration-300",
                          isActive ? "text-champagne-deep font-semibold" : "text-charcoal/60 group-hover:text-charcoal"
                        )}>
                          {num}
                        </span>
                        <span className={cn(
                          "font-display text-2xl sm:text-4xl lg:text-5xl tracking-tight transition-all duration-300",
                          isActive ? "text-ink translate-x-2" : "text-charcoal/70 group-hover:text-ink"
                        )}>
                          {service.name}
                        </span>
                      </div>
                      <span className={cn(
                        "font-mono text-xs tracking-[0.2em] transition-opacity duration-300 hidden sm:inline-block",
                        isActive ? "opacity-100 text-champagne-deep font-medium" : "opacity-0"
                      )}>
                        VIEW DETAILS →
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Interactive Preview Mirror (Sticky Right Column) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-soft">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-out-expo",
                    service.id === activeService.id ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  )}
                  aria-hidden={service.id !== activeService.id}
                >
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end text-white">
                    <span className="font-mono text-xs tracking-[0.25em] uppercase text-champagne mb-2">
                      DISCIPLINE 0{service.order}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-light mb-3">
                      {service.name}
                    </h3>
                    <p className="body-small text-white/80 line-clamp-3 mb-6 font-ui">
                      {service.longDescription}
                    </p>
                    <Link
                      href={"/services#" + service.slug}
                      className="font-mono text-xs tracking-[0.2em] uppercase text-champagne hover:underline inline-flex items-center gap-2"
                    >
                      <span>VIEW FULL CAPABILITIES</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Explore All Services CTA */}
        <div className="mt-28 lg:mt-36 pt-12 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm font-ui text-charcoal/80 ">
            Custom wedding commissioning packages across Bhubaneswar, Odisha, and luxury destination celebrations worldwide.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <PopButton href="/contact" variant="primary">
              INQUIRE ABOUT YOUR DATE
            </PopButton>
            <WhatsAppCTA
              variant="outline"
              label="WhatsApp Concierge"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
