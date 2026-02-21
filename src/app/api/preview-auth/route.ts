import { NextRequest, NextResponse } from "next/server";

const PREVIEW_PASSWORD = process.env.PREVIEW_PASSWORD || "samsoath";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (password === PREVIEW_PASSWORD) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set("site-preview", "granted", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ error: "Wrong password" }, { status: 401 });
}
