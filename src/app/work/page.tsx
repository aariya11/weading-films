import { Metadata } from "next";
import { projects } from "@/data";
import { WorkIndexContent } from "@/components/work/WorkIndexContent";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";

import { FloatingWhatsApp } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Complete wedding cinema and editorial photography archive from WEDDING FILMS — Bhubaneswar, Odisha.",
};

export default function WorkPage() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="flex-1">
        <WorkIndexContent projects={projects} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}