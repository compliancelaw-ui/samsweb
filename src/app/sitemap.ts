import type { MetadataRoute } from "next";
import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://samsoath.org";

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/advisory-board",
    "/take-the-oath",
    "/stories",
    "/map",
    "/families",
    "/workplace",
    "/resources",
    "/resources/for-families",
    "/resources/language-guide",
    "/resources/grief-and-loss",
    "/music",
    "/get-involved",
    "/ambassadors",
    "/contact",
    "/press",
    "/blog",
    "/challenges",
    "/share-your-story",
    "/events",
    "/donate",
    "/feedback",
    "/links",
    "/accessibility",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? ("daily" as const) : ("weekly" as const),
    priority: path === "" ? 1.0 : 0.8,
  }));

  // Dynamic: published stories
  let storyPages: MetadataRoute.Sitemap = [];
  try {
    const { data: stories } = await supabaseAdmin()
      .from("story_submissions")
      .select("slug, updated_at")
      .eq("status", "published");

    storyPages = (stories || []).map((s) => ({
      url: `${baseUrl}/stories/${s.slug}`,
      lastModified: new Date(s.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // Table may not have data yet
  }

  // Dynamic: blog posts
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const { data: posts } = await supabaseAdmin()
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("status", "published");

    blogPages = (posts || []).map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // Table may not have data yet
  }

  // Dynamic: resource guides
  let guidePages: MetadataRoute.Sitemap = [];
  try {
    const { data: guides } = await supabaseAdmin()
      .from("resource_documents")
      .select("slug, updated_at")
      .eq("status", "published");

    guidePages = (guides || []).map((g) => ({
      url: `${baseUrl}/resources/guides/${g.slug}`,
      lastModified: new Date(g.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // Table may not have data yet
  }

  return [...staticPages, ...storyPages, ...blogPages, ...guidePages];
}
