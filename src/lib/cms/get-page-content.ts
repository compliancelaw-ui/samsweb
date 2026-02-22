import { supabaseAdmin } from "@/lib/supabase/admin";
import { getDefaultsForPage } from "./content-defaults";

/**
 * Fetch all CMS content for a page from Supabase.
 * Merges DB values over hardcoded defaults — DB wins, defaults fill gaps.
 * Falls back to full defaults if the DB query fails.
 *
 * Usage in server components:
 *   const c = await getPageContent("home");
 *   <h1>{c["hero.title"]}</h1>
 */
export async function getPageContent(
  pageSlug: string
): Promise<Record<string, string>> {
  const defaults = getDefaultsForPage(pageSlug);

  try {
    const { data, error } = await supabaseAdmin()
      .from("site_content")
      .select("section_key, content")
      .eq("page_slug", pageSlug);

    if (error) {
      console.error(`CMS fetch error for ${pageSlug}:`, error);
      return defaults;
    }

    // Merge: DB values override defaults
    const merged = { ...defaults };
    if (data) {
      for (const row of data) {
        if (row.content !== null && row.content !== undefined) {
          merged[row.section_key] = row.content;
        }
      }
    }
    return merged;
  } catch (err) {
    console.error(`CMS error for ${pageSlug}:`, err);
    return defaults;
  }
}
