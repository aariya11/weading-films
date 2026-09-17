import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { HelpSuiteNav } from "@/components/legal/HelpSuiteNav";

export const metadata: Metadata = {
  title: "Terms & Conditions of Commission",
  description:
    "Production agreements, copyright licenses, date retainers, and commissioning policies for WEDDING FILMS, Bhubaneswar, Odisha.",
};

const TOC = [
  { id: "scope", label: "01. Scope of Engagement" },
  { id: "retainer", label: "02. Retainer & Dates" },
  { id: "ip", label: "03. Copyright & Usage" },
  { id: "rescheduling", label: "04. Rescheduling" },
  { id: "deliverables", label: "05. Deliverables & Vault" },
  { id: "jurisdiction", label: "06. Governing Law" },
];

export default function TermsPage() {
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
              LEGAL DESK // CLIENT PRODUCTION POLICIES
            </p>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl mb-6 tracking-tight text-balance">
              TERMS OF COMMISSION.
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-charcoal/70 uppercase tracking-wider">
              <span>EFFECTIVE DATE: JANUARY 2025</span>
              <span>·</span>
              <span>JURISDICTION: BHUBANESWAR, ODISHA, INDIA</span>
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
            <section id="scope" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                01 // PRODUCTION SCOPE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 tracking-tight">
                1. SCOPE OF ENGAGEMENT
              </h2>

              {/* At A Glance Callout */}
              <div className="p-4 bg-paper-warm border-l-4 border-champagne-deep mb-5">
                <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                  AT A GLANCE
                </p>
                <p className="text-sm font-ui text-ink/90 font-medium">
                  Every wedding is commissioned under a bespoke Master Agreement detailing crew size, itinerary, equipment, and exact deliverable timelines.
                </p>
              </div>

              <p className="mb-4">
                WEDDING FILMS (&ldquo;Studio&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) provides high-end cinematic wedding cinematography, editorial photography, and archival visual monographs across Bhubaneswar, Odisha, and luxury destination venues worldwide.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs font-mono text-charcoal/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-deep" />
                  <span>Exclusive crew allocation per date</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-deep" />
                  <span>Itemized shot lists & ceremony itinerary</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-deep" />
                  <span>Formalized Master Commission Agreement</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-deep" />
                  <span>Full audio & multi-camera coverage</span>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section id="retainer" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                02 // CALENDAR RESERVATION
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 tracking-tight">
                2. COMMISSION RETAINER & DATE CONFIRMATION
              </h2>

              {/* At A Glance Callout */}
              <div className="p-4 bg-paper-warm border-l-4 border-champagne-deep mb-5">
                <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                  AT A GLANCE
                </p>
                <p className="text-sm font-ui text-ink/90 font-medium">
                  Dates are strictly secured upon receipt of both the signed Master Agreement and the non-refundable production retainer. Dates cannot be held tentatively without payment.
                </p>
              </div>

              <p className="mb-3">
                To preserve artistic dedication and narrative quality, WEDDING FILMS accepts a strictly limited number of weddings per season. Because our studio declines all competing inquiries once a date is committed, the initial production retainer is non-refundable and guarantees exclusive crew assignment for your celebration.
              </p>
            </section>

            {/* Section 3 */}
            <section id="ip" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                03 // INTELLECTUAL PROPERTY
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 tracking-tight">
                3. INTELLECTUAL PROPERTY & USAGE RIGHTS
              </h2>

              {/* At A Glance Callout */}
              <div className="p-4 bg-paper-warm border-l-4 border-champagne-deep mb-5">
                <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                  AT A GLANCE
                </p>
                <p className="text-sm font-ui text-ink/90 font-medium">
                  Clients receive a perpetual, royalty-free personal license to share, print, and screen their films and photographs. Master raw files remain studio intellectual property.
                </p>
              </div>

              <p className="mb-4">
                All original RAW digital footage, master negative archives, bespoke color profiles, and cinematic audio mixes remain the intellectual property of WEDDING FILMS under Indian and international copyright treaties.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-paper-warm border border-ink/10 rounded">
                  <p className="font-mono text-xs font-bold uppercase text-ink mb-1">✓ CLIENT RIGHTS (INCLUDED)</p>
                  <ul className="text-xs space-y-1.5 text-charcoal/80">
                    <li>• Unlimited personal online sharing (Instagram, YouTube)</li>
                    <li>• High-resolution heirloom printing for family</li>
                    <li>• Full private screening and display</li>
                  </ul>
                </div>
                <div className="p-4 bg-paper-warm border border-ink/10 rounded">
                  <p className="font-mono text-xs font-bold uppercase text-ink mb-1">✗ COMMERCIAL RESTRICTIONS</p>
                  <ul className="text-xs space-y-1.5 text-charcoal/80">
                    <li>• No resale or sublicensing to stock libraries</li>
                    <li>• Unlicensed commercial brand advertising requires written studio consent</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="rescheduling" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                04 // RESCHEDULING & FORCE MAJEURE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 tracking-tight">
                4. RESCHEDULING & FORCE MAJEURE
              </h2>

              {/* At A Glance Callout */}
              <div className="p-4 bg-paper-warm border-l-4 border-champagne-deep mb-5">
                <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                  AT A GLANCE
                </p>
                <p className="text-sm font-ui text-ink/90 font-medium">
                  In unforeseen circumstances, we make every reasonable effort to transfer retainers to a new date subject to studio calendar availability.
                </p>
              </div>

              <p>
                If unforeseen events, severe coastal weather, government mandates, or medical incapacity necessitate itinerary modifications, both parties agree to negotiate in good faith to reschedule. In severe force majeure events beyond either party&apos;s control, liability is strictly limited to the fees collected.
              </p>
            </section>

            {/* Section 5 */}
            <section id="deliverables" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                05 // POST-PRODUCTION TIMELINES
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 tracking-tight">
                5. DELIVERABLES, COLOR GRADING & STORAGE
              </h2>

              {/* At A Glance Callout */}
              <div className="p-4 bg-paper-warm border-l-4 border-champagne-deep mb-5">
                <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                  AT A GLANCE
                </p>
                <p className="text-sm font-ui text-ink/90 font-medium">
                  Cinematic highlights deliver in 10–14 days. Master Feature Films deliver within 6–8 weeks. Raw camera footage is safely retained in studio offline vault storage for 90 days.
                </p>
              </div>

              <p className="mb-4">
                Our signature editorial aesthetic involves bespoke color grading, film emulation, multi-track audio master mastering (Vedic mantras, vows, and ambient score), and handcrafted finishing.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 bg-paper-warm border border-ink/10 text-center">
                  <span className="block text-champagne-deep font-bold">10–14 DAYS</span>
                  <span className="text-charcoal/70">Cinematic Teaser</span>
                </div>
                <div className="p-3 bg-paper-warm border border-ink/10 text-center">
                  <span className="block text-champagne-deep font-bold">6–8 WEEKS</span>
                  <span className="text-charcoal/70">Full Feature Master</span>
                </div>
                <div className="p-3 bg-paper-warm border border-ink/10 text-center">
                  <span className="block text-champagne-deep font-bold">90 DAYS</span>
                  <span className="text-charcoal/70">Raw Vault Archival</span>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="jurisdiction" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                06 // LEGAL JURISDICTION
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 tracking-tight">
                6. GOVERNING LAW & JURISDICTION
              </h2>

              {/* At A Glance Callout */}
              <div className="p-4 bg-paper-warm border-l-4 border-champagne-deep mb-5">
                <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                  AT A GLANCE
                </p>
                <p className="text-sm font-ui text-ink/90 font-medium">
                  Governed exclusively by Indian law with exclusive jurisdiction in the competent courts of Bhubaneswar, Odisha, India.
                </p>
              </div>

              <p>
                These terms and any disputes, claims, or controversies arising out of or related to our creative services shall be governed exclusively by the laws of the Republic of India. The parties irrevocably submit to the exclusive jurisdiction of the competent courts in <strong>Bhubaneswar, Odisha, India</strong>.
              </p>
            </section>

            {/* Studio Legal Desk Action Box */}
            <section className="pt-10 border-t border-ink/15">
              <div className="p-6 sm:p-8 bg-paper-warm border border-ink/10 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h2 className="font-display text-2xl text-ink mb-1">QUESTIONS ABOUT OUR TERMS?</h2>
                  <p className="text-xs font-mono text-charcoal/70">
                    WEDDING FILMS Legal Desk · Bhubaneswar, Odisha, India
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <a
                    href="https://wa.me/919124885729"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp min-h-[44px] px-5 py-2.5 rounded-full !bg-[#1b7a43] hover:!bg-[#156336] !text-white font-mono text-xs tracking-wider uppercase font-bold text-center whitespace-nowrap flex items-center justify-center cursor-pointer shadow-xs"
                  >
                    WhatsApp Legal Desk ↗
                  </a>
                  <a
                    href="mailto:contact@weddingfilms.in"
                    className="btn min-h-[44px] px-5 py-2.5 rounded-full border border-[#0f0f0f]/30 hover:border-[#0f0f0f] hover:!bg-[#0f0f0f] hover:!text-white !text-[#0f0f0f] bg-transparent font-mono text-xs tracking-wider uppercase font-bold text-center whitespace-nowrap flex items-center justify-center cursor-pointer shadow-xs"
                  >
                    Email Legal Desk
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </> 
  );
}