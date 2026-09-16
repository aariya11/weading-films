import { Metadata } from "next";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of service, intellectual property, and production agreements for WEDDING FILMS.",
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main className="flex-1 bg-paper text-ink pt-32 pb-36 min-h-screen">
        <div className="container max-w-4xl">
          <p className="label label-accent mb-4 tracking-[0.3em] text-xs font-mono">
            LEGAL // PRODUCTION AGREEMENTS
          </p>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl mb-12">
            TERMS & CONDITIONS.
          </h1>

          <div className="space-y-10 body-small text-charcoal/80 leading-relaxed border-t border-ink/10 pt-10 font-ui">
            <section>
              <h2 className="font-display text-2xl text-ink mb-3">1. INTELLECTUAL PROPERTY & USAGE</h2>
              <p>
                All imagery, moving image reels, typography treatments, and concept decks exhibited on this website remain the exclusive intellectual property of WEDDING FILMS and its respective commercial commissioning clients. Unlicensed reproduction, AI model training, or unauthorized syndication is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3">2. COMMISSION ENGAGEMENTS</h2>
              <p>
                Studio bookings, production schedules, casting deposits, and location permits are bound by explicit master service agreements executed prior to principal photography. Retainers securing calendar production dates are non-refundable once pre-production expenditure has initiated.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3">3. CANCELLATION & RESCHEDULING</h2>
              <p>
                Force majeure occurrences, inclement weather for exterior shoots, and rescheduling provisions are formally defined in project contracts, balancing logistical liabilities with creative integrity.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3">4. JURISDICTION</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of the State of New York, USA, without giving effect to any principles of conflicts of law.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
