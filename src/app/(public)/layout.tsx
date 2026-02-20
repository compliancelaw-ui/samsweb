import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CrisisBanner } from "@/components/layout/crisis-banner";
import { EscapeButton } from "@/components/ui/escape-button";
import { PageShareButtons } from "@/components/ui/page-share-buttons";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <EscapeButton />
      <CrisisBanner />
      <PageShareButtons variant="floating" />
    </>
  );
}
