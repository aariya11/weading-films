import Link from "next/link";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { FloatingWhatsApp } from "@/components/ui/WhatsAppButton";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main
        id="main-content"
        className="min-h-screen bg-paper text-ink flex items-center justify-center pt-32 pb-24 px-6"
      >
        <div className="max-w-2xl text-center space-y-8">
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-champagne-deep font-semibold">
            404 // FRAME UNEXPOSED
          </p>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95]">
            THE MOMENT <br />
            <span className="italic font-serif font-light text-ink/70">HAS MOVED.</span>
          </h1>

          <p className="body-small text-charcoal/80 max-w-md mx-auto leading-relaxed font-ui">
            The archive reel or page you are looking for has been relocated or is yet to be captured. Explore our featured wedding stories from Bhubaneswar and beyond.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-4 bg-ink text-white font-mono text-xs tracking-[0.25em] uppercase hover:bg-charcoal transition-colors border border-ink"
            >
              RETURN TO ATELIER
            </Link>
            <Link
              href="/work"
              className="px-8 py-4 bg-transparent text-ink font-mono text-xs tracking-[0.25em] uppercase hover:bg-ink hover:text-white transition-colors border border-ink/30"
            >
              VIEW WEDDING ARCHIVE →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
