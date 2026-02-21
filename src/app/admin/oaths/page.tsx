"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Heart,
  Trash2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
} from "lucide-react";

interface OathRecord {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string | null;
  display_name: string;
  category: string;
  city: string;
  state: string;
  pin_color: string;
  email: string | null;
  latitude: number | null;
  longitude: number | null;
  message: string | null;
  name_display_type: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  struggling: "I\u2019m Struggling",
  memory: "In Loving Memory",
  supporter: "I\u2019m a Supporter",
  hope: "Hope & Recovery",
};

const CATEGORY_COLORS: Record<string, string> = {
  struggling: "bg-teal-100 text-teal-700",
  memory: "bg-blue-100 text-blue-700",
  supporter: "bg-green-100 text-green-700",
  hope: "bg-orange-100 text-orange-700",
};

export default function AdminOathsPage() {
  const [oaths, setOaths] = useState<OathRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterState, setFilterState] = useState("");

  const fetchOaths = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "50" });
      if (filterCategory) params.set("category", filterCategory);
      if (filterState) params.set("state", filterState);

      const res = await fetch(`/api/admin/oaths?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setOaths(data.oaths || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch {
      console.error("Failed to fetch oaths");
    } finally {
      setLoading(false);
    }
  }, [page, filterCategory, filterState]);

  useEffect(() => {
    fetchOaths();
  }, [fetchOaths]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === oaths.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(oaths.map((o) => o.id)));
    }
  };

  const handleDelete = async () => {
    if (selected.size === 0) return;
    const confirmed = window.confirm(
      `Delete ${selected.size} oath submission${selected.size > 1 ? "s" : ""}? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      const res = await fetch("/api/admin/oaths", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selected) }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setSelected(new Set());
      fetchOaths();
    } catch {
      alert("Failed to delete. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">OATH Submissions</h2>
          <p className="text-gray-500 mt-1">
            {total} total submission{total !== 1 ? "s" : ""}
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
            onClick={() => { setPage(1); fetchOaths(); }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={filterCategory}
          onChange={(e) => { setFilterCategory(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
        >
          <option value="">All Categories</option>
          <option value="struggling">I&apos;m Struggling</option>
          <option value="memory">In Loving Memory</option>
          <option value="supporter">I&apos;m a Supporter</option>
          <option value="hope">Hope &amp; Recovery</option>
        </select>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Filter by state (e.g. CO)"
            value={filterState}
            onChange={(e) => { setFilterState(e.target.value.toUpperCase().slice(0, 2)); setPage(1); }}
            className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-white w-48"
            maxLength={2}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="px-6 py-16 text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Loading submissions...</p>
          </div>
        ) : oaths.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Heart className="h-8 w-8 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No oath submissions found</p>
            <p className="text-sm text-gray-400 mt-1">
              {filterCategory || filterState
                ? "Try adjusting your filters."
                : "Submissions will appear here when people take the OATH."}
            </p>
          </div>
        ) : (
          <>
            {/* Header row */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  checked={selected.size === oaths.length}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </div>
              <div className="col-span-2">Name</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Location</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Email</div>
              <div className="col-span-1">Map</div>
            </div>

            {/* Rows */}
            {oaths.map((oath) => (
              <div
                key={oath.id}
                className={cn(
                  "grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors",
                  selected.has(oath.id) && "bg-blue-50"
                )}
              >
                {/* Checkbox */}
                <div className="col-span-1 flex items-center">
                  <input
                    type="checkbox"
                    checked={selected.has(oath.id)}
                    onChange={() => toggleSelect(oath.id)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </div>

                {/* Name */}
                <div className="col-span-2">
                  <p className="font-medium text-gray-900 text-sm">
                    {oath.display_name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {oath.first_name} {oath.last_name || ""}
                  </p>
                </div>

                {/* Category */}
                <div className="col-span-2 flex items-center">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                      CATEGORY_COLORS[oath.category] || "bg-gray-100 text-gray-700"
                    )}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: oath.pin_color }}
                    />
                    {CATEGORY_LABELS[oath.category] || oath.category}
                  </span>
                </div>

                {/* Location */}
                <div className="col-span-2 text-sm text-gray-600">
                  {oath.city}, {oath.state}
                </div>

                {/* Date */}
                <div className="col-span-2 text-sm text-gray-500">
                  {new Date(oath.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>

                {/* Email */}
                <div className="col-span-2 text-sm text-gray-500 truncate">
                  {oath.email || "—"}
                </div>

                {/* Geocoded */}
                <div className="col-span-1 flex items-center">
                  {oath.latitude ? (
                    <MapPin className="h-4 w-4 text-teal" />
                  ) : (
                    <MapPin className="h-4 w-4 text-gray-300" />
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {page} of {totalPages}
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
    </div>
  );
}
