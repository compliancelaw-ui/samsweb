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
  // Admin routes still require admin cookie below

  // For admin routes, also require admin cookie
  if (pathname.startsWith("/admin")) {
    const adminCookie = request.cookies.get("admin-access");
    if (adminCookie?.value !== "granted") {
      // Send back to the main login page (they'll choose Admin Access)
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
