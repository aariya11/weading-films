"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project, ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

interface WorkIndexContentProps {
  projects: Project[];
}

const categories: { label: string; value: "ALL" | ProjectCategory }[] = [
  { label: "ALL", value: "ALL" },
  { label: "WEDDING FILM", value: "WEDDING FILM" },
  { label: "BRIDAL EDITORIAL", value: "BRIDAL EDITORIAL" },
  { label: "COASTAL PRE-WEDDING", value: "COASTAL PRE-WEDDING" },
  { label: "GROOM ATELIER", value: "GROOM ATELIER" },
  { label: "CINEMATIC LOVE STORY", value: "CINEMATIC LOVE STORY" },
  { label: "CEREMONY & RITUALS", value: "CEREMONY & RITUALS" },
  { label: "CELEBRATIONS & PROCESSION", value: "CELEBRATIONS & PROCESSION" },
  { label: "35MM & ANALOG GRAIN", value: "35MM & ANALOG GRAIN" },
];

export function WorkIndexContent({ projects }: WorkIndexContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | ProjectCategory>("ALL");

  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-32 pb-36 bg-paper text-ink min-h-screen">
      <div className="container">
        {/* Header */}
        <header className="mb-20 lg:mb-28">
          <p className="label label-accent mb-4 tracking-[0.3em] text-xs font-mono text-champagne-deep font-semibold">
            PORTFOLIO // COMPLETE ARCHIVE
          </p>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl tracking-tight leading-[0.95] mb-8">
            ALL WORKS.
          </h1>
          <p className="body-large text-charcoal/80 max-w-2xl font-ui">
            Every commission and wedding cinema study produced by WEDDING FILMS in Bhubaneswar, Odisha and worldwide. Filter by discipline or explore the complete archive.
          </p>
        </header>

        {/* Living Sculpture Study Feature Callout */}
        <div className="mb-16 p-6 sm:p-8 bg-paper-warm border border-ink/10 rounded-sm hover:border-champagne-deep/40 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-champagne-deep animate-ping" />
                <p className="font-mono text-xs uppercase tracking-widest text-champagne-deep font-bold">
                  OVERDRIVE FEATURE // KINETIC MATERIAL STUDY
                </p>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-ink">
                From Flat Study to Living 3D Sculpture
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/75 font-ui leading-relaxed">
                Step beyond two-dimensional photographs. Rotate our architectural temple studies 360 degrees and reshape living materials (liquid champagne gold, Kalinga stone, raw ivory silk) in real-time.
              </p>
            </div>
            <Link
              href="/sculpture"
              className="btn min-h-[48px] px-6 py-3.5 bg-ink !text-white font-mono text-xs tracking-widest uppercase font-bold hover:bg-charcoal hover:!text-white transition-colors inline-flex items-center justify-center gap-2 rounded-xs self-start md:self-auto shadow-sm whitespace-nowrap"
            >
              <span>EXPERIENCE LIVING SCULPTURE</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap border-b border-ink/10 pb-6 mb-20">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={cn(
                "font-mono text-xs tracking-[0.2em] uppercase py-2.5 px-2 min-h-[44px] inline-flex items-center transition-all duration-200 cursor-pointer touch-manipulation",
                selectedCategory === cat.value
                  ? "text-ink font-bold border-b-2 border-ink -mb-[2px]"
                  : "text-charcoal/80 font-medium hover:text-ink hover:font-bold"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Editorial Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 lg:gap-y-32">
          {filteredProjects.map((project, index) => {
            const isTall = index % 3 === 1;

            return (
              <article
                key={project.id}
                className="group relative"
                data-cursor="VIEW"
              >
                <Link
                  href={"/work/" + project.slug}
                  className="block focus-visible:focus-visible"
                >
                  <div
                    className={cn(
                      "relative overflow-hidden bg-ink/5 mb-6",
                      isTall ? "aspect-[4/5]" : "aspect-[16/11]"
                    )}
                  >
                    <Image
                      src={project.heroMedia.src}
                      alt={project.heroMedia.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="font-mono text-[10px] tracking-[0.25em] bg-ink/80 text-white px-2.5 py-1 backdrop-blur-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-charcoal/60">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink group-hover:text-champagne-deep transition-colors duration-300">
                      {project.title}
                    </h2>
                    <p className="metadata text-charcoal/70 text-xs uppercase tracking-wider">
                      {project.client} · {project.location}
                    </p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
