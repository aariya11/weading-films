import { Metadata } from "next";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie policy and transparent tracking disclosure for WEDDING FILMS, Bhubaneswar, Odisha.",
};

export default function CookiesPage() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="flex-1 bg-paper text-ink pt-32 pb-36 min-h-screen">
        <div className="container max-w-4xl">
          <p className="label label-accent mb-4 tracking-[0.3em] text-xs font-mono text-champagne-deep font-medium">
            LEGAL // COOKIES & STORAGE PREFERENCES
          </p>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl mb-6 tracking-tight">
            COOKIE POLICY.
          </h1>
          <p className="font-mono text-xs text-charcoal/60 uppercase tracking-widest mb-12">
            STRICTLY ESSENTIAL STORAGE · ZERO BEHAVIORAL ADVERTISING PIXELS
          </p>

          <div className="space-y-12 body-small text-charcoal/80 leading-relaxed border-t border-ink/10 pt-10 font-ui">
            <section>
              <h2 className="font-display text-2xl text-ink mb-3 tracking-tight">
                1. STRICT PRIVACY ETHIC
              </h2>
              <p>
                WEDDING FILMS prioritizes digital elegance and absolute user privacy. Our website does not load advertising trackers, third-party remarketing pixels (e.g. Meta Pixel, TikTok Pixel, Google Ads tags), or cross-domain user profiling scripts.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3 tracking-tight">
                2. WHAT WE STORE LOCALLY
              </h2>
              <p>
                Our site only utilizes strictly necessary technical cookies and local storage tokens for:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Session & Navigation State:</strong> Remembering gallery filter selections during your active visit.</li>
                <li><strong>Accessibility Preferences:</strong> Respecting system-level Reduced Motion (`prefers-reduced-motion`) settings for smooth, non-disruptive animation.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3 tracking-tight">
                3. CONTROLLING YOUR BROWSER SETTINGS
              </h2>
              <p>
                You can instruct your browser to refuse cookies or alert you when cookies are sent. Since our platform requires no third-party persistent cookies for core visual rendering, your viewing of our wedding film portfolio will remain completely uncompromised.
              </p>
            </section>

            <section className="pt-6 border-t border-ink/10">
              <h2 className="font-display text-xl text-ink mb-2">CONTACT DATA PRIVACY</h2>
              <p className="font-mono text-xs text-charcoal/70">
                WEDDING FILMS<br />
                Bhubaneswar, Odisha, India<br />
                Email: <a href="mailto:contact@weddingfilms.in" className="underline hover:text-champagne-deep">contact@weddingfilms.in</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
