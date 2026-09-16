import { Metadata } from "next";
import { projects } from "@/data";
import { WorkIndexContent } from "@/components/work/WorkIndexContent";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects from WEDDING FILMS — photography, film, and creative direction.",
};

export default function WorkPage() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main className="flex-1">
        <WorkIndexContent projects={projects} />
      </main>
      <Footer />
    </>
  );
}