import Link from "next/link";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";

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
              className="btn btn-primary min-h-[48px] px-8 py-3.5 rounded-xs !bg-[#0f0f0f] !text-white font-mono text-xs tracking-[0.25em] uppercase font-bold hover:!bg-[#2d2d2d] hover:!text-white border border-[#0f0f0f] flex items-center justify-center shadow-xs cursor-pointer"
            >
              RETURN TO ATELIER
            </Link>
            <Link
              href="/work"
              className="btn min-h-[48px] px-8 py-3.5 rounded-xs bg-transparent !text-[#0f0f0f] font-mono text-xs tracking-[0.25em] uppercase font-bold hover:!bg-[#0f0f0f] hover:!text-white border border-[#0f0f0f]/30 flex items-center justify-center cursor-pointer"
            >
              VIEW WEDDING ARCHIVE →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
