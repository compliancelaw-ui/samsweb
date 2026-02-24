import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CrisisBanner } from "@/components/layout/crisis-banner";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { PageShareButtons } from "@/components/ui/page-share-buttons";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { UTMTracker } from "@/components/analytics/utm-tracker";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GoogleAnalytics />
      <Suspense fallback={null}><UTMTracker /></Suspense>
      <Header />
      <main id="main-content" className="min-h-screen text-[17px] leading-relaxed text-gray-700">{children}</main>
      <Footer />
      <CookieConsent />
      <CrisisBanner />
      <PageShareButtons variant="floating" />
    </>
  );
}
