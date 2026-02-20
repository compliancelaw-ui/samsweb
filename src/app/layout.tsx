import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sam's OATH — What's Hidden Doesn't Heal",
    template: "%s | Sam's OATH",
  },
  description:
    "A national movement to break silence around substance use and mental health. Take the OATH: Openness, Authenticity, Togetherness, Healing.",
  metadataBase: new URL("https://samsoath.org"),
  openGraph: {
    title: "Sam's OATH — What's Hidden Doesn't Heal",
    description:
      "Join a growing movement of families breaking silence around substance use and mental health.",
    url: "https://samsoath.org",
    siteName: "Sam's OATH",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam's OATH — What's Hidden Doesn't Heal",
    description:
      "Join a growing movement of families breaking silence around substance use and mental health.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
