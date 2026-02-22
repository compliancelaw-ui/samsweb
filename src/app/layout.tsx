import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sam's OATH — What's Hidden Doesn't Heal",
    template: "%s | Sam's OATH",
  },
  description:
    "A national movement to break silence around substance use and mental health. Take the OATH: Openness, Authenticity, Togetherness, Healing.",
  metadataBase: new URL("https://samsoath.org"),
  keywords: [
    "Sam's OATH",
    "substance use",
    "mental health",
    "family support",
    "break the silence",
    "addiction",
    "family perspective",
    "openness",
    "healing",
    "Frank Sheeder",
  ],
  openGraph: {
    title: "Sam's OATH — What's Hidden Doesn't Heal",
    description:
      "Join a growing movement of families breaking silence around substance use and mental health. The opposite of addiction is not sobriety — it's community.",
    url: "https://samsoath.org",
    siteName: "Sam's OATH",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/photos/family-hug.jpg",
        width: 1200,
        height: 630,
        alt: "Sam's OATH — A national movement to break silence around substance use and mental health",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam's OATH — What's Hidden Doesn't Heal",
    description:
      "Join a growing movement of families breaking silence around substance use and mental health.",
    images: ["/images/photos/family-hug.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Sam's OATH",
  alternateName: "Sam's OATH Foundation",
  url: "https://samsoath.org",
  logo: "https://samsoath.org/images/logo/logo-stacked-full.svg",
  description:
    "A national movement empowering families to break silence around substance use and mental health through Openness, Authenticity, Togetherness, and Healing.",
  founder: {
    "@type": "Person",
    name: "Frank Sheeder",
    jobTitle: "Founder & Executive Director",
  },
  foundingDate: "2025",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "general",
    url: "https://samsoath.org/contact",
  },
  sameAs: [
    "https://music.apple.com/us/artist/sams-oath/1862953585",
    "https://www.instagram.com/samsoath",
    "https://www.facebook.com/samsoath",
    "https://www.tiktok.com/@samsoath",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
