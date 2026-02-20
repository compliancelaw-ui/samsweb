import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CrisisBanner } from "@/components/layout/crisis-banner";

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
      <CrisisBanner />
    </>
  );
}
