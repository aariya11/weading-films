import { MetadataRoute } from "next";
import { projects, journal } from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://weddingfilms.in";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: baseUrl + "/work", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: baseUrl + "/sculpture", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: baseUrl + "/studio", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: baseUrl + "/services", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: baseUrl + "/journal", lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: baseUrl + "/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: baseUrl + "/help", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: baseUrl + "/orders", lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: baseUrl + "/checkout", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: baseUrl + "/profile", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: baseUrl + "/notifications", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: baseUrl + "/privacy", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: baseUrl + "/terms", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: baseUrl + "/cookies", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: baseUrl + "/work/" + p.slug,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const journalRoutes: MetadataRoute.Sitemap = journal.map((j) => ({
    url: baseUrl + "/journal/" + j.slug,
    lastModified: new Date(j.publishDate),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...journalRoutes];
}
