import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper, ArrowRight, Calendar, User } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Updates | Addiction, Family, Mental Health & Hope",
  description:
    "Articles and insights for families navigating addiction and mental health. Practical guidance, personal stories, and hope from the Sam's OATH community.",
};

export const dynamic = "force-dynamic";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  author: string;
  published_at: string;
  featured_image: string | null;
  tags: string[] | null;
  status: string;
}

async function getBlogPosts(): Promise<{ posts: BlogPost[]; total: number }> {
  try {
    const { data, count, error } = await supabaseAdmin()
      .from("blog_posts")
      .select(
        "id, title, slug, excerpt, author, published_at, featured_image, tags, status",
        { count: "exact" }
      )
      .eq("status", "published")
      .not("published_at", "is", null)
      .order("published_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Blog fetch error:", error);
      return { posts: [], total: 0 };
    }

    return { posts: (data as BlogPost[]) || [], total: count || 0 };
  } catch {
    return { posts: [], total: 0 };
  }
}

export default async function BlogPage() {
  const { posts, total } = await getBlogPosts();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-slate py-24">
        <div className="container-wide text-white text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Updates &amp; News
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Updates from the movement, reflections from Frank, and stories of
            families finding their voice.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <SectionWrapper variant="white">
        {posts.length === 0 ? (
          <div className="max-w-3xl mx-auto text-center py-12">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              We&apos;re getting ready to share updates, reflections, and news
              from the movement. Check back soon or subscribe to our newsletter
              to be the first to know.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
              >
                Subscribe to Updates <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/stories"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary border border-primary px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
              >
                Read Community Stories
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-500 mb-8">
              {total} post{total !== 1 ? "s" : ""}
            </p>
            <div className="space-y-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article className="bg-white rounded-xl border border-gray-100 p-8 hover:shadow-lg transition-all hover:border-primary/20">
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary-50 text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-600 text-lg leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.published_at).toLocaleDateString(
                          "en-US",
                          { month: "long", day: "numeric", year: "numeric" }
                        )}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>
    </>
  );
}
