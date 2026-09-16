import { Metadata } from "next";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ContactSection } from "@/components/contact/ContactSection";

import { FloatingWhatsApp } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Contact & Commissions",
  description:
    "Direct contact channels, studio location in Bhubaneswar, Odisha, and commissioning inquiry form for WEDDING FILMS.",
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="flex-1 pt-16">
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
