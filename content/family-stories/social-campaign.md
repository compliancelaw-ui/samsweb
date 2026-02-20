# Sam's OATH — Social Media Campaign & Friend Outreach Plan

## Campaign Goal

Get friends, family, colleagues, and supporters to:
1. Take the OATH on samsoath.org
2. Share their own stories
3. Spread the movement on social media
4. Invite others to do the same

## The Ask (Friend Outreach)

### Personal Invitation Template

> Hey [Name],
>
> I started something called Sam's OATH — a movement to break the silence around substance use and mental health in families. So many people are going through this alone, and I believe openness is the first step toward healing.
>
> Would you help me spread the word? Here are a few ways:
> - **Take the OATH** at samsoath.org/take-the-oath (takes 60 seconds)
> - **Share your story** if you have one — samsoath.org/share-your-story
> - **Share the site** on LinkedIn, Instagram, or Facebook
> - **Listen to the music** — 15 original songs on Apple Music/Spotify
>
> Even just sharing a post helps more than you know. Every person who breaks the silence gives someone else permission to do the same.
>
> — Frank

### Follow-up for Friends Who Engage

> Thank you for taking the OATH / sharing your story / posting about Sam's OATH.
>
> You'd be amazed how many people have reached out since I started this — all saying the same thing: "I thought I was the only one." Your voice is part of that.
>
> If you know anyone who might benefit from this — a colleague, a friend, someone carrying this quietly — feel free to pass it along. samsoath.org

---

## Social Media Content Plan

### Platform Strategy

| Platform | Audience | Content Style | Frequency |
|----------|----------|--------------|-----------|
| **LinkedIn** | Professionals, HR leaders, workplace culture | Professional, workplace angle, thought leadership | 2-3x/week |
| **Instagram** | Families, younger audience, visual storytelling | Photos, stories, reels, quote graphics | 3-4x/week |
| **Facebook** | Families, older demographics, community groups | Longer posts, family stories, event sharing | 2-3x/week |
| **TikTok** | Younger audience, viral potential | Short videos, raw moments, music clips | 2-3x/week |

### Content Pillars (Rotate Through These)

1. **The Story** — Sam, the family, the origin, the viral post
2. **The Silence** — Statistics, "did you know" facts about families suffering alone
3. **The OATH** — What O-A-T-H stands for, why each letter matters
4. **Family Voices** — Frank, Annie, Joey, Nancy video clips and quotes
5. **Language Matters** — Stigma-breaking language tips (from the resources page)
6. **Workplace** — Why offices should be safe places, presenteeism stats
7. **Music** — Song clips, behind-the-song stories, streaming links
8. **Community** — Sharing others' stories (with permission), map milestones
9. **Call to Action** — Take the oath, share your story, share the post

### Shareable Quote Graphics (Create These)

These should be branded with Sam's OATH colors (primary blue #4A6FA5, teal #3EABA8) and the logo.

1. "What's hidden doesn't heal." — Sam's OATH
2. "I thought I was the only one." — What hundreds of people told Frank
3. "We loved him unconditionally. But we never spoke openly about how his struggles were affecting us."
4. "1 in 5 families is affected by substance use. 90% never talk about it."
5. "Openness. Authenticity. Togetherness. Healing."
6. "You are not alone. You never were."
7. "The silence felt like protection. But silence doesn't protect. It isolates."
8. "Say 'person with substance use disorder' — not 'addict.' Language matters."
9. "Presenteeism: showing up at work but not really being there. 1 in 5 employees is carrying this."
10. "This is not a support group. This is a movement."

### Video Content Ideas

**Family Story Series** (4 videos, 2-3 min each)
- "A Father's Story" — Frank
- "A Sister's Story" — Annie
- "A Brother's Story" — Joey
- "A Stepmother's Story" — Nancy

**Short-Form Clips** (30-60 seconds each, cut from longer videos)
- "The moment I realized I wasn't alone"
- "What I wish I'd said sooner"
- "Why I broke the silence"
- "What Sam taught me"

**Behind the Music** (1-2 min each)
- Story behind "What's Hidden Doesn't Heal"
- Story behind "For Annie"
- Story behind "If Love Could Have Saved You"
- Story behind "Joy Anyway"

**Educational / Awareness**
- "5 things NOT to say to a family affected by substance use"
- "What is presenteeism and why should your workplace care?"
- "The language we use matters — here's why"

### Hashtags

Primary:
- #SamsOATH
- #WhatsHiddenDoesntHeal
- #BreakTheSilence

Secondary:
- #SubstanceUseAwareness
- #MentalHealthMatters
- #FamilyPerspective
- #EndTheStigma
- #YouAreNotAlone
- #OpenAuthenticTogetherHealing

---

## Friend Tracking Database

The Supabase database already has tables for:
- `oath_submissions` — people who take the OATH
- `newsletter_subscribers` — email subscribers
- `story_submissions` — people who share stories
- `contact_messages` — inbound inquiries

### What We May Want to Add

A `referrals` or `friend_invitations` table:
```
friend_invitations:
  id: uuid
  inviter_name: text (who sent the invite)
  inviter_email: text
  friend_name: text
  friend_email: text
  method: text (email, text, social)
  status: text (sent, clicked, oath_taken)
  created_at: timestamp
```

And a `social_shares` tracking table:
```
social_shares:
  id: uuid
  platform: text (linkedin, instagram, facebook, twitter)
  content_type: text (oath_share, story_share, general)
  user_id: uuid (optional, if linked to oath taker)
  shared_at: timestamp
```

These can be built when we need the referral tracking feature.

---

## Email Sequences

### After Someone Takes the OATH
1. **Immediately:** Welcome + certificate + badge download
2. **Day 2:** "Share your OATH on social media" with pre-written posts and shareable images
3. **Day 7:** "Know someone who might benefit? Invite them."
4. **Day 14:** "Have a story to share?" with link to story submission
5. **Monthly:** Newsletter with movement updates, new stories, milestones

### After Someone Shares a Story
1. **Immediately:** "We received your story" confirmation
2. **When published:** "Your story is live!" with link and social share buttons
3. **Day 7:** "Your story has been read X times" (engagement update)

### Friend Invitation Flow
1. Frank (or any OATH taker) enters friend's email
2. Friend receives personalized email: "Your friend [Name] wants you to know about Sam's OATH"
3. Link to take the OATH or read stories
4. If they take the OATH → both inviter and friend get a "you did it" email

---

## Email Platform Decision

**Current plan:** Resend (transactional emails) + Supabase (subscriber database)

**When to consider Mailchimp/alternatives:**
- When subscriber list exceeds 1,000 and we need advanced segmentation
- When we need drag-and-drop newsletter design
- When we need A/B testing on subject lines

**For now:** Resend handles everything we need. The email templates are built with React Email (already in the plan). Campaign sending will be built into the admin dashboard.

**If we outgrow Resend:** Mailchimp, ConvertKit, or Beehiiv are all options. We can migrate the subscriber list from Supabase to any of these.
