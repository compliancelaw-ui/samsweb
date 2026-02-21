import { NextResponse } from "next/server";

// Temporary debug endpoint — remove after verifying
export async function GET() {
  return NextResponse.json({
    preview_set: !!process.env.PREVIEW_PASSWORD,
    preview_length: process.env.PREVIEW_PASSWORD?.length ?? 0,
    admin_set: !!process.env.ADMIN_PASSWORD,
    admin_length: process.env.ADMIN_PASSWORD?.length ?? 0,
    resend_set: !!process.env.RESEND_API_KEY,
    supabase_url_set: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabase_anon_set: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    mapbox_set: !!process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    env_var_names: Object.keys(process.env).filter(k =>
      k.includes("PASSWORD") || k.includes("RESEND") || k.includes("SUPABASE") || k.includes("MAPBOX") || k.includes("ADMIN")
    ),
  });
}
