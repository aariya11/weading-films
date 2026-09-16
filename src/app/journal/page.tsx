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
  { label: "PROCESS", value: "PROCESS" },
  { label: "BEHIND THE SCENES", value: "BEHIND_THE_SCENES" },
  { label: "LOCATIONS", value: "LOCATIONS" },
  { label: "PROJECTS", value: "PROJECTS" },
  { label: "STORIES", value: "STORIES" },
];

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | JournalCategory>("ALL");

  const filteredArticles =
    selectedCategory === "ALL"
      ? journal
      : journal.filter((item) => item.category === selectedCategory);

  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="flex-1 bg-paper text-ink pt-32 pb-36 min-h-screen">
        <div className="container">
          {/* Header */}
          <header className="mb-20 lg:mb-28">
            <p className="label label-accent mb-4 tracking-[0.3em] text-xs font-mono text-champagne-deep font-medium">
              JOURNAL // ESSAYS & TECHNICAL NOTES
            </p>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl tracking-tight leading-[0.95] mb-8">
              DISCOURSE.
            </h1>
            <p className="body-large text-charcoal/80 max-w-2xl font-ui leading-relaxed">
              Reflections on analog cinematography, spatial acoustics, architectural curation, and the discipline of visual restraint.
            </p>
          </header>

          {/* Category Filter */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap border-b border-ink/10 pb-6 mb-20">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={
                  "font-mono text-xs tracking-[0.2em] uppercase py-1.5 transition-colors duration-200 " +
                  (selectedCategory === cat.value
                    ? "text-ink font-bold border-b border-ink"
                    : "text-charcoal/50 hover:text-ink")
                }
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Magazine Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 lg:gap-y-28">
            {filteredArticles.map((article, index) => (
              <article
                key={article.id}
                className="group relative"
                data-cursor="VIEW"
              >
                <Link
                  href={"/journal/" + article.slug}
                  className="block focus-visible:focus-visible"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-ink/5 mb-6">
                    <Image
                      src={article.coverImage.src}
                      alt={article.coverImage.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="font-mono text-[10px] tracking-[0.2em] bg-ink/80 text-white px-2.5 py-1 uppercase backdrop-blur-sm">
                        {article.category.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs font-mono text-charcoal/60">
                      <time dateTime={article.publishDate}>{formatDate(article.publishDate)}</time>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl text-ink group-hover:text-champagne transition-colors duration-300 leading-snug">
                      {article.title}
                    </h2>

                    <p className="body-small text-charcoal/70 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <p className="font-mono text-xs text-champagne-deep font-semibold pt-2">
                      BY {article.author.toUpperCase()} →
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
