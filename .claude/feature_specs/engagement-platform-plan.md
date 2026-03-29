# Sam's OATH Engagement Platform - Implementation Plan

## Philosophy
- Movement is FOR FAMILIES (parents, siblings, partners, friends supporting someone)
- Addresses BOTH substance use AND mental health (they co-occur)
- We do NOT give advice to people in recovery - we help families cope, communicate, find community
- Everything: thoughtful, professional, not preachy, accessible, positive, authoritative sources only
- Zero tolerance for trust/reliability hits
- No "stigma" language - use openness, silence, community

## Engagement Funnel

```
AWARENESS (Google Ads, Social, Organic)
    |
LANDING (Homepage, Resources, Workplace, Stories)
    |
ACTION (Take the OATH -or- Share Your Story)
    |
POST-ACTION (Thank You page)
  - Download certificate (PDF)
  - Share on social (pre-written text + certificate image)
  - Challenge 3 people
  - Soft email capture (if anonymous)
    |
DRIP ENGAGEMENT (Days 0, 3, 7, 14, 30, 45, 60, 90)
    |
ONGOING (Monthly newsletter + challenges)
    |
DEEPENING (Ambassador, Workplace, Donate)
```

## Implementation Phases

### Phase 1: Post-Action Engagement
- OathShareSection component with platform-specific pre-written messages
- Dynamic OG image generation (/api/og/oath) for social sharing
- Enhanced thank-you pages (certificate download, social sharing, email capture)
- Floating share buttons on all public pages (add TikTok, Instagram)
- Share event tracking (new table + API)
- Soft email capture for anonymous users with strong privacy assurance

### Phase 2: Resource Library Infrastructure
- resource_documents database table
- Admin CRUD at /admin/resources
- Public pages: /resources/guides and /resources/guides/[slug]
- Download tracking API
- Branded multi-page PDF generation system (pdf-lib)
- First 2 guides: "How to Talk to Your Family" + "What to Do in a Crisis"

### Phase 3: Remaining Guides + Workplace Toolkit
- 5 more family guides (content + PDF)
- Workplace toolkit landing page + downloadable kit
- Email capture gate on toolkit download
- SEO for all new pages

### Phase 4: Challenge System
- challenges + challenge_participants database tables
- Admin CRUD for challenges
- Public /challenges page
- Current challenge card on homepage
- Connect to drip emails
- Badge/gamification UI

### Phase 5: Stories Feed Redesign
- Featured story hero + masonry grid layout
- Enhanced story cards with share buttons
- "Add Your Voice" CTAs interspersed

### Phase 6: Email Enhancements
- Extended drip: days 45, 60, 90
- Monthly newsletter template + cron
- Certificate link in oath confirmation
- Social share prompts in drips
- Post-story 3-email drip

### Phase 7: Analytics Dashboard
- /admin/analytics/shares
- /admin/analytics/downloads
- Engagement funnel visualization

## Resource Guides (7 total)

1. "How to Talk to Your Family About Substance Use and Mental Health"
   - Scripts, timing, what NOT to say, when to involve professionals
   - Sources: SAMHSA "Talk. They Hear You", NAMI

2. "Supporting Someone You Love: A Family Guide"
   - The 3 Cs, helping vs enabling, boundaries, self-care
   - Sources: SAMHSA, Al-Anon, CRAFT method research

3. "How to Set Boundaries Without Cutting Someone Off"
   - Types, scripts for scenarios, dealing with guilt
   - Sources: Beyond Addiction (Foote et al.), CRAFT

4. "Talking to Kids About a Family Member's Substance Use or Mental Health"
   - Age-appropriate language (5-8, 9-12, 13+), common reactions
   - Sources: SAMHSA, NACOA, NAMI

5. "Taking Care of Yourself While Supporting Someone Else"
   - Burnout recognition, daily practices, finding support
   - Sources: NAMI, Caregiver Action Network, Mental Health America

6. "What to Do in a Crisis"
   - SUD vs MH crisis, immediate steps, ER guide, safety planning
   - Sources: SAMHSA, 988, NAMI, Crisis Text Line

7. "Navigating Holidays and Triggers as a Family"
   - Planning ahead, new traditions, grief during celebrations
   - Sources: SAMHSA, NAMI, The Compassionate Friends

## Workplace Toolkit Contents
- Facilitator guide (how to run a Sam's OATH session)
- 10 discussion prompts for team meetings
- OATH ceremony instructions (group oath-taking)
- Printable poster/flyer templates with QR codes
- Quick-reference card (crisis resources, language guide summary)

## Database Tables Needed

### resource_documents
id, title, slug, description, category, cover_image_url, pdf_url, pdf_file_size, page_count, sources (JSONB), tags (JSONB), download_count, share_count, is_published, seo_title, seo_description, created_at, updated_at

### challenges
id, title, slug, description, challenge_text, month, year, category, badge_label, badge_color, is_active, participant_count, created_at, updated_at

### challenge_participants
id, challenge_id (FK), oath_id (FK), email, name, completed, completed_at, created_at

### share_events
id, content_type, content_id, platform, referrer_url, created_at

## Post-OATH Drip Sequence (Enhanced)

| Day | Subject | Content |
|-----|---------|---------|
| 0 | "You took a powerful step" | Welcome, certificate link, map |
| 3 | "The power of your words" | Language guide, share prompt |
| 7 | "You're not alone in this" | Community stats, ambassador invite |
| 14 | "You're making a difference" | Workplace toolkit, impact stats |
| 30 | "One month of openness" | Challenge 3, donation ask |
| 45 | "This month's challenge" | Current challenge, participation |
| 60 | "Resources for your family" | Guide download, specific recommendation |
| 90 | "Three months of openness" | Reflection, annual summary |

## Social Share Pre-Written Messages

### After Taking the OATH
- FB: "I just took Sam's OATH - a commitment to break the silence around substance use and mental health. Every family deserves to be heard. Join me: samsoath.org/take-the-oath"
- IG: "I took Sam's OATH today. Openness. Authenticity. Togetherness. Healing. If your family has been touched by substance use or mental health challenges, you are not alone. #SamsOATH #BreakTheSilence"
- TikTok: "I took Sam's OATH - 60 seconds that matter. What's hidden doesn't heal. samsoath.org #SamsOATH #MentalHealth #FamilySupport"
- LinkedIn: "Today I took Sam's OATH, a public commitment to break the silence around substance use and mental health. 1 in 5 adults is affected. Most families carry this in silence. Not anymore."

## SEO Keyword Targets (mapped to pages)
- "family substance use support" -> /resources/for-families
- "how to talk to family about addiction" -> /resources/guides/how-to-talk-to-family
- "substance use language guide" -> /resources/language-guide
- "mental health family resources" -> /resources/guides
- "free workplace mental health toolkit" -> /workplace/toolkit
- "grief support substance use" -> /resources/grief-and-loss
- "setting boundaries addiction family" -> /resources/guides/setting-boundaries
- "break the silence mental health" -> /take-the-oath

## Automation Map

### Runs Automatically
- Post-oath drip emails (daily cron)
- Certificate generation (on-demand)
- Referral code generation (on submission)
- Share event tracking (client-side)
- Download counting (API increment)
- Monthly newsletter (monthly cron, 1st Tuesday)
- OG image generation (on-demand)

### Requires Admin Action
- Create/edit resource documents + upload PDFs
- Create monthly challenges + activate/deactivate
- Compose custom email campaigns
- Moderate stories
- Publish blog posts
- Review analytics
