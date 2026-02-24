"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Clock,
  Check,
  X,
  Loader2,
  ChevronDown,
  ChevronRight,
  Save,
  Wand2,
  RefreshCw,
  Layers,
} from "lucide-react";
import {
  ContentFieldDef,
  PAGE_LABELS,
  getFieldsForPage,
  getAllPageSlugs,
} from "@/lib/cms/content-defaults";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SavedValue {
  id?: string;
  content: string;
  version?: number;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function AdminContentPage() {
  const [activePage, setActivePage] = useState("home");
  const [fields, setFields] = useState<ContentFieldDef[]>([]);
  const [savedValues, setSavedValues] = useState<
    Record<string, SavedValue>
  >({});
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState<
    Record<string, "saving" | "saved" | "error">
  >({});
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [aiField, setAiField] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [aiCustomPrompt, setAiCustomPrompt] = useState("");
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({});
  const [historyField, setHistoryField] = useState<string | null>(null);
  const [historyData, setHistoryData] = useState<
    Array<{
      id: string;
      content: string;
      version: number;
      created_at: string;
      ai_generated?: boolean;
    }>
  >([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const statusTimers = useRef<Record<string, NodeJS.Timeout>>({});
  const pageSlugs = getAllPageSlugs();

  // ─── Data Loading ──────────────────────────────────────────────────────────

  const loadPageData = useCallback(async (page: string) => {
    setLoading(true);
    try {
      const fieldDefs = getFieldsForPage(page);
      setFields(fieldDefs);

      const res = await fetch(`/api/admin/content?page=${page}`);
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      const records = data.content || [];

      // Build savedValues map
      const saved: Record<string, SavedValue> = {};
      for (const rec of records) {
        saved[rec.section_key] = {
          id: rec.id,
          content: rec.content,
          version: rec.version || 1,
        };
      }
      setSavedValues(saved);

      // Build editValues map
      const edits: Record<string, string> = {};
      for (const field of fieldDefs) {
        edits[field.sectionKey] =
          saved[field.sectionKey]?.content ?? field.defaultContent;
      }
      setEditValues(edits);
    } catch (err) {
      console.error("Failed to load page data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPageData(activePage);
    // Reset AI state when switching pages
    setAiField(null);
    setAiSuggestion("");
    setAiCustomPrompt("");
    setHistoryField(null);
    setCollapsedGroups({});
  }, [activePage, loadPageData]);

  // ─── Per-field Save ────────────────────────────────────────────────────────

  const saveField = useCallback(
    async (field: ContentFieldDef) => {
      const key = field.sectionKey;
      const currentValue = editValues[key];
      const savedContent =
        savedValues[key]?.content ?? field.defaultContent;

      // Skip if unchanged
      if (currentValue === savedContent) return;

      // Clear any existing timer for this field
      if (statusTimers.current[key]) {
        clearTimeout(statusTimers.current[key]);
      }

      setSaveStatus((prev) => ({ ...prev, [key]: "saving" }));

      try {
        let res: Response;
        if (savedValues[key]?.id) {
          // PATCH existing
          res = await fetch("/api/admin/content", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: savedValues[key].id,
              content: currentValue,
            }),
          });
        } else {
          // POST new
          res = await fetch("/api/admin/content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              page_slug: field.pageSlug,
              section_key: field.sectionKey,
              content: currentValue,
              content_type: field.contentType,
            }),
          });
        }

        if (!res.ok) throw new Error("Save failed");
        const data = await res.json();
        const item = data.item;

        setSavedValues((prev) => ({
          ...prev,
          [key]: {
            id: item.id,
            content: item.content,
            version: item.version || 1,
          },
        }));
        setSaveStatus((prev) => ({ ...prev, [key]: "saved" }));
      } catch {
        setSaveStatus((prev) => ({ ...prev, [key]: "error" }));
      }

      // Clear status after 3 seconds
      statusTimers.current[key] = setTimeout(() => {
        setSaveStatus((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }, 3000);
    },
    [editValues, savedValues]
  );

  // ─── Seed ──────────────────────────────────────────────────────────────────

  const unseededFields = fields.filter(
    (f) => !savedValues[f.sectionKey]?.id
  );

  const handleSeed = async () => {
    if (unseededFields.length === 0) return;
    setSeeding(true);
    try {
      const items = unseededFields.map((f) => ({
        page_slug: f.pageSlug,
        section_key: f.sectionKey,
        content: editValues[f.sectionKey] ?? f.defaultContent,
        content_type: f.contentType,
      }));

      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (!res.ok) throw new Error("Seed failed");
      await loadPageData(activePage);
    } catch (err) {
      console.error("Seed error:", err);
    } finally {
      setSeeding(false);
    }
  };

  // ─── AI Assist ─────────────────────────────────────────────────────────────

  const handleAiGenerate = async (
    fieldKey: string,
    actionPrompt: string
  ) => {
    setAiLoading(true);
    setAiSuggestion("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: actionPrompt,
          context: editValues[fieldKey] || "",
          type: "content-edit",
        }),
      });

      if (!res.ok) throw new Error("AI generation failed");
      const data = await res.json();
      setAiSuggestion(data.text || "");
    } catch {
      setAiSuggestion("Error: AI generation failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleQuickAction = (fieldKey: string, action: string) => {
    const prompts: Record<string, string> = {
      improve:
        "Improve this text. Make it more engaging and polished while keeping the same message and warm, hopeful tone. Return ONLY the improved text, nothing else.",
      shorten:
        "Make this text more concise. Cut unnecessary words while keeping the core message and warm tone. Return ONLY the shortened text, nothing else.",
      hopeful:
        "Rewrite this text to feel more hopeful and uplifting, while keeping the same core message. Return ONLY the rewritten text, nothing else.",
    };
    handleAiGenerate(fieldKey, prompts[action] || action);
  };

  const handleUseAiSuggestion = async (fieldKey: string) => {
    setEditValues((prev) => ({ ...prev, [fieldKey]: aiSuggestion }));
    setAiSuggestion("");
    setAiField(null);

    // Auto-save
    const field = fields.find((f) => f.sectionKey === fieldKey);
    if (!field) return;

    if (statusTimers.current[fieldKey]) {
      clearTimeout(statusTimers.current[fieldKey]);
    }
    setSaveStatus((prev) => ({ ...prev, [fieldKey]: "saving" }));

    try {
      let res: Response;
      if (savedValues[fieldKey]?.id) {
        res = await fetch("/api/admin/content", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: savedValues[fieldKey].id,
            content: aiSuggestion,
            ai_generated: true,
          }),
        });
      } else {
        res = await fetch("/api/admin/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page_slug: field.pageSlug,
            section_key: field.sectionKey,
            content: aiSuggestion,
            content_type: field.contentType,
          }),
        });
      }

      if (!res.ok) throw new Error("Save failed");
      const data = await res.json();
      const item = data.item;

      setSavedValues((prev) => ({
        ...prev,
        [fieldKey]: {
          id: item.id,
          content: item.content,
          version: item.version || 1,
        },
      }));
      setSaveStatus((prev) => ({ ...prev, [fieldKey]: "saved" }));
    } catch {
      setSaveStatus((prev) => ({ ...prev, [fieldKey]: "error" }));
    }

    statusTimers.current[fieldKey] = setTimeout(() => {
      setSaveStatus((prev) => {
        const next = { ...prev };
        delete next[fieldKey];
        return next;
      });
    }, 3000);
  };

  // ─── History ───────────────────────────────────────────────────────────────

  const handleShowHistory = async (fieldKey: string) => {
    if (historyField === fieldKey) {
      setHistoryField(null);
      return;
    }
    const sv = savedValues[fieldKey];
    if (!sv?.id) return;

    setHistoryField(fieldKey);
    setHistoryLoading(true);
    try {
      const res = await fetch(
        `/api/admin/content/history?id=${sv.id}`
      );
      if (!res.ok) throw new Error("History fetch failed");
      const data = await res.json();
      setHistoryData(data.history || []);
    } catch {
      setHistoryData([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const restoreVersion = (fieldKey: string, content: string) => {
    setEditValues((prev) => ({ ...prev, [fieldKey]: content }));
    setHistoryField(null);
  };

  // ─── Group fields ──────────────────────────────────────────────────────────

  const groupedFields: Record<string, ContentFieldDef[]> = {};
  for (const field of fields) {
    if (!groupedFields[field.group]) {
      groupedFields[field.group] = [];
    }
    groupedFields[field.group].push(field);
  }
  const groupNames = Object.keys(groupedFields);

  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  // ─── Dirty check helper ────────────────────────────────────────────────────

  const isDirty = (field: ContentFieldDef) => {
    const key = field.sectionKey;
    const current = editValues[key];
    const saved = savedValues[key]?.content ?? field.defaultContent;
    return current !== saved;
  };

  // ─── Content type badge ────────────────────────────────────────────────────

  const typeBadge = (type: "text" | "textarea" | "richtext") => {
    return (
      <span className="text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-400">
        {type}
      </span>
    );
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manage Content
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Edit text on any public page. Changes appear on the live site
            immediately.
          </p>
        </div>
        <button
          onClick={() => loadPageData(activePage)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          title="Refresh"
        >
          <RefreshCw
            className={cn("w-4 h-4", loading && "animate-spin")}
          />
        </button>
      </div>

      {/* Page Tabs */}
      <div className="overflow-x-auto -mx-1 px-1">
        <div className="flex gap-1.5 min-w-max">
          {pageSlugs.map((slug) => (
            <button
              key={slug}
              onClick={() => setActivePage(slug)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors",
                activePage === slug
                  ? "bg-[#4A6FA5] text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {PAGE_LABELS[slug] || slug}
            </button>
          ))}
        </div>
      </div>

      {/* Seed Button */}
      {!loading && unseededFields.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-amber-600" />
            <div>
              <p className="text-sm font-medium text-amber-900">
                {unseededFields.length} field
                {unseededFields.length !== 1 ? "s" : ""} not yet in the
                database
              </p>
              <p className="text-xs text-amber-700">
                Seed them from defaults to enable editing and versioning.
              </p>
            </div>
          </div>
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors"
          >
            {seeding ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Seeding...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Seed {unseededFields.length} field
                {unseededFields.length !== 1 ? "s" : ""} from defaults
              </>
            )}
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
            >
              <div className="h-4 w-1/4 bg-gray-200 rounded mb-4" />
              <div className="space-y-3">
                <div className="h-10 bg-gray-100 rounded" />
                <div className="h-10 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : fields.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Layers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No content fields registered
          </h3>
          <p className="text-gray-500">
            This page does not have any editable content fields defined in
            the content registry yet.
          </p>
        </div>
      ) : (
        /* Content Groups */
        <div className="space-y-4">
          {groupNames.map((group) => {
            const isCollapsed = collapsedGroups[group] === true;
            const groupFields = groupedFields[group];
            const dirtyCount = groupFields.filter(isDirty).length;

            return (
              <div
                key={group}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isCollapsed ? (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                    <h2 className="font-semibold text-gray-900">
                      {group}
                    </h2>
                    <span className="text-xs text-gray-400">
                      {groupFields.length} field
                      {groupFields.length !== 1 ? "s" : ""}
                    </span>
                    {dirtyCount > 0 && (
                      <span className="flex items-center gap-1 text-xs font-medium text-[#E8956F]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8956F]" />
                        {dirtyCount} unsaved
                      </span>
                    )}
                  </div>
                </button>

                {/* Group Fields */}
                {!isCollapsed && (
                  <div className="divide-y divide-gray-100">
                    {groupFields.map((field) => {
                      const key = field.sectionKey;
                      const dirty = isDirty(field);
                      const status = saveStatus[key];
                      const isAiOpen = aiField === key;
                      const isHistoryOpen = historyField === key;
                      const hasHistory =
                        (savedValues[key]?.version || 0) > 1;

                      return (
                        <div key={key} className="px-6 py-4">
                          {/* Field Header Row */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2.5">
                              <label className="text-sm font-medium text-gray-700">
                                {field.label}
                              </label>
                              {typeBadge(field.contentType)}
                              {dirty && (
                                <span
                                  className="w-2 h-2 rounded-full bg-[#E8956F] flex-shrink-0"
                                  title="Unsaved changes"
                                />
                              )}
                            </div>
                            <div className="flex items-center gap-1.5">
                              {/* Save Status */}
                              {status === "saving" && (
                                <Loader2 className="w-4 h-4 text-[#4A6FA5] animate-spin" />
                              )}
                              {status === "saved" && (
                                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                              )}
                              {status === "error" && (
                                <X className="w-4 h-4 text-red-600 stroke-[3]" />
                              )}

                              {/* History Button */}
                              {hasHistory && (
                                <button
                                  onClick={() =>
                                    handleShowHistory(key)
                                  }
                                  className={cn(
                                    "p-1.5 rounded-lg transition-colors",
                                    isHistoryOpen
                                      ? "bg-gray-200 text-gray-700"
                                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                  )}
                                  title="Version history"
                                >
                                  <Clock className="w-4 h-4" />
                                </button>
                              )}

                              {/* AI Button */}
                              <button
                                onClick={() =>
                                  setAiField(isAiOpen ? null : key)
                                }
                                className={cn(
                                  "p-1.5 rounded-lg transition-colors",
                                  isAiOpen
                                    ? "bg-purple-100 text-purple-700"
                                    : "text-purple-400 hover:text-purple-600 hover:bg-purple-50"
                                )}
                                title="AI Assist"
                              >
                                <Sparkles className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Input */}
                          {field.contentType === "text" ? (
                            <input
                              type="text"
                              value={editValues[key] || ""}
                              onChange={(e) =>
                                setEditValues((prev) => ({
                                  ...prev,
                                  [key]: e.target.value,
                                }))
                              }
                              onBlur={() => saveField(field)}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:border-[#4A6FA5] focus:ring-1 focus:ring-[#4A6FA5] transition-colors"
                            />
                          ) : (
                            <textarea
                              value={editValues[key] || ""}
                              onChange={(e) =>
                                setEditValues((prev) => ({
                                  ...prev,
                                  [key]: e.target.value,
                                }))
                              }
                              onBlur={() => saveField(field)}
                              rows={
                                field.contentType === "richtext"
                                  ? 6
                                  : 3
                              }
                              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 leading-relaxed resize-y focus:border-[#4A6FA5] focus:ring-1 focus:ring-[#4A6FA5] transition-colors"
                            />
                          )}

                          {/* History Panel */}
                          {isHistoryOpen && (
                            <div className="mt-3 border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                              <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">
                                  Version History
                                </span>
                                <button
                                  onClick={() =>
                                    setHistoryField(null)
                                  }
                                  className="ml-auto p-1 text-gray-400 hover:text-gray-600 rounded"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              {historyLoading ? (
                                <div className="p-4 flex items-center gap-2 text-sm text-gray-500">
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Loading history...
                                </div>
                              ) : historyData.length === 0 ? (
                                <div className="p-4 text-sm text-gray-500">
                                  No previous versions found.
                                </div>
                              ) : (
                                <div className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
                                  {historyData.map((h) => (
                                    <div
                                      key={h.id}
                                      className="px-4 py-3 hover:bg-white transition-colors"
                                    >
                                      <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs font-medium text-gray-600">
                                            v{h.version}
                                          </span>
                                          {h.ai_generated && (
                                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-purple-100 text-purple-600">
                                              AI
                                            </span>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs text-gray-400">
                                            {new Date(
                                              h.created_at
                                            ).toLocaleString()}
                                          </span>
                                          <button
                                            onClick={() =>
                                              restoreVersion(
                                                key,
                                                h.content
                                              )
                                            }
                                            className="text-xs font-medium text-[#4A6FA5] hover:text-[#3d5d8a] transition-colors"
                                          >
                                            Restore
                                          </button>
                                        </div>
                                      </div>
                                      <p className="text-xs text-gray-500 line-clamp-2">
                                        {h.content}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                          {/* AI Panel */}
                          {isAiOpen && (
                            <div className="mt-3 border border-purple-200 rounded-xl bg-purple-50/50 p-4 space-y-3">
                              <div className="flex items-center gap-2 text-sm font-medium text-purple-800">
                                <Wand2 className="w-4 h-4" />
                                AI Assist
                              </div>

                              {/* Quick Actions */}
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() =>
                                    handleQuickAction(key, "improve")
                                  }
                                  disabled={aiLoading}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  Improve
                                </button>
                                <button
                                  onClick={() =>
                                    handleQuickAction(key, "shorten")
                                  }
                                  disabled={aiLoading}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  Shorten
                                </button>
                                <button
                                  onClick={() =>
                                    handleQuickAction(key, "hopeful")
                                  }
                                  disabled={aiLoading}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  More hopeful
                                </button>
                              </div>

                              {/* Custom Prompt */}
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={aiCustomPrompt}
                                  onChange={(e) =>
                                    setAiCustomPrompt(e.target.value)
                                  }
                                  onKeyDown={(e) => {
                                    if (
                                      e.key === "Enter" &&
                                      !aiLoading &&
                                      aiCustomPrompt.trim()
                                    ) {
                                      handleAiGenerate(
                                        key,
                                        aiCustomPrompt.trim() +
                                          ". Return ONLY the improved text, nothing else."
                                      );
                                    }
                                  }}
                                  placeholder="Custom prompt..."
                                  disabled={aiLoading}
                                  className="flex-1 border border-purple-200 rounded-lg px-3 py-2 text-sm focus:border-purple-400 focus:ring-1 focus:ring-purple-400 bg-white disabled:opacity-50 placeholder-gray-400"
                                />
                                <button
                                  onClick={() => {
                                    if (aiCustomPrompt.trim()) {
                                      handleAiGenerate(
                                        key,
                                        aiCustomPrompt.trim() +
                                          ". Return ONLY the improved text, nothing else."
                                      );
                                    }
                                  }}
                                  disabled={
                                    aiLoading ||
                                    !aiCustomPrompt.trim()
                                  }
                                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  {aiLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Sparkles className="w-4 h-4" />
                                  )}
                                  Generate
                                </button>
                              </div>

                              {/* Loading */}
                              {aiLoading && (
                                <div className="flex items-center gap-2 text-sm text-purple-600">
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  AI is writing...
                                </div>
                              )}

                              {/* Suggestion Preview */}
                              {aiSuggestion &&
                                !aiSuggestion.startsWith("Error:") && (
                                  <div className="border border-purple-300 rounded-xl bg-white overflow-hidden">
                                    <div className="px-4 py-3 bg-purple-50 border-b border-purple-200 flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-purple-600" />
                                        <span className="text-sm font-medium text-purple-800">
                                          Suggestion
                                        </span>
                                      </div>
                                      <button
                                        onClick={() =>
                                          setAiSuggestion("")
                                        }
                                        className="p-1 text-purple-400 hover:text-purple-600 rounded"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </div>
                                    <div className="p-4">
                                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {aiSuggestion}
                                      </p>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 border-t border-purple-200 flex items-center gap-2">
                                      <button
                                        onClick={() =>
                                          handleUseAiSuggestion(key)
                                        }
                                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                      >
                                        <Check className="w-3.5 h-3.5" />
                                        Use This
                                      </button>
                                      <button
                                        onClick={() =>
                                          setAiSuggestion("")
                                        }
                                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                        Discard
                                      </button>
                                    </div>
                                  </div>
                                )}

                              {/* Error display */}
                              {aiSuggestion &&
                                aiSuggestion.startsWith("Error:") && (
                                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                                    {aiSuggestion}
                                  </div>
                                )}
                            </div>
                          )}
                        </div>
                      );
                    })}
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
