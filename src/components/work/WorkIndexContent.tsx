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
          <p className="label label-accent mb-4 tracking-[0.3em] text-xs font-mono">
            PORTFOLIO // COMPLETE ARCHIVE
          </p>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl tracking-tight leading-[0.95] mb-8">
            ALL WORKS.
          </h1>
          <p className="body-large text-charcoal/80 max-w-2xl font-ui">
            Every commission and self-directed study produced by WEDDING FILMS. Filter by discipline or explore the complete chronological sequence.
          </p>
        </header>

        {/* Filter Navigation */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap border-b border-ink/10 pb-6 mb-20">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={cn(
                "font-mono text-xs tracking-[0.2em] uppercase py-1.5 transition-colors duration-200",
                selectedCategory === cat.value
                  ? "text-ink font-bold border-b border-ink"
                  : "text-charcoal/50 hover:text-ink"
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
                      className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="font-mono text-[10px] tracking-[0.25em] bg-ink/80 text-white px-2.5 py-1 backdrop-blur-sm">
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-charcoal/60">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink group-hover:text-champagne transition-colors duration-300">
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
