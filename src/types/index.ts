export interface Project {
  id: string;
  slug: string;
  title: string;
  year: number;
  client: string;
  location: string;
  category: ProjectCategory;
  services: string[];
  heroMedia: MediaAsset;
  images: MediaAsset[];
  videos: MediaAsset[];
  description: string;
  credits: Credit[];
  featured: boolean;
  order: number;
}

export type ProjectCategory = 
  | "CAMPAIGN" 
  | "EDITORIAL" 
  | "COMMERCIAL" 
  | "BRAND" 
  | "FILM" 
  | "PERSONAL"
  | "WEDDING FILM"
  | "BRIDAL EDITORIAL"
  | "CEREMONY & RITUALS"
  | "35MM & ANALOG GRAIN"
  | "CINEMATIC LOVE STORY"
  | "BRIDAL COUTURE"
  | "CELEBRATIONS & PROCESSION"
  | "COASTAL PRE-WEDDING"
  | "GROOM ATELIER";

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  image: MediaAsset;
  order: number;
}

export interface MediaAsset {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  type: "image" | "video";
  poster?: string;
  formats?: {
    webp?: string;
    avif?: string;
  };
  focalPoint?: {
    x: number;
    y: number;
  };
}

export interface Credit {
  role: string;
  name: string;
  link?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  portrait: MediaAsset;
  social?: {
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  order: number;
}

export interface JournalEntry {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: JournalCategory;
  coverImage: MediaAsset;
  author: string;
  publishDate: string;
  readTime: string;
  featured: boolean;
  content: string;
}

export type JournalCategory = 
  | "STORIES" 
  | "BEHIND_THE_SCENES" 
  | "PROCESS" 
  | "LOCATIONS" 
  | "PROJECTS" 
  | "NOTES";

export interface StudioInfo {
  name: string;
  tagline: string;
  philosophy: string;
  approach: string;
  capabilities: string[];
  location: {
    city: string;
    country: string;
    address?: string;
  };
  founded: number;
  founder: TeamMember;
  creativeDirector: TeamMember;
  email: string;
  phone?: string;
  social: {
    instagram: string;
    linkedin?: string;
    twitter?: string;
    vimeo?: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: ProjectType;
  budget: BudgetRange;
  timeline: Timeline;
  details: string;
  consent: boolean;
}

export type ProjectType = 
  | "PHOTOGRAPHY" 
  | "FILM" 
  | "CREATIVE_DIRECTION" 
  | "PRODUCTION" 
  | "BRAND_CONTENT" 
  | "OTHER";

export type BudgetRange = 
  | "UNDER_25K" 
  | "25K_50K" 
  | "50K_100K" 
  | "100K_250K" 
  | "250K_PLUS" 
  | "DISCUSS";

export type Timeline = 
  | "ASAP" 
  | "1_3_MONTHS" 
  | "3_6_MONTHS" 
  | "6_12_MONTHS" 
  | "FLEXIBLE";

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface CursorState {
  x: number;
  y: number;
  scale: number;
  label: string;
  visible: boolean;
  isHovering: boolean;
}

export interface ScrollProgress {
  y: number;
  progress: number;
  direction: "up" | "down" | "none";
  velocity: number;
}

export interface ViewportSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
}

export interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
}

export interface ReducedMotionState {
  prefersReducedMotion: boolean;
  prefersReducedTransparency: boolean;
  prefersHighContrast: boolean;
}