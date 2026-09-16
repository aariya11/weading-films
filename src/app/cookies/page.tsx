import { Metadata } from "next";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie preferences and tracking disclosures for WEDDING FILMS.",
};

export default function CookiesPage() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main className="flex-1 bg-paper text-ink pt-32 pb-36 min-h-screen">
        <div className="container max-w-4xl">
          <p className="label label-accent mb-4 tracking-[0.3em] text-xs font-mono">
            LEGAL // COOKIES & PREFERENCES
          </p>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl mb-12">
            COOKIE POLICY.
          </h1>

          <div className="space-y-10 body-small text-charcoal/80 leading-relaxed border-t border-ink/10 pt-10 font-ui">
            <section>
              <h2 className="font-display text-2xl text-ink mb-3">1. ESSENTIAL FUNCTIONALITY ONLY</h2>
              <p>
                WEDDING FILMS maintains a minimalist technological philosophy. We do not use third-party behavioral advertising pixels, cross-site trackers, or invasive data brokers.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3">2. WHAT WE STORE</h2>
              <p>
                We only store essential session identifiers required for page state navigation and anonymous, aggregated performance metrics (such as Core Web Vitals) to ensure smooth asset rendering.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3">3. CONTROLLING PREFERENCES</h2>
              <p>
                You can configure your browser to reject all cookies or notify you when a cookie is placed. Because our website relies solely on standard web technology, rejecting cookies will not impair your visual experience.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
