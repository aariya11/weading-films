import { Metadata } from "next";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { HelpSuiteNav } from "@/components/legal/HelpSuiteNav";

export const metadata: Metadata = {
  title: "Privacy Policy (DPDP Act 2023 & GDPR)",
  description:
    "Data protection policy and privacy practices for WEDDING FILMS in accordance with the Digital Personal Data Protection Act 2023 (DPDP Act) and GDPR.",
};

const TOC = [
  { id: "fiduciary", label: "01. Data Fiduciary Identity" },
  { id: "collection", label: "02. Personal Data Collected" },
  { id: "grounds", label: "03. Legal Purpose & Grounds" },
  { id: "security", label: "04. Security & Retention" },
  { id: "rights", label: "05. Your Rights & Grievance" },
];

export default function PrivacyPage() {
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
              LEGAL DESK // PRIVACY & DATA GOVERNANCE
            </p>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl mb-6 tracking-tight text-balance">
              PRIVACY POLICY.
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-charcoal/70 uppercase tracking-wider">
              <span>COMPLIANT WITH INDIA DPDP ACT 2023 & GDPR</span>
              <span>·</span>
              <span>LAST UPDATED: JANUARY 2025</span>
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
            <section id="fiduciary" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                01 // DATA CONTROLLER
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 tracking-tight">
                1. DATA FIDUCIARY IDENTITY
              </h2>

              {/* At A Glance Callout */}
              <div className="p-4 bg-paper-warm border-l-4 border-champagne-deep mb-5">
                <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                  AT A GLANCE
                </p>
                <p className="text-sm font-ui text-ink/90 font-medium">
                  WEDDING FILMS is the registered Data Fiduciary based in Bhubaneswar, Odisha. We process inquiries directly without intermediaries or external data brokers.
                </p>
              </div>

              <div className="p-5 bg-paper-warm border border-ink/10 rounded-md font-mono text-xs text-charcoal/80 leading-relaxed grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="block text-champagne-deep font-bold uppercase mb-1">STUDIO NAME</span>
                  <span className="text-ink font-semibold">WEDDING FILMS</span>
                </div>
                <div>
                  <span className="block text-champagne-deep font-bold uppercase mb-1">LOCATION & BASE</span>
                  <span>Bhubaneswar, Odisha, India</span>
                </div>
                <div>
                  <span className="block text-champagne-deep font-bold uppercase mb-1">PHONE & WHATSAPP</span>
                  <span>+91 9124885729</span>
                </div>
                <div>
                  <span className="block text-champagne-deep font-bold uppercase mb-1">GRIEVANCE REDRESSAL</span>
                  <a href="mailto:contact@weddingfilms.in" className="underline hover:text-champagne-deep text-ink">
                    contact@weddingfilms.in
                  </a>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="collection" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                02 // DATA INGESTION
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 tracking-tight">
                2. PERSONAL DATA WE COLLECT
              </h2>

              {/* At A Glance Callout */}
              <div className="p-4 bg-paper-warm border-l-4 border-champagne-deep mb-5">
                <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                  AT A GLANCE
                </p>
                <p className="text-sm font-ui text-ink/90 font-medium">
                  We collect only what you voluntarily submit to plan your wedding film. Zero cross-site tracking, zero ad pixel profiling, and zero third-party data sales.
                </p>
              </div>

              <p className="mb-4">
                We collect personal information solely when voluntarily provided by prospective clients through our commissioning inquiry forms, direct email, or direct WhatsApp correspondence:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 bg-paper-warm border border-ink/10 rounded">
                  <p className="font-bold text-ink mb-1">CLIENT IDENTITY</p>
                  <p className="text-charcoal/70">Full names of the couple or family representative</p>
                </div>
                <div className="p-3 bg-paper-warm border border-ink/10 rounded">
                  <p className="font-bold text-ink mb-1">COMMUNICATION</p>
                  <p className="text-charcoal/70">Email address, mobile number, and WhatsApp handle</p>
                </div>
                <div className="p-3 bg-paper-warm border border-ink/10 rounded">
                  <p className="font-bold text-ink mb-1">CELEBRATION DETAILS</p>
                  <p className="text-charcoal/70">Wedding dates, venue locations (Bhubaneswar/Puri), and rituals</p>
                </div>
                <div className="p-3 bg-paper-warm border border-ink/10 rounded">
                  <p className="font-bold text-ink mb-1">CREATIVE BRIEF</p>
                  <p className="text-charcoal/70">Aesthetic preferences, coverage discipline, and vision notes</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="grounds" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                03 // LAWFUL GROUNDS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 tracking-tight">
                3. LEGAL PURPOSE & BASIS OF PROCESSING
              </h2>

              {/* At A Glance Callout */}
              <div className="p-4 bg-paper-warm border-l-4 border-champagne-deep mb-5">
                <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                  AT A GLANCE
                </p>
                <p className="text-sm font-ui text-ink/90 font-medium">
                  Processed strictly under clear legal grounds: your explicit consent upon inquiry submission, contractual necessity for film production, and Indian statutory tax compliance.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-4 bg-paper-warm border border-ink/10 rounded">
                  <p className="font-mono text-xs font-bold uppercase text-champagne-deep mb-1">A. EXPLICIT CONSENT</p>
                  <p className="text-xs text-charcoal/80 font-ui">Freely provided when submitting our inquiry form or initiating WhatsApp concierge dialogue.</p>
                </div>
                <div className="p-4 bg-paper-warm border border-ink/10 rounded">
                  <p className="font-mono text-xs font-bold uppercase text-champagne-deep mb-1">B. CONTRACTUAL NECESSITY</p>
                  <p className="text-xs text-charcoal/80 font-ui">Required to prepare bespoke wedding proposals, schedule production crews, and deliver final 4K masters.</p>
                </div>
                <div className="p-4 bg-paper-warm border border-ink/10 rounded">
                  <p className="font-mono text-xs font-bold uppercase text-champagne-deep mb-1">C. STATUTORY COMPLIANCE</p>
                  <p className="text-xs text-charcoal/80 font-ui">Necessary for GST invoicing, legal contracting, and accounting regulations under Indian law.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="security" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                04 // CIPHERS & RETENTION
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 tracking-tight">
                4. DATA STORAGE, ENCRYPTION & RETENTION
              </h2>

              {/* At A Glance Callout */}
              <div className="p-4 bg-paper-warm border-l-4 border-champagne-deep mb-5">
                <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                  AT A GLANCE
                </p>
                <p className="text-sm font-ui text-ink/90 font-medium">
                  Encrypted with modern TLS 1.3 in transit. Communications purged after 24 months unless converted into an active long-term archival client contract.
                </p>
              </div>

              <p className="mb-4">
                Your inquiry records and communications are transmitted over modern TLS 1.3 encrypted channels. Studio backups are stored with strict role-based access control. We retain inquiry correspondence for a maximum of 24 months, after which records are purged unless converted into active, long-term archival client contracts.
              </p>
            </section>

            {/* Section 5 */}
            <section id="rights" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                05 // CLIENT PREROGATIVES
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 tracking-tight">
                5. YOUR RIGHTS & GRIEVANCE REDRESSAL
              </h2>

              {/* At A Glance Callout */}
              <div className="p-4 bg-paper-warm border-l-4 border-champagne-deep mb-5">
                <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                  AT A GLANCE
                </p>
                <p className="text-sm font-ui text-ink/90 font-medium">
                  Under the DPDP Act 2023, you have guaranteed rights to access, correct, or erase your personal data. Our Grievance Officer responds within 7 business days.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-4 bg-paper-warm border border-ink/10 rounded">
                  <p className="font-bold text-ink mb-1">RIGHT TO ACCESS</p>
                  <p className="text-charcoal/70 font-ui text-xs">Receive a full summary of all personal data held by WEDDING FILMS.</p>
                </div>
                <div className="p-4 bg-paper-warm border border-ink/10 rounded">
                  <p className="font-bold text-ink mb-1">RIGHT TO RECTIFICATION</p>
                  <p className="text-charcoal/70 font-ui text-xs">Promptly correct any outdated wedding date, email, or telephone contact details.</p>
                </div>
                <div className="p-4 bg-paper-warm border border-ink/10 rounded">
                  <p className="font-bold text-ink mb-1">CONSENT WITHDRAWAL</p>
                  <p className="text-charcoal/70 font-ui text-xs">Withdraw previously provided marketing or promotional consent at any time.</p>
                </div>
                <div className="p-4 bg-paper-warm border border-ink/10 rounded">
                  <p className="font-bold text-ink mb-1">RIGHT TO ERASURE</p>
                  <p className="text-charcoal/70 font-ui text-xs">Request complete deletion of your inquiry communications from our database.</p>
                </div>
              </div>
            </section>

            {/* Grievance Action Box */}
            <section className="pt-10 border-t border-ink/15">
              <div className="p-6 sm:p-8 bg-paper-warm border border-ink/10 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h2 className="font-display text-2xl text-ink mb-1">EXERCISE YOUR PRIVACY RIGHTS</h2>
                  <p className="text-xs font-mono text-charcoal/70">
                    Grievance Officer: contact@weddingfilms.in · 7-day turnaround SLA
                  </p>
                </div>
                <a
                  href="mailto:contact@weddingfilms.in?subject=DPDP%20Privacy%20Request"
                  className="btn min-h-[44px] px-6 py-2.5 rounded-full bg-ink !text-white hover:bg-charcoal hover:!text-white font-mono text-xs tracking-wider uppercase font-bold text-center transition-all whitespace-nowrap flex items-center justify-center cursor-pointer shadow-xs"
                >
                  Submit DPDP Request →
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