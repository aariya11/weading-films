import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { services } from "@/data";


export const metadata: Metadata = {
  title: "Services & Capabilities",
  description:
    "Comprehensive wedding cinematography, fine art editorial photography, and heirloom visual archives from WEDDING FILMS — Bhubaneswar, Odisha.",
};

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="flex-1 bg-paper text-ink pt-32 pb-36 min-h-screen">
        <div className="container">
          {/* Header */}
          <header className="mb-24 lg:mb-36">
            <p className="label label-accent mb-4 tracking-[0.3em] text-xs font-mono text-champagne-deep font-medium">
              SERVICES // DISCIPLINARY PRACTICE
            </p>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl tracking-tight leading-[0.95] mb-8">
              CAPABILITIES.
            </h1>
            <p className="body-large text-charcoal/80 max-w-2xl font-ui leading-relaxed">
              We operate as a single creative organism across stills, cinema, art direction, and production logistics. Every discipline informs the next.
            </p>
          </header>

          {/* Detailed Service Blocks */}
          <div className="space-y-36 lg:space-y-48">
            {services.map((service, index) => {
              const num = String(index + 1).padStart(2, "0");
              const isEven = index % 2 === 0;

              return (
                <article
                  key={service.id}
                  id={service.slug}
                  className="pt-12 border-t border-ink/10"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    {/* Left: Typography, descriptions, scope */}
                    <div className="lg:col-span-6 space-y-8">
                      <div>
                        <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-semibold block mb-3">
                          DISCIPLINE {num}
                        </span>
                        <h2 className="font-display text-4xl sm:text-6xl text-ink tracking-tight">
                          {service.name}
                        </h2>
                      </div>

                      <p className="body-large font-serif italic text-2xl text-ink/90 leading-relaxed">
                        &ldquo;{service.description}&rdquo;
                      </p>

                      <p className="body-small text-charcoal/80 leading-relaxed font-ui">
                        {service.longDescription}
                      </p>

                      <div className="pt-6 border-t border-ink/10">
                        <p className="font-mono text-xs tracking-[0.2em] uppercase text-champagne-deep font-semibold mb-4">
                          DELIVERABLE SPECIFICATIONS
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-ui text-charcoal/80">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-champagne-deep rounded-full" />
                            Pre-production Treatments
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-champagne-deep rounded-full" />
                            On-Location & Studio Capture
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-champagne-deep rounded-full" />
                            High-End Color & Retouching
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-champagne-deep rounded-full" />
                            Master Archives & Exhibition Assets
                          </li>
                        </ul>
                      </div>

                      <div className="pt-4">
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase text-ink hover:text-champagne-deep transition-colors underline underline-offset-8"
                        >
                          <span>COMMISSION THIS DISCIPLINE</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>

                    {/* Right: Large Editorial Service Photo */}
                    <div className="lg:col-span-6 overflow-hidden relative aspect-[4/5] bg-ink/5" data-cursor="VIEW">
                      <Image
                        src={service.image.src}
                        alt={service.image.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom Consultation CTA */}
          <div className="mt-36 lg:mt-48 p-12 lg:p-20 bg-ink text-white text-center">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-champagne mb-4">
              TAILORED PRODUCTIONS
            </p>
            <h2 className="font-display text-4xl sm:text-6xl mb-6">
              HAVE A COMPLEX BRIEF?
            </h2>
            <p className="body-large text-white/70 max-w-xl mx-auto mb-10 font-ui">
              We design bespoke cross-disciplinary teams tailored specifically to the scope, territory, and narrative needs of your commission.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-10 py-5 bg-champagne text-ink text-xs font-mono tracking-[0.25em] uppercase font-bold hover:bg-white transition-colors"
            >
              REQUEST A PRODUCTION CONSULTATION →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
