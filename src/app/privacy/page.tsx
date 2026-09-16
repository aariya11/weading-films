import { Metadata } from "next";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data protection disclosures for WEDDING FILMS.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main className="flex-1 bg-paper text-ink pt-32 pb-36 min-h-screen">
        <div className="container max-w-4xl">
          <p className="label label-accent mb-4 tracking-[0.3em] text-xs font-mono">
            LEGAL // DATA PROTECTION
          </p>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl mb-12">
            PRIVACY POLICY.
          </h1>

          <div className="space-y-10 body-small text-charcoal/80 leading-relaxed border-t border-ink/10 pt-10 font-ui">
            <section>
              <h2 className="font-display text-2xl text-ink mb-3">1. INFORMATION WE COLLECT</h2>
              <p>
                WEDDING FILMS collects only personal information that is voluntarily provided through our project inquiry forms: name, email address, company affiliation, and project specifics. We do not sell, license, or monetize your contact records.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3">2. PURPOSE OF DATA PROCESSING</h2>
              <p>
                Your information is used strictly to evaluate commissioning inquiries, draft commercial production proposals, execute production agreements, and maintain communications during active projects.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3">3. STORAGE & SECURITY</h2>
              <p>
                Data is encrypted in transit and at rest using industry-standard protocols. Records are retained only for as long as necessary to complete client engagements or fulfill legal accounting requirements.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3">4. YOUR RIGHTS</h2>
              <p>
                Under GDPR and applicable international data frameworks, you have the right to request access to, correction of, or permanent erasure of your personal data at any time by contacting hello@weddingfilms.in.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
