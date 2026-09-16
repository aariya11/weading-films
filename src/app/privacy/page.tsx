import { Metadata } from "next";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { FloatingWhatsApp } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Data protection policy and privacy practices for WEDDING FILMS in accordance with the Digital Personal Data Protection Act 2023 (DPDP Act) and GDPR.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="flex-1 bg-paper text-ink pt-32 pb-36 min-h-screen">
        <div className="container max-w-4xl">
          <p className="label label-accent mb-4 tracking-[0.3em] text-xs font-mono text-champagne-deep font-medium">
            LEGAL // DATA PROTECTION & GOVERNANCE
          </p>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl mb-6 tracking-tight">
            PRIVACY POLICY.
          </h1>
          <p className="font-mono text-xs text-charcoal/60 uppercase tracking-widest mb-12">
            COMPLIANT WITH INDIA DPDP ACT 2023 & GDPR · LAST UPDATED: JANUARY 2025
          </p>

          <div className="space-y-12 body-small text-charcoal/80 leading-relaxed border-t border-ink/10 pt-10 font-ui">
            <section>
              <h2 className="font-display text-2xl text-ink mb-3 tracking-tight">
                1. DATA FIDUCIARY IDENTITY
              </h2>
              <p>
                The Data Fiduciary / Controller responsible for the processing of your personal information is:
              </p>
              <div className="mt-3 p-4 bg-paper-warm border border-ink/10 font-mono text-xs text-charcoal/80 leading-relaxed">
                <strong>STUDIO NAME:</strong> WEDDING FILMS<br />
                <strong>LOCATION:</strong> Bhubaneswar, Odisha, India<br />
                <strong>CONTACT PHONE:</strong> +91 9124885729<br />
                <strong>PRIVACY & GRIEVANCE EMAIL:</strong> contact@weddingfilms.in
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3 tracking-tight">
                2. PERSONAL DATA WE COLLECT
              </h2>
              <p>
                We collect personal information solely when voluntarily provided by prospective clients via our commissioning inquiry forms, direct email, or direct WhatsApp correspondence:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Full name of couple or representative client</li>
                <li>Email address and telephone/WhatsApp contact number</li>
                <li>Wedding date, venue locations, and ceremony specifics</li>
                <li>Creative brief and aesthetic preferences</li>
              </ul>
              <p className="mt-3">
                We never engage in automated behavioral tracking, cross-site identity profiling, or selling of client data to third-party brokers.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3 tracking-tight">
                3. LEGAL PURPOSE & BASIS OF PROCESSING
              </h2>
              <p>
                Under the India Digital Personal Data Protection Act, 2023 (DPDP Act) and the EU/UK General Data Protection Regulation (GDPR), we process your personal data under the lawful grounds of:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Consent:</strong> Freely given when you submit our contact form or initiate WhatsApp communication.</li>
                <li><strong>Contractual Necessity:</strong> To deliver bespoke wedding proposals, schedule production crews, and perform cinematography and photography services.</li>
                <li><strong>Legal Compliance:</strong> To satisfy statutory accounting, tax, and invoicing requirements under Indian law.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3 tracking-tight">
                4. DATA STORAGE, ENCRYPTION & RETENTION
              </h2>
              <p>
                Your inquiry records and communications are transmitted over modern TLS 1.3 encrypted channels. Studio backups are stored with strict role-based access control. We retain inquiry correspondence for a maximum of 24 months, after which records are purged unless converted into active, long-term archival client contracts.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-3 tracking-tight">
                5. YOUR RIGHTS & GRIEVANCE REDRESSAL
              </h2>
              <p>
                You have the right to request access to your personal data, rectify inaccuracies, withdraw consent, or request complete erasure of your information from our communications records. In accordance with Rule 11 of the DPDP Act 2023, our designated Grievance Officer responds to all privacy queries within 7 business days.
              </p>
              <p className="mt-3">
                To exercise any of these rights, contact: <a href="mailto:contact@weddingfilms.in" className="underline font-mono hover:text-champagne-deep">contact@weddingfilms.in</a> with the subject line &ldquo;DPDP Privacy Request&rdquo;.
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
