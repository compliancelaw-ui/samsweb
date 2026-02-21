import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ ok: true });
    // Grant both admin and preview access so admin doesn't need two logins
    response.cookies.set("admin-access", "granted", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
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
