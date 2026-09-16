import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data";
import { ProjectDetailContent } from "@/components/project/ProjectDetailContent";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";


interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — WEDDING FILMS`,
      description: project.description,
      images: project.heroMedia.src ? [{ url: project.heroMedia.src, alt: project.title }] : [],
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="flex-1">
        <ProjectDetailContent project={project} />
      </main>
      <Footer />
    </>
  );
}