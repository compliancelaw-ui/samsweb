import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Download } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Free Guides for Families | Sam's OATH Resource Library",
  description:
    "Free downloadable PDF guides for families navigating substance use and mental health. Evidence-based resources from Sam's OATH.",
  keywords: [
    "family substance use guide",
    "mental health family resources",
    "substance use disorder family support",
    "free mental health guides",
    "family support resources",
  ],
  alternates: { canonical: "/resources/guides" },
};

interface ResourceDocument {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  download_count: number;
  tags: string[];
  created_at: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  families: "bg-teal-100 text-teal-700",
  workplace: "bg-blue-100 text-blue-700",
  crisis: "bg-red-100 text-red-700",
  general: "bg-gray-100 text-gray-600",
};

async function getPublishedGuides(): Promise<ResourceDocument[]> {
  try {
    const { data, error } = await supabaseAdmin()
      .from("resource_documents")
      .select("id, title, slug, description, category, download_count, tags, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching guides:", error);
      return [];
    }
    return (data || []) as ResourceDocument[];
  } catch {
    return [];
  }
}

export default async function GuidesPage() {
  const guides = await getPublishedGuides();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal py-20 md:py-28">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center">
          <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
            Resource Library
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Free Guides for Families
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Evidence-based, compassionate guides to help families navigate substance use,
            mental health, and the path to healing. Download, share, and keep forever.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <SectionWrapper variant="white">
        <div className="max-w-5xl mx-auto">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-primary text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Resources
            </Link>
          </div>

          {guides.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Guides Coming Soon
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We are preparing free downloadable guides for families. Check back soon, or
                visit our resources page for crisis help and support organizations.
              </p>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 mt-6 text-primary font-semibold hover:text-primary-600 transition-colors"
              >
                Browse Resources
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        CATEGORY_COLORS[guide.category] || CATEGORY_COLORS.general
                      }`}
                    >
                      {guide.category}
                    </span>
                    {guide.download_count > 0 && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {guide.download_count}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {guide.title}
                  </h3>

                  {guide.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                      {guide.description}
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                    <a
                      href={`/api/resources/${guide.slug}/download`}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                    <Link
                      href={`/resources/guides/${guide.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary-600 transition-colors"
                    >
                      Read Online
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="light">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4">Need Immediate Help?</h2>
          <p className="text-gray-600 text-lg mb-6">
            These guides are for education and support. If you or someone you know is in
            crisis, please reach out now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:988"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-primary-600 transition-colors"
            >
              Call or Text 988
            </a>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-primary-50 transition-colors"
            >
              More Resources
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
