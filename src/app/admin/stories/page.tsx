"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { filterContent } from "@/lib/content-filter";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  XCircle,
  Send,
  Shield,
  AlertTriangle,
  Info,
} from "lucide-react";

// Keep filterContent in scope so it&apos;s ready when stories come in from Supabase
void filterContent;

type TabKey = "pending" | "approved" | "published" | "rejected";

const tabs: { key: TabKey; label: string; icon: React.ElementType; color: string; bg: string }[] = [
  {
    key: "pending",
    label: "Pending Review",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    key: "approved",
    label: "Approved",
    icon: CheckCircle2,
    color: "text-primary",
    bg: "bg-primary-100",
  },
  {
    key: "published",
    label: "Published",
    icon: Send,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    key: "rejected",
    label: "Rejected",
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
  },
];

const statusColors: Record<TabKey, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-blue-100 text-blue-700",
  published: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminStoriesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("pending");

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Story Moderation</h2>
        <p className="text-gray-500 mt-1">
          Review and manage submitted stories before they go live.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? `${tab.bg} ${tab.color}`
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Stories table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table header */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="col-span-4">Title</div>
          <div className="col-span-2">Author</div>
          <div className="col-span-2">Date Submitted</div>
          <div className="col-span-2">Content Filter</div>
          <div className="col-span-2">Actions</div>
        </div>

        {/* Empty state */}
        <div className="px-6 py-16 text-center">
          <div className="bg-gray-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">
            No {activeTab} stories yet
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Connect Supabase to see submitted stories.
          </p>
        </div>
      </div>

      {/* Content Filter info box */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start gap-3">
          <div className="bg-primary-50 rounded-lg p-2 mt-0.5">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">
              Content Filter System
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              All submitted stories are automatically screened before appearing in
              the moderation queue. The filter does <strong>not</strong>{" "}
              auto-reject stories -- it flags them for your review.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Triggering Content
                  </p>
                  <p className="text-xs text-gray-500">
                    Graphic descriptions flagged for safe messaging review
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Named Individuals
                  </p>
                  <p className="text-xs text-gray-500">
                    Names of professionals or facilities that need consent
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Spam Detection
                  </p>
                  <p className="text-xs text-gray-500">
                    Promotional language, excessive caps, or repeated characters
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Contact Info
                  </p>
                  <p className="text-xs text-gray-500">
                    Phone numbers, emails, or social handles removed for privacy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status badge legend */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-gray-500 font-medium">Status badges:</span>
        {Object.entries(statusColors).map(([key, classes]) => (
          <span
            key={key}
            className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", classes)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
}
