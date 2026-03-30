import { NextRequest, NextResponse } from "next/server";
import { getAllSocialMetrics } from "@/lib/social-analytics";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/social/analytics?days=30
 * Returns social media metrics for all configured platforms.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get("days") || "30", 10);
    const validDays = [7, 30, 90].includes(days) ? days : 30;

    const metrics = await getAllSocialMetrics(validDays);

    return NextResponse.json({ metrics, days: validDays });
  } catch (error) {
    console.error("Social analytics error:", error);
    return NextResponse.json(
      { metrics: [], error: "Failed to fetch social analytics" },
      { status: 500 }
    );
  }
}
