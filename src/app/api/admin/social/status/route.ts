import { NextResponse } from "next/server";
import { getConfiguredPlatforms } from "@/lib/social-publish";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/social/status
 * Returns which social platforms have credentials configured.
 */
export async function GET() {
  const configured = getConfiguredPlatforms();
  return NextResponse.json({
    platforms: {
      facebook: configured.includes("Facebook"),
      instagram: configured.includes("Instagram"),
    },
  });
}
