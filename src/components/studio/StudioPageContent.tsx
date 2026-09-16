"use client";

import Image from "next/image";
import { studioInfo, team } from "@/data";

export function StudioPageContent() {
  return (
    <div className="bg-paper text-ink dark:bg-ink dark:text-white min-h-screen pt-32 pb-36">
      {/* Studio Header */}
      <section className="container mb-28 lg:mb-40">
        <p className="label label-accent mb-4 tracking-[0.3em] text-xs font-mono">
          STUDIO // ORIGINS & DIRECTIVES
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl tracking-tight leading-[0.95] mb-12">
          THE STUDIO.
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-ink/10 pt-12">
          <div className="lg:col-span-7">
            <h2 className="font-serif italic text-3xl sm:text-5xl text-ink/90 leading-tight mb-8">
              &ldquo;Enduring imagery is born from restraint. Not from noise, but from the deliberate choice of what to leave out.&rdquo;
            </h2>
            <div className="space-y-6 text-charcoal/80 body-large leading-relaxed">
              <p>{studioInfo.philosophy}</p>
              <p>{studioInfo.approach}</p>
            </div>
          </div>

          <div className="lg:col-span-5 border-l border-ink/10 lg:pl-12 space-y-10">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-champagne-deep font-semibold mb-4">
                FULL DISCIPLINARY CAPABILITIES
              </p>
              <ul className="space-y-3 font-ui text-sm text-charcoal/80">
                {studioInfo.capabilities.map((cap, i) => (
                  <li key={i} className="border-b border-ink/5 pb-2">
                    {cap}
                  </li>
                ))}
              </ul>
            </div>

            <div id="location">
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-champagne-deep font-semibold mb-3">
                BHUBANESWAR STUDIO LOCATION
              </p>
              <address className="not-italic text-sm text-charcoal/80 leading-relaxed font-ui">
                {studioInfo.location.address}<br />
                {studioInfo.location.city}, {studioInfo.location.country}
              </address>
              <p className="text-xs font-mono text-charcoal/70 mt-3">
                WHATSAPP: +91 9124885729 · DIRECT: {studioInfo.email}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Roster */}
      <section id="team" className="py-24 lg:py-36 bg-paper-warm border-t border-ink/10">
        <div className="container">
          <header className="mb-20 lg:mb-28">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-semibold mb-3">
              CREATIVE DIRECTION & CRAFT
            </p>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl">
              THE TEAM.
            </h2>
            <p className="body-large text-charcoal/80 mt-4 max-w-xl">
              A specialized core team of senior directors, photographers, editors, and producers who execute every commission personally.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {team.map((member) => (
              <article key={member.id} className="group" data-cursor="VIEW">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink/5 mb-6">
                  <Image
                    src={member.portrait.src}
                    alt={member.portrait.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-2xl text-ink">
                  {member.name}
                </h3>
                <p className="font-mono text-xs tracking-wider uppercase text-champagne-deep font-semibold mt-1 mb-3">
                  {member.role}
                </p>
                <p className="body-small text-charcoal/70 leading-relaxed">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
