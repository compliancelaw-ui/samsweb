"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  LayoutDashboard,
  Heart,
  FileText,
  MessageSquare,
  Users,
  Mail,
  Layers,
  Image,
  Settings,
  Trophy,
  Share2,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  Shield,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Manual sections                                                     */
/* ------------------------------------------------------------------ */

interface ManualSection {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  content: React.ReactNode;
}

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <h4 className="text-sm font-semibold text-gray-900 mb-2">{title}</h4>
      <div className="text-gray-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
      <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
      <div>{children}</div>
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
      <div>{children}</div>
    </div>
  );
}

const sections: ManualSection[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    color: "text-primary",
    bg: "bg-primary-50",
    content: (
      <>
        <SectionBlock title="What it does">
          <p>
            The dashboard is your home base. It shows live stats pulled from
            Supabase: total OATHs, published stories, pending stories, newsletter
            subscribers, unread messages, and ambassador count.
          </p>
        </SectionBlock>
        <SectionBlock title="Key features">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Stat cards</strong> &mdash; real-time counts from the
              database, updated every time you visit or hit Refresh.
            </li>
            <li>
              <strong>OATH category breakdown</strong> &mdash; shows how many
              people chose &ldquo;Supporting a Loved One,&rdquo; &ldquo;Standing
              With You,&rdquo; or &ldquo;Hope &amp; Recovery.&rdquo;
            </li>
            <li>
              <strong>This Month</strong> &mdash; snapshot of activity for the
              current month.
            </li>
            <li>
              <strong>Quick Actions</strong> &mdash; shortcuts to Review Stories,
              Compose Newsletter, View OATHs, and Manage Content.
            </li>
            <li>
              <strong>Quick Links</strong> &mdash; one-click access to Supabase,
              Vercel, Google Analytics, Search Console, Mapbox, and Resend.
            </li>
            <li>
              <strong>Recent Activity</strong> &mdash; feed of the latest OATHs,
              stories, messages, and ambassador applications.
            </li>
          </ul>
        </SectionBlock>
        <Tip>
          Click <strong>Refresh</strong> anytime to pull the latest numbers from
          the database without reloading the page.
        </Tip>
      </>
    ),
  },
  {
    id: "stories",
    title: "Stories",
    icon: BookOpen,
    color: "text-primary",
    bg: "bg-primary-50",
    content: (
      <>
        <SectionBlock title="What it does">
          <p>
            Story Moderation is where you review, edit, approve, publish, or
            reject stories submitted through the &ldquo;Share Your Story&rdquo;
            form on the public site.
          </p>
        </SectionBlock>
        <SectionBlock title="Workflow">
          <ol className="list-decimal pl-5 space-y-1">
            <li>A visitor submits a story &rarr; it appears in <strong>Pending Review</strong>.</li>
            <li>You review it, optionally <strong>Edit</strong> or <strong>AI Polish</strong> the text.</li>
            <li>Click <strong>Approve</strong> to move it to the Approved tab.</li>
            <li>When ready, click <strong>Publish</strong> &mdash; the story goes live on the site.</li>
            <li>Toggle the <strong>star icon</strong> to feature a published story on the homepage.</li>
          </ol>
        </SectionBlock>
        <SectionBlock title="Editing stories">
          <p>
            Click the <strong>Edit</strong> button on any expanded story to enter
            edit mode. You can modify the title and content. The <strong>AI
            Polish</strong> button uses Claude to improve grammar, clarity, and
            safe messaging while preserving the author&apos;s voice.
          </p>
          <p>
            Use <strong>Save</strong> to keep your edits, or <strong>Save &amp;
            Approve</strong> to save and move the story to the Approved tab in
            one step.
          </p>
        </SectionBlock>
        <SectionBlock title="Feature as Blog Post">
          <p>
            Published stories have a <strong>Feature as Blog Post</strong>
            button. This creates a new blog draft from the story content, which
            you can then edit and publish from the Blog tab.
          </p>
        </SectionBlock>
        <SectionBlock title="Content filter">
          <p>
            Stories are automatically screened for triggering content, named
            individuals, spam, and contact information. The filter flags content
            for your review &mdash; it never auto-rejects.
          </p>
        </SectionBlock>
        <Warning>
          Deleting a story is permanent. Always double-check before using the
          Delete button.
        </Warning>
      </>
    ),
  },
  {
    id: "oaths",
    title: "OATHs",
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-50",
    content: (
      <>
        <SectionBlock title="What it does">
          <p>
            The OATHs tab shows every person who has taken Sam&apos;s OATH,
            including their display name, real name, category, location, date,
            email, and whether their pin is on the map.
          </p>
        </SectionBlock>
        <SectionBlock title="Key features">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Filter by category</strong> &mdash; Supporting a Loved One,
              Standing With You, or Hope &amp; Recovery.
            </li>
            <li>
              <strong>Filter by state</strong> &mdash; type a 2-letter state code
              to narrow results.
            </li>
            <li>
              <strong>Pagination</strong> &mdash; 50 per page with Previous /
              Next controls.
            </li>
            <li>
              <strong>Bulk delete</strong> &mdash; check multiple entries and
              delete (e.g., spam or test entries).
            </li>
            <li>
              <strong>Map pin indicator</strong> &mdash; the teal map pin icon
              means geocoding was successful and the pin is on the map.
            </li>
          </ul>
        </SectionBlock>
        <Tip>
          The map pin column helps you spot entries that failed geocoding (gray
          pin). These are usually typos in the city name. You can delete and ask
          the person to resubmit.
        </Tip>
      </>
    ),
  },
  {
    id: "challenges",
    title: "Challenges",
    icon: Trophy,
    color: "text-amber-500",
    bg: "bg-amber-50",
    content: (
      <>
        <SectionBlock title="What it does">
          <p>
            The Challenges tab tracks the &ldquo;Challenge 3 People&rdquo; viral
            loop. After someone takes the OATH, they&apos;re encouraged to share a
            unique referral link with three people. When someone takes the OATH
            using that link, the referral is tracked here.
          </p>
        </SectionBlock>
        <SectionBlock title="Key metrics">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Total Referrals</strong> &mdash; how many OATHs came
              through a shared link.
            </li>
            <li>
              <strong>Unique Challengers</strong> &mdash; how many people have
              successfully referred at least one person.
            </li>
            <li>
              <strong>Conversion Rate</strong> &mdash; percentage of total OATHs
              that came from referrals.
            </li>
          </ul>
        </SectionBlock>
        <SectionBlock title="Leaderboard &amp; activity">
          <p>
            The <strong>Top Challengers</strong> leaderboard ranks people by
            number of successful referrals. The <strong>Recent Referral
            Activity</strong> feed shows who referred whom and when.
          </p>
        </SectionBlock>
        <Tip>
          The challenge system is fully automatic. Each OATH taker gets a unique
          referral code, and the thank-you page has built-in sharing buttons for
          text, email, Facebook, X, LinkedIn, and copy link.
        </Tip>
      </>
    ),
  },
  {
    id: "messages",
    title: "Messages",
    icon: MessageSquare,
    color: "text-orange",
    bg: "bg-orange-50",
    content: (
      <>
        <SectionBlock title="What it does">
          <p>
            Messages shows all submissions from the Contact page. Each message
            includes the sender&apos;s name, email, optional phone number,
            message type (General, Speaking, Workplace, or Partnership), and
            priority level.
          </p>
        </SectionBlock>
        <SectionBlock title="How to use it">
          <ol className="list-decimal pl-5 space-y-1">
            <li>New messages show with a <strong>blue dot</strong> (unread).</li>
            <li>Click a message to expand and read the full body.</li>
            <li>Click <strong>Mark as Read</strong> to dismiss the blue dot.</li>
            <li>
              Click <strong>Reply</strong> to open your email client with a
              pre-filled &ldquo;Re:&rdquo; subject line.
            </li>
          </ol>
        </SectionBlock>
        <SectionBlock title="Filters">
          <p>
            Use the All / Unread / Read tabs to filter your inbox. The unread
            count appears on the dashboard and in the tab itself.
          </p>
        </SectionBlock>
      </>
    ),
  },
  {
    id: "blog",
    title: "Blog",
    icon: FileText,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    content: (
      <>
        <SectionBlock title="What it does">
          <p>
            The Blog tab is where you create, edit, and publish blog posts. Posts
            appear on the public /blog page and individual /blog/[slug] pages.
          </p>
        </SectionBlock>
        <SectionBlock title="Creating a post">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Click <strong>New Post</strong> to open the editor.</li>
            <li>Enter a <strong>title</strong>, optional <strong>excerpt</strong> (shown in listings), and <strong>tags</strong> (comma-separated).</li>
            <li>Write your content in the large text area. Separate paragraphs with blank lines.</li>
            <li>Click <strong>Save Draft</strong> to save without publishing, or <strong>Publish</strong> to go live immediately.</li>
          </ol>
        </SectionBlock>
        <SectionBlock title="AI Writing Assistant">
          <p>
            Toggle the <strong>AI Assist</strong> button to open the AI panel.
            Quick actions include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Draft full post</strong> &mdash; generates a complete post from the title.</li>
            <li><strong>Improve writing</strong> &mdash; polishes existing content.</li>
            <li><strong>Add SEO keywords</strong> &mdash; weaves in relevant keywords naturally.</li>
            <li><strong>Write conclusion</strong> &mdash; adds a closing section with a call to action.</li>
          </ul>
          <p>
            You can also type a custom prompt for any kind of AI assistance.
          </p>
        </SectionBlock>
        <Tip>
          AI features require the Anthropic API key. Check the Settings tab to
          confirm it&apos;s connected.
        </Tip>
      </>
    ),
  },
  {
    id: "social",
    title: "Social Posts",
    icon: Share2,
    color: "text-purple-600",
    bg: "bg-purple-50",
    content: (
      <>
        <SectionBlock title="What it does">
          <p>
            The Social Post Generator creates ready-to-post content for
            LinkedIn, Instagram, Facebook, and X (Twitter). Select a platform,
            choose a post type, and the AI writes a post tailored to that
            platform&apos;s style and character limits.
          </p>
        </SectionBlock>
        <SectionBlock title="How to use it">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Select a <strong>platform</strong> (each has its own character limit and tone).</li>
            <li>Pick a <strong>post type</strong>: Movement Update, Story Spotlight, Challenge Callout, or Behind the Scenes.</li>
            <li>Optionally add <strong>custom instructions</strong> (e.g., &ldquo;Announce we hit 500 OATHs&rdquo;).</li>
            <li>Click <strong>Generate</strong>.</li>
            <li>Review the output. Click <strong>Copy</strong> to paste it directly into the social platform.</li>
            <li>Click <strong>Regenerate</strong> if you want a different version.</li>
          </ol>
        </SectionBlock>
        <SectionBlock title="Hashtags">
          <p>
            Suggested hashtags appear at the bottom. Click any hashtag to append
            it to the generated post. Hashtags already in the post are marked
            with a green check.
          </p>
        </SectionBlock>
      </>
    ),
  },
  {
    id: "ambassadors",
    title: "Ambassadors",
    icon: Users,
    color: "text-sage",
    bg: "bg-sage-50",
    content: (
      <>
        <SectionBlock title="What it does">
          <p>
            The Ambassadors tab manages applications from people who want to be
            Sam&apos;s OATH ambassadors. Applications come in through the
            Ambassador sign-up form on the public site.
          </p>
        </SectionBlock>
        <SectionBlock title="Workflow">
          <ol className="list-decimal pl-5 space-y-1">
            <li>New applications arrive as <strong>Pending</strong>.</li>
            <li>Click the <strong>green check</strong> to approve or the <strong>red X</strong> to reject.</li>
            <li>Click an ambassador&apos;s name to expand their bio and social links.</li>
            <li>Approved ambassadors appear on the public Ambassadors page.</li>
          </ol>
        </SectionBlock>
        <SectionBlock title="Filters">
          <p>
            Use All / Pending / Approved / Rejected tabs to filter the list.
            Counts appear on each tab.
          </p>
        </SectionBlock>
      </>
    ),
  },
  {
    id: "email",
    title: "Email",
    icon: Mail,
    color: "text-primary",
    bg: "bg-primary-50",
    content: (
      <>
        <SectionBlock title="What it does">
          <p>
            The Email Composer lets you send individual emails or newsletters
            from any @samsoath.org alias. All 11 aliases are available (hello,
            connect, share, press, workplace, speaking, support, board, team,
            partnerships, frank).
          </p>
        </SectionBlock>
        <SectionBlock title="Sending modes">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Individual Email</strong> &mdash; send to a single
              recipient. Enter their email in the &ldquo;To&rdquo; field.
            </li>
            <li>
              <strong>Newsletter</strong> &mdash; send to an audience: Everyone,
              Newsletter Subscribers, OATH Takers, or Ambassadors.
            </li>
          </ul>
        </SectionBlock>
        <SectionBlock title="Weekly Digest">
          <p>
            Click the <strong>Weekly Digest</strong> button (top right) to
            auto-generate a newsletter. It pulls the latest stats from Supabase
            (new OATHs, new stories, new subscribers this week) and writes a
            draft email with stats and a featured story. It auto-selects
            frank@samsoath.org as the sender and switches to newsletter mode.
          </p>
        </SectionBlock>
        <SectionBlock title="AI Draft">
          <p>
            Click the <strong>AI Draft</strong> button next to the content label
            to open the AI panel. Type a description of the email you want, or
            use quick prompts (Welcome email, Thank you note, Follow-up, Event
            invitation). The AI generates the full email body.
          </p>
        </SectionBlock>
        <SectionBlock title="Preview">
          <p>
            Click <strong>Preview</strong> to see how the email will look with
            the Sam&apos;s OATH branded template, including header, body, sign-off,
            and footer.
          </p>
        </SectionBlock>
        <Warning>
          Email sending requires the Resend API key and domain verification.
          Check Settings to confirm the connection is active.
        </Warning>
      </>
    ),
  },
  {
    id: "content",
    title: "Content",
    icon: Layers,
    color: "text-primary",
    bg: "bg-primary-50",
    content: (
      <>
        <SectionBlock title="What it does">
          <p>
            The Content tab is a reference page that shows all content on the
            site and where to edit it.
          </p>
        </SectionBlock>
        <SectionBlock title="Two types of content">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Public Pages</strong> (Homepage, About, Take the OATH,
              etc.) &mdash; these are code files. Text changes require editing
              the source code.
            </li>
            <li>
              <strong>Dynamic Content</strong> (Blog Posts, Stories, Media) &mdash;
              managed through their respective admin tabs.
            </li>
          </ul>
        </SectionBlock>
        <Tip>
          To change text on a static page, you can ask your AI assistant for
          help or edit the file path shown under each page name.
        </Tip>
      </>
    ),
  },
  {
    id: "media",
    title: "Media",
    icon: Image,
    color: "text-primary",
    bg: "bg-primary-50",
    content: (
      <>
        <SectionBlock title="What it does">
          <p>
            The Media Library stores images and files used across the site.
            Items are added by URL (not uploaded directly), which means you host
            them elsewhere (Supabase Storage, cloud hosting, etc.) and register
            them here for easy reference.
          </p>
        </SectionBlock>
        <SectionBlock title="Adding media">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Click <strong>Add Media</strong>.</li>
            <li>Enter a <strong>filename</strong> (e.g., hero-image.jpg) and the <strong>file URL</strong>.</li>
            <li>Optionally add MIME type, alt text, and usage context.</li>
            <li>Click <strong>Add Item</strong>.</li>
          </ol>
        </SectionBlock>
        <SectionBlock title="Managing media">
          <p>
            Hover over any image to see action buttons: <strong>Copy URL</strong>
            (for pasting into content), <strong>Edit</strong> (alt text and
            context), and <strong>Delete</strong>.
          </p>
        </SectionBlock>
      </>
    ),
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    color: "text-gray-600",
    bg: "bg-gray-100",
    content: (
      <>
        <SectionBlock title="What it does">
          <p>
            The Settings tab shows environment status, quick links to external
            services, and basic site information.
          </p>
        </SectionBlock>
        <SectionBlock title="Environment Status">
          <p>
            Shows whether each service integration is connected:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Supabase</strong> &mdash; database and authentication</li>
            <li><strong>Mapbox</strong> &mdash; OATH map pins</li>
            <li><strong>Resend</strong> &mdash; email delivery</li>
            <li><strong>Anthropic AI</strong> &mdash; AI writing features (story polish, blog assist, social posts, email drafts)</li>
            <li><strong>Google Analytics</strong> &mdash; site traffic tracking</li>
          </ul>
          <p>
            A green check means connected; a red X means the API key is missing
            or the service needs configuration.
          </p>
        </SectionBlock>
        <SectionBlock title="Quick Links">
          <p>
            Direct links to Supabase Dashboard, Vercel Dashboard, Google
            Analytics, Search Console, Mapbox Studio, and Resend Dashboard.
          </p>
        </SectionBlock>
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ section                                                         */
/* ------------------------------------------------------------------ */

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqItems: FAQItem[] = [
  {
    question: "How do I change text on a page like the About or Homepage?",
    answer: (
      <p>
        Static page content lives in code files (e.g.,{" "}
        <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">src/app/(public)/about/page.tsx</code>).
        You can use the AI coding assistant to make changes, or edit the file directly if you&apos;re comfortable with code.
        The Content tab lists every page and its file path.
      </p>
    ),
  },
  {
    question: "Why aren't AI features working (blog assist, story polish, social posts)?",
    answer: (
      <p>
        AI features require the Anthropic API key. Go to <strong>Settings</strong> and
        check if &ldquo;Anthropic AI&rdquo; shows a green check. If not, the
        ANTHROPIC_API_KEY environment variable needs to be added in the Vercel
        dashboard and/or .env.local file.
      </p>
    ),
  },
  {
    question: "How does the referral/challenge system work?",
    answer: (
      <p>
        When someone takes the OATH, they get a unique referral code. The
        thank-you page encourages them to share a link
        (samsoath.org/take-the-oath?ref=CODE) with 3 people. When someone takes
        the OATH through that link, the referral is tracked. View results in the
        Challenges tab.
      </p>
    ),
  },
  {
    question: "How do I send a weekly newsletter?",
    answer: (
      <p>
        Go to <strong>Email</strong>, click the <strong>Weekly Digest</strong>
        button. It auto-generates a newsletter with this week&apos;s stats and a
        featured story. Review, edit if needed, then click <strong>Send
        Newsletter</strong>.
      </p>
    ),
  },
  {
    question: "What do the map pin colors mean?",
    answer: (
      <div>
        <ul className="list-disc pl-5 space-y-1">
          <li><span className="inline-block w-3 h-3 rounded-full bg-[#3EABA8] mr-1" /> <strong>Teal</strong> &mdash; Supporting a Loved One</li>
          <li><span className="inline-block w-3 h-3 rounded-full bg-[#7AB87A] mr-1" /> <strong>Green</strong> &mdash; Standing With You (Supporter)</li>
          <li><span className="inline-block w-3 h-3 rounded-full bg-[#E8956F] mr-1" /> <strong>Orange</strong> &mdash; Hope &amp; Recovery</li>
          <li><span className="inline-block w-3 h-3 rounded-full bg-[#4A6FA5] mr-1" /> <strong>Blue</strong> &mdash; Story Sharer</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Can I undo deleting a story, OATH, or message?",
    answer: (
      <p>
        No. All delete actions are permanent. The system will always ask for
        confirmation before deleting. If you need to recover data, contact your
        developer or check Supabase&apos;s dashboard for any database backups.
      </p>
    ),
  },
  {
    question: "What email aliases are available?",
    answer: (
      <div>
        <p>All route to frank@samsoath.org via Google Workspace:</p>
        <p className="mt-1 text-sm">
          hello@ &middot; connect@ &middot; share@ &middot; press@ &middot; workplace@ &middot;
          speaking@ &middot; support@ &middot; board@ &middot; team@ &middot; partnerships@ &middot; frank@
        </p>
      </div>
    ),
  },
  {
    question: "Where do I see site traffic and analytics?",
    answer: (
      <p>
        <strong>Vercel Analytics</strong> is built into the site (all pages).
        <strong> Google Analytics</strong> runs on public pages only. Access both
        from the Quick Links on the Dashboard or Settings page.
      </p>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function AdminManualPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleSection = (id: string) => {
    setActiveSection((prev) => (prev === id ? null : id));
  };

  const filteredSections = searchQuery.trim()
    ? sections.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sections;

  const filteredFAQ = searchQuery.trim()
    ? faqItems.filter((f) =>
        f.question.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Admin Manual
        </h2>
        <p className="text-gray-500 mt-1">
          Everything you need to know to manage Sam&apos;s OATH from this
          dashboard.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search the manual..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
        />
      </div>

      {/* Quick overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Quick Overview
        </h3>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The Sam&apos;s OATH admin dashboard lets you manage every aspect of the
          movement from one place. The sidebar on the left has 12 tabs &mdash;
          click any section below for detailed instructions.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSection(s.id);
                  document.getElementById(`section-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all text-left"
              >
                <div className={cn("rounded p-1.5", s.bg)}>
                  <Icon className={cn("h-4 w-4", s.color)} />
                </div>
                {s.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed sections */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">
          Tab-by-Tab Guide
        </h3>
        {filteredSections.map((section) => {
          const Icon = section.icon;
          const isOpen = activeSection === section.id;
          return (
            <div
              key={section.id}
              id={`section-${section.id}`}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("rounded-lg p-2", section.bg)}>
                    <Icon className={cn("h-5 w-5", section.color)} />
                  </div>
                  <span className="font-semibold text-gray-900">
                    {section.title}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  {section.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">
          Frequently Asked Questions
        </h3>
        {filteredFAQ.map((faq, index) => {
          const isOpen = expandedFAQ === index;
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setExpandedFAQ(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span
                  className={cn(
                    "font-medium pr-4",
                    isOpen ? "text-primary" : "text-gray-900"
                  )}
                >
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* External resources */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          External Resources
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="https://supabase.com/dashboard/project/spqisrxqpqrphkndnlad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Supabase Dashboard
          </a>
          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Vercel Dashboard
          </a>
          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Google Analytics
          </a>
          <a
            href="https://github.com/compliancelaw-ui/samsweb"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            GitHub Repository
          </a>
        </div>
      </div>
    </div>
  );
}
