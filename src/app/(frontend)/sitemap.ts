import { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brandneweats.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/destinations`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/destinations/vietnam`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/destinations/china`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/destinations/japan`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllPostSlugs();
    postRoutes = slugs.map((s: { slug: string; publishedAt?: string }) => ({
      url: `${siteUrl}/blog/${s.slug}`,
      lastModified: s.publishedAt ? new Date(s.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    // Sanity not configured yet
  }

  return [...staticRoutes, ...postRoutes];
}
