"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  Send,
  RefreshCw,
  Save,
  ArrowLeft,
  BookOpen,
  Download,
  Tag,
  Calendar,
} from "lucide-react";

interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  content: string;
  cover_image_url: string | null;
  sources: string[];
  tags: string[];
  download_count: number;
  is_published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

type ViewMode = "list" | "editor";

const CATEGORIES = [
  { value: "families", label: "Families" },
  { value: "workplace", label: "Workplace" },
  { value: "crisis", label: "Crisis" },
  { value: "general", label: "General" },
];

const CATEGORY_COLORS: Record<string, string> = {
  families: "bg-teal-100 text-teal-700",
  workplace: "bg-blue-100 text-blue-700",
  crisis: "bg-red-100 text-red-700",
  general: "bg-gray-100 text-gray-600",
};

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("families");
  const [content, setContent] = useState("");
  const [sourcesInput, setSourcesInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/resources");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setResources(data.resources || []);
    } catch {
      console.error("Failed to fetch resources");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("families");
    setContent("");
    setSourcesInput("");
    setTagsInput("");
    setSeoTitle("");
    setSeoDescription("");
    setEditingResource(null);
  };

  const startNew = () => {
    resetForm();
    setViewMode("editor");
  };

  const startEditing = (resource: Resource) => {
    setEditingResource(resource);
    setTitle(resource.title);
    setDescription(resource.description || "");
    setCategory(resource.category);
    setContent(resource.content);
    setSourcesInput((resource.sources || []).join("\n"));
    setTagsInput((resource.tags || []).join(", "));
    setSeoTitle(resource.seo_title || "");
    setSeoDescription(resource.seo_description || "");
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

  const parseSources = (): string[] => {
    return sourcesInput
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const saveResource = async (publish: boolean) => {
    if (!title.trim()) {
      alert("Title is required.");
      return;
    }

    setSaving(true);
    try {
      const tags = parseTags();
      const sources = parseSources();
      const payload: Record<string, unknown> = {
        title,
        description: description || null,
        category,
        content,
        sources,
        tags,
        seo_title: seoTitle || null,
        seo_description: seoDescription || null,
        is_published: publish,
      };

      let res: Response;
      if (editingResource) {
        payload.id = editingResource.id;
        res = await fetch("/api/admin/resources", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/resources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Save failed");
      await fetchResources();
      backToList();
    } catch {
      alert("Failed to save resource.");
    } finally {
      setSaving(false);
    }
  };

  const deleteResource = async (id: string, resourceTitle: string) => {
    if (!confirm(`Delete "${resourceTitle}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/resources?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      fetchResources();
    } catch {
      alert("Failed to delete resource.");
    }
  };

  const togglePublish = async (resource: Resource) => {
    const newStatus = !resource.is_published;
    try {
      const res = await fetch("/api/admin/resources", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: resource.id, is_published: newStatus }),
      });
      if (!res.ok) throw new Error("Update failed");
      fetchResources();
    } catch {
      alert("Failed to update resource.");
    }
  };

  const published = resources.filter((r) => r.is_published);
  const drafts = resources.filter((r) => !r.is_published);

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
            Back to resources
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => saveResource(editingResource?.is_published ?? false)}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Draft"}
            </button>
            <button
              onClick={() => saveResource(true)}
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
                placeholder="Guide title..."
                className="w-full text-3xl font-bold text-gray-900 placeholder-gray-300 border-0 focus:ring-0 focus:outline-none p-0"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Description (shown in listings)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short description of this guide..."
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Guide Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write the guide content here. Use ## for headings and blank lines between paragraphs..."
                rows={24}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base leading-relaxed focus:border-primary focus:ring-1 focus:ring-primary resize-y font-serif"
              />
              <p className="text-xs text-gray-400 mt-2">
                Use ## for section headings. Separate paragraphs with blank lines. This content
                will be rendered on the web and auto-formatted into a branded PDF for download.
              </p>
            </div>

            {/* Sources */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Sources (one per line)
              </label>
              <textarea
                value={sourcesInput}
                onChange={(e) => setSourcesInput(e.target.value)}
                placeholder="SAMHSA. (2024). National Survey on Drug Use and Health.&#10;NIDA. (2023). Drugs, Brains, and Behavior: The Science of Addiction."
                rows={4}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary resize-y"
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
                placeholder="family, mental health, substance use, guide..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* SEO Fields */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm font-medium text-gray-500 mb-4">SEO Settings</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Custom title for search engines (defaults to guide title)"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    SEO Description
                  </label>
                  <textarea
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="Custom description for search engines (defaults to guide description)"
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>
              </div>
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
          <h1 className="text-2xl font-bold text-gray-900">Resource Library</h1>
          <p className="text-gray-500 text-sm mt-1">
            {resources.length} guide{resources.length !== 1 ? "s" : ""} &middot;{" "}
            {published.length} published &middot; {drafts.length} draft
            {drafts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchResources}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            title="Refresh"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </button>
          <button
            onClick={startNew}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-600"
          >
            <Plus className="w-4 h-4" />
            New Guide
          </button>
        </div>
      </div>

      {/* Resource List */}
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
      ) : resources.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No guides yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first downloadable guide to share resources with families.
          </p>
          <button
            onClick={startNew}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-600"
          >
            <Plus className="w-4 h-4" />
            Create Your First Guide
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        resource.is_published
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      )}
                    >
                      {resource.is_published ? "published" : "draft"}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        CATEGORY_COLORS[resource.category] || CATEGORY_COLORS.general
                      )}
                    >
                      {resource.category}
                    </span>
                    {resource.tags &&
                      resource.tags.length > 0 &&
                      resource.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                  <h3 className="font-semibold text-gray-900 truncate">
                    {resource.title}
                  </h3>
                  {resource.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                      {resource.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(resource.created_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {resource.download_count} download{resource.download_count !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => startEditing(resource)}
                    className="p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-gray-100"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => togglePublish(resource)}
                    className={cn(
                      "p-2 rounded-lg hover:bg-gray-100",
                      resource.is_published
                        ? "text-amber-500 hover:text-amber-600"
                        : "text-emerald-500 hover:text-emerald-600"
                    )}
                    title={resource.is_published ? "Unpublish" : "Publish"}
                  >
                    {resource.is_published ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteResource(resource.id, resource.title)}
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
