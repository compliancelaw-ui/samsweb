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

// Public API endpoints that accept form submissions (geo-blocked for non-US)
const FORM_API_PATHS = [
  "/api/oath",
  "/api/stories",
  "/api/contact",
  "/api/newsletter",
  "/api/ambassador",
  "/api/upload",
];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

function isFormApiPath(pathname: string): boolean {
  return FORM_API_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow public paths (login pages, static assets, auth endpoints)
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Geo-block: only allow POST to form endpoints from US
  // GET requests (page views, API reads) are allowed from anywhere for SEO
  if (request.method === "POST" && isFormApiPath(pathname)) {
    const country =
      request.geo?.country ||
      request.headers.get("x-vercel-ip-country");

    // Allow if no country data (local dev) or if US
    if (country && country !== "US") {
      return NextResponse.json(
        { error: "This service is currently available in the United States only." },
        { status: 403 }
      );
    }
  }

  // Check site-wide preview access
  const previewCookie = request.cookies.get("site-preview");
  if (previewCookie?.value !== "granted") {
    // API routes get a 401 instead of a redirect
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/preview-login", request.url));
  }

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
