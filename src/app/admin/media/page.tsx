"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  Edit3,
  X,
  Save,
  Link as LinkIcon,
  FileImage,
  Film,
  FileText,
} from "lucide-react";

interface MediaItem {
  id: string;
  created_at: string;
  filename: string;
  original_filename: string | null;
  file_url: string;
  thumbnail_url: string | null;
  width: number | null;
  height: number | null;
  file_size: number | null;
  mime_type: string | null;
  alt_text: string | null;
  usage_context: string | null;
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getMimeIcon(mime: string | null) {
  if (!mime) return FileText;
  if (mime.startsWith("image/")) return FileImage;
  if (mime.startsWith("video/")) return Film;
  return FileText;
}

function isImage(mime: string | null): boolean {
  return !!mime && mime.startsWith("image/");
}

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAlt, setEditAlt] = useState("");
  const [editContext, setEditContext] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Add form state
  const [addFilename, setAddFilename] = useState("");
  const [addUrl, setAddUrl] = useState("");
  const [addMime, setAddMime] = useState("");
  const [addAlt, setAddAlt] = useState("");
  const [addContext, setAddContext] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      console.error("Failed to fetch media");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const addItem = async () => {
    if (!addFilename.trim() || !addUrl.trim()) {
      alert("Filename and URL are required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: addFilename,
          file_url: addUrl,
          mime_type: addMime || null,
          alt_text: addAlt || null,
          usage_context: addContext || null,
        }),
      });
      if (!res.ok) throw new Error("Add failed");
      setShowAdd(false);
      setAddFilename("");
      setAddUrl("");
      setAddMime("");
      setAddAlt("");
      setAddContext("");
      fetchItems();
    } catch {
      alert("Failed to add media item.");
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (item: MediaItem) => {
    setEditingId(item.id);
    setEditAlt(item.alt_text || "");
    setEditContext(item.usage_context || "");
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      const res = await fetch("/api/admin/media", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          alt_text: editAlt,
          usage_context: editContext,
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      setEditingId(null);
      fetchItems();
    } catch {
      alert("Failed to update.");
    }
  };

  const deleteItem = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/media?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      fetchItems();
    } catch {
      alert("Failed to delete.");
    }
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const images = items.filter((i) => isImage(i.mime_type));
  const other = items.filter((i) => !isImage(i.mime_type));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-500 text-sm mt-1">
            {items.length} item{items.length !== 1 ? "s" : ""} &middot;{" "}
            {images.length} image{images.length !== 1 ? "s" : ""} &middot;{" "}
            {other.length} other
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchItems}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            title="Refresh"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-600"
          >
            <Plus className="w-4 h-4" />
            Add Media
          </button>
        </div>
      </div>

      {/* Add Media Form */}
      {showAdd && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-primary" />
              Add Media by URL
            </h2>
            <button
              onClick={() => setShowAdd(false)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Filename *
              </label>
              <input
                type="text"
                value={addFilename}
                onChange={(e) => setAddFilename(e.target.value)}
                placeholder="hero-image.jpg"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                MIME Type
              </label>
              <input
                type="text"
                value={addMime}
                onChange={(e) => setAddMime(e.target.value)}
                placeholder="image/jpeg"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                File URL *
              </label>
              <input
                type="url"
                value={addUrl}
                onChange={(e) => setAddUrl(e.target.value)}
                placeholder="https://... or /images/photos/..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Alt Text
              </label>
              <input
                type="text"
                value={addAlt}
                onChange={(e) => setAddAlt(e.target.value)}
                placeholder="Description for accessibility"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Usage Context
              </label>
              <input
                type="text"
                value={addContext}
                onChange={(e) => setAddContext(e.target.value)}
                placeholder="homepage, blog, story..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={addItem}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "Adding..." : "Add Item"}
            </button>
          </div>
        </div>
      )}

      {/* Media Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 aspect-square animate-pulse"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No media yet
          </h3>
          <p className="text-gray-500 mb-6">
            Add images and files to the media library for use across the site.
          </p>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-600"
          >
            <Plus className="w-4 h-4" />
            Add Your First Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => {
            const MimeIcon = getMimeIcon(item.mime_type);
            const isEditing = editingId === item.id;
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden group hover:shadow-sm transition-shadow"
              >
                {/* Preview */}
                <div className="aspect-square bg-gray-50 relative flex items-center justify-center">
                  {isImage(item.mime_type) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.file_url}
                      alt={item.alt_text || item.filename}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <MimeIcon className="w-12 h-12 text-gray-300" />
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => copyUrl(item.id, item.file_url)}
                      className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                      title="Copy URL"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-700" />
                      )}
                    </button>
                    <button
                      onClick={() => startEditing(item)}
                      className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => deleteItem(item.id, item.filename)}
                      className="p-2 bg-white rounded-lg shadow-sm hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                {isEditing ? (
                  <div className="p-3 space-y-2">
                    <input
                      type="text"
                      value={editAlt}
                      onChange={(e) => setEditAlt(e.target.value)}
                      placeholder="Alt text..."
                      className="w-full border border-gray-200 rounded px-2 py-1 text-xs focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="text"
                      value={editContext}
                      onChange={(e) => setEditContext(e.target.value)}
                      placeholder="Usage context..."
                      className="w-full border border-gray-200 rounded px-2 py-1 text-xs focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="flex-1 text-xs font-medium bg-primary text-white rounded py-1 hover:bg-primary-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 text-xs font-medium border border-gray-300 text-gray-600 rounded py-1 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      {item.filename}
                    </p>
                    {item.alt_text && (
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {item.alt_text}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      {item.mime_type && (
                        <span>{item.mime_type.split("/")[1]}</span>
                      )}
                      {item.file_size && (
                        <span>{formatFileSize(item.file_size)}</span>
                      )}
                      {item.width && item.height && (
                        <span>
                          {item.width}&times;{item.height}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
