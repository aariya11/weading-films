"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { journal } from "@/data";
import { formatDate } from "@/lib/utils";
import { JournalCategory } from "@/types";

const categories: { label: string; value: "ALL" | JournalCategory }[] = [
  { label: "ALL DISPATCHES", value: "ALL" },
  { label: "STORIES", value: "STORIES" },
  { label: "LOCATIONS", value: "LOCATIONS" },
  { label: "PROCESS", value: "PROCESS" },
  { label: "BEHIND THE SCENES", value: "BEHIND_THE_SCENES" },
  { label: "PROJECTS", value: "PROJECTS" },
];

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | JournalCategory>("ALL");

  const filteredArticles =
    selectedCategory === "ALL"
      ? journal
      : journal.filter((item) => item.category === selectedCategory);

  const getCategoryCount = (value: "ALL" | JournalCategory) => {
    if (value === "ALL") return journal.length;
    return journal.filter((item) => item.category === value).length;
  };

  const leadArticle = selectedCategory === "ALL" ? filteredArticles[0] : null;
  const gridArticles = selectedCategory === "ALL" ? filteredArticles.slice(1) : filteredArticles;

  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="flex-1 bg-paper text-ink pt-32 pb-36 min-h-screen">
        <div className="container">
          {/* Header */}
          <header className="mb-14 lg:mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="label label-accent tracking-[0.3em] text-xs font-mono text-champagne-deep font-semibold">
                EDITORIAL DISPATCHES // TECHNICAL MEMOIRS
              </span>
              <span className="hidden sm:inline-block w-8 h-px bg-champagne-deep/40" />
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300/70 font-mono text-[10px] font-semibold tracking-wider uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                </span>
                PUBLISHING DESK ONLINE
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl tracking-tight leading-[0.95] mb-6">
              DISCOURSE.
            </h1>
            <p className="body-large text-charcoal/80 max-w-2xl font-ui leading-relaxed">
              Reflections on analog cinematography, spatial acoustics, architectural curation, and the discipline of visual restraint.
            </p>
          </header>

          {/* Publishing Console Dashboard Strip */}
          <div className="mb-14 p-6 sm:p-7 bg-paper-warm border border-ink/10 rounded-sm shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300/80 font-mono text-xs font-semibold">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
                    </span>
                    <span>ALL {journal.length} DISPATCHES PUBLISHED & SYNDICATED</span>
                  </div>
                  <span className="hidden sm:inline text-ink/20 font-mono text-xs">|</span>
                  <span className="font-mono text-xs text-charcoal/70 tracking-wider">
                    ARCHIVE: OPEN ACCESS
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-charcoal/75 font-ui max-w-2xl leading-relaxed">
                  Every essay is peer-reviewed by the WEDDING FILMS cinematography atelier, documented on location across Bhubaneswar, Puri, and heritage venues.
                </p>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-ink/10 flex-wrap sm:flex-nowrap">
                <div className="text-left">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal/60">EDITORIAL DESK</p>
                  <p className="font-mono text-xs font-bold text-ink">BHUBANESWAR</p>
                </div>
                <div className="h-8 w-px bg-ink/10 hidden sm:block" />
                <div className="text-left">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal/60">VOLUME</p>
                  <p className="font-mono text-xs font-bold text-champagne-deep">VOL. IV / 2024</p>
                </div>
                <div className="h-8 w-px bg-ink/10 hidden sm:block" />
                <div className="text-left">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal/60">CURATION</p>
                  <p className="font-mono text-xs font-bold text-emerald-800">100% COMPLETE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="mb-14">
            <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-ink/10">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {categories.map((cat) => {
                  const count = getCategoryCount(cat.value);
                  const isActive = selectedCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`font-mono text-xs tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-200 inline-flex items-center gap-2 border ${
                        isActive
                          ? "bg-ink text-paper border-ink font-semibold shadow-xs"
                          : "bg-paper-warm text-charcoal/70 border-ink/10 hover:border-champagne-deep/50 hover:text-ink hover:bg-paper"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? "bg-paper/20 text-paper"
                            : "bg-ink/5 text-charcoal/60"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="font-mono text-xs text-charcoal/60 tracking-wider hidden md:block">
                SHOWING: <span className="text-ink font-semibold">{filteredArticles.length} OF {journal.length} DISPATCHES</span>
              </div>
            </div>
          </div>

          {/* Lead Featured Article (When ALL is active) */}
          {leadArticle && (
            <div className="mb-20">
              <article
                className="group p-6 sm:p-8 bg-paper-warm border border-ink/10 hover:border-champagne-deep/40 transition-all duration-300 rounded-sm"
                data-cursor="VIEW"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-7">
                    <Link
                      href={"/journal/" + leadArticle.slug}
                      className="block focus-visible:focus-visible relative aspect-[16/10] overflow-hidden bg-ink/5 rounded-xs"
                    >
                      <Image
                        src={leadArticle.coverImage.src}
                        alt={leadArticle.coverImage.alt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                      />
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-200 text-[10px] font-mono tracking-widest uppercase border border-emerald-400/40 backdrop-blur-md shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          PUBLISHED
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-paper/95 text-champagne-deep border border-champagne-deep/40 text-[10px] font-mono font-bold tracking-widest uppercase backdrop-blur-md shadow-xs">
                          {leadArticle.category.replaceAll("_", " ")}
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="text-champagne-deep font-bold tracking-widest uppercase">
                        FEATURED DISPATCH #01
                      </span>
                      <span>·</span>
                      <span className="text-charcoal/70">{formatDate(leadArticle.publishDate)}</span>
                      <span>·</span>
                      <span className="text-charcoal/70">{leadArticle.readTime}</span>
                    </div>

                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink group-hover:text-champagne-deep transition-colors duration-300 leading-tight">
                      <Link href={"/journal/" + leadArticle.slug}>
                        {leadArticle.title}
                      </Link>
                    </h2>

                    <p className="body-large font-serif italic text-charcoal/80 line-clamp-3 leading-relaxed border-l-2 border-champagne-deep/40 pl-4">
                      &ldquo;{leadArticle.excerpt}&rdquo;
                    </p>

                    <div className="pt-4 border-t border-ink/10 flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-2.5 text-xs font-mono">
                        <span className="w-7 h-7 rounded-full bg-champagne/20 text-champagne-deep flex items-center justify-center text-[11px] font-bold border border-champagne-deep/30">
                          {leadArticle.author.split(" ").map((n) => n[0]).join("")}
                        </span>
                        <span className="text-charcoal/80 font-medium">
                          BY {leadArticle.author.toUpperCase()}
                        </span>
                      </div>

                      <Link
                        href={"/journal/" + leadArticle.slug}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper font-mono text-xs tracking-widest uppercase hover:bg-charcoal transition-colors duration-200 rounded-xs"
                      >
                        <span>READ ESSAY</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* Grid of Published Dispatches */}
          <div>
            {leadArticle && (
              <div className="flex items-center justify-between pb-6 mb-10 border-b border-ink/10">
                <p className="font-mono text-xs uppercase tracking-widest text-charcoal/60 font-semibold">
                  ARCHIVAL DISPATCHES & ESSAYS ({gridArticles.length})
                </p>
                <span className="font-mono text-xs text-champagne-deep font-semibold">
                  ALL ENTRIES VERIFIED & LIVE
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {gridArticles.map((article, index) => {
                const dispatchIndex = selectedCategory === "ALL" ? index + 2 : index + 1;
                return (
                  <article
                    key={article.id}
                    className="group relative flex flex-col justify-between p-5 bg-paper-warm/50 border border-ink/10 hover:border-champagne-deep/40 hover:bg-paper hover:shadow-md transition-all duration-300 rounded-sm"
                    data-cursor="VIEW"
                  >
                    <Link
                      href={"/journal/" + article.slug}
                      className="block focus-visible:focus-visible flex-1"
                    >
                      {/* Image Container with Badges */}
                      <div className="relative aspect-[16/11] overflow-hidden bg-ink/5 mb-5 rounded-xs">
                        <Image
                          src={article.coverImage.src}
                          alt={article.coverImage.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                        />
                        {/* Status Badges Overlay */}
                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/90 text-emerald-200 text-[10px] font-mono tracking-widest uppercase border border-emerald-400/30 backdrop-blur-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            PUBLISHED
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-paper/95 text-champagne-deep border border-champagne-deep/30 text-[10px] font-mono font-bold tracking-widest uppercase backdrop-blur-md shadow-xs">
                            {article.category.replaceAll("_", " ")}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="space-y-3">
                        {/* Meta strip */}
                        <div className="flex items-center gap-3 text-xs font-mono text-charcoal/60">
                          <span className="text-champagne-deep font-semibold">
                            #{String(dispatchIndex).padStart(2, "0")}
                          </span>
                          <span>·</span>
                          <time dateTime={article.publishDate}>{formatDate(article.publishDate)}</time>
                          <span>·</span>
                          <span>{article.readTime}</span>
                        </div>

                        {/* Title */}
                        <h2 className="font-display text-2xl text-ink group-hover:text-champagne-deep transition-colors duration-300 leading-snug">
                          {article.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="body-small text-charcoal/70 line-clamp-3 font-ui leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </Link>

                    {/* Footer / Byline */}
                    <div className="pt-4 mt-5 border-t border-ink/10 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-champagne/20 text-champagne-deep flex items-center justify-center text-[10px] font-bold border border-champagne-deep/30">
                          {article.author.split(" ").map((n) => n[0]).join("")}
                        </span>
                        <span className="text-charcoal/80 font-medium">
                          {article.author.toUpperCase()}
                        </span>
                      </div>
                      <Link
                        href={"/journal/" + article.slug}
                        className="text-champagne-deep font-semibold group-hover:translate-x-0.5 transition-transform duration-300 inline-flex items-center gap-1"
                      >
                        <span>READ</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
