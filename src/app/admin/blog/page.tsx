"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  Send,
  FileText,
  RefreshCw,
  Save,
  ArrowLeft,
  ExternalLink,
  Calendar,
  Tag,
  Sparkles,
  Loader2,
  Wand2,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  tags: string[] | null;
  status: string;
  author_name: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

type ViewMode = "list" | "editor";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  // AI Assist state
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      console.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setExcerpt("");
    setTagsInput("");
    setEditingPost(null);
    setAiPrompt("");
    setShowAiPanel(false);
    setAiLoading(false);
  };

  const startNewPost = () => {
    resetForm();
    setViewMode("editor");
  };

  const startEditing = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setExcerpt(post.excerpt || "");
    setTagsInput((post.tags || []).join(", "));
    setViewMode("editor");
  };

  const backToList = () => {
    resetForm();
    setViewMode("list");
  };

  const parseTags = (): string[] => {
    return tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  };

  const savePost = async (publishStatus: "draft" | "published") => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required.");
      return;
    }

    setSaving(true);
    try {
      const tags = parseTags();
      const payload: Record<string, unknown> = {
        title,
        content,
        excerpt: excerpt || null,
        tags,
        status: publishStatus,
      };

      let res: Response;
      if (editingPost) {
        payload.id = editingPost.id;
        res = await fetch("/api/admin/blog", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Save failed");
      await fetchPosts();
      backToList();
    } catch {
      alert("Failed to save post.");
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (id: string, postTitle: string) => {
    if (!confirm(`Delete "${postTitle}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      fetchPosts();
    } catch {
      alert("Failed to delete post.");
    }
  };

  const togglePublish = async (post: BlogPost) => {
    const newStatus = post.status === "published" ? "draft" : "published";
    try {
      const res = await fetch("/api/admin/blog", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: post.id, status: newStatus }),
      });
      if (!res.ok) throw new Error("Update failed");
      fetchPosts();
    } catch {
      alert("Failed to update post.");
    }
  };

  const handleAiGenerate = async (promptOverride?: string) => {
    const finalPrompt = promptOverride || aiPrompt;
    if (!finalPrompt.trim()) {
      alert("Please enter a prompt for the AI assistant.");
      return;
    }

    setAiLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: finalPrompt,
          context: content || undefined,
          type: "blog",
        }),
      });

      if (!res.ok) throw new Error("AI generation failed");
      const data = await res.json();
      const aiContent = data.content || data.text || data.result || "";

      if (content.trim()) {
        setContent(content + "\n\n" + aiContent);
      } else {
        setContent(aiContent);
      }

      setAiPrompt("");
    } catch {
      alert("AI generation failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    let prompt = "";
    switch (action) {
      case "draft":
        prompt = title
          ? `Write a full blog post about: ${title}`
          : "Write a full blog post about the importance of breaking the silence around substance use and mental health.";
        break;
      case "improve":
        prompt =
          "Improve the writing quality of this blog post. Make it more engaging, clear, and polished while keeping the same message and tone.";
        break;
      case "seo":
        prompt =
          "Add SEO-friendly keywords and phrases naturally throughout this blog post. Focus on substance use, mental health, family support, and breaking stigma.";
        break;
      case "conclusion":
        prompt =
          "Write a compelling conclusion for this blog post that includes a call to action encouraging readers to take Sam's OATH.";
        break;
    }
    setAiPrompt(prompt);
    handleAiGenerate(prompt);
  };

  const drafts = posts.filter((p) => p.status === "draft");
  const published = posts.filter((p) => p.status === "published");

  if (viewMode === "editor") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={backToList}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to posts
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => savePost("draft")}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Draft"}
            </button>
            <button
              onClick={() => savePost("published")}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {saving ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>

        {/* Editor Form */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title..."
                className="w-full text-3xl font-bold text-gray-900 placeholder-gray-300 border-0 focus:ring-0 focus:outline-none p-0"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Excerpt (shown in listings)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A short summary of the post..."
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                <Tag className="w-3.5 h-3.5 inline mr-1" />
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="family, mental health, advocacy..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-500">
                  Content
                </label>
                <button
                  onClick={() => setShowAiPanel(!showAiPanel)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
                    showAiPanel
                      ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Assist
                </button>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post here. Each paragraph should be separated by a blank line..."
                rows={20}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base leading-relaxed focus:border-primary focus:ring-1 focus:ring-primary resize-y font-serif"
              />
              <p className="text-xs text-gray-400 mt-2">
                Separate paragraphs with blank lines. Content will be displayed
                with proper paragraph formatting on the public site.
              </p>

              {/* AI Assist Panel */}
              {showAiPanel && (
                <div className="mt-4 border border-purple-200 rounded-xl bg-purple-50/50 p-5 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-purple-800">
                    <Wand2 className="w-4 h-4" />
                    AI Writing Assistant
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleQuickAction("draft")}
                      disabled={aiLoading}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FileText className="w-3 h-3" />
                      Draft full post
                    </button>
                    <button
                      onClick={() => handleQuickAction("improve")}
                      disabled={aiLoading}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                      Improve writing
                    </button>
                    <button
                      onClick={() => handleQuickAction("seo")}
                      disabled={aiLoading}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Tag className="w-3 h-3" />
                      Add SEO keywords
                    </button>
                    <button
                      onClick={() => handleQuickAction("conclusion")}
                      disabled={aiLoading}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-3 h-3" />
                      Write conclusion
                    </button>
                  </div>

                  {/* Custom Prompt Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !aiLoading) {
                          handleAiGenerate();
                        }
                      }}
                      placeholder="Describe what you want to write about, or paste text to improve..."
                      disabled={aiLoading}
                      className="flex-1 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-400 focus:ring-1 focus:ring-purple-400 bg-white disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-400"
                    />
                    <button
                      onClick={() => handleAiGenerate()}
                      disabled={aiLoading || !aiPrompt.trim()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {aiLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Generate
                        </>
                      )}
                    </button>
                  </div>

                  {aiLoading && (
                    <div className="flex items-center gap-2 text-sm text-purple-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      AI is writing... This may take a moment.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-500 text-sm mt-1">
            {posts.length} post{posts.length !== 1 ? "s" : ""} &middot;{" "}
            {published.length} published &middot; {drafts.length} draft
            {drafts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchPosts}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            title="Refresh"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </button>
          <button
            onClick={startNewPost}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-600"
          >
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
            >
              <div className="h-5 w-2/3 bg-gray-200 rounded mb-3" />
              <div className="h-4 w-1/3 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No blog posts yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first post to start sharing updates with the community.
          </p>
          <button
            onClick={startNewPost}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-600"
          >
            <Plus className="w-4 h-4" />
            Write Your First Post
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        post.status === "published"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      )}
                    >
                      {post.status}
                    </span>
                    {post.tags &&
                      post.tags.length > 0 &&
                      post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                  <h3 className="font-semibold text-gray-900 truncate">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    {post.published_at && (
                      <span>
                        Published{" "}
                        {new Date(post.published_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  {post.status === "published" && (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-gray-100"
                      title="View on site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => startEditing(post)}
                    className="p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-gray-100"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => togglePublish(post)}
                    className={cn(
                      "p-2 rounded-lg hover:bg-gray-100",
                      post.status === "published"
                        ? "text-amber-500 hover:text-amber-600"
                        : "text-emerald-500 hover:text-emerald-600"
                    )}
                    title={
                      post.status === "published"
                        ? "Unpublish"
                        : "Publish"
                    }
                  >
                    {post.status === "published" ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => deletePost(post.id, post.title)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
