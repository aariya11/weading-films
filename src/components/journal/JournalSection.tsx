"use client";

import Link from "next/link";
import Image from "next/image";
import { journal } from "@/data";
import { formatDate } from "@/lib/utils";

export function JournalSection() {
  const leadArticle = journal[0];
  const sideArticles = journal.slice(1, 4);

  return (
    <section id="journal" className="relative py-28 lg:py-44 bg-paper-warm text-ink border-t border-ink/10" aria-labelledby="journal-heading">
      <div className="container">
        {/* Section Header */}
        <header className="mb-20 lg:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-ink/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <p className="label label-accent tracking-[0.3em] text-xs font-mono text-champagne-deep font-semibold">
                05 // DISCOURSE & PROCESS
              </p>
              <span className="hidden sm:inline-block w-6 h-px bg-champagne-deep/40" />
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300/70 font-mono text-[10px] font-semibold tracking-wider uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                </span>
                6 DISPATCHES PUBLISHED & ARCHIVED
              </span>
            </div>
            <h2 id="journal-heading" className="font-display text-4xl sm:text-6xl lg:text-8xl tracking-tight leading-[0.95] text-ink">
              JOURNAL.
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="body-small text-charcoal/80 leading-relaxed font-ui">
              Critical essays on visual culture, technical field notes, and reflections on the craft of light and time.
            </p>
          </div>
        </header>

        {/* Magazine-Style Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Main Lead Feature Article (Left) */}
          <article className="lg:col-span-7 group" data-cursor="VIEW">
            <Link
              href={"/journal/" + leadArticle.slug}
              className="block focus-visible:focus-visible"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ink/5 mb-8 rounded-xs">
                <Image
                  src={leadArticle.coverImage.src}
                  alt={leadArticle.coverImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-200 text-[10px] font-mono tracking-widest uppercase border border-emerald-400/40 backdrop-blur-md shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    PUBLISHED
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-paper/95 text-champagne-deep border border-champagne-deep/40 text-[10px] font-mono font-bold tracking-widest uppercase backdrop-blur-md shadow-xs">
                    {leadArticle.category.replaceAll("_", " ")}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-mono text-charcoal/60 flex-wrap">
                  <span className="text-champagne-deep font-bold uppercase tracking-wider">DISPATCH #01</span>
                  <span>·</span>
                  <time dateTime={leadArticle.publishDate}>{formatDate(leadArticle.publishDate)}</time>
                  <span>·</span>
                  <span>{leadArticle.readTime}</span>
                  <span>·</span>
                  <span>BY {leadArticle.author.toUpperCase()}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-5xl tracking-tight leading-tight group-hover:text-champagne-deep transition-colors duration-300">
                  {leadArticle.title}
                </h3>

                <p className="body-large font-serif italic text-charcoal/80 line-clamp-2 border-l-2 border-champagne-deep/40 pl-4">
                  &ldquo;{leadArticle.excerpt}&rdquo;
                </p>
              </div>
            </Link>
          </article>

          {/* Secondary Editorial Stack (Right) */}
          <div className="lg:col-span-5 divide-y divide-ink/10 lg:border-l lg:border-ink/10 lg:pl-12">
            {sideArticles.map((article, index) => (
              <article
                key={article.id}
                className="py-8 first:pt-0 last:pb-0 group"
                data-cursor="VIEW"
              >
                <Link
                  href={"/journal/" + article.slug}
                  className="block focus-visible:focus-visible"
                >
                  <div className="flex items-center gap-2.5 text-[11px] font-mono text-charcoal/60 mb-2.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300/70 text-[9px] font-mono font-bold tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      PUBLISHED
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-champagne/15 text-champagne-deep border border-champagne-deep/30 font-mono text-[10px] font-bold uppercase tracking-wider">
                      {article.category.replaceAll("_", " ")}
                    </span>
                    <span>·</span>
                    <time dateTime={article.publishDate}>{formatDate(article.publishDate)}</time>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h4 className="font-display text-2xl sm:text-3xl text-ink group-hover:text-champagne-deep transition-colors duration-300 mb-3 leading-snug">
                    {article.title}
                  </h4>

                  <p className="body-small text-charcoal/70 line-clamp-2 font-ui leading-relaxed">
                    {article.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Explore All Stories CTA */}
        <div className="mt-24 lg:mt-32 pt-12 border-t border-ink/10 text-center">
          <Link
            href="/journal"
            className="inline-flex items-center gap-4 px-10 py-5 bg-ink text-paper font-mono text-xs tracking-[0.25em] uppercase hover:bg-charcoal transition-colors duration-300 rounded-xs shadow-xs"
            data-cursor="OPEN"
          >
            <span>EXPLORE FULL PUBLISHING ARCHIVE (06 DISPATCHES)</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
