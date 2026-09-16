"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { projects } from "@/data";
import { cn } from "@/lib/utils";

interface ProjectDetailContentProps {
  project: Project;
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  // Find next project
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article className="bg-paper text-ink min-h-screen">
      {/* 1. Full-Bleed Cinematic Hero Media */}
      <section className="relative w-full h-[85vh] lg:h-[95vh] overflow-hidden bg-ink select-none">
        {project.heroMedia.type === "video" ? (
          <video
            src={project.heroMedia.src}
            poster={project.heroMedia.poster}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={project.heroMedia.src}
            alt={project.heroMedia.alt}
            fill
            priority
            className="object-cover object-top sm:object-center"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        {/* Hero Overlay Details */}
        <div className="absolute inset-0 container flex flex-col justify-between py-28 lg:py-36 text-white z-10">
          <div>
            <Link
              href="/work"
              className="font-mono text-xs tracking-[0.25em] uppercase text-champagne hover:underline inline-flex items-center gap-2"
            >
              <span>←</span>
              <span>BACK TO WORK</span>
            </Link>
          </div>

          <div className="max-w-4xl">
            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.25em] text-champagne mb-4">
              <span>{project.category}</span>
              <span>·</span>
              <span>{project.year}</span>
            </div>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl font-light tracking-tight leading-[0.95] mb-6">
              {project.title}
            </h1>
            <p className="metadata text-white/80 uppercase tracking-[0.2em] text-xs sm:text-sm">
              CLIENT: {project.client} — LOCATION: {project.location}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Editorial Narrative & Metadata Ledger */}
      <section className="py-24 lg:py-36 border-b border-ink/10">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Narrative description (narrow block, editorial restraint) */}
          <div className="lg:col-span-7">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-semibold mb-6">
              CONCEPT & REASONING
            </p>
            <p className="body-large text-ink font-serif text-2xl sm:text-3xl lg:text-4xl leading-relaxed italic mb-8">
              &ldquo;{project.description}&rdquo;
            </p>
            <div className="space-y-6 text-charcoal/80 body-small leading-relaxed">
              <p>
                Every visual element in this wedding film was developed through systematic reduction and artistic care. Preserving Vedic rituals, emotion, natural light, and ambient soundscapes creates an enduring heirloom for generations.
              </p>
              <p>
                The resulting suite of assets spans 4K cinema master films, heirloom archival photo albums, and editorial monograph prints captured across Bhubaneswar, Odisha.
              </p>
            </div>
          </div>

          {/* Metadata Ledger */}
          <div className="lg:col-span-5 border-l border-ink/10 lg:pl-16 space-y-10">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-champagne-deep font-semibold mb-2">
                SERVICES DELIVERED
              </p>
              <p className="font-display text-xl text-ink">
                {project.services.join(" / ")}
              </p>
            </div>

            <div>
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-champagne-deep font-semibold mb-4">
                PROJECT CREDITS
              </p>
              <ul className="space-y-3 font-ui text-sm">
                {project.credits.map((credit, idx) => (
                  <li key={idx} className="flex items-baseline justify-between border-b border-ink/5 pb-2">
                    <span className="text-charcoal/60 text-xs font-mono uppercase tracking-wider">
                      {credit.role}
                    </span>
                    <span className="text-ink font-medium">
                      {credit.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 text-xs font-mono text-charcoal/60">
              <p>FORMAT: 35MM ANALOG & DIGITAL CINEMA</p>
              <p className="mt-1">LOCATION: {project.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Full Editorial Image Sequence */}
      <section className="py-24 lg:py-36 space-y-20 lg:space-y-32">
        <div className="container space-y-24 lg:space-y-36">
          {project.images.map((image, idx) => {
            const isFullBleed = idx % 2 === 0;

            return (
              <figure key={image.id} className="relative overflow-hidden" data-cursor="VIEW">
                <div
                  className={cn(
                    "relative overflow-hidden bg-ink/5",
                    isFullBleed ? "aspect-[16/10] w-full" : "aspect-[4/5] max-w-3xl mx-auto"
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={isFullBleed ? "100vw" : "60vw"}
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="mt-4 text-right font-mono text-[11px] text-charcoal/50 uppercase tracking-widest">
                  PLATE {String(idx + 1).padStart(2, "0")} — {image.alt}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      {/* 4. Video Feature if Available */}
      {project.videos.length > 0 && (
        <section className="py-24 lg:py-36 bg-ink text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-champagne mb-4 text-center">
                MOVING IMAGE // 35MM STILLS
              </p>
              <h2 className="font-display text-3xl sm:text-5xl text-center mb-12">
                CINEMATIC SEQUENCE
              </h2>
              <div className="relative aspect-[16/9] overflow-hidden border border-white/10" data-cursor="PLAY">
                <video
                  src={project.videos[0].src}
                  poster={project.videos[0].poster}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Next Project Transition */}
      <section className="py-28 lg:py-44 border-t border-ink/10 bg-paper-warm">
        <div className="container text-center">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-semibold mb-4">
            NEXT PROJECT
          </p>
          <Link
            href={"/work/" + nextProject.slug}
            className="group inline-block focus-visible:focus-visible"
            data-cursor="OPEN"
          >
            <h2 className="font-display text-5xl sm:text-7xl lg:text-9xl text-ink group-hover:text-champagne-deep transition-colors duration-500 font-light tracking-tight">
              {nextProject.title}
            </h2>
            <p className="mt-6 metadata text-charcoal/70 uppercase tracking-[0.2em] text-xs">
              {nextProject.category} // {nextProject.client} →
            </p>
          </Link>
        </div>
      </section>
    </article>
  );
}
