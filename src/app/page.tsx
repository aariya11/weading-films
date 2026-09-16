import { Hero } from "@/components/hero/Hero";
import { WorkSection } from "@/components/work/WorkSection";
import { GalleryShowcase } from "@/components/gallery/GalleryShowcase";
import { StudioSection } from "@/components/studio/StudioSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { JournalSection } from "@/components/journal/JournalSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main className="flex-1">
        <Hero />
        <WorkSection />
        <GalleryShowcase />
        <StudioSection />
        <ServicesSection />
        <JournalSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}