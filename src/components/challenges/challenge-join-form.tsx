"use client";

import { useState } from "react";
import { Users, CheckCircle, Loader2 } from "lucide-react";

interface ChallengeJoinFormProps {
  challengeId: string;
  participantCount: number;
}

export function ChallengeJoinForm({
  challengeId,
  participantCount,
}: ChallengeJoinFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);
  const [count, setCount] = useState(participantCount);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challenge_id: challengeId,
          name: name.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setCount(data.participant_count);
      setJoined(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (joined) {
    return (
      <div className="bg-teal/5 border border-teal/20 rounded-xl p-8 text-center">
        <CheckCircle className="w-12 h-12 text-teal mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          You&apos;re in!
        </h3>
        <p className="text-gray-600">
          <span className="font-semibold text-teal">{count}</span>{" "}
          {count === 1 ? "person is" : "people are"} doing this with you.
          You are not alone.
        </p>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className="text-center">
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 bg-teal text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-teal-600 transition-colors shadow-md hover:shadow-lg"
        >
          Accept This Challenge
          <Users className="w-5 h-5" />
        </button>
        {count > 0 && (
          <p className="text-sm text-gray-500 mt-3">
            {count} {count === 1 ? "person has" : "people have"} already joined
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#F0F4F8] rounded-xl p-6 md:p-8 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">
        Join This Challenge
      </h3>
      <p className="text-sm text-gray-500 text-center mb-6">
        Both fields are optional. Join anonymously if you prefer.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="challenge-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your name (optional)
          </label>
          <input
            id="challenge-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First name or nickname"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="challenge-email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email (optional)
          </label>
          <input
            id="challenge-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Only for challenge reminders"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-colors"
          />
          <p className="text-xs text-gray-400 mt-1">
            We&apos;ll never share your email. Only used for challenge updates.
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-teal text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Joining...
              </>
            ) : (
              "I Accept"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
