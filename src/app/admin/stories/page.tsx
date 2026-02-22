"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  XCircle,
  Send,
  Trash2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  Star,
  Shield,
  AlertTriangle,
  Info,
  Edit3,
  Sparkles,
  Loader2,
} from "lucide-react";

interface StoryRecord {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string | null;
  display_name: string;
  email: string | null;
  city: string;
  state: string;
  title: string;
  content: string;
  category: string;
  status: string;
  published_at: string | null;
  slug: string | null;
  is_featured: boolean;
  reviewer_notes: string | null;
}

type TabKey = "pending" | "approved" | "published" | "rejected";

const tabs: { key: TabKey; label: string; icon: React.ElementType; color: string; bg: string }[] = [
  { key: "pending", label: "Pending Review", icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
  { key: "approved", label: "Approved", icon: CheckCircle2, color: "text-primary", bg: "bg-primary-100" },
  { key: "published", label: "Published", icon: Send, color: "text-emerald-600", bg: "bg-emerald-100" },
  { key: "rejected", label: "Rejected", icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-blue-100 text-blue-700",
  published: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminStoriesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("pending");
  const [stories, setStories] = useState<StoryRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [expandedStory, setExpandedStory] = useState<string | null>(null);
  const [tabCounts, setTabCounts] = useState<Record<TabKey, number>>({ pending: 0, approved: 0, published: 0, rejected: 0 });

  // Edit mode state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);

  const fetchStories = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "50", status: activeTab });
      const res = await fetch(`/api/admin/stories?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setStories(data.stories || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch {
      console.error("Failed to fetch stories");
    } finally {
      setLoading(false);
    }
  }, [page, activeTab]);

  // Fetch counts for all tabs
  const fetchCounts = useCallback(async () => {
    try {
      const results = await Promise.all(
        (["pending", "approved", "published", "rejected"] as TabKey[]).map(async (status) => {
          const res = await fetch(`/api/admin/stories?status=${status}&limit=1`);
          if (!res.ok) return { status, count: 0 };
          const data = await res.json();
          return { status, count: data.total || 0 };
        })
      );
      const counts: Record<TabKey, number> = { pending: 0, approved: 0, published: 0, rejected: 0 };
      results.forEach((r) => { counts[r.status as TabKey] = r.count; });
      setTabCounts(counts);
    } catch {
      // silent fail
    }
  }, []);

  useEffect(() => { fetchStories(); }, [fetchStories]);
  useEffect(() => { fetchCounts(); }, [fetchCounts]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === stories.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(stories.map((s) => s.id)));
    }
  };

  const handleDelete = async () => {
    if (selected.size === 0) return;
    const confirmed = window.confirm(
      `Delete ${selected.size} stor${selected.size > 1 ? "ies" : "y"}? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      const res = await fetch("/api/admin/stories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selected) }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setSelected(new Set());
      fetchStories();
      fetchCounts();
    } catch {
      alert("Failed to delete. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleFeatured = async (id: string, currentlyFeatured: boolean) => {
    setUpdatingStatus(id);
    try {
      const res = await fetch("/api/admin/stories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_featured: !currentlyFeatured }),
      });
      if (!res.ok) throw new Error("Update failed");
      fetchStories();
    } catch {
      alert("Failed to update featured status.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingStatus(id);
    try {
      const res = await fetch("/api/admin/stories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error("Update failed");
      fetchStories();
      fetchCounts();
    } catch {
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setPage(1);
    setSelected(new Set());
    setExpandedStory(null);
    cancelEdit();
  };

  // Edit mode handlers
  const startEdit = (story: StoryRecord) => {
    setEditingId(story.id);
    setEditTitle(story.title || "");
    setEditContent(story.content || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
    setAiLoading(false);
    setSavingEdit(false);
  };

  const handleSaveEdit = async (andApprove?: boolean) => {
    if (!editingId) return;
    setSavingEdit(true);
    try {
      const body: Record<string, string> = {
        id: editingId,
        title: editTitle,
        content: editContent,
      };
      if (andApprove) {
        body.status = "approved";
      }
      const res = await fetch("/api/admin/stories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Save failed");
      cancelEdit();
      fetchStories();
      if (andApprove) fetchCounts();
    } catch {
      alert("Failed to save changes. Please try again.");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleAIPolish = async () => {
    if (!editContent.trim()) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: "Polish and improve this story while preserving the author's voice. Fix grammar, improve clarity, ensure safe messaging.",
          context: editContent,
          type: "story-edit",
        }),
      });
      if (!res.ok) throw new Error("AI polish failed");
      const data = await res.json();
      if (data.result) {
        setEditContent(data.result);
      }
    } catch {
      alert("AI polish failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleFeatureAsBlog = async (story: StoryRecord) => {
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: story.title,
          content: story.content,
          excerpt: story.content.slice(0, 200) + "...",
          tags: ["stories", story.category],
          status: "draft",
        }),
      });
      if (!res.ok) throw new Error("Blog post creation failed");
      alert("Blog post draft created from this story.");
    } catch {
      alert("Failed to create blog post. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Story Moderation</h2>
          <p className="text-gray-500 mt-1">
            Review and manage submitted stories before they go live.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Delete {selected.size}
            </button>
          )}
          <button
            onClick={() => { setPage(1); fetchStories(); fetchCounts(); }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          const count = tabCounts[tab.key];
          return (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? `${tab.bg} ${tab.color}`
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {count > 0 && (
                <span className={cn(
                  "ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold",
                  isActive ? "bg-white/60" : "bg-gray-100"
                )}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Stories table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="px-6 py-16 text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Loading stories...</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="bg-gray-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No {activeTab} stories</p>
            <p className="text-sm text-gray-400 mt-2">
              {activeTab === "pending"
                ? "Stories will appear here when people submit them."
                : `No stories with "${activeTab}" status.`}
            </p>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  checked={selected.size === stories.length}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </div>
              <div className="col-span-3">Title</div>
              <div className="col-span-2">Author</div>
              <div className="col-span-2">Location</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Actions</div>
            </div>

            {/* Rows */}
            {stories.map((story) => (
              <div key={story.id}>
                <div
                  className={cn(
                    "grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer",
                    selected.has(story.id) && "bg-blue-50"
                  )}
                  onClick={() => setExpandedStory(expandedStory === story.id ? null : story.id)}
                >
                  {/* Checkbox */}
                  <div className="col-span-1 flex items-center">
                    <input
                      type="checkbox"
                      checked={selected.has(story.id)}
                      onChange={(e) => { e.stopPropagation(); toggleSelect(story.id); }}
                      onClick={(e) => e.stopPropagation()}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </div>

                  {/* Title */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-1.5">
                      <p className="font-medium text-gray-900 text-sm truncate">
                        {story.title || "Untitled"}
                      </p>
                      {story.reviewer_notes?.startsWith("[Auto-flagged]") && (
                        <span title="Content flagged for review">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 truncate">
                      {story.content?.slice(0, 80)}...
                    </p>
                  </div>

                  {/* Author */}
                  <div className="col-span-2 text-sm">
                    <p className="text-gray-900">{story.display_name}</p>
                    <p className="text-xs text-gray-400">{story.email || "No email"}</p>
                  </div>

                  {/* Location */}
                  <div className="col-span-2 text-sm text-gray-600">
                    {story.city}, {story.state}
                  </div>

                  {/* Date */}
                  <div className="col-span-2 text-sm text-gray-500">
                    {new Date(story.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex items-center gap-1">
                    {activeTab === "pending" && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleStatusChange(story.id, "approved"); }}
                          disabled={updatingStatus === story.id}
                          className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary rounded hover:bg-primary-200 transition-colors disabled:opacity-50"
                          title="Approve"
                        >
                          Approve
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleStatusChange(story.id, "rejected"); }}
                          disabled={updatingStatus === story.id}
                          className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors disabled:opacity-50"
                          title="Reject"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {activeTab === "approved" && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleStatusChange(story.id, "published"); }}
                        disabled={updatingStatus === story.id}
                        className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors disabled:opacity-50"
                        title="Publish"
                      >
                        Publish
                      </button>
                    )}
                    {activeTab === "published" && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleToggleFeatured(story.id, story.is_featured); }}
                          disabled={updatingStatus === story.id}
                          className={cn(
                            "p-1 rounded transition-colors disabled:opacity-50",
                            story.is_featured ? "text-amber-500 hover:text-amber-600" : "text-gray-300 hover:text-amber-400"
                          )}
                          title={story.is_featured ? "Remove from featured" : "Feature this story"}
                        >
                          <Star className={cn("h-4 w-4", story.is_featured && "fill-current")} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleStatusChange(story.id, "approved"); }}
                          disabled={updatingStatus === story.id}
                          className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors disabled:opacity-50"
                          title="Unpublish"
                        >
                          Unpublish
                        </button>
                      </>
                    )}
                    {activeTab === "rejected" && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleStatusChange(story.id, "pending"); }}
                        disabled={updatingStatus === story.id}
                        className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors disabled:opacity-50"
                        title="Move back to pending"
                      >
                        Re-review
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); setExpandedStory(expandedStory === story.id ? null : story.id); }}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      title="View full story"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded story view */}
                {expandedStory === story.id && (
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", STATUS_COLORS[story.status] || "bg-gray-100 text-gray-700")}>
                          {story.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          Category: {story.category}
                        </span>
                        {story.published_at && (
                          <span className="text-xs text-gray-400">
                            Published: {new Date(story.published_at).toLocaleDateString()}
                          </span>
                        )}
                        <div className="ml-auto flex items-center gap-2">
                          {editingId !== story.id && (
                            <button
                              onClick={(e) => { e.stopPropagation(); startEdit(story); }}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                              title="Edit story"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                              Edit
                            </button>
                          )}
                          {story.status === "published" && editingId !== story.id && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleFeatureAsBlog(story); }}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors"
                              title="Feature as blog post"
                            >
                              <BookOpen className="h-3.5 w-3.5" />
                              Feature as Blog Post
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Auto-flag alerts */}
                      {story.reviewer_notes?.startsWith("[Auto-flagged]") && (
                        <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-amber-800">Content Filter Flags</p>
                              <p className="text-xs text-amber-700 mt-1">{story.reviewer_notes.replace("[Auto-flagged] ", "")}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {editingId === story.id ? (
                        /* Edit mode */
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                              placeholder="Story title"
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-xs font-medium text-gray-500">Content</label>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleAIPolish(); }}
                                disabled={aiLoading || !editContent.trim()}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50"
                                title="AI Polish - improve grammar, clarity, and safe messaging"
                              >
                                {aiLoading ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Sparkles className="h-3.5 w-3.5" />
                                )}
                                {aiLoading ? "Polishing..." : "AI Polish"}
                              </button>
                            </div>
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              rows={15}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-y"
                              placeholder="Story content"
                            />
                          </div>
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleSaveEdit(false); }}
                              disabled={savingEdit}
                              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                            >
                              {savingEdit ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                              Save
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleSaveEdit(true); }}
                              disabled={savingEdit}
                              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                            >
                              {savingEdit ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                              Save & Approve
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); cancelEdit(); }}
                              disabled={savingEdit}
                              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                              <XCircle className="h-4 w-4" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Read-only view */
                        <>
                          <h3 className="font-semibold text-gray-900 mb-2">{story.title || "Untitled"}</h3>
                          <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                            {story.content}
                          </p>
                        </>
                      )}

                      <div className="mt-4 pt-3 border-t border-gray-200 flex items-center gap-4 text-xs text-gray-400">
                        <span>By: {story.first_name} {story.last_name || ""}</span>
                        <span>Display: {story.display_name}</span>
                        <span>{story.city}, {story.state}</span>
                        {story.email && <span>{story.email}</span>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {page} of {totalPages} ({total} total)
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Content Filter info box */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start gap-3">
          <div className="bg-primary-50 rounded-lg p-2 mt-0.5">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Content Filter System</h3>
            <p className="text-sm text-gray-600 mb-4">
              All submitted stories are automatically screened before appearing in
              the moderation queue. The filter does <strong>not</strong> auto-reject
              stories — it flags them for your review.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Triggering Content</p>
                  <p className="text-xs text-gray-500">Graphic descriptions flagged for safe messaging review</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Named Individuals</p>
                  <p className="text-xs text-gray-500">Names of professionals or facilities that need consent</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Spam Detection</p>
                  <p className="text-xs text-gray-500">Promotional language, excessive caps, or repeated characters</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Contact Info</p>
                  <p className="text-xs text-gray-500">Phone numbers, emails, or social handles removed for privacy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
