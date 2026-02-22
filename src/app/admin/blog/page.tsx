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
  Scissors,
  AlignLeft,
  Check,
  X,
  PlusCircle,
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

type ViewMode = "list" | "editor" | "preview";

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

  const [showPreview, setShowPreview] = useState(false);

  // AI Assist state
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");

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
    setAiSuggestion("");
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

  const handleAiGenerate = async (promptOverride?: string, target?: "excerpt" | "tags" | "suggestion") => {
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

      if (target === "excerpt") {
        setExcerpt(aiContent.replace(/^["']|["']$/g, "").trim());
      } else if (target === "tags") {
        setTagsInput(aiContent.replace(/^tags:\s*/i, "").trim());
      } else {
        setAiSuggestion(aiContent);
      }

      setAiPrompt("");
    } catch {
      alert("AI generation failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const acceptSuggestion = (mode: "replace" | "append") => {
    if (mode === "replace") {
      setContent(aiSuggestion);
    } else {
      setContent(content.trim() ? content + "\n\n" + aiSuggestion : aiSuggestion);
    }
    setAiSuggestion("");
  };

  const handleQuickAction = (action: string) => {
    let prompt = "";
    let target: "excerpt" | "tags" | "suggestion" = "suggestion";

    switch (action) {
      case "draft":
        prompt = title
          ? `Write a full blog post about: ${title}. Use warm, hopeful tone. Use "substance use" (never "addiction"). Separate paragraphs with blank lines. End with a call to action to take Sam's OATH.`
          : "Write a full blog post about the importance of breaking the silence around substance use and mental health. Use warm, hopeful tone. Separate paragraphs with blank lines.";
        break;
      case "improve":
        prompt =
          "Rewrite this entire blog post with improved writing quality. Make it more engaging, clear, and polished while keeping the same message and tone. Return the complete rewritten post.";
        break;
      case "seo":
        prompt =
          "Rewrite this blog post with SEO-friendly keywords and phrases woven in naturally. Focus on substance use, mental health, family support, and breaking stigma. Return the complete rewritten post.";
        break;
      case "conclusion":
        prompt =
          "Write a compelling conclusion paragraph for this blog post that includes a call to action encouraging readers to take Sam's OATH at samsoath.org/take-the-oath.";
        break;
      case "shorten":
        prompt =
          "Rewrite this blog post to be more concise. Cut unnecessary words and tighten the prose while keeping all key points and the same warm tone. Return the complete rewritten post.";
        break;
      case "excerpt":
        prompt =
          "Write a 1-2 sentence excerpt/summary of this blog post for use in listings and social sharing. Keep it compelling and under 200 characters. Return ONLY the excerpt text, no quotes.";
        target = "excerpt";
        break;
      case "tags":
        prompt =
          "Suggest 4-6 comma-separated tags for this blog post. Tags should be lowercase, relevant to the content, and useful for categorization. Return ONLY the comma-separated tags, nothing else.";
        target = "tags";
        break;
    }
    handleAiGenerate(prompt, target);
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
              onClick={() => setShowPreview(!showPreview)}
              disabled={!content.trim()}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-40",
                showPreview
                  ? "bg-primary-100 text-primary border border-primary-200"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              )}
            >
              <Eye className="w-4 h-4" />
              {showPreview ? "Hide Preview" : "Preview"}
            </button>
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

        {/* Preview Panel */}
        {showPreview && content.trim() && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
              <Eye className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">Post Preview</span>
              <span className="text-xs text-gray-400 ml-auto">This is how the post will appear on the public site</span>
            </div>
            <div className="p-8 max-w-3xl mx-auto">
              {parseTags().length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {parseTags().map((tag) => (
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-primary-50 text-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {title || "Untitled Post"}
              </h1>
              {excerpt && (
                <p className="text-lg text-gray-500 mb-6 italic">{excerpt}</p>
              )}
              <div className="border-t border-gray-200 pt-6">
                <div className="prose prose-lg max-w-none text-gray-600">
                  {content.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="mb-4 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

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

                  {/* Quick Actions — Content */}
                  <div>
                    <p className="text-xs text-purple-600 font-medium mb-2">Content</p>
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
                        disabled={aiLoading || !content.trim()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        Improve writing
                      </button>
                      <button
                        onClick={() => handleQuickAction("seo")}
                        disabled={aiLoading || !content.trim()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Tag className="w-3 h-3" />
                        Add SEO keywords
                      </button>
                      <button
                        onClick={() => handleQuickAction("shorten")}
                        disabled={aiLoading || !content.trim()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Scissors className="w-3 h-3" />
                        Shorten
                      </button>
                      <button
                        onClick={() => handleQuickAction("conclusion")}
                        disabled={aiLoading || !content.trim()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="w-3 h-3" />
                        Write conclusion
                      </button>
                    </div>
                  </div>

                  {/* Quick Actions — Metadata */}
                  <div>
                    <p className="text-xs text-purple-600 font-medium mb-2">Auto-fill</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleQuickAction("excerpt")}
                        disabled={aiLoading || !content.trim()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <AlignLeft className="w-3 h-3" />
                        Generate excerpt
                      </button>
                      <button
                        onClick={() => handleQuickAction("tags")}
                        disabled={aiLoading || !content.trim()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Tag className="w-3 h-3" />
                        Suggest tags
                      </button>
                    </div>
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
                      placeholder="Ask AI anything: &quot;Write an intro about...&quot; or &quot;Make this more personal...&quot;"
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

                  {/* AI Suggestion Preview */}
                  {aiSuggestion && (
                    <div className="border border-purple-300 rounded-xl bg-white overflow-hidden">
                      <div className="px-4 py-3 bg-purple-50 border-b border-purple-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-800">AI Suggestion</span>
                          <span className="text-xs text-purple-500">
                            {aiSuggestion.split(/\s+/).length} words
                          </span>
                        </div>
                        <button
                          onClick={() => setAiSuggestion("")}
                          className="p-1 text-purple-400 hover:text-purple-600 rounded"
                          title="Discard"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-4 max-h-96 overflow-y-auto">
                        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-serif">
                          {aiSuggestion}
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 border-t border-purple-200 flex items-center gap-2">
                        <button
                          onClick={() => acceptSuggestion("replace")}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Use This
                        </button>
                        <button
                          onClick={() => acceptSuggestion("append")}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          Append
                        </button>
                        <button
                          onClick={() => setAiSuggestion("")}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                          Discard
                        </button>
                      </div>
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
