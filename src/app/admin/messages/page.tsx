"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  RefreshCw,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Inbox,
} from "lucide-react";

interface ContactMessage {
  id: string;
  created_at: string;
  sender_name: string;
  sender_email: string;
  sender_phone: string | null;
  message_type: "general" | "speaking" | "workplace" | "partnership";
  subject: string;
  body: string;
  metadata: Record<string, unknown> | null;
  is_read: boolean;
  priority: "low" | "normal" | "high" | "urgent";
  replied_at: string | null;
}

type FilterTab = "all" | "unread" | "read";

const TYPE_BADGES: Record<string, { label: string; className: string }> = {
  general: { label: "General", className: "bg-gray-100 text-gray-600" },
  speaking: { label: "Speaking", className: "bg-primary-50 text-primary" },
  workplace: { label: "Workplace", className: "bg-teal-50 text-teal-700" },
  partnership: { label: "Partnership", className: "bg-sage-50 text-sage-700" },
};

const PRIORITY_BADGES: Record<string, { label: string; className: string }> = {
  high: { label: "High", className: "bg-amber-100 text-amber-700" },
  urgent: { label: "Urgent", className: "bg-red-100 text-red-700" },
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterTab>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [markingRead, setMarkingRead] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setMessages(data.messages || []);
    } catch {
      console.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const markAsRead = async (id: string) => {
    setMarkingRead(id);
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Update failed");
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
      );
    } catch {
      alert("Failed to mark message as read.");
    } finally {
      setMarkingRead(null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  const filteredMessages = messages.filter((m) => {
    if (filter === "unread") return !m.is_read;
    if (filter === "read") return m.is_read;
    return true;
  });

  const FILTER_TABS: { key: FilterTab; label: string; count?: number }[] = [
    { key: "all", label: "All", count: messages.length },
    { key: "unread", label: "Unread", count: unreadCount },
    { key: "read", label: "Read", count: messages.length - unreadCount },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-500 text-sm mt-1">
            {messages.length} message{messages.length !== 1 ? "s" : ""}
            {unreadCount > 0 && (
              <span className="text-orange-600 font-medium">
                {" "}
                &middot; {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          title="Refresh"
        >
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-md transition-colors",
              filter === tab.key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  "ml-1.5 text-xs",
                  filter === tab.key ? "text-gray-500" : "text-gray-400"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse"
            >
              <div className="h-5 w-2/3 bg-gray-200 rounded mb-3" />
              <div className="h-4 w-1/3 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {filter === "unread"
              ? "No unread messages"
              : filter === "read"
                ? "No read messages"
                : "No messages yet"}
          </h3>
          <p className="text-gray-500">
            {filter === "unread"
              ? "You're all caught up!"
              : filter === "read"
                ? "No messages have been read yet."
                : "Contact form submissions will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg) => {
            const isExpanded = expandedId === msg.id;
            const typeBadge = TYPE_BADGES[msg.message_type] || TYPE_BADGES.general;
            const priorityBadge = PRIORITY_BADGES[msg.priority];

            return (
              <div
                key={msg.id}
                className={cn(
                  "bg-white rounded-xl border transition-shadow",
                  msg.is_read
                    ? "border-gray-200"
                    : "border-primary/30 shadow-sm"
                )}
              >
                {/* Message Header — clickable */}
                <button
                  onClick={() => toggleExpand(msg.id)}
                  className="w-full text-left p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Badges row */}
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        {/* Read indicator */}
                        {msg.is_read ? (
                          <CheckCircle2 className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-primary fill-primary flex-shrink-0" />
                        )}
                        <span
                          className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full",
                            typeBadge.className
                          )}
                        >
                          {typeBadge.label}
                        </span>
                        {priorityBadge && (
                          <span
                            className={cn(
                              "text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1",
                              priorityBadge.className
                            )}
                          >
                            <AlertTriangle className="w-3 h-3" />
                            {priorityBadge.label}
                          </span>
                        )}
                      </div>

                      {/* Subject */}
                      <h3
                        className={cn(
                          "truncate",
                          msg.is_read
                            ? "font-medium text-gray-700"
                            : "font-semibold text-gray-900"
                        )}
                      >
                        {msg.subject}
                      </h3>

                      {/* Sender info */}
                      <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-500">
                        <span className="truncate">{msg.sender_name}</span>
                        <span className="text-gray-300">&middot;</span>
                        <span className="flex items-center gap-1 truncate">
                          <Mail className="w-3 h-3 flex-shrink-0" />
                          {msg.sender_email}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {new Date(msg.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    {/* Expand chevron */}
                    <div className="flex-shrink-0 text-gray-400">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded body */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-gray-100">
                    <div className="pt-4 space-y-4">
                      {/* Message body */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {msg.body}
                        </p>
                      </div>

                      {/* Contact details */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                        <a
                          href={`mailto:${msg.sender_email}`}
                          className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          {msg.sender_email}
                        </a>
                        {msg.sender_phone && (
                          <a
                            href={`tel:${msg.sender_phone}`}
                            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            {msg.sender_phone}
                          </a>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        {!msg.is_read && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(msg.id);
                            }}
                            disabled={markingRead === msg.id}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            {markingRead === msg.id
                              ? "Marking..."
                              : "Mark as Read"}
                          </button>
                        )}
                        <a
                          href={`mailto:${msg.sender_email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Reply
                        </a>
                      </div>
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
