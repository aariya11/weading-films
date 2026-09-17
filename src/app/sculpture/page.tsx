import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { LivingSculpture } from "@/components/sculpture/LivingSculpture";
import { WHATSAPP_LINK } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Living Sculpture Portfolio // Architectural Material Study",
  description:
    "An overdriven living sculpture experience. Transform flat photographic studies into living materials visitors can rotate 360 degrees and reshape in real-time.",
};

const COMPANION_STUDIES = [
  {
    code: "STUDY 01",
    title: "Kalinga Temple Fluting & Stone Acoustics",
    location: "Mukteshwar Enclave, Bhubaneswar",
    medium: "11th-Century Carved Terracotta",
    description:
      "A volumetric study deconstructing the parabolic acoustics of ancient temple pavilions where sacred Vedic mantras reverberate with mathematical purity.",
  },
  {
    code: "STUDY 02",
    title: "The Mobius Vow Knot & Odia Handloom Gold",
    location: "Heritage Atelier, Odisha",
    medium: "Pure Zari Silk & Antique Temple Gold",
    description:
      "Intertwined geometric rings reflecting the eternal continuity of marriage vows. Flowing threads render warm highlights under directional softboxes.",
  },
  {
    code: "STUDY 03",
    title: "Coastal Chiaroscuro & Saltwater Prisms",
    location: "Bay of Bengal Shoreline, Puri",
    medium: "Natural Sunlight & Optical 35mm Glass",
    description:
      "A masterclass in high-contrast ocean rim lighting, capturing the bride and groom amidst rolling surf and windswept raw silk textures.",
  },
];

export default function SculpturePage() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="flex-1 bg-paper text-ink pt-28 sm:pt-36 pb-36 min-h-screen">
        <div className="container max-w-6xl">
          {/* Header */}
          <header className="mb-12 lg:mb-16">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="label label-accent tracking-[0.3em] text-xs font-mono text-champagne-deep font-semibold">
                KINETIC ATELIER // VOLUMETRIC SCULPTURE STUDY
              </span>
              <span className="hidden sm:inline-block w-8 h-px bg-champagne-deep/40" />
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300/70 font-mono text-[10px] font-semibold tracking-wider uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                </span>
                60 FPS LIVING ENGINE ACTIVE
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-8xl tracking-tight leading-[0.95] mb-6 text-balance">
              LIVING SCULPTURE.
            </h1>
            <p className="body-large text-charcoal/80 max-w-3xl font-ui leading-relaxed">
              We have overdriven our archival sculpture portfolio. Experience the transformation of a flat two-dimensional photograph into a living, physical material that you can orbit in 360 degrees and reshape with dynamic kinetic torque.
            </p>
          </header>

          {/* Master Interactive Living Sculpture Component */}
          <div className="mb-24">
            <LivingSculpture />
          </div>

          {/* Companion Architectural Studies Ledger */}
          <section className="pt-16 border-t border-ink/10" aria-labelledby="companion-studies-heading">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold mb-2">
                  ARCHIVAL MONOGRAPHS
                </p>
                <h2 id="companion-studies-heading" className="font-display text-3xl sm:text-4xl text-ink">
                  Companion Spatial Studies.
                </h2>
              </div>
              <p className="text-xs font-mono text-charcoal/60 uppercase tracking-wider">
                DOCUMENTED ON LOCATION IN ODISHA
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {COMPANION_STUDIES.map((study) => (
                <article
                  key={study.code}
                  className="p-6 bg-paper-warm/50 border border-ink/10 rounded-sm hover:border-champagne-deep/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs text-charcoal/60">
                      <span className="text-champagne-deep font-bold">{study.code}</span>
                      <span className="text-[10px] uppercase">{study.location}</span>
                    </div>

                    <h3 className="font-display text-xl text-ink leading-snug">
                      {study.title}
                    </h3>

                    <p className="text-xs font-mono text-charcoal/70 bg-paper px-2.5 py-1 rounded border border-ink/5">
                      MEDIUM: {study.medium}
                    </p>

                    <p className="text-xs font-ui text-charcoal/80 leading-relaxed pt-1">
                      {study.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-ink/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-charcoal/60">BHUBANESWAR ATELIER</span>
                    <span className="text-champagne-deep font-bold">MONOGRAPH →</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Bottom Direct CTA */}
          <div className="mt-20 p-8 sm:p-12 bg-paper-warm border border-ink/10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl text-ink">
                Commission a Fine Art Wedding Study
              </h3>
              <p className="body-small text-charcoal/80 max-w-xl font-ui">
                Explore our full range of 4K wedding films, temple monographs, and chiaroscuro bridal editorial commissions in Bhubaneswar and worldwide.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#25D366] text-ink font-mono text-xs font-bold tracking-widest uppercase hover:opacity-95 transition-opacity rounded-xs shadow-xs"
              >
                DISCUSS COMMISSION ↗
              </a>
              <Link
                href="/work"
                className="px-8 py-4 bg-ink text-paper font-mono text-xs tracking-widest uppercase hover:bg-charcoal transition-colors rounded-xs shadow-xs"
              >
                VIEW ALL 10 FILMS →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
