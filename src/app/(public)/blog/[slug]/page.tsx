import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  author: string;
  published_at: string;
  featured_image: string | null;
  tags: string[] | null;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabaseAdmin()
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error || !data) return null;
    return data as BlogPost;
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
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const description = post.excerpt || `${post.content.slice(0, 160)}...`;
  return {
    title: `${post.title} | Sam's OATH Blog`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.published_at,
      authors: [post.author],
      tags: post.tags || undefined,
    },
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.content.slice(0, 160),
    datePublished: post.published_at,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Sam's OATH",
      url: "https://samsoath.org",
    },
    mainEntityOfPage: `https://samsoath.org/blog/${post.slug}`,
    ...(post.tags && post.tags.length > 0
      ? { keywords: post.tags.join(", ") }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-slate py-16 md:py-24">
        <div className="container-wide text-white">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/20 text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 max-w-4xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-white/70">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.published_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <SectionWrapper variant="white">
        <article className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-gray max-w-none whitespace-pre-wrap">
            {post.content}
          </div>
        </article>
      </SectionWrapper>

      {/* Footer CTA */}
      <SectionWrapper variant="light">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-600 text-lg mb-6">
            Want to stay updated on the movement?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              More Posts
            </Link>
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary border border-primary px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
