"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Users,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  MapPin,
  Mail,
  Globe,
} from "lucide-react";

interface AmbassadorRecord {
  id: string;
  created_at: string;
  name: string;
  email: string;
  city: string;
  state: string;
  bio: string | null;
  social_links: Record<string, string> | null;
  status: string;
  approved_at: string | null;
}

type FilterStatus = "all" | "pending" | "approved" | "rejected";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminAmbassadorsPage() {
  const [ambassadors, setAmbassadors] = useState<AmbassadorRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchAmbassadors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/ambassadors");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setAmbassadors(data.ambassadors || []);
    } catch {
      console.error("Failed to fetch ambassadors");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAmbassadors();
  }, [fetchAmbassadors]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/ambassadors", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Update failed");
      fetchAmbassadors();
    } catch {
      alert("Failed to update status.");
    }
  };

  const deleteAmbassador = async (id: string, name: string) => {
    if (!confirm(`Delete ambassador "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/ambassadors?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      fetchAmbassadors();
    } catch {
      alert("Failed to delete.");
    }
  };

  const filtered =
    filter === "all"
      ? ambassadors
      : ambassadors.filter((a) => a.status === filter);

  const counts = {
    all: ambassadors.length,
    pending: ambassadors.filter((a) => a.status === "pending").length,
    approved: ambassadors.filter((a) => a.status === "approved").length,
    rejected: ambassadors.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ambassadors</h1>
          <p className="text-gray-500 mt-1">
            {counts.pending} pending &middot; {counts.approved} approved &middot; {ambassadors.length} total
          </p>
        </div>
        <button
          onClick={fetchAmbassadors}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
        >
          <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["all", "pending", "approved", "rejected"] as FilterStatus[]).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              filter === status
                ? "bg-primary text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            )}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
            {counts[status] > 0 && (
              <span className={cn("ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold", filter === status ? "bg-white/30" : "bg-gray-100")}>
                {counts[status]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Ambassadors list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="h-5 w-1/3 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-1/4 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No {filter === "all" ? "" : filter} ambassadors
          </h3>
          <p className="text-gray-500">
            Ambassador applications will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((amb) => (
            <div key={amb.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div
                className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedId(expandedId === amb.id ? null : amb.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", STATUS_STYLES[amb.status] || "bg-gray-100 text-gray-600")}>
                        {amb.status}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{amb.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {amb.city}, {amb.state}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" />
                        {amb.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    {amb.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(amb.id, "approved")}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                          title="Approve"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => updateStatus(amb.id, "rejected")}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          title="Reject"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    {amb.status === "approved" && (
                      <button
                        onClick={() => updateStatus(amb.id, "pending")}
                        className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg"
                        title="Move to pending"
                      >
                        <Clock className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteAmbassador(amb.id, amb.name)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {expandedId === amb.id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  {amb.bio && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Bio / Motivation</h4>
                      <p className="text-gray-600 whitespace-pre-wrap">{amb.bio}</p>
                    </div>
                  )}
                  {amb.social_links && Object.keys(amb.social_links).length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Social Links</h4>
                      <div className="flex gap-3">
                        {Object.entries(amb.social_links).map(([platform, url]) => (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            {platform}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-gray-400">
                    Applied {new Date(amb.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    {amb.approved_at && ` · Approved ${new Date(amb.approved_at).toLocaleDateString()}`}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
