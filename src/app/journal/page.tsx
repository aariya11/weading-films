"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { journal } from "@/data";
import { formatDate, cn } from "@/lib/utils";
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

  // Compute total immersion reading time across all dispatches
  const totalReadMinutes = journal.reduce((acc, item) => {
    const mins = parseInt(item.readTime, 10);
    return acc + (isNaN(mins) ? 0 : mins);
  }, 0);

  const totalPillarsCount = categories.filter((c) => c.value !== "ALL").length;

  const leadArticle = selectedCategory === "ALL" ? filteredArticles[0] : null;
  const gridArticles = selectedCategory === "ALL" ? filteredArticles.slice(1) : filteredArticles;

  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="flex-1 bg-paper text-ink pt-32 pb-36 min-h-screen">
        <div className="container">
          {/* Header */}
          <header className="mb-12 lg:mb-16">
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

          {/* ─────────────────────────────────────────────────────────────
              REFINED PUBLISHING DASHBOARD: AUTHORITATIVE METRIC HIERARCHY
              Spacious 4-cell metric ledger with prominent numbers
              ───────────────────────────────────────────────────────────── */}
          <section
            aria-labelledby="publishing-dashboard-heading"
            className="mb-14 lg:mb-16 p-6 sm:p-8 lg:p-10 bg-paper-warm border border-ink/15 rounded-lg shadow-xs space-y-8"
          >
            {/* Top Desk Ribbon */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink/10">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
                </span>
                <h2
                  id="publishing-dashboard-heading"
                  className="font-mono text-xs uppercase tracking-widest text-ink font-bold"
                >
                  PUBLISHING CONSOLE // ATELIER ARCHIVE
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300/80 font-mono text-[10px] font-bold uppercase tracking-wider">
                  OPEN ACCESS
                </span>
              </div>

              <div className="flex items-center gap-3 sm:gap-5 font-mono text-xs text-charcoal/70 flex-wrap">
                <span>EDITORIAL DESK: <strong className="text-ink font-semibold">BHUBANESWAR</strong></span>
                <span className="text-ink/20 hidden sm:inline">|</span>
                <span>VOLUME: <strong className="text-champagne-deep font-semibold">VOL. IV / 2024</strong></span>
              </div>
            </div>

            {/* Key Numbers Grid — High Visual Authority & Generous Spacing */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 items-start">
              {/* Stat 1: Total Published Dispatches */}
              <div className="space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-charcoal/60 block font-semibold">
                  PUBLISHED DISPATCHES
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-none">
                    {String(journal.length).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-800 font-bold uppercase tracking-wider bg-emerald-100/80 border border-emerald-300/80 px-1.5 py-0.5 rounded">
                    LIVE
                  </span>
                </div>
                <p className="text-xs font-ui text-charcoal/70">
                  All {journal.length} dispatches syndicated
                </p>
              </div>

              {/* Stat 2: Editorial Pillars */}
              <div className="space-y-2 sm:border-l sm:border-ink/10 sm:pl-6 lg:pl-8">
                <span className="font-mono text-[11px] uppercase tracking-wider text-charcoal/60 block font-semibold">
                  EDITORIAL PILLARS
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-champagne-deep leading-none">
                    {String(totalPillarsCount).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] text-champagne-deep font-bold uppercase tracking-wider bg-champagne-deep/10 border border-champagne-deep/30 px-1.5 py-0.5 rounded">
                    THEMATIC
                  </span>
                </div>
                <p className="text-xs font-ui text-charcoal/70">
                  Stories, Locations, Craft &amp; BTS
                </p>
              </div>

              {/* Stat 3: Total Immersion Reading Time */}
              <div className="space-y-2 lg:border-l lg:border-ink/10 lg:pl-8">
                <span className="font-mono text-[11px] uppercase tracking-wider text-charcoal/60 block font-semibold">
                  TOTAL READING TIME
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-none">
                    {totalReadMinutes}
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-charcoal/60 tracking-wider">
                    MIN
                  </span>
                </div>
                <p className="text-xs font-ui text-charcoal/70">
                  Across full monograph series
                </p>
              </div>

              {/* Stat 4: Atelier Curation Status */}
              <div className="space-y-2 sm:border-l sm:border-ink/10 sm:pl-6 lg:pl-8">
                <span className="font-mono text-[11px] uppercase tracking-wider text-charcoal/60 block font-semibold">
                  PEER REVIEW STATUS
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-emerald-800 leading-none">
                    100%
                  </span>
                  <span className="font-mono text-[10px] text-emerald-800 font-bold uppercase tracking-wider bg-emerald-100/80 border border-emerald-300/80 px-1.5 py-0.5 rounded">
                    VERIFIED
                  </span>
                </div>
                <p className="text-xs font-ui text-charcoal/70">
                  Atelier mastered &amp; archived
                </p>
              </div>
            </div>

            {/* Bottom Atelier Mandate Ribbon */}
            <div className="pt-6 border-t border-ink/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-ui text-charcoal/75">
              <p className="max-w-2xl leading-relaxed">
                Every essay is peer-reviewed by the WEDDING FILMS cinematography atelier, documented on location across Bhubaneswar, Puri, and heritage venues across Odisha.
              </p>
              <div className="shrink-0 inline-flex items-center gap-2 font-mono text-[11px] text-charcoal/70">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>ALL {journal.length} ESSAYS SYNDICATED</span>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────
              INTERACTIVE CATEGORY FILTER PILLS
              ───────────────────────────────────────────────────────────── */}
          <div className="mb-14 sm:mb-16">
            <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-ink/10">
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                <span className="font-mono text-[11px] uppercase tracking-widest text-charcoal/50 mr-1 hidden sm:inline">
                  CATEGORY:
                </span>
                {categories.map((cat) => {
                  const count = getCategoryCount(cat.value);
                  const isActive = selectedCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={cn(
                        "btn font-mono text-xs tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-200 inline-flex items-center gap-2 border touch-manipulation min-h-[40px] cursor-pointer",
                        isActive
                          ? "bg-ink !text-white border-ink font-bold shadow-xs"
                          : "bg-paper-warm !text-charcoal border-ink/15 hover:border-ink hover:!text-ink hover:bg-paper font-semibold"
                      )}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={cn(
                          "text-[10px] px-2 py-0.5 rounded-full font-bold",
                          isActive
                            ? "bg-white/20 !text-white"
                            : "bg-ink/5 !text-charcoal"
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="font-mono text-xs text-charcoal/60 tracking-wider hidden md:block">
                SHOWING: <span className="text-ink font-bold">{filteredArticles.length} OF {journal.length} DISPATCHES</span>
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
                        className="btn inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 bg-ink !text-white font-mono text-xs tracking-widest uppercase font-bold hover:bg-charcoal hover:!text-white transition-colors duration-200 rounded-xs shadow-xs"
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
                  ARCHIVAL DISPATCHES &amp; ESSAYS ({gridArticles.length})
                </p>
                <span className="font-mono text-xs text-champagne-deep font-semibold">
                  ALL ENTRIES VERIFIED &amp; LIVE
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
