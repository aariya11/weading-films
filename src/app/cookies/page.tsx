import { Metadata } from "next";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { HelpSuiteNav } from "@/components/legal/HelpSuiteNav";

export const metadata: Metadata = {
  title: "Cookie Policy & Local Storage Preferences",
  description:
    "Cookie policy and transparent tracking disclosure for WEDDING FILMS, Bhubaneswar, Odisha.",
};

const TOC = [
  { id: "ethic", label: "01. Privacy Ethic & Ad-Free Policy" },
  { id: "storage", label: "02. What We Store Locally" },
  { id: "browser-controls", label: "03. Browser Settings & Control" },
];

export default function CookiesPage() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="flex-1 bg-paper text-ink pt-28 sm:pt-36 pb-36 min-h-screen">
        <div className="container max-w-4xl">
          {/* Help Suite Sub-Navigation */}
          <div className="mb-10">
            <HelpSuiteNav />
          </div>

          {/* Header */}
          <header className="mb-12">
            <p className="label label-accent mb-3 tracking-[0.3em] text-xs font-mono text-champagne-deep font-semibold">
              LEGAL DESK // COOKIES & DIGITAL TRANSPARENCY
            </p>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl mb-6 tracking-tight text-balance">
              COOKIE POLICY.
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-charcoal/70 uppercase tracking-wider">
              <span>STRICTLY ESSENTIAL STORAGE</span>
              <span>·</span>
              <span>ZERO BEHAVIORAL ADVERTISING PIXELS</span>
            </div>
          </header>

          {/* Scannable Table of Contents Jump Bar */}
          <aside aria-label="Table of contents" className="mb-14 p-6 bg-paper-warm border border-ink/10 rounded-lg">
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-champagne-deep font-bold mb-4">
              TABLE OF CONTENTS // QUICK SCAN
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TOC.map((item) => (
                <a
                  key={item.id}
                  href={"#" + item.id}
                  className="font-mono text-xs text-charcoal/80 hover:text-ink hover:underline flex items-center gap-2 py-1 group"
                >
                  <span className="text-champagne-deep group-hover:translate-x-0.5 transition-transform">→</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </aside>

          {/* Structured & Scannable Sections */}
          <div className="space-y-16 body-small text-charcoal/85 leading-relaxed font-ui">
            {/* Section 1 */}
            <section id="ethic" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                01 // PRIVACY ETHIC
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 tracking-tight">
                1. STRICT PRIVACY ETHIC & ZERO AD-PIXEL POLICY
              </h2>

              {/* At A Glance Callout */}
              <div className="p-4 bg-paper-warm border-l-4 border-champagne-deep mb-5">
                <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                  AT A GLANCE
                </p>
                <p className="text-sm font-ui text-ink/90 font-medium">
                  WEDDING FILMS does not load Meta Pixel, Google Ads tags, or third-party remarketing scripts. Your browsing of our wedding portfolio is 100% private.
                </p>
              </div>

              <p className="mb-4">
                We believe luxury is rooted in discretion. Our web architecture does not engage in cross-site behavioral surveillance, invasive cookies, or third-party ad retargeting networks.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                <div className="p-4 bg-paper-warm border border-ink/10 rounded text-center">
                  <span className="block text-champagne-deep font-bold text-lg mb-1">0%</span>
                  <span className="text-charcoal/70">Advertising Trackers</span>
                </div>
                <div className="p-4 bg-paper-warm border border-ink/10 rounded text-center">
                  <span className="block text-champagne-deep font-bold text-lg mb-1">0%</span>
                  <span className="text-charcoal/70">Cross-Site Profiling</span>
                </div>
                <div className="p-4 bg-paper-warm border border-ink/10 rounded text-center">
                  <span className="block text-champagne-deep font-bold text-lg mb-1">100%</span>
                  <span className="text-charcoal/70">Essential Session Privacy</span>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="storage" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                02 // LOCAL TOKENS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 tracking-tight">
                2. WHAT WE STORE LOCALLY
              </h2>

              {/* At A Glance Callout */}
              <div className="p-4 bg-paper-warm border-l-4 border-champagne-deep mb-5">
                <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                  AT A GLANCE
                </p>
                <p className="text-sm font-ui text-ink/90 font-medium">
                  We use only strictly necessary, non-intrusive session tokens to support gallery filtering and reduced-motion accessibility.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-4 bg-paper-warm border border-ink/10 rounded">
                  <p className="font-mono text-xs font-bold uppercase text-champagne-deep mb-1">A. GALLERY & PORTFOLIO STATE</p>
                  <p className="text-xs text-charcoal/80 font-ui leading-relaxed">Temporarily maintains client viewing category filters during your active session so your exhibition view does not reset.</p>
                </div>
                <div className="p-4 bg-paper-warm border border-ink/10 rounded">
                  <p className="font-mono text-xs font-bold uppercase text-champagne-deep mb-1">B. ACCESSIBILITY PREFERENCES</p>
                  <p className="text-xs text-charcoal/80 font-ui leading-relaxed">Reads your operating system preference for Reduced Motion to smoothly disable GPU-accelerated motion effects if you have vestibular sensitivities.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="browser-controls" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                03 // USER GOVERNANCE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 tracking-tight">
                3. CONTROLLING YOUR BROWSER SETTINGS
              </h2>

              {/* At A Glance Callout */}
              <div className="p-4 bg-paper-warm border-l-4 border-champagne-deep mb-5">
                <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                  AT A GLANCE
                </p>
                <p className="text-sm font-ui text-ink/90 font-medium">
                  You can disable all storage in your browser settings at any time without degrading the visual quality of our 4K wedding films.
                </p>
              </div>

              <p className="mb-4">
                You can instruct your browser to refuse local storage or alert you when tokens are transmitted. Because our website does not rely on third-party tracking cookies, blocking cookies in Safari, Chrome, Edge, or Firefox will not compromise your portfolio experience.
              </p>
            </section>

            {/* Contact Action Box */}
            <section className="pt-10 border-t border-ink/15">
              <div className="p-6 sm:p-8 bg-paper-warm border border-ink/10 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h2 className="font-display text-2xl text-ink mb-1">PRIVACY & STORAGE INQUIRIES</h2>
                  <p className="text-xs font-mono text-charcoal/70">
                    Data Protection Desk · contact@weddingfilms.in
                  </p>
                </div>
                <a
                  href="mailto:contact@weddingfilms.in?subject=Storage%20Inquiry"
                  className="px-6 py-3 rounded-full bg-ink text-paper hover:bg-charcoal font-mono text-xs tracking-wider uppercase font-semibold text-center transition-colors whitespace-nowrap"
                >
                  Email Data Protection Desk →
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </> 
  );
}