import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { HelpSuiteNav } from "@/components/legal/HelpSuiteNav";

export const metadata: Metadata = {
  title: "Client Help & Planning Guide | Frequently Asked Questions",
  description:
    "Client advisory, booking guidance, deliverable timelines, and frequently asked questions for WEDDING FILMS, Bhubaneswar, Odisha.",
};

const TOC = [
  { id: "booking", label: "01. Booking & Retainers" },
  { id: "production", label: "02. Cinematography & Gear" },
  { id: "delivery", label: "03. Deliverables & Timelines" },
  { id: "travel", label: "04. Destinations & Travel" },
];

const FAQS = {
  booking: [
    {
      q: "How far in advance should we reserve our wedding dates?",
      glance: "We recommend reserving 6 to 12 months in advance. We accept only a limited number of couples per season.",
      ans: "Because we dedicate complete artistic devotion to each wedding and decline overlapping inquiries, peak Odia wedding dates (November through February) are typically commissioned 6 to 12 months ahead. Early booking guarantees exclusive crew allocation.",
    },
    {
      q: "What is required to lock our wedding dates on your calendar?",
      glance: "A signed Master Commission Agreement and an initial production retainer.",
      ans: "Dates are not held tentatively. Once we finalize your custom coverage itinerary, both parties sign the Master Commission Agreement and the initial retainer is settled to confirm calendar exclusivity.",
    },
    {
      q: "Can we customize coverage across multiple ceremonial days?",
      glance: "Yes. Every commission is customized to your exact events (Haldi, Mehendi, Sangeet, Baraat, Mandap, Reception).",
      ans: "No two weddings are identical. We provide tailored multi-day coverage spanning intimate temple rituals in Bhubaneswar, seaside pre-weddings in Puri, and high-energy grand Sangeet evenings.",
    },
  ],
  production: [
    {
      q: "What camera systems and lens glass do you shoot with?",
      glance: "Full-frame 4K cinema cameras, cinema optical prime lenses, and 10-bit color pipelines.",
      ans: "We use high-end cinema bodies and prime lenses that render natural skin tones, beautiful low-light contrast, and authentic 35mm optical grain. We never rely on harsh direct flashes or intrusive lighting.",
    },
    {
      q: "Do you provide aerial drone cinematography?",
      glance: "Yes, 4K aerial drone coverage is integrated where venue permits and weather allow.",
      ans: "Our licensed aerial operators capture breathtaking establishing perspectives of your mandap venue, coastal Puri waters, and arrival processions, strictly respecting local safety and DGCA guidelines.",
    },
    {
      q: "How many cinematographers and photographers will cover our wedding?",
      glance: "Typically 2 to 4 cinematographers and 2 editorial photographers based on celebration scale.",
      ans: "We balance comprehensive coverage with intimate discretion. Our team works seamlessly together as a single organism to capture every emotional glance without turning your sacred ceremony into a disruptive media circus.",
    },
  ],
  delivery: [
    {
      q: "When will we receive our wedding films and photos?",
      glance: "Narrative Teaser in 10–14 days; Theatrical Feature Film & Photo Archive within 6–8 weeks.",
      ans: "We prioritize deliberate, museum-grade post-production over rushed template edits. Your teaser delivers shortly after your celebration, followed by bespoke color grading, sound design, and full feature delivery within 6 to 8 weeks.",
    },
    {
      q: "Can we receive our unedited RAW camera footage?",
      glance: "Yes. Raw camera footage is safely retained in our offline vault for 90 days and can be provided on client hard drives.",
      ans: "We preserve all original digital negatives in studio offline storage. If you wish to archive the complete uncut footage library, we can transfer it to client-supplied high-speed SSDs upon request.",
    },
    {
      q: "Who curates the soundtrack for our wedding cinema?",
      glance: "We curate custom licensed scores combined with your live recorded vows and sacred Vedic mantras.",
      ans: "We avoid generic, overused viral audio tracks. Our editors pair live captured ceremonial audio (priest chants, laughter, family speeches) with bespoke, emotionally resonant musical compositions.",
    },
  ],
  travel: [
    {
      q: "Do you travel outside Bhubaneswar for weddings?",
      glance: "Yes, worldwide. We cover luxury destination celebrations across India and internationally.",
      ans: "While our home base and post-production suite are in Bhubaneswar, Odisha, our team frequently travels to Puri, Konark, Kolkata, Rajasthan, Goa, and international destination venues. Travel and accommodation logistics are itemized transparently in your proposal.",
    },
  ],
};

export default function HelpPage() {
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
              STUDIO ADVISORY // CLIENT PLANNING GUIDE
            </p>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl mb-6 tracking-tight text-balance">
              HELP & ADVISORY.
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-charcoal/70 uppercase tracking-wider">
              <span>FREQUENTLY ASKED QUESTIONS</span>
              <span>·</span>
              <span>BHUBANESWAR, ODISHA & DESTINATIONS</span>
            </div>
          </header>

          {/* Scannable Table of Contents Jump Bar */}
          <aside aria-label="Table of contents" className="mb-14 p-6 bg-paper-warm border border-ink/10 rounded-lg">
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-champagne-deep font-bold mb-4">
              TOPICS // QUICK SCAN
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

          {/* Structured FAQ Sections */}
          <div className="space-y-16 body-small text-charcoal/85 leading-relaxed font-ui">
            {/* Section 1: Booking */}
            <section id="booking" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                01 // RESERVATIONS & DATES
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-6 tracking-tight">
                BOOKING & CALENDAR EXCLUSIVITY
              </h2>
              <div className="space-y-6">
                {FAQS.booking.map((faq, idx) => (
                  <article key={idx} className="p-5 bg-paper-warm border border-ink/10 rounded-lg space-y-3">
                    <h3 className="font-display text-xl text-ink font-medium">
                      {faq.q}
                    </h3>
                    <div className="p-3 bg-paper border-l-3 border-champagne-deep rounded-r">
                      <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                        AT A GLANCE
                      </p>
                      <p className="text-xs font-ui text-ink/90 font-medium">
                        {faq.glance}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal/80 font-ui leading-relaxed">
                      {faq.ans}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {/* Section 2: Production */}
            <section id="production" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                02 // CINEMA HARDWARE & CREW
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-6 tracking-tight">
                CINEMATOGRAPHY, CREW & EQUIPMENT
              </h2>
              <div className="space-y-6">
                {FAQS.production.map((faq, idx) => (
                  <article key={idx} className="p-5 bg-paper-warm border border-ink/10 rounded-lg space-y-3">
                    <h3 className="font-display text-xl text-ink font-medium">
                      {faq.q}
                    </h3>
                    <div className="p-3 bg-paper border-l-3 border-champagne-deep rounded-r">
                      <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                        AT A GLANCE
                      </p>
                      <p className="text-xs font-ui text-ink/90 font-medium">
                        {faq.glance}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal/80 font-ui leading-relaxed">
                      {faq.ans}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {/* Section 3: Delivery */}
            <section id="delivery" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                03 // POST-PRODUCTION & STORAGE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-6 tracking-tight">
                DELIVERABLES, TURNAROUND & VAULT
              </h2>
              <div className="space-y-6">
                {FAQS.delivery.map((faq, idx) => (
                  <article key={idx} className="p-5 bg-paper-warm border border-ink/10 rounded-lg space-y-3">
                    <h3 className="font-display text-xl text-ink font-medium">
                      {faq.q}
                    </h3>
                    <div className="p-3 bg-paper border-l-3 border-champagne-deep rounded-r">
                      <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                        AT A GLANCE
                      </p>
                      <p className="text-xs font-ui text-ink/90 font-medium">
                        {faq.glance}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal/80 font-ui leading-relaxed">
                      {faq.ans}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {/* Section 4: Travel */}
            <section id="travel" className="scroll-mt-28 pt-8 border-t border-ink/10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-champagne-deep font-bold block mb-2">
                04 // TERRITORIES & LOGISTICS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-6 tracking-tight">
                DESTINATIONS & TRAVEL LOGISTICS
              </h2>
              <div className="space-y-6">
                {FAQS.travel.map((faq, idx) => (
                  <article key={idx} className="p-5 bg-paper-warm border border-ink/10 rounded-lg space-y-3">
                    <h3 className="font-display text-xl text-ink font-medium">
                      {faq.q}
                    </h3>
                    <div className="p-3 bg-paper border-l-3 border-champagne-deep rounded-r">
                      <p className="font-mono text-xs font-bold text-champagne-deep tracking-wider uppercase mb-1">
                        AT A GLANCE
                      </p>
                      <p className="text-xs font-ui text-ink/90 font-medium">
                        {faq.glance}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal/80 font-ui leading-relaxed">
                      {faq.ans}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {/* Direct Consultation Action Box */}
            <section className="pt-10 border-t border-ink/15">
              <div className="p-6 sm:p-8 bg-paper-warm border border-ink/10 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h2 className="font-display text-2xl text-ink mb-1">READY TO DISCUSS YOUR DATES?</h2>
                  <p className="text-xs font-mono text-charcoal/70">
                    Connect directly with our lead cinematography director in Bhubaneswar
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <a
                    href="https://wa.me/919124885729"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn min-h-[44px] px-6 py-2.5 rounded-full bg-[#1b7a43] hover:bg-[#156336] !text-white font-mono text-xs tracking-wider uppercase font-bold text-center transition-all whitespace-nowrap flex items-center justify-center cursor-pointer shadow-xs"
                  >
                    WhatsApp Concierge ↗
                  </a>
                  <Link
                    href="/contact"
                    className="btn min-h-[44px] px-6 py-2.5 rounded-full bg-ink !text-white hover:bg-charcoal hover:!text-white font-mono text-xs tracking-wider uppercase font-bold text-center transition-all whitespace-nowrap flex items-center justify-center cursor-pointer shadow-xs"
                  >
                    Inquire About Your Date
                  </Link>
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