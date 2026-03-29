import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, BookOpen, Calendar } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageShareButtons } from "@/components/ui/page-share-buttons";
import { SoftEmailCapture } from "@/components/ui/soft-email-capture";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

interface ResourceDocument {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  content: string;
  sources: string[];
  tags: string[];
  download_count: number;
  is_published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
}

async function getGuide(slug: string): Promise<ResourceDocument | null> {
  try {
    const { data, error } = await supabaseAdmin()
      .from("resource_documents")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error || !data) return null;
    return data as ResourceDocument;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);

  if (!guide) {
    return { title: "Guide Not Found" };
  }

  const title = guide.seo_title || `${guide.title} | Sam's OATH Guides`;
  const description =
    guide.seo_description || guide.description || `${guide.content.slice(0, 160)}...`;

  return {
    title,
    description,
    keywords: [
      "family substance use guide",
      "mental health family resources",
      ...(guide.tags || []),
    ],
    openGraph: {
      title: guide.title,
      description,
      type: "article",
      tags: guide.tags || undefined,
    },
    alternates: { canonical: `/resources/guides/${guide.slug}` },
  };
}

function renderContent(content: string) {
  const blocks = content.split("\n\n");
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Heading (## Heading)
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="text-2xl font-bold text-gray-900 mt-10 mb-4"
        >
          {trimmed.replace(/^##\s*/, "")}
        </h2>
      );
    }

    // Sub-heading (### Heading)
    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="text-xl font-semibold text-gray-900 mt-8 mb-3"
        >
          {trimmed.replace(/^###\s*/, "")}
        </h3>
      );
    }

    // Regular paragraph
    return (
      <p key={i} className="text-gray-700 leading-relaxed mb-4">
        {trimmed}
      </p>
    );
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuide(slug);

  if (!guide) {
    notFound();
  }

  const CATEGORY_LABELS: Record<string, string> = {
    families: "Families",
    workplace: "Workplace",
    crisis: "Crisis",
    general: "General",
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal py-16 md:py-24">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-white">
          <Link
            href="/resources/guides"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Guides
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-2.5 py-1 bg-white/20 rounded-full">
              {CATEGORY_LABELS[guide.category] || guide.category}
            </span>
            <span className="text-xs text-white/60 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(guide.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {guide.title}
          </h1>
          {guide.description && (
            <p className="text-xl text-white/85 max-w-3xl leading-relaxed">
              {guide.description}
            </p>
          )}
          <div className="mt-8">
            <a
              href={`/api/resources/${guide.slug}/download`}
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {renderContent(guide.content)}
          </div>

          {/* Sources */}
          {guide.sources && guide.sources.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Sources
              </h3>
              <ol className="space-y-2 list-decimal list-inside">
                {guide.sources.map((source, i) => (
                  <li key={i} className="text-sm text-gray-600 leading-relaxed">
                    {source}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Download CTA */}
          <div className="mt-12 bg-primary-50 rounded-xl p-8 text-center border border-primary-100">
            <Download className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Download This Guide
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Save a beautifully formatted PDF to share with your family, friends, or community.
            </p>
            <a
              href={`/api/resources/${guide.slug}/download`}
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </a>
          </div>

          {/* Share */}
          <div className="mt-8">
            <PageShareButtons
              variant="inline"
              text={`${guide.title} - a free guide from Sam's OATH.`}
            />
          </div>

          {/* Email Capture */}
          <div className="mt-12">
            <SoftEmailCapture
              heading="Get More Resources"
              subtext="We'll send you new guides and resources as they're published. No spam, ever."
              source={`guide-${guide.slug}`}
            />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
