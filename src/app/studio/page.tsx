import { Metadata } from "next";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { StudioPageContent } from "@/components/studio/StudioPageContent";

export const metadata: Metadata = {
  title: "Studio",
  description: "WEDDING FILMS philosophy, creative approach, leadership team, and Soho headquarters.",
};

export default function StudioPage() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main className="flex-1">
        <StudioPageContent />
      </main>
      <Footer />
    </>
  );
}
