"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Mail,
  Send,
  Users,
  BarChart3,
  MousePointerClick,
  Eye,
  Clock,
  Info,
} from "lucide-react";

const audiences = [
  { id: "all", label: "All Subscribers" },
  { id: "oath", label: "OATH Takers" },
  { id: "stories", label: "Story Sharers" },
  { id: "ambassadors", label: "Ambassadors" },
];

const emailStats = [
  {
    label: "Total Subscribers",
    value: "\u2014",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary-50",
  },
  {
    label: "Open Rate",
    value: "\u2014",
    icon: Eye,
    color: "text-teal",
    bg: "bg-teal-50",
  },
  {
    label: "Click Rate",
    value: "\u2014",
    icon: MousePointerClick,
    color: "text-orange",
    bg: "bg-orange-50",
  },
];

export default function AdminEmailPage() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("all");
  const [postToBlog, setPostToBlog] = useState(false);
  const [crossPostSocial, setCrossPostSocial] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Email &amp; Newsletters
        </h2>
        <p className="text-gray-500 mt-1">
          Compose and send email campaigns to your subscribers.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {emailStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4"
            >
              <div className={cn("rounded-lg p-3", stat.bg)}>
                <Icon className={cn("h-6 w-6", stat.color)} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compose Newsletter */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Mail className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">
            Compose Newsletter
          </h3>
        </div>

        <div className="space-y-5">
          {/* Subject */}
          <div>
            <label
              htmlFor="email-subject"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Subject Line
            </label>
            <input
              id="email-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
            />
          </div>

          {/* Body */}
          <div>
            <label
              htmlFor="email-body"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email Content
            </label>
            <textarea
              id="email-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your newsletter content here..."
              rows={10}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors resize-y"
            />
            <p className="text-xs text-gray-400 mt-1">
              A rich text editor will be available once we integrate an editor library.
            </p>
          </div>

          {/* Audience */}
          <div>
            <label
              htmlFor="email-audience"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Audience
            </label>
            <select
              id="email-audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-white"
            >
              {audiences.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={postToBlog}
                onChange={(e) => setPostToBlog(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
              />
              <span className="text-sm text-gray-700">
                Also post to website as blog
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={crossPostSocial}
                onChange={(e) => setCrossPostSocial(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
              />
              <span className="text-sm text-gray-700">
                Cross-post to social media
              </span>
            </label>
          </div>

          {/* Send button */}
          <div className="flex items-center gap-3 pt-2">
            <button
              disabled
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium opacity-50 cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              Send Newsletter
            </button>
            <span className="text-xs text-gray-400">
              Connect Resend to enable sending
            </span>
          </div>
        </div>
      </div>

      {/* Resend info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium text-blue-800">
            Email Delivery via Resend
          </p>
          <p className="text-sm text-blue-600 mt-1">
            To enable email sending, connect your Resend API key in Settings.
            Resend provides reliable transactional and marketing email delivery
            with analytics.
          </p>
        </div>
      </div>

      {/* Past Campaigns */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">
            Past Campaigns
          </h3>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-4">Subject</div>
            <div className="col-span-2">Audience</div>
            <div className="col-span-2">Sent Date</div>
            <div className="col-span-1">Opens</div>
            <div className="col-span-1">Clicks</div>
            <div className="col-span-2">Status</div>
          </div>

          {/* Empty state */}
          <div className="px-6 py-12 text-center">
            <div className="bg-gray-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-gray-500">No campaigns sent yet</p>
            <p className="text-sm text-gray-400 mt-2">
              Your sent campaigns and their analytics will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
