import { Metadata } from "next";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { StudioPageContent } from "@/components/studio/StudioPageContent";


export const metadata: Metadata = {
  title: "Studio",
  description:
    "WEDDING FILMS philosophy, cinematic approach, and production studio based in Bhubaneswar, Odisha.",
};

export default function StudioPage() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="flex-1">
        <StudioPageContent />
      </main>
      <Footer />
    </>
  );
}
