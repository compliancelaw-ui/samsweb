"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Mail,
  Send,
  Users,
  Eye,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  User,
  Megaphone,
  Sparkles,
  BarChart3,
} from "lucide-react";

const EMAIL_ALIASES = [
  { value: "hello", label: "hello@samsoath.org", description: "General / Welcome" },
  { value: "connect", label: "connect@samsoath.org", description: "Contact replies" },
  { value: "share", label: "share@samsoath.org", description: "Story submissions" },
  { value: "press", label: "press@samsoath.org", description: "Media inquiries" },
  { value: "workplace", label: "workplace@samsoath.org", description: "Workplace programs" },
  { value: "speaking", label: "speaking@samsoath.org", description: "Speaking & events" },
  { value: "support", label: "support@samsoath.org", description: "Support & resources" },
  { value: "board", label: "board@samsoath.org", description: "Advisory board" },
  { value: "team", label: "team@samsoath.org", description: "Internal / Admin" },
  { value: "partnerships", label: "partnerships@samsoath.org", description: "Partner outreach" },
  { value: "frank", label: "frank@samsoath.org", description: "Frank Sheeder (personal)" },
];

const AUDIENCES = [
  { id: "all", label: "Everyone (all lists combined)" },
  { id: "subscribers", label: "Newsletter Subscribers" },
  { id: "oath", label: "OATH Takers" },
  { id: "ambassadors", label: "Ambassadors" },
];

const AI_QUICK_PROMPTS = [
  "Welcome email",
  "Thank you note",
  "Follow-up",
  "Event invitation",
];

type Mode = "individual" | "newsletter";

export default function AdminEmailPage() {
  const [mode, setMode] = useState<Mode>("individual");
  const [alias, setAlias] = useState("hello");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("all");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // AI drafting state
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showAiDraft, setShowAiDraft] = useState(false);

  // Weekly digest state
  const [digestLoading, setDigestLoading] = useState(false);

  const canSend =
    alias &&
    subject.trim() &&
    body.trim() &&
    (mode === "newsletter" || to.trim());

  const handleSend = useCallback(async () => {
    if (!canSend) return;
    setSending(true);
    setResult(null);

    try {
      const res = await fetch("/api/admin/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alias,
          to: mode === "individual" ? to.trim() : undefined,
          subject: subject.trim(),
          body: body.trim(),
          audience: mode === "newsletter" ? audience : undefined,
          isNewsletter: mode === "newsletter",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Send failed");

      setResult({
        success: true,
        message: `Sent successfully to ${data.sent} recipient${data.sent !== 1 ? "s" : ""}.`,
      });
      // Clear form on success
      setTo("");
      setSubject("");
      setBody("");
    } catch (err) {
      setResult({
        success: false,
        message: err instanceof Error ? err.message : "Failed to send email",
      });
    } finally {
      setSending(false);
    }
  }, [alias, to, subject, body, audience, mode, canSend]);

  const handleAiDraft = useCallback(
    async (prompt: string) => {
      if (!prompt.trim()) return;
      setAiLoading(true);

      try {
        const res = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: prompt.trim(),
            context: body || undefined,
            type: "email",
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "AI draft failed");

        setBody(data.response || data.text || data.content || "");
        setShowAiDraft(false);
        setAiPrompt("");
      } catch (err) {
        alert(err instanceof Error ? err.message : "Failed to generate AI draft");
      } finally {
        setAiLoading(false);
      }
    },
    [body]
  );

  const handleWeeklyDigest = useCallback(async () => {
    setDigestLoading(true);

    try {
      const res = await fetch("/api/admin/digest");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch digest");

      const draft = data.draft;
      setSubject(draft.subject || "");
      setBody(draft.body || "");
      setAlias("frank");
      setMode("newsletter");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to generate weekly digest");
    } finally {
      setDigestLoading(false);
    }
  }, []);

  const selectedAlias = EMAIL_ALIASES.find((a) => a.value === alias);

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Email Composer</h2>
          <p className="text-gray-500 mt-1">
            Send individual emails or newsletters from any @samsoath.org alias.
          </p>
        </div>
        <button
          onClick={handleWeeklyDigest}
          disabled={digestLoading}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
        >
          {digestLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <BarChart3 className="h-4 w-4 text-primary" />
          )}
          {digestLoading ? "Generating..." : "Weekly Digest"}
        </button>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode("individual")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
            mode === "individual"
              ? "bg-primary text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          )}
        >
          <User className="h-4 w-4" />
          Individual Email
        </button>
        <button
          onClick={() => setMode("newsletter")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
            mode === "newsletter"
              ? "bg-primary text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          )}
        >
          <Megaphone className="h-4 w-4" />
          Newsletter
        </button>
      </div>

      {/* Compose form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Mail className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">
            {mode === "individual" ? "Compose Email" : "Compose Newsletter"}
          </h3>
        </div>

        <div className="space-y-5">
          {/* From alias */}
          <div>
            <label
              htmlFor="email-from"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              From
            </label>
            <select
              id="email-from"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-white"
            >
              {EMAIL_ALIASES.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label} — {a.description}
                </option>
              ))}
            </select>
          </div>

          {/* To (individual) or Audience (newsletter) */}
          {mode === "individual" ? (
            <div>
              <label
                htmlFor="email-to"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                To
              </label>
              <input
                id="email-to"
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="recipient@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
              />
            </div>
          ) : (
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
                {AUDIENCES.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Subject */}
          <div>
            <label
              htmlFor="email-subject"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Subject
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
            <div className="flex items-center gap-2 mb-1.5">
              <label
                htmlFor="email-body"
                className="block text-sm font-medium text-gray-700"
              >
                Email Content
              </label>
              <button
                type="button"
                onClick={() => setShowAiDraft(!showAiDraft)}
                className={cn(
                  "flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium transition-colors",
                  showAiDraft
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-500 hover:bg-purple-50 hover:text-purple-600"
                )}
              >
                <Sparkles className="h-3 w-3" />
                AI Draft
              </button>
            </div>

            {/* AI Draft panel */}
            {showAiDraft && (
              <div className="mb-3 p-3 bg-purple-50 border border-purple-200 rounded-lg space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !aiLoading) {
                        handleAiDraft(aiPrompt);
                      }
                    }}
                    placeholder="Describe the email you want to draft..."
                    className="flex-1 px-3 py-2 border border-purple-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-300 focus:border-purple-400 outline-none transition-colors bg-white"
                  />
                  <button
                    onClick={() => handleAiDraft(aiPrompt)}
                    disabled={aiLoading || !aiPrompt.trim()}
                    className="flex items-center gap-1.5 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {aiLoading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5" />
                    )}
                    Generate
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {AI_QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => {
                        setAiPrompt(prompt);
                        handleAiDraft(prompt);
                      }}
                      disabled={aiLoading}
                      className="px-2.5 py-1 bg-white border border-purple-200 rounded-full text-xs text-purple-600 hover:bg-purple-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <textarea
              id="email-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={
                mode === "individual"
                  ? "Write your message here..."
                  : "Write your newsletter content here..."
              }
              rows={10}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors resize-y font-mono"
            />
            <p className="text-xs text-gray-400 mt-1.5">
              You can use basic HTML: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;a href=&quot;...&quot;&gt;, &lt;h2&gt;, &lt;br&gt;.
              Your content will be wrapped in the branded Sam&apos;s OATH email template automatically.
            </p>
          </div>

          {/* Result message */}
          {result && (
            <div
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg text-sm",
                result.success
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              )}
            >
              {result.success ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
              )}
              {result.message}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSend}
              disabled={!canSend || sending}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all",
                canSend && !sending
                  ? "bg-primary text-white hover:bg-primary/90 shadow-sm"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {sending
                ? "Sending..."
                : mode === "individual"
                ? "Send Email"
                : "Send Newsletter"}
            </button>

            <button
              onClick={() => setShowPreview(!showPreview)}
              disabled={!body.trim()}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Eye className="h-4 w-4" />
              {showPreview ? "Hide Preview" : "Preview"}
            </button>
          </div>
        </div>
      </div>

      {/* Email preview */}
      {showPreview && body.trim() && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
            <Eye className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">
              Email Preview
            </span>
            <span className="text-xs text-gray-400 ml-auto">
              From: {selectedAlias?.label}
              {mode === "individual" && to ? ` → ${to}` : ""}
            </span>
          </div>
          <div className="p-4 bg-gray-100">
            <div className="bg-white rounded-lg shadow-sm max-w-xl mx-auto overflow-hidden">
              {/* Simulated email header */}
              <div className="px-6 pt-5 pb-4 border-b border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Subject</p>
                <p className="font-semibold text-gray-900">
                  {subject || "(no subject)"}
                </p>
              </div>
              {/* Simulated branded content */}
              <div className="px-6 py-5">
                <div className="flex items-center gap-2 pb-3 mb-4 border-b-2 border-teal">
                  <span className="text-lg font-bold text-primary">
                    Sam&apos;s OATH
                  </span>
                  <span className="text-xs text-gray-400 italic">
                    What&apos;s hidden doesn&apos;t heal.
                  </span>
                </div>
                <div
                  className="prose prose-sm max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
                <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
                  {selectedAlias?.value === "frank" ? (
                    <>
                      With hope,
                      <br />
                      Frank Sheeder
                      <br />
                      Founder, Sam&apos;s OATH
                    </>
                  ) : (
                    <>
                      Warmly,
                      <br />
                      The Sam&apos;s OATH Team
                    </>
                  )}
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-50 text-center">
                <p className="text-xs text-gray-400">
                  samsoath.org &middot; Openness &middot; Authenticity &middot;
                  Togetherness &middot; Healing
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alias reference */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          Email Aliases Reference
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EMAIL_ALIASES.map((a) => (
            <div
              key={a.value}
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50"
            >
              <div className="w-2 h-2 rounded-full bg-teal shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">{a.label}</p>
                <p className="text-xs text-gray-500">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          All aliases route to frank@samsoath.org via Google Workspace. Replies
          from recipients will arrive in your Gmail/Outlook inbox.
        </p>
      </div>

      {/* Past Campaigns (newsletter only) */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">
            Past Campaigns
          </h3>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-12 text-center">
            <div className="bg-gray-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-gray-500">No campaigns sent yet</p>
            <p className="text-sm text-gray-400 mt-2">
              Your sent newsletters and their details will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
