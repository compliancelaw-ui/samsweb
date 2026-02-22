// ─── String Union Types ─────────────────────────────────────────────────────

export type OathCategory = "supporting" | "supporter" | "hope";

export type StoryStatus = "pending" | "approved" | "published" | "rejected";

export type ContactType = "general" | "speaking" | "workplace" | "partnership";

export type MessagePriority = "low" | "normal" | "high" | "urgent";

// ─── Database Record Types ──────────────────────────────────────────────────

export interface OathSubmission {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string | null;
  email: string | null;
  category: OathCategory;
  city: string;
  state: string;
  message: string | null;
  name_display_type: "full" | "first" | "initials" | "anonymous";
  display_name: string;
  email_optin: boolean;
  pin_color: string;
  latitude: number | null;
  longitude: number | null;
  is_approved: boolean;
}

export interface StorySubmission {
  id: string;
  created_at: string;
  updated_at: string;
  author_name: string;
  author_email: string;
  author_city: string | null;
  author_state: string | null;
  author_relation: string | null;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  status: StoryStatus;
  featured_image: string | null;
  consent_publish: boolean;
  consent_name: boolean;
  admin_notes: string | null;
  published_at: string | null;
}

export interface ContactMessage {
  id: string;
  created_at: string;
  sender_name: string;
  sender_email: string;
  sender_phone: string | null;
  message_type: ContactType;
  subject: string;
  body: string;
  metadata: Record<string, unknown> | null;
  is_read: boolean;
  priority: MessagePriority;
  replied_at: string | null;
}

export interface NewsletterSubscriber {
  id: string;
  created_at: string;
  email: string;
  first_name: string | null;
  interests: string[] | null;
  is_active: boolean;
  unsubscribed_at: string | null;
}

export interface BlogPost {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  author: string;
  tags: string[] | null;
  is_published: boolean;
  published_at: string | null;
}

export interface Ambassador {
  id: string;
  created_at: string;
  name: string;
  email: string;
  city: string;
  state: string;
  motivation: string;
  personal_story: string | null;
  social_links: Record<string, string> | null;
  is_active: boolean;
  approved_at: string | null;
}

export interface SiteContent {
  id: string;
  created_at: string;
  updated_at: string;
  page: string;
  section: string;
  content: Record<string, unknown>;
  is_published: boolean;
}

export interface MediaItem {
  id: string;
  created_at: string;
  filename: string;
  original_filename: string | null;
  file_url: string;
  thumbnail_url: string | null;
  width: number | null;
  height: number | null;
  file_size: number | null;
  mime_type: string | null;
  alt_text: string | null;
  usage_context: string | null;
}

export interface MapPin {
  id: string;
  display_name: string;
  category: OathCategory;
  pin_color: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
}

export interface DashboardStats {
  total_oaths: number;
  oaths_this_month: number;
  total_stories: number;
  pending_stories: number;
  published_stories: number;
  unread_messages: number;
  newsletter_subscribers: number;
  ambassadors: number;
  category_breakdown: Record<OathCategory, number>;
}

export interface RecentActivityItem {
  id: string;
  type: "oath" | "story" | "message" | "ambassador";
  created_at: string;
  summary: string;
}
