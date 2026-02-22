import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CrisisBanner } from "@/components/layout/crisis-banner";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { EscapeButton } from "@/components/ui/escape-button";
import { PageShareButtons } from "@/components/ui/page-share-buttons";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GoogleAnalytics />
      <Header />
      <main className="min-h-screen text-[17px] leading-relaxed text-gray-700">{children}</main>
      <Footer />
      <EscapeButton />
      <CookieConsent />
      <CrisisBanner />
      <PageShareButtons variant="floating" />
    </>
  );
}
