"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PreviewLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/preview-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-800 via-primary to-teal px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Sam&apos;s OATH</h1>
          <p className="text-gray-500 text-sm mt-1">
            This site is in preview. Enter the password to continue.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Preview password"
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
            className="w-full py-3 px-4 rounded-lg bg-teal text-white font-semibold hover:bg-teal-600 transition-colors disabled:opacity-60"
          >
            {loading ? "Checking..." : "Enter Site"}
          </button>
        </form>
      </div>
    </div>
  );
}
