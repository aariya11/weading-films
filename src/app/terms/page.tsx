import { Metadata } from "next";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { FloatingWhatsApp } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms of service, commissioning agreements, copyright, and production policies for WEDDING FILMS, Bhubaneswar, Odisha.",
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="flex-1 bg-paper text-ink pt-32 pb-36 min-h-screen">
        <div className="container max-w-4xl">
          <p className="label label-accent mb-4 tracking-[0.3em] text-xs font-mono text-champagne-deep font-medium">
            LEGAL // PRODUCTION AGREEMENTS
          </p>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl mb-6 tracking-tight">
            TERMS & CONDITIONS.
          </h1>
          <p className="font-mono text-xs text-charcoal/60 uppercase tracking-widest mb-12">
            EFFECTIVE DATE: JANUARY 2025 · STUDIO JURISDICTION: BHUBANESWAR, ODISHA, INDIA
          </p>

          <div className="space-y-12 body-small text-charcoal/80 leading-relaxed border-t border-ink/10 pt-10 font-ui">
            <section>
              <h2 className="font-display text-2xl text-ink mb-3 tracking-tight">
                1. SCOPE OF ENGAGEMENT
              </h2>
              <p>
                WEDDING FILMS (&ldquo;Studio&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) provides high-end cinematic wedding cinematography, editorial photography, and heirloom visual archives. All client bookings are formalized under an explicit Master Commission Agreement detailing the agreed shot list, crew size, itinerary, and deliverable schedule.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3 tracking-tight">
                2. COMMISSION RETAINER & DATE CONFIRMATION
              </h2>
              <p>
                To reserve wedding dates on our studio calendar, an initial non-refundable production retainer is required upon agreement execution. Dates are not reserved until both the signed agreement and retainer are confirmed. Because we accept a strictly limited number of weddings per season to ensure cinematic excellence, retainers guarantee studio exclusivity.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3 tracking-tight">
                3. INTELLECTUAL PROPERTY & USAGE RIGHTS
              </h2>
              <p>
                All original RAW footage, master digital negatives, high-resolution edits, color grading profiles, and cinematic master files remain the intellectual property of WEDDING FILMS. Upon full settlement of commissioning fees, clients receive a perpetual, non-commercial, personal reproduction and display license to share, print, and cherish their wedding film and imagery with family and friends. Commercial exploitation, sale, or unlicensed third-party advertising usage requires prior written consent from WEDDING FILMS.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3 tracking-tight">
                4. RESCHEDULING & FORCE MAJEURE
              </h2>
              <p>
                If unforeseen circumstances or severe weather necessitate date changes, we make every reasonable effort to accommodate the new itinerary subject to existing studio calendar availability. In rare events of natural calamities, government directives, or unforeseen medical incapacity, both parties agree to negotiate in good faith to reschedule or determine an equitable settlement.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3 tracking-tight">
                5. DELIVERABLES & COLOR GRADING
              </h2>
              <p>
                Our signature editorial aesthetic involves bespoke color grading, film emulation, and meticulous audio mixing (Vedic rituals, vows, and ambient score). Final deliverables are provided within the delivery timeline stipulated in your Master Commission Agreement. Raw unedited camera files are retained in studio offline vault storage for 90 days following master delivery.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3 tracking-tight">
                6. GOVERNING LAW & JURISDICTION
              </h2>
              <p>
                These terms and any disputes, claims, or controversies arising out of or related to our creative services shall be governed exclusively by the laws of the Republic of India. The parties irrevocably submit to the exclusive jurisdiction of the competent courts in <strong>Bhubaneswar, Odisha, India</strong>.
              </p>
            </section>

            <section className="pt-6 border-t border-ink/10">
              <h2 className="font-display text-xl text-ink mb-2">CONTACT LEGAL DESK</h2>
              <p className="font-mono text-xs text-charcoal/70">
                WEDDING FILMS<br />
                Bhubaneswar, Odisha, India<br />
                Direct WhatsApp: +91 9124885729<br />
                Email: <a href="mailto:contact@weddingfilms.in" className="underline hover:text-champagne-deep">contact@weddingfilms.in</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
