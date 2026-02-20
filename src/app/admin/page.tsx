import type { Metadata } from "next";
import {
  Heart,
  BookOpen,
  Clock,
  Users,
  MessageSquare,
  UserCheck,
  FileEdit,
  Mail,
  MapPin,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

const stats = [
  {
    label: "Total OATHs",
    value: "\u2014",
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    label: "Published Stories",
    value: "\u2014",
    icon: BookOpen,
    color: "text-primary",
    bg: "bg-primary-50",
  },
  {
    label: "Pending Stories",
    value: "\u2014",
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    label: "Newsletter Subscribers",
    value: "\u2014",
    icon: Users,
    color: "text-teal",
    bg: "bg-teal-50",
  },
  {
    label: "Messages (unread)",
    value: "\u2014",
    icon: MessageSquare,
    color: "text-orange",
    bg: "bg-orange-50",
  },
  {
    label: "Ambassadors",
    value: "\u2014",
    icon: UserCheck,
    color: "text-sage",
    bg: "bg-sage-50",
  },
];

const quickActions = [
  {
    label: "Review Stories",
    href: "/admin/stories",
    icon: FileEdit,
    description: "Moderate submitted stories",
  },
  {
    label: "Compose Newsletter",
    href: "/admin/email",
    icon: Mail,
    description: "Send email campaigns",
  },
  {
    label: "View Map",
    href: "/admin/oaths",
    icon: MapPin,
    description: "See OATH locations",
  },
  {
    label: "Manage Content",
    href: "/admin/content",
    icon: Layers,
    description: "Edit site content",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">
          Welcome to the Sam&apos;s OATH admin dashboard.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4"
            >
              <div className={`${stat.bg} rounded-lg p-3`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
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

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.label}
                href={action.href}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:border-primary/30 hover:shadow-sm transition-all group"
              >
                <Icon className="h-8 w-8 text-primary mb-3 group-hover:text-teal transition-colors" />
                <p className="font-semibold text-gray-900">{action.label}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {action.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="bg-gray-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <Clock className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-500">
            Connect Supabase to see real-time activity
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Once your database is connected, you&apos;ll see new OATHs, story
            submissions, messages, and ambassador applications here.
          </p>
        </div>
      </div>
    </div>
  );
}
