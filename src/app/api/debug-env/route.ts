import { NextResponse } from "next/server";

// Temporary debug endpoint — remove after verifying
export async function GET() {
  return NextResponse.json({
    preview_set: !!process.env.PREVIEW_PASSWORD,
    preview_length: process.env.PREVIEW_PASSWORD?.length ?? 0,
    admin_set: !!process.env.ADMIN_PASSWORD,
    admin_length: process.env.ADMIN_PASSWORD?.length ?? 0,
    resend_set: !!process.env.RESEND_API_KEY,
  });
}
