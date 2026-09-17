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
            <p className="label label-accent mb-4 tracking-[0.3em] text-xs font-mono text-champagne-deep font-semibold">
              05 // DISCOURSE & PROCESS
            </p>
            <h2 id="journal-heading" className="font-display text-4xl sm:text-6xl lg:text-8xl tracking-tight leading-[0.95] text-ink ">
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
              <div className="relative aspect-[16/10] overflow-hidden bg-ink/5 mb-8">
                <Image
                  src={leadArticle.coverImage.src}
                  alt={leadArticle.coverImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[10px] tracking-[0.25em] bg-ink/80 text-white px-3 py-1 uppercase backdrop-blur-sm">
                    {leadArticle.category.replaceAll("_", " ")}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-mono text-charcoal/60">
                  <time dateTime={leadArticle.publishDate}>{formatDate(leadArticle.publishDate)}</time>
                  <span>·</span>
                  <span>{leadArticle.readTime}</span>
                  <span>·</span>
                  <span>BY {leadArticle.author.toUpperCase()}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-5xl tracking-tight leading-tight group-hover:text-champagne transition-colors duration-300">
                  {leadArticle.title}
                </h3>

                <p className="body-large font-serif italic text-charcoal/80 line-clamp-2">
                  &ldquo;{leadArticle.excerpt}&rdquo;
                </p>
              </div>
            </Link>
          </article>

          {/* Secondary Editorial Stack (Right) */}
          <div className="lg:col-span-5 divide-y divide-ink/10 lg:border-l lg:border-ink/10 lg:pl-12">
            {sideArticles.map((article) => (
              <article
                key={article.id}
                className="py-8 first:pt-0 last:pb-0 group"
                data-cursor="VIEW"
              >
                <Link
                  href={"/journal/" + article.slug}
                  className="block focus-visible:focus-visible"
                >
                  <div className="flex items-center gap-3 text-[11px] font-mono text-charcoal/60 mb-2">
                    <span className="text-champagne font-bold uppercase">
                      {article.category.replaceAll("_", " ")}
                    </span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h4 className="font-display text-2xl sm:text-3xl text-ink group-hover:text-champagne transition-colors duration-300 mb-3 leading-snug">
                    {article.title}
                  </h4>

                  <p className="body-small text-charcoal/70 line-clamp-2">
                    {article.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Explore All Stories CTA */}
        <div className="mt-28 lg:mt-36 pt-12 border-t border-ink/10 text-center">
          <Link
            href="/journal"
            className="inline-flex items-center gap-4 px-10 py-5 bg-ink text-white font-mono text-xs tracking-[0.25em] uppercase hover:bg-charcoal transition-colors duration-300"
            data-cursor="OPEN"
          >
            <span>READ ALL EDITORIAL ESSAYS (06)</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
