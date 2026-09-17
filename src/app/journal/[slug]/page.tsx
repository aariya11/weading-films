import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { journal } from "@/data";
import { formatDate } from "@/lib/utils";

interface JournalSlugProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: JournalSlugProps): Promise<Metadata> {
  const { slug } = await params;
  const article = journal.find((j) => j.slug === slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title + " — WEDDING FILMS Journal",
      description: article.excerpt,
      images: [{ url: article.coverImage.src, alt: article.title }],
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  return journal.map((item) => ({ slug: item.slug }));
}

export default async function JournalArticlePage({ params }: JournalSlugProps) {
  const { slug } = await params;
  const article = journal.find((j) => j.slug === slug);

  if (!article) {
    notFound();
  }

  const currentIndex = journal.findIndex((j) => j.id === article.id);
  const nextArticle = journal[(currentIndex + 1) % journal.length];
  const paragraphs = article.content.trim().split("\n\n");

  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="bg-paper text-ink pt-28 sm:pt-36 pb-36 min-h-screen">
        <div className="container max-w-4xl">
          {/* Breadcrumb / Back */}
          <div className="mb-8">
            <Link
              href="/journal"
              className="font-mono text-xs tracking-[0.25em] uppercase text-champagne-deep font-semibold hover:underline inline-flex items-center gap-2"
            >
              <span>←</span>
              <span>BACK TO DISPATCHES</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-14">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300/80 font-mono text-[10px] font-semibold tracking-wider uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                </span>
                PUBLISHED · LIVE DISPATCH
              </span>
              <span className="px-3 py-1 rounded-full bg-champagne/15 text-champagne-deep border border-champagne-deep/30 font-mono text-[10px] font-bold tracking-wider uppercase">
                {article.category.replaceAll("_", " ")}
              </span>
              <span className="text-ink/20">·</span>
              <time dateTime={article.publishDate} className="text-charcoal/70 tracking-wider">
                {formatDate(article.publishDate)}
              </time>
              <span className="text-ink/20">·</span>
              <span className="text-charcoal/70 tracking-wider">{article.readTime}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.04] mb-8 text-balance">
              {article.title}
            </h1>

            <p className="body-large font-serif italic text-2xl sm:text-3xl text-charcoal/85 leading-relaxed border-l-3 border-champagne-deep pl-6">
              &ldquo;{article.excerpt}&rdquo;
            </p>

            <div className="mt-8 pt-6 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-charcoal/70">
              <div>
                <span>CURATED BY </span>
                <strong className="text-ink font-semibold">{article.author.toUpperCase()}</strong>
                <span> · WEDDING FILMS EDITORIAL</span>
              </div>
              <span className="text-champagne-deep">BHUBANESWAR, ODISHA</span>
            </div>
          </header>

          {/* Lead Image with Fine Framing */}
          <div className="relative aspect-[16/9] sm:aspect-[2/1] overflow-hidden bg-ink/5 mb-14 border border-ink/10" data-cursor="VIEW">
            <Image
              src={article.coverImage.src}
              alt={article.coverImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>

          {/* At A Glance Scannable Takeaway Card */}
          <div className="mb-14 p-6 bg-paper-warm border-l-4 border-champagne-deep border-y border-r border-ink/10 rounded-r-lg">
            <p className="font-mono text-xs font-bold text-champagne-deep tracking-[0.2em] uppercase mb-2">
              AT A GLANCE // EDITORIAL ESSENCE
            </p>
            <p className="text-sm font-ui text-charcoal/90 leading-relaxed font-medium">
              {article.excerpt}
            </p>
          </div>

          {/* Impeccably Typeset Editorial Body */}
          <article className="space-y-10 text-charcoal/85 leading-relaxed font-ui max-w-3xl mx-auto">
            {paragraphs.map((para, idx) => {
              if (idx === 0) {
                return (
                  <p
                    key={idx}
                    className="text-xl sm:text-2xl font-serif text-ink leading-relaxed font-light first-letter:text-5xl first-letter:font-display first-letter:font-normal first-letter:mr-3 first-letter:float-left first-letter:leading-none first-letter:text-ink"
                  >
                    {para.trim()}
                  </p>
                );
              }

              // Insert scannable section anchor / thematic milestone at mid-point
              if (idx === 1) {
                return (
                  <div key={idx} className="space-y-6 pt-6 border-t border-ink/10">
                    <h2 className="font-display text-2xl sm:text-3xl text-ink tracking-tight">
                      LIGHT, DEVOTION & TIMELESS GRAIN
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-charcoal/85">
                      {para.trim()}
                    </p>
                  </div>
                );
              }

              return (
                <p key={idx} className="text-base sm:text-lg leading-relaxed text-charcoal/85">
                  {para.trim()}
                </p>
              );
            })}

            {/* Editorial Pullquote */}
            <blockquote className="my-14 py-8 border-y border-ink/15 text-center font-display text-2xl sm:text-4xl text-ink font-light italic leading-snug">
              &ldquo;When visual form originates from the actual physics of the subject, the outcome requires zero decorative artifice.&rdquo;
            </blockquote>

            <div className="space-y-6 pt-4 border-t border-ink/10">
              <h2 className="font-display text-2xl sm:text-3xl text-ink tracking-tight">
                AN ENDURING HEIRLOOM ETHOS
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-charcoal/85">
                This is the ethos that defines every commission in our archive. We avoid trend cycles in favor of timeless physical qualities — grain, shadow, breath, and silence.
              </p>
            </div>
          </article>

          {/* Commission Callout */}
          <div className="mt-20 p-8 bg-paper-warm border border-ink/10 text-center rounded-lg max-w-3xl mx-auto space-y-4">
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-champagne-deep font-bold">
              COMMISSIONS & INQUIRIES
            </p>
            <h3 className="font-display text-2xl sm:text-3xl text-ink">
              ENVISION YOUR WEDDING CINEMA WITH US
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/70 max-w-md mx-auto leading-relaxed">
              We accept a limited number of commissions each wedding season across Bhubaneswar, Odisha, and luxury destinations worldwide.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="btn min-h-[44px] px-6 py-2.5 rounded-full bg-ink !text-white hover:bg-charcoal hover:!text-white font-mono text-xs tracking-wider uppercase font-bold transition-all shadow-xs flex items-center justify-center cursor-pointer"
              >
                Inquire About Your Date
              </Link>
              <a
                href="https://wa.me/919124885729"
                target="_blank"
                rel="noopener noreferrer"
                className="btn min-h-[44px] px-6 py-2.5 rounded-full border border-[#1b7a43]/40 !text-[#1b7a43] hover:bg-[#1b7a43] hover:!text-white font-mono text-xs tracking-wider uppercase font-bold transition-all flex items-center justify-center cursor-pointer"
              >
                WhatsApp Concierge ↗
              </a>
            </div>
          </div>

          {/* Next Article Read */}
          <div className="mt-24 pt-14 border-t border-ink/10 max-w-3xl mx-auto text-center">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-semibold mb-3">
              NEXT ESSAY
            </p>
            <Link
              href={"/journal/" + nextArticle.slug}
              className="group inline-block focus-visible:focus-visible"
              data-cursor="OPEN"
            >
              <h3 className="font-display text-3xl sm:text-5xl text-ink group-hover:text-champagne-deep transition-colors duration-300">
                {nextArticle.title}
              </h3>
              <p className="font-mono text-xs text-charcoal/60 uppercase tracking-widest mt-4">
                READ ESSAY →
              </p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </> 
  );
}