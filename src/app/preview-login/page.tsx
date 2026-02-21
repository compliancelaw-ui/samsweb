"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type AccessMode = null | "guest" | "admin";

export default function PreviewLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AccessMode>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const endpoint =
      mode === "admin" ? "/api/admin-auth" : "/api/preview-auth";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      // Use window.location for a full page reload so the cookie takes effect
      window.location.href = mode === "admin" ? "/admin" : "/";
      return;
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-800 via-primary to-teal px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Sam&apos;s OATH
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            This site is in preview mode.
          </p>
        </div>

        {mode === null ? (
          <div className="space-y-3">
            <p className="text-center text-gray-600 text-sm mb-4">
              How would you like to access the site?
            </p>
            <button
              onClick={() => setMode("guest")}
              className="w-full py-3 px-4 rounded-lg border-2 border-teal text-teal font-semibold hover:bg-teal hover:text-white transition-colors"
            >
              Guest Access
            </button>
            <button
              onClick={() => setMode("admin")}
              className="w-full py-3 px-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              Admin Access
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-center text-gray-600 text-sm">
              {mode === "admin"
                ? "Enter the admin password."
                : "Enter the guest password."}
            </p>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors"
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">
                  Incorrect password. Please try again.
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || !password}
              className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors disabled:opacity-60 ${
                mode === "admin"
                  ? "bg-primary hover:bg-primary-600"
                  : "bg-teal hover:bg-teal-600"
              }`}
            >
              {loading ? "Checking..." : "Enter Site"}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode(null);
                setPassword("");
                setError(false);
              }}
              className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
