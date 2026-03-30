import { NextRequest, NextResponse } from "next/server";
import {
  publishToFacebook,
  publishToInstagram,
  publishToLinkedIn,
} from "@/lib/social-publish";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/social/publish
 * Body: { platform: "facebook" | "instagram" | "linkedin", text: string, imageUrl?: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { platform, text, imageUrl } = body as {
      platform: string;
      text: string;
      imageUrl?: string;
    };

    if (!platform || !text) {
      return NextResponse.json(
        { ok: false, error: "Missing platform or text" },
        { status: 400 }
      );
    }

    if (platform === "facebook") {
      const result = await publishToFacebook(text);
      return NextResponse.json(result, { status: result.ok ? 200 : 500 });
    }

    if (platform === "instagram") {
      if (!imageUrl) {
        return NextResponse.json(
          { ok: false, error: "Instagram posts require an imageUrl" },
          { status: 400 }
        );
      }
      const result = await publishToInstagram(text, imageUrl);
      return NextResponse.json(result, { status: result.ok ? 200 : 500 });
    }

    if (platform === "linkedin") {
      const result = await publishToLinkedIn(text);
      return NextResponse.json(result, { status: result.ok ? 200 : 500 });
    }

    return NextResponse.json(
      { ok: false, error: `Unsupported platform: ${platform}` },
      { status: 400 }
    );
  } catch (error) {
    console.error("Social publish error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
