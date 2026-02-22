"use client";

import {
  Layers,
  ExternalLink,
  FileText,
  Globe,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

const contentSections = [
  {
    title: "Public Pages",
    description: "Edit page content directly in the codebase",
    icon: Globe,
    items: [
      { label: "Homepage", href: "/", file: "src/app/(public)/page.tsx" },
      { label: "About", href: "/about", file: "src/app/(public)/about/page.tsx" },
      { label: "Take the OATH", href: "/take-the-oath", file: "src/app/(public)/take-the-oath/page.tsx" },
      { label: "Families", href: "/families", file: "src/app/(public)/families/page.tsx" },
      { label: "Workplace", href: "/workplace", file: "src/app/(public)/workplace/page.tsx" },
      { label: "Get Involved", href: "/get-involved", file: "src/app/(public)/get-involved/page.tsx" },
      { label: "Resources", href: "/resources", file: "src/app/(public)/resources/page.tsx" },
      { label: "Music", href: "/music", file: "src/app/(public)/music/page.tsx" },
      { label: "Press", href: "/press", file: "src/app/(public)/press/page.tsx" },
      { label: "Ambassadors", href: "/ambassadors", file: "src/app/(public)/ambassadors/page.tsx" },
      { label: "Contact", href: "/contact", file: "src/app/(public)/contact/page.tsx" },
      { label: "Privacy", href: "/privacy", file: "src/app/(public)/privacy/page.tsx" },
    ],
  },
  {
    title: "Dynamic Content",
    description: "Managed through the admin dashboard",
    icon: FileText,
    items: [
      { label: "Blog Posts", href: "/admin/blog", file: "Admin → Blog" },
      { label: "Stories", href: "/admin/stories", file: "Admin → Stories" },
      { label: "Media Library", href: "/admin/media", file: "Admin → Media" },
    ],
  },
];

export default function AdminContentPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Content</h1>
        <p className="text-gray-500 mt-1">
          Overview of all site content and where to edit it.
        </p>
      </div>

      {contentSections.map((section) => {
        const Icon = section.icon;
        return (
          <div key={section.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
              <Icon className="h-5 w-5 text-primary" />
              <div>
                <h2 className="font-semibold text-gray-900">{section.title}</h2>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {section.items.map((item) => (
                <div
                  key={item.label}
                  className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-400 font-mono">{item.file}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.href.startsWith("/admin") ? (
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                      >
                        <Layers className="h-3.5 w-3.5" />
                        Manage
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Editing Page Content</h3>
            <p className="text-blue-800">
              Static page content is stored in the codebase (TypeScript/React files). To edit text,
              images, or layout on any public page, you can modify the source file directly or ask
              the AI assistant for help. Blog posts and stories are managed through their respective
              admin tabs above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
