"use client";

import { useState, useEffect } from "react";
import {
  Wrench,
  Package,
  Shield,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowUpCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PackageInfo {
  name: string;
  current: string;
  latest: string;
  isDev: boolean;
  status: "up-to-date" | "minor-update" | "major-update" | "unknown";
}

interface DepsResponse {
  packages: PackageInfo[];
  summary: {
    total: number;
    upToDate: number;
    minorUpdates: number;
    majorUpdates: number;
  };
}

const STATUS_CONFIG = {
  "up-to-date": {
    icon: CheckCircle2,
    label: "Up to date",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  "minor-update": {
    icon: ArrowUpCircle,
    label: "Update available",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  "major-update": {
    icon: AlertTriangle,
    label: "Major update",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  unknown: {
    icon: Package,
    label: "Unknown",
    color: "text-gray-500",
    bg: "bg-gray-50",
    border: "border-gray-200",
  },
} as const;

export default function AdminMaintenancePage() {
  const [activeTab, setActiveTab] = useState<"dependencies" | "security">("dependencies");
  const [deps, setDeps] = useState<DepsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "updates" | "major">("all");

  const fetchDeps = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/dependencies");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setDeps(data);
    } catch {
      setError("Failed to check dependencies. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "dependencies" && !deps) {
      fetchDeps();
    }
  }, [activeTab, deps]);

  const filteredPackages = deps?.packages.filter((pkg) => {
    if (filter === "updates") return pkg.status !== "up-to-date";
    if (filter === "major") return pkg.status === "major-update";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Wrench className="h-6 w-6 text-gray-400" />
          Maintenance
        </h2>
        <p className="text-gray-500 mt-1">
          Monitor dependencies and security for the site.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab("dependencies")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
            activeTab === "dependencies"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          )}
        >
          <Package className="h-4 w-4" />
          Dependencies
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
            activeTab === "security"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          )}
        >
          <Shield className="h-4 w-4" />
          Security
        </button>
      </div>

      {/* Dependencies Tab */}
      {activeTab === "dependencies" && (
        <div className="space-y-4">
          {/* Summary cards */}
          {deps && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-2xl font-bold text-gray-900">{deps.summary.total}</p>
                <p className="text-sm text-gray-500">Total packages</p>
              </div>
              <div className="bg-white rounded-lg border border-emerald-200 p-4">
                <p className="text-2xl font-bold text-emerald-600">{deps.summary.upToDate}</p>
                <p className="text-sm text-gray-500">Up to date</p>
              </div>
              <div className="bg-white rounded-lg border border-amber-200 p-4">
                <p className="text-2xl font-bold text-amber-600">{deps.summary.minorUpdates}</p>
                <p className="text-sm text-gray-500">Minor updates</p>
              </div>
              <div className="bg-white rounded-lg border border-red-200 p-4">
                <p className="text-2xl font-bold text-red-600">{deps.summary.majorUpdates}</p>
                <p className="text-sm text-gray-500">Major updates</p>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {(["all", "updates", "major"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                    filter === f
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {f === "all" ? "All" : f === "updates" ? "Needs Update" : "Major Only"}
                </button>
              ))}
            </div>
            <button
              onClick={fetchDeps}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
              Refresh
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && !deps && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Checking npm registry for latest versions...</p>
            </div>
          )}

          {/* Package list */}
          {filteredPackages && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Current
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Latest
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPackages.map((pkg) => {
                    const config = STATUS_CONFIG[pkg.status];
                    const StatusIcon = config.icon;
                    return (
                      <tr key={pkg.name} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <a
                              href={`https://www.npmjs.com/package/${pkg.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-gray-900 hover:text-primary transition-colors"
                            >
                              {pkg.name}
                            </a>
                            {pkg.isDev && (
                              <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                                dev
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-mono text-gray-600">
                          {pkg.current}
                        </td>
                        <td className="px-4 py-3 text-sm font-mono text-gray-600">
                          {pkg.latest}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                              config.bg,
                              config.color
                            )}
                          >
                            <StatusIcon className="h-3.5 w-3.5" />
                            {config.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredPackages.length === 0 && (
                <div className="p-8 text-center text-gray-500 text-sm">
                  No packages match this filter.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-4">
          {/* GitHub Security */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-purple-50 p-3">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  GitHub Dependabot Alerts
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  GitHub automatically scans your dependencies for known security
                  vulnerabilities and creates alerts. Check the Security tab on your repository
                  to see if any action is needed.
                </p>
                <a
                  href="https://github.com/compliancelaw-ui/samsweb/security"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  View Security Alerts
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Vercel Security */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-gray-100 p-3">
                <Shield className="h-6 w-6 text-gray-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Vercel Deployment Security
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Vercel handles SSL certificates, DDoS protection, and edge security
                  automatically. Check your project settings for deployment protection and
                  environment variable management.
                </p>
                <a
                  href="https://vercel.com/compliancelaw-uis-projects/samsweb/settings/security"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Vercel Security Settings
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Best practices */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Best Practices
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Keep dependencies updated — especially packages with known vulnerabilities
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Never commit API keys or secrets — use environment variables
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Review Dependabot alerts monthly — GitHub emails you when new ones appear
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Rotate API keys if you suspect they were exposed
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
