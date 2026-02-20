import { z } from "zod";

// ─── Oath Form ───────────────────────────────────────────────────────────────

export const oathSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  category: z.enum(["struggling", "memory", "supporter"]),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State must be 2 characters").max(2, "State must be 2 characters").toUpperCase(),
  message: z.string().max(500, "Message must be 500 characters or fewer").optional(),
  name_display_type: z.enum(["full", "first", "initials", "anonymous"]),
  email_optin: z.boolean().default(false),
});

export type OathFormData = z.infer<typeof oathSchema>;

// ─── Story Form ──────────────────────────────────────────────────────────────

export const storySchema = z.object({
  author_name: z.string().min(1, "Author name is required"),
  author_email: z.string().email("Invalid email address"),
  author_city: z.string().optional(),
  author_state: z.string().optional(),
  author_relation: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters").max(150, "Title must be 150 characters or fewer"),
  content: z.string().min(50, "Story must be at least 50 characters").max(10000, "Story must be 10,000 characters or fewer"),
  consent_publish: z.literal(true, "You must consent to publish"),
  consent_name: z.boolean(),
});

export type StoryFormData = z.infer<typeof storySchema>;

// ─── Contact Form ────────────────────────────────────────────────────────────

export const contactSchema = z.object({
  sender_name: z.string().min(1, "Name is required"),
  sender_email: z.string().email("Invalid email address"),
  sender_phone: z.string().optional(),
  message_type: z.enum(["general", "speaking", "workplace", "partnership"]),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  body: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message must be 5,000 characters or fewer"),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ─── Newsletter Form ─────────────────────────────────────────────────────────

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  first_name: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// ─── Get Involved Form ──────────────────────────────────────────────────────

export const getInvolvedSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  how_to_help: z.array(z.string()),
  skills: z.string().optional(),
  time_commitment: z.enum(["few_hours_month", "few_hours_week", "significant", "flexible"]),
});

export type GetInvolvedFormData = z.infer<typeof getInvolvedSchema>;

// ─── Speaking Request Form ──────────────────────────────────────────────────

export const speakingSchema = z.object({
  contact_name: z.string().min(1, "Contact name is required"),
  contact_email: z.string().email("Invalid email address"),
  organization: z.string().min(1, "Organization is required"),
  event_type: z.string(),
  event_date: z.string().optional(),
  audience_size: z.string().optional(),
  budget_range: z.string().optional(),
  topics: z.array(z.string()),
  message: z.string().optional(),
});

export type SpeakingFormData = z.infer<typeof speakingSchema>;

// ─── Workplace Training Form ────────────────────────────────────────────────

export const workplaceSchema = z.object({
  contact_name: z.string(),
  contact_email: z.string().email("Invalid email address"),
  company_name: z.string(),
  company_size: z.string(),
  training_goals: z.array(z.string()),
  format_preference: z.string().optional(),
  budget_range: z.string().optional(),
  message: z.string().optional(),
});

export type WorkplaceFormData = z.infer<typeof workplaceSchema>;

// ─── Ambassador Application Form ───────────────────────────────────────────

export const ambassadorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State must be 2 characters").max(2, "State must be 2 characters"),
  motivation: z.string().min(50, "Motivation must be at least 50 characters").max(2000, "Motivation must be 2,000 characters or fewer"),
  personal_story: z.string().max(2000, "Personal story must be 2,000 characters or fewer").optional(),
  social_links: z.record(z.string(), z.string()).optional(),
});

export type AmbassadorFormData = z.infer<typeof ambassadorSchema>;
