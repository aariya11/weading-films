import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { journal } from "@/data";
import { formatDate } from "@/lib/utils";
import { FloatingWhatsApp } from "@/components/ui/WhatsAppButton";

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

  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="bg-paper text-ink pt-32 pb-36 min-h-screen">
        <div className="container">
          {/* Breadcrumb / Back */}
          <div className="mb-12">
            <Link
              href="/journal"
              className="font-mono text-xs tracking-[0.25em] uppercase text-champagne-deep font-semibold hover:underline inline-flex items-center gap-2"
            >
              <span>←</span>
              <span>BACK TO DISPATCHES</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="max-w-4xl mb-16 lg:mb-24">
            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.25em] text-champagne mb-6">
              <span>{article.category.replace("_", " ")}</span>
              <span>·</span>
              <time dateTime={article.publishDate}>{formatDate(article.publishDate)}</time>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-8xl tracking-tight leading-[1.02] mb-8">
              {article.title}
            </h1>

            <p className="body-large font-serif italic text-2xl sm:text-3xl text-charcoal/80 leading-relaxed border-l-2 border-champagne pl-6">
              &ldquo;{article.excerpt}&rdquo;
            </p>

            <div className="mt-8 pt-6 border-t border-ink/10 flex items-center gap-4 text-xs font-mono text-charcoal/60">
              <span>WRITTEN BY {article.author.toUpperCase()}</span>
              <span>·</span>
              <span>WEDDING FILMS EDITORIAL</span>
            </div>
          </header>

          {/* Full-width Lead Image */}
          <div className="relative aspect-[21/10] sm:aspect-[2.2/1] overflow-hidden bg-ink/5 mb-20 lg:mb-28" data-cursor="VIEW">
            <Image
              src={article.coverImage.src}
              alt={article.coverImage.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Article Body Content (Narrow editorial column, deep whitespace) */}
          <div className="max-w-3xl mx-auto space-y-8 text-charcoal/90 body-large leading-relaxed font-ui">
            {article.content.trim().split("\n\n").map((paragraph, idx) => (
              <p key={idx} className={idx === 0 ? "text-xl sm:text-2xl font-serif leading-relaxed text-ink" : ""}>
                {paragraph.trim()}
              </p>
            ))}

            <blockquote className="my-12 py-8 border-y border-ink/10 text-center font-display text-2xl sm:text-4xl text-ink font-light italic leading-snug">
              &ldquo;When visual form originates from the actual physics of the subject, the outcome requires zero decorative artifice.&rdquo;
            </blockquote>

            <p>
              This is the ethos that defines every commission in our archive. We avoid trend cycles in favor of timeless physical qualities — grain, shadow, breath, and silence.
            </p>
          </div>

          {/* Next Article Read */}
          <div className="mt-32 pt-16 border-t border-ink/10 max-w-3xl mx-auto text-center">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-semibold mb-4">
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
                READ ARTICLE →
              </p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
