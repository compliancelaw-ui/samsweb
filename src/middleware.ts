import { NextRequest, NextResponse } from "next/server";

// Routes that should be accessible without any password
const PUBLIC_PATHS = [
  "/preview-login",
  "/api/preview-auth",
  "/api/admin-auth",
  "/_next",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
];

// Paths that require admin cookie (both pages and API routes)
function requiresAdmin(pathname: string): boolean {
  return pathname.startsWith("/admin") || pathname.startsWith("/api/admin/");
}

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow public paths (login pages, static assets, auth endpoints)
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Site is public - no preview gate needed for launch
  // Admin routes and admin API routes require admin cookie
  if (requiresAdmin(pathname)) {
    const adminCookie = request.cookies.get("admin-access");
    if (adminCookie?.value !== "granted") {
      // API routes return 401, page routes redirect
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/preview-login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files and images
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
