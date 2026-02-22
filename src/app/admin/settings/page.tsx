import {
  Settings,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Globe,
  Database,
  Key,
} from "lucide-react";
import { cn } from "@/lib/utils";

const QUICK_LINKS = [
  {
    label: "Supabase Dashboard",
    href: "https://supabase.com/dashboard/project/spqisrxqpqrphkndnlad",
    description: "Database, auth & storage",
    icon: Database,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Vercel Dashboard",
    href: "https://vercel.com/dashboard",
    description: "Deployments & domains",
    icon: Globe,
    color: "text-gray-900",
    bg: "bg-gray-100",
  },
  {
    label: "Google Analytics",
    href: "https://analytics.google.com",
    description: "Traffic & behavior",
    icon: Globe,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Search Console",
    href: "https://search.google.com/search-console",
    description: "SEO & indexing",
    icon: Globe,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Mapbox Studio",
    href: "https://studio.mapbox.com",
    description: "Map styles & tokens",
    icon: Globe,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    label: "Resend Dashboard",
    href: "https://resend.com/overview",
    description: "Email delivery & logs",
    icon: Globe,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

function getEnvStatus() {
  return [
    {
      label: "Supabase",
      connected: !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      detail: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Connected" : "Missing SUPABASE keys",
    },
    {
      label: "Mapbox",
      connected: !!process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      detail: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? "Connected" : "Missing MAPBOX_TOKEN",
    },
    {
      label: "Resend",
      connected: !!process.env.RESEND_API_KEY,
      detail: process.env.RESEND_API_KEY ? "Connected" : "Missing RESEND_API_KEY",
    },
    {
      label: "Anthropic AI",
      connected: !!process.env.ANTHROPIC_API_KEY,
      detail: process.env.ANTHROPIC_API_KEY ? "Connected" : "Not configured (add ANTHROPIC_API_KEY)",
    },
    {
      label: "Google Analytics",
      connected: !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      detail: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "Not configured",
    },
  ];
}

const SITE_INFO = [
  { label: "Domain", value: "samsoath.org" },
  { label: "GitHub", value: "compliancelaw-ui/samsweb" },
  { label: "Framework", value: "Next.js 14 (App Router)" },
];

export default function AdminSettingsPage() {
  const ENV_STATUS = getEnvStatus();

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="h-6 w-6 text-gray-400" />
          Settings
        </h2>
        <p className="text-gray-500 mt-1">
          Quick links, environment status, and site information.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Links
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition-all group flex items-start gap-4"
              >
                <div
                  className={cn(
                    "rounded-lg p-2.5 flex-shrink-0",
                    link.bg
                  )}
                >
                  <Icon className={cn("h-5 w-5", link.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 flex items-center gap-1.5">
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {link.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Environment Status */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Key className="h-5 w-5 text-gray-400" />
          Environment Status
        </h3>
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
          {ENV_STATUS.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between px-5 py-4"
            >
              <div className="flex items-center gap-3">
                {item.connected ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                )}
                <span className="font-medium text-gray-900">
                  {item.label}
                </span>
              </div>
              <span
                className={cn(
                  "text-sm",
                  item.connected ? "text-gray-500" : "text-red-500"
                )}
              >
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Site Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-gray-400" />
          Site Info
        </h3>
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
          {SITE_INFO.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between px-5 py-4"
            >
              <span className="text-sm font-medium text-gray-500">
                {item.label}
              </span>
              <span className="text-sm text-gray-900 font-mono">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
