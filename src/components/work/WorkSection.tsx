"use client";

import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data";
import { cn } from "@/lib/utils";
import { AnimatedTooltip } from "@/components/ui/AnimatedTooltip";

export function WorkSection() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 5);

  return (
    <section id="work" className="relative py-28 lg:py-44 bg-paper text-ink dark:bg-ink dark:text-white" aria-labelledby="work-heading">
      <div className="container">
        {/* Section Header */}
        <header className="mb-24 lg:mb-36 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-ink/10 dark:border-white/10 pb-8">
          <div>
            <p className="label label-accent mb-4 tracking-[0.3em] text-xs font-mono text-champagne-deep dark:text-champagne font-semibold">
              02 // FEATURED WEDDINGS
            </p>
            <h2 id="work-heading" className="font-display text-4xl sm:text-6xl lg:text-8xl tracking-tight leading-[0.95] text-ink dark:text-white">
              WEDDING <br />
              <span className="italic font-serif font-light text-ink/80 dark:text-white/80">STORIES.</span>
            </h2>
          </div>
          <div className="max-w-sm space-y-4">
            <p className="body-small text-charcoal/80 dark:text-white/80 leading-relaxed font-ui">
              Authentic wedding cinema and fine art photography crafted across Bhubaneswar, Puri, and luxury destination venues throughout India.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <AnimatedTooltip content="Shot on large format 4K cinema cameras with Leica prime optics." variant="cora" shapeColor="#0f0f0f" textColor="#ffffff">
                <span className="text-[10px] font-mono tracking-widest border border-ink/20 dark:border-white/20 text-ink dark:text-white px-2.5 py-1 uppercase hover:border-champagne transition-colors inline-block">
                  4K CINEMA CRAFT ↗
                </span>
              </AnimatedTooltip>
              <AnimatedTooltip content="Preserving authentic Vedic mantras and emotional vows in 32-bit float." variant="indis" shapeColor="#0f0f0f" textColor="#ffffff">
                <span className="text-[10px] font-mono tracking-widest border border-ink/20 px-2.5 py-1 uppercase hover:border-champagne transition-colors inline-block">
                  SACRED AUDIO ↗
                </span>
              </AnimatedTooltip>
              <AnimatedTooltip content="Color graded with custom 35mm film emulation curves." variant="smaug" shapeColor="#0f0f0f" textColor="#ffffff">
                <span className="text-[10px] font-mono tracking-widest border border-ink/20 px-2.5 py-1 uppercase hover:border-champagne transition-colors inline-block">
                  35MM TONE ↗
                </span>
              </AnimatedTooltip>
            </div>
          </div>
        </header>

        {/* Editorial Project Sequence */}
        <div className="space-y-36 lg:space-y-52">
          {featuredProjects.map((project, index) => {
            const num = String(index + 1).padStart(2, "0");

            return (
              <article
                key={project.id}
                className="group relative"
                data-cursor="VIEW"
              >
                <Link
                  href={"/work/" + project.slug}
                  className="block focus-visible:focus-visible"
                  aria-label={"View " + project.title + " — " + project.category}
                >
                  {/* Layout Variation based on index */}
                  {index === 0 && (
                    // 01 GIRIJA & SUMITRA: Full-width cinematic landscape with typography
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
                      <div className="lg:col-span-4 lg:mb-12">
                        <span className="font-mono text-xs tracking-[0.3em] text-champagne-deep font-medium block mb-4">
                          {num} // {project.category}
                        </span>
                        <h3 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight group-hover:translate-x-3 transition-transform duration-500 ease-out">
                          {project.title}
                        </h3>
                        <p className="metadata mt-4 text-charcoal/70 uppercase tracking-[0.15em] text-xs">
                          {project.services.join(" · ")}
                        </p>
                        <p className="body-small text-charcoal/80 mt-6 line-clamp-3 max-w-sm">
                          {project.description}
                        </p>
                      </div>
                      <div className="lg:col-span-8 overflow-hidden relative aspect-[16/10] bg-ink/5">
                        <Image
                          src={project.heroMedia.src}
                          alt={project.heroMedia.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 66vw"
                          className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                  )}

                  {index === 1 && (
                    // 02 THE BRIDE: Editorial vertical offset with whitespace
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                      <div className="lg:col-span-6 lg:col-start-2 overflow-hidden relative aspect-[4/5] bg-ink/5 order-2 lg:order-1">
                        <Image
                          src={project.heroMedia.src}
                          alt={project.heroMedia.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 45vw"
                          className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="lg:col-span-4 lg:col-start-9 order-1 lg:order-2">
                        <span className="font-mono text-xs tracking-[0.3em] text-champagne-deep font-medium block mb-4">
                          {num} // {project.category}
                        </span>
                        <h3 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight group-hover:translate-x-3 transition-transform duration-500 ease-out">
                          {project.title}
                        </h3>
                        <p className="metadata mt-4 text-charcoal/70 uppercase tracking-[0.15em] text-xs">
                          {project.services.join(" · ")}
                        </p>
                        <p className="body-small text-charcoal/80 mt-6 max-w-sm">
                          {project.description}
                        </p>
                        <div className="mt-8 pt-6 border-t border-ink/10 flex items-center justify-between text-xs font-mono text-charcoal/60">
                          <span>LOCATION: {project.location}</span>
                          <span>YEAR: {project.year}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {index === 2 && (
                    // 03 SACRED VOWS: Widescreen cinematic Mandap with balanced framing
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                      <div className="lg:col-span-12 overflow-hidden relative aspect-[16/10] sm:aspect-[16/9] bg-ink/5">
                        <Image
                          src={project.heroMedia.src}
                          alt={project.heroMedia.alt}
                          fill
                          sizes="100vw"
                          className="object-cover object-top sm:object-center transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                      </div>
                      <div className="lg:col-span-8 flex flex-col justify-between">
                        <div>
                          <span className="font-mono text-xs tracking-[0.3em] text-champagne-deep font-medium block mb-3">
                            {num} // {project.category}
                          </span>
                          <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight">
                            {project.title}
                          </h3>
                        </div>
                        <p className="body-small text-charcoal/80 mt-4 max-w-lg">
                          {project.description}
                        </p>
                      </div>
                      <div className="lg:col-span-4 flex flex-col justify-end lg:items-end">
                        <p className="metadata text-charcoal/70 uppercase tracking-[0.15em] text-xs">
                          {project.services.join(" · ")}
                        </p>
                        <div className="mt-4 flex items-center gap-6 text-xs font-mono text-charcoal/60">
                          <span>{project.location}</span>
                          <span>{project.year}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {index === 3 && (
                    // 04 EDITORIAL MONOGRAPH: Asymmetric 2-column with large text
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                      <div className="lg:col-span-5 lg:col-start-2">
                        <span className="font-mono text-xs tracking-[0.3em] text-champagne-deep font-medium block mb-4">
                          {num} // {project.category}
                        </span>
                        <h3 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight group-hover:translate-x-3 transition-transform duration-500 ease-out">
                          {project.title}
                        </h3>
                        <p className="metadata mt-4 text-charcoal/70 uppercase tracking-[0.15em] text-xs">
                          {project.services.join(" · ")}
                        </p>
                        <p className="body-small text-charcoal/80 mt-6 max-w-sm">
                          {project.description}
                        </p>
                        <div className="mt-8 pt-6 border-t border-ink/10 flex items-center justify-between text-xs font-mono text-charcoal/60">
                          <span>{project.location}</span>
                          <span>{project.year}</span>
                        </div>
                      </div>
                      <div className="lg:col-span-5 lg:col-start-7 overflow-hidden relative aspect-[4/5] bg-ink/5">
                        <Image
                          src={project.heroMedia.src}
                          alt={project.heroMedia.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover object-top transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                  )}

                  {index >= 4 && (
                    // 05 GOLDEN HOUR ATELIER: Full-bleed wide layout
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                      <div className="lg:col-span-7 overflow-hidden relative aspect-[16/10] bg-ink/5">
                        <Image
                          src={project.heroMedia.src}
                          alt={project.heroMedia.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover object-top transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="lg:col-span-5">
                        <span className="font-mono text-xs tracking-[0.3em] text-champagne-deep font-medium block mb-4">
                          {num} // {project.category}
                        </span>
                        <h3 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight group-hover:translate-x-3 transition-transform duration-500 ease-out">
                          {project.title}
                        </h3>
                        <p className="metadata mt-4 text-charcoal/70 uppercase tracking-[0.15em] text-xs">
                          {project.services.join(" · ")}
                        </p>
                        <p className="body-small text-charcoal/80 mt-6 max-w-sm">
                          {project.description}
                        </p>
                        <div className="mt-8 pt-6 border-t border-ink/10 flex items-center justify-between text-xs font-mono text-charcoal/60">
                          <span>{project.location}</span>
                          <span>{project.year}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </Link>
              </article>
            );
          })}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-32 lg:mt-48 pt-12 border-t border-ink/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm font-ui text-charcoal/80 dark:text-white/70">
            Documenting authentic love stories and wedding cinema across Bhubaneswar, Odisha, and worldwide.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.22em] uppercase text-ink dark:text-white hover:text-champagne-deep dark:hover:text-champagne transition-colors underline underline-offset-8 font-semibold"
            >
              <span>VIEW THE ARCHIVE (10 PROJECTS · 19 FRAMES)</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
