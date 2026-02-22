/**
 * Seed script: Insert 10 SEO-targeted blog post drafts into Supabase.
 *
 * Usage:
 *   node scripts/seed-blog.mjs
 *
 * All posts are inserted as status 'draft' so Frank can review before publishing.
 */

import { createClient } from '@supabase/supabase-js'

// Load from environment variables (set in .env.local or pass inline)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.')
  console.error('Run with: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-blog.mjs')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100)
}

const posts = [
  // ── Post 1 ──────────────────────────────────────────────────────────────────
  {
    title: "What's Hidden Doesn't Heal: Why Families Stay Silent",
    tags: ['families', 'silence', 'stigma', 'healing'],
    excerpt: "Millions of families are quietly navigating substance use behind closed doors. Here's why the silence persists — and why breaking it is the first step toward healing.",
    content: `## The Secret Everyone Keeps

There's a conversation happening in almost every neighborhood, every school, every workplace in America. It's happening in whispers, behind closed doors, and sometimes not at all. It's the conversation about substance use — and the reason most families never have it is simple: shame.

If your family has been touched by substance use, you already know the feeling. The careful editing of holiday stories. The rehearsed answers when someone asks how your son, your daughter, your sibling is doing. The way you scan the room before saying anything real, calculating who's safe to tell and who might judge.

You're not alone. According to the Substance Abuse and Mental Health Services Administration, nearly 21 million Americans have at least one substance use disorder, yet only 10% receive treatment. Behind each of those numbers is a family — often suffering in silence.

## Why We Hide

Families keep substance use a secret for reasons that make perfect sense from the inside:

**Fear of judgment.** We live in a culture that still treats substance use as a moral failing rather than a health condition. Parents worry they'll be blamed. Siblings worry they'll be defined by it. Spouses worry about the whispers at school pickup.

**Protecting the person who's struggling.** "If people find out, it'll make things worse." This instinct comes from love, but it often backfires. When we hide someone's struggle, we also hide them from the support they need.

**Not knowing what to say.** There's no script for this. Most of us grew up in families where difficult things simply weren't discussed. We inherited silence, and we pass it on without realizing it.

**Shame — the deepest reason.** Shame tells us that this struggle means something is fundamentally wrong with us, with our family, with our love. Shame is a liar, but it's a convincing one.

## The Cost of Silence

Here's what hiding does: it isolates. It tells the person who's struggling that their reality is too terrible to name out loud. It tells siblings that they should pretend everything is fine. It tells parents that they must carry this weight alone.

Silence doesn't protect anyone. It just makes the suffering invisible — and invisible suffering can't receive help.

Research consistently shows that social support is one of the strongest predictors of recovery. When families talk openly — with each other, with their communities, with professionals — outcomes improve. Not just for the person struggling, but for everyone around them.

## Breaking the Silence Doesn't Mean Broadcasting

Let's be clear: breaking the silence doesn't mean posting your family's story on social media or sharing details at a dinner party. It means choosing honesty over performance. It means telling one trusted friend. It means saying to your child, "This is hard, and it's not your fault." It means answering "How are you?" honestly, at least sometimes.

At Sam's OATH, we talk about Openness not as an all-or-nothing proposition, but as a practice. Each small moment of honesty creates space for the next one. Each time someone says "me too," the shame gets a little smaller.

## You Don't Have to Do This Alone

The silence around substance use thrives because we think we're the only ones. We're not. Millions of families share this experience, and when we find each other, everything changes.

What's hidden doesn't heal. But what's spoken, what's shared, what's brought into the light — that's where healing begins.

---

**Ready to break the silence?** [Take Sam's OATH](https://samsoath.org/take-the-oath) — a commitment to Openness, Authenticity, Togetherness, and Healing. You don't have to share everything. You just have to start.`
  },

  // ── Post 2 ──────────────────────────────────────────────────────────────────
  {
    title: "The Language We Use Matters: Words That Help and Words That Hurt",
    tags: ['language', 'stigma', 'recovery', 'families'],
    excerpt: "The words we use shape how people feel about seeking help. A practical guide to language that reduces stigma and supports recovery.",
    content: `## Words Matter More Than We Think

When we talk about substance use, the words we choose carry weight. They can open doors or slam them shut. They can make someone feel seen — or make them feel like they're beyond help.

Most of us use stigmatizing language without even realizing it. We picked it up from news headlines, TV shows, and casual conversation. But once you see the impact these words have, you can't unsee it. And the good news is: changing your language is one of the simplest, most powerful things you can do to support someone who's struggling.

## The Shift: Person-First Language

The core principle is straightforward: define people by who they are, not by their condition.

**Instead of labels** — say "person with a substance use disorder" or "person who is struggling."

This isn't political correctness. It's accuracy. A person with diabetes isn't defined by their diagnosis. A person with cancer isn't reduced to a single word. Substance use disorder is a medical condition, and the people experiencing it deserve the same dignity.

**Instead of "clean" or "dirty"** — say "in recovery" or "currently using."

When we say someone is "clean," we imply that using makes them dirty. That's not a foundation anyone can build recovery on. "In recovery" centers the person and their journey, not a moral judgment.

**Instead of "abuse"** — say "use" or "misuse."

The word "abuse" suggests intent and violence. Most people who develop substance use disorders didn't set out to harm themselves. They were managing pain, coping with trauma, or following a prescription. "Misuse" is more accurate.

**Instead of "habit"** — say "substance use disorder."

A habit is biting your nails. Substance use disorder is a chronic condition that changes how the brain works. Calling it a habit minimizes its severity and suggests willpower alone can fix it.

## More Swaps That Make a Difference

| Instead of... | Try... |
|---|---|
| Labels and shorthand | Person with a substance use disorder |
| Drug problem | Substance use disorder |
| Getting clean | Entering recovery |
| Relapse (as failure) | Recurrence of symptoms |
| Enabling | Supporting (with boundaries) |
| Rock bottom | Turning point |
| Former user | Person in long-term recovery |

## Why This Matters in Families

Inside families, language hits differently. When a parent defines their child by a diagnosis, even with love in their heart, it collapses an entire person into a single word. When a sibling overhears "she's always been the problem," that language shapes how everyone sees her — including herself.

Families can practice new language together. It feels awkward at first, like any new skill. But over time, it reshapes how you think about the situation. Language doesn't just describe reality — it creates it.

## Language in the Workplace and Community

If you're a manager, a teacher, a coach, or a community leader, your language sets the tone for everyone around you. When you use person-first language casually and consistently, you give others permission to do the same. You signal that your space is safe for honesty.

## It's Not About Being Perfect

You'll slip up. Everyone does. The goal isn't perfection — it's awareness. When you catch yourself using an old term, just correct it and move on. No shame, no lecture. Just practice.

The people in your life who are navigating substance use disorders will notice the effort. And that effort tells them something important: they are more than their struggle.

---

**Language is one of the four commitments of Sam's OATH.** When we choose Authenticity, we choose words that reflect the truth — that every person deserves dignity, and that recovery is possible. [Take Sam's OATH today.](https://samsoath.org/take-the-oath)`
  },

  // ── Post 3 ──────────────────────────────────────────────────────────────────
  {
    title: "When Someone You Love Is Struggling: A Guide for Families",
    tags: ['families', 'support', 'loved ones', 'hope'],
    excerpt: "Your loved one's struggle with substance use affects the whole family. Here's practical guidance for supporting them — and yourself — through it.",
    content: `## The Hardest Kind of Love

When someone you love is struggling with substance use, every day is a navigation. You swing between hope and heartbreak, between wanting to fix everything and feeling completely powerless. You lie awake at night wondering if you're doing too much or not enough.

If this is where you are right now, take a breath. You're not failing. This is genuinely one of the hardest things a family can go through, and the fact that you're looking for guidance means you're already doing something right.

## First: Take Care of Yourself

This might sound backward when someone you love is in crisis, but it's not optional. You cannot pour from an empty cup, and families navigating substance use disorders are often running on fumes.

Taking care of yourself means:

- **Eating, sleeping, and moving your body.** Basic, yes. Also the first things to go when you're consumed by worry.
- **Talking to someone.** A therapist, a support group, a trusted friend. You need a space where you can be honest without performing strength.
- **Setting boundaries — and keeping them.** More on this below.

You are not selfish for prioritizing your own health. You are building the foundation that makes everything else possible.

## Understanding What You're Dealing With

Substance use disorder is a chronic medical condition. It affects the brain's reward system, decision-making, and impulse control. This means:

- Your loved one is not choosing to hurt you.
- Willpower alone is not enough.
- Recovery is possible, but it's rarely linear.
- Setbacks are common and do not mean failure.

Understanding this won't make the pain go away, but it can help you respond with compassion instead of frustration — and that makes a difference for everyone.

## What Helps

**Talk openly, without ultimatums.** Choose a calm moment. Use "I" statements: "I'm worried about you. I've noticed changes. I love you and I want to understand what you're going through." Avoid "you always" or "you never" — those trigger defensiveness, not dialogue.

**Listen more than you speak.** When your loved one does open up, resist the urge to problem-solve immediately. Sometimes the most powerful thing you can say is, "Thank you for telling me."

**Educate yourself.** Learn about substance use disorders, treatment options in your area, and what recovery actually looks like. SAMHSA's helpline (1-800-662-4357) is free, confidential, and available 24/7.

**Offer support without conditions.** "I'm here for you, and I'll help you find treatment when you're ready." This is different from "I'll only love you if you get better."

**Celebrate small steps.** Recovery doesn't start with a dramatic turning point. It starts with small, brave choices — a doctor's appointment, an honest conversation, a single day of trying. Notice these moments.

## Boundaries Are Love, Too

Boundaries get a bad reputation in families. They feel cold, selfish, punitive. They're not. Boundaries are how you love someone without losing yourself.

A boundary sounds like:

- "I love you, and I can't give you money when I know how it will be used."
- "I need you to be honest with me. That's not negotiable."
- "I will always answer your call if you need help getting to treatment."

Boundaries are not about controlling your loved one. They're about defining what you can and cannot live with. They protect the relationship by preventing resentment from building up.

## For the Siblings, the Partners, the Kids

Substance use doesn't just affect the person using. It reshapes the entire family. Children grow up hypervigilant. Siblings feel invisible. Partners carry impossible weight. If you're one of these people, your pain is valid. Your needs matter. And there are resources specifically for you.

## There Is Hope

Families do recover from this. Relationships do heal. It doesn't happen overnight, and it doesn't happen in a straight line, but it happens. The families who make it through are the ones who get honest, get support, and refuse to let shame run the show.

---

**Sam's OATH is built for families like yours.** Openness, Authenticity, Togetherness, Healing — these aren't just words. They're a path forward. [Take Sam's OATH](https://samsoath.org/take-the-oath) and join thousands of families choosing honesty over silence.`
  },

  // ── Post 4 ──────────────────────────────────────────────────────────────────
  {
    title: "Finding Hope Together: How Families Heal From Substance Use",
    tags: ['hope', 'healing', 'families', 'recovery'],
    excerpt: "When substance use enters a family, it can feel like hope disappears. But healing is possible — and it starts when families come together, speak openly, and refuse to let shame win.",
    content: `## Hope Is Not Naive

When your family is in the middle of a substance use crisis, hope can feel like a luxury you can't afford. You've been let down. You've had your heart broken. You've heard promises that didn't hold. Hope starts to feel dangerous — because hoping means you might get hurt again.

But hope isn't about ignoring reality. It's about refusing to let the hardest chapter be the last one.

At Sam's OATH, we see hope every day. We see it in the parent who reaches out for support for the first time. In the sibling who says, "I'm not okay, and I need help too." In the person in recovery who takes the OATH and says, "I want to help other families so they don't have to go through this alone."

Hope isn't naive. It's an act of courage.

## What Healing Actually Looks Like

Let's dispel a myth: healing doesn't mean going back to the way things were. That family — the one before substance use entered the picture — isn't the destination. Healing means building something new. Something honest.

Healing looks like:

- **Conversations that used to be impossible.** The family dinner where someone says, "This has been really hard," and no one changes the subject.
- **Boundaries held with love.** Not walls built from anger, but guardrails built from wisdom.
- **Laughter returning.** Not the performative kind, but the real, surprised kind — the kind that reminds you joy hasn't gone anywhere, it was just waiting.
- **Forgiveness — including self-forgiveness.** Letting go of the idea that you should have done more, known more, been more.
- **New traditions.** Families in recovery often create new ways of being together — traditions that reflect who they are now, not who they used to pretend to be.

## The Power of "Me Too"

One of the most healing things that can happen to a family navigating substance use is discovering they're not alone. The shame that keeps families silent also keeps them isolated. And isolation makes everything worse.

When you connect with another family who understands — truly understands — something shifts. The shame loses its grip. The strategies multiply. The loneliness lifts.

This is why Sam's OATH exists. Not as a program or a service, but as a community. A growing map of people across the country who have said, "I'm done hiding. I'm choosing openness."

Every pin on that map represents a person who decided that what's hidden doesn't heal. And every one of those people makes it easier for the next family to speak up.

## Practical Steps Toward Healing

**Start talking.** You don't have to tell everyone everything. Start with one person you trust. A friend, a counselor, a support group. The first conversation is the hardest. After that, each one gets a little easier.

**Educate yourself.** Understanding substance use as a medical condition — not a moral failing — changes how you respond to your loved one and how you feel about yourself.

**Get support for the whole family.** Recovery isn't just for the person who's been using. Every family member is affected, and every family member deserves support. Family counseling, support groups, and resources like those on samsoath.org are all good starting points.

**Be patient with the process.** Healing isn't linear. There will be hard days after good weeks. There will be setbacks. That doesn't mean you're failing — it means you're human.

**Celebrate progress.** Not just the big milestones, but the small ones. The honest conversation. The boundary held. The moment of connection. These are the building blocks of recovery.

## You Are Not Your Worst Chapter

If you're reading this in the middle of your family's hardest season, hear this: this moment does not define you. It does not define your family. And it does not determine your future.

Families who choose openness, who seek help, who refuse to let stigma silence them — these families find their way. Not perfectly, not quickly, but genuinely.

The path forward starts with a single step: the decision to stop hiding and start healing. Together.

---

**That's exactly what Sam's OATH is about.** Openness. Authenticity. Togetherness. Healing. Four commitments that change everything — not because they're magic, but because they're honest. [Take Sam's OATH](https://samsoath.org/take-the-oath) and join a movement that believes families heal when they stop hiding.`
  },

  // ── Post 5 ──────────────────────────────────────────────────────────────────
  {
    title: "Beyond 'Just Say No': What Actually Helps Families",
    tags: ['prevention', 'education', 'families', 'connection'],
    excerpt: "For decades, we relied on scare tactics and slogans to prevent substance use. Here's why they failed — and what evidence-based approaches actually look like.",
    content: `## The Slogan That Missed the Point

If you grew up in the 1980s or '90s, you remember it. "Just Say No." Three words, a first lady, and an entire generation of kids who were taught that prevention was a matter of willpower.

It was simple. It was memorable. And it didn't work.

The D.A.R.E. program — the backbone of school-based prevention for decades — was eventually shown by multiple studies to have no significant long-term impact on substance use. Some research even suggested it might have made kids more curious.

So what went wrong? And more importantly, what actually helps?

## Why Slogans and Scare Tactics Fail

**They oversimplify.** "Just say no" assumes that substance use is a simple choice made in a vacuum. It ignores the reality that it's driven by pain, trauma, peer pressure, mental health conditions, genetics, and environment. Telling someone to "just say no" is like telling someone with depression to "just cheer up."

**They rely on fear.** Scare tactics work briefly — until kids encounter real information that contradicts the horror stories. When they discover that not everything they were told was accurate, they lose trust in the messenger. And once trust is lost, so is influence.

**They create shame.** When prevention is framed as "good kids don't do this," kids who are struggling learn to hide. They don't ask questions. They don't seek help. They internalize the message that they are bad, and bad kids don't deserve support.

**They ignore the family system.** Most prevention programs focused on the individual child, ignoring the family dynamics, household stress, and intergenerational patterns that are the strongest predictors of substance use.

## What the Evidence Actually Shows

Decades of research have given us a much clearer picture of what works. Effective prevention isn't a single lesson or a catchy phrase. It's an ecosystem.

### 1. Strong family connections

The single most protective factor against substance use in young people is a warm, communicative relationship with a parent or caregiver. Kids who feel they can talk to their parents about hard things — without being judged or punished — are significantly less likely to develop problems.

This doesn't mean being permissive. It means being present, being curious, and being honest.

### 2. Honest, age-appropriate conversations

Instead of one big scary talk, effective prevention looks like an ongoing dialogue. Start early, answer questions honestly, and resist the urge to exaggerate. Kids can handle the truth, and they respect adults who tell it.

"Some people use substances to cope with hard feelings. It can feel like it helps at first, but it changes the brain over time and can become really hard to stop. If you ever feel curious or pressured, I want to be the person you come to."

That conversation — repeated and adapted over years — is worth more than a thousand slogans.

### 3. Addressing mental health

Substance use and mental health conditions are deeply intertwined. Anxiety, depression, ADHD, trauma — these are often the soil in which substance use grows. Prevention that ignores mental health is incomplete.

This means teaching emotional regulation, providing access to counseling, and normalizing the idea that struggling is human, not shameful.

### 4. Building life skills

Programs that teach critical thinking, stress management, decision-making, and social skills have been shown to reduce substance use. These aren't substance-specific programs — they're life skills programs. And that's exactly why they work. They give young people tools to navigate difficulty, rather than a list of things to avoid.

### 5. Community and belonging

People who feel connected to their communities — through sports, arts, faith, service, or simply having a place where they belong — are more resilient. Isolation is a risk factor. Connection is a protective one.

## What This Means for Families

You don't need a curriculum or a program. You need honest conversations, genuine connection, and the willingness to talk about hard things without flinching.

If your family has a history of substance use, talk about it. Not with fear, but with honesty. "This is something our family has navigated. It doesn't mean it will happen to you, but it means we take care of each other."

If your child or teen is struggling with mental health, get them support now. Don't wait for it to escalate.

And if you're not sure how to start the conversation — start anyway. Imperfect honesty beats polished silence every time.

## A Better Way Forward

We spent decades telling kids to just say no. Maybe it's time we started saying yes — yes to honest conversations, yes to understanding the real drivers of substance use, yes to supporting families instead of shaming them.

Prevention isn't a slogan. It's a relationship.

---

**Sam's OATH is built on the belief that what's hidden doesn't heal.** Prevention starts with Openness — in our families, our schools, and our communities. [Take Sam's OATH](https://samsoath.org/take-the-oath) and commit to a different approach.`
  },

  // ── Post 6 ──────────────────────────────────────────────────────────────────
  {
    title: "Music as Medicine: How Songs Help Families Heal",
    tags: ['music', 'healing', 'hope', 'families'],
    excerpt: "When words fail, music speaks. How songs create a space for the emotions families carry — and why Sam's OATH turned to music as part of the healing journey.",
    content: `## When Words Aren't Enough

There's a moment in grief, in worry, in the daily weight of loving someone who's struggling — a moment when words simply can't carry what you're feeling. You've said everything you know how to say. You've had the conversations, read the articles, maybe even sat in a therapist's office and talked until you were empty.

And still, something remains. Something that lives below language.

That's where music meets you.

## Why Music Reaches What Talking Can't

Music engages the brain differently than speech. When you listen to a song that resonates, it activates areas associated with emotion, memory, and reward simultaneously. It literally changes your neural chemistry — releasing dopamine, reducing cortisol, and creating a sense of connection that transcends the rational mind.

This isn't metaphor. It's neuroscience. And families navigating hard times have always known it instinctively.

Think about the songs that have gotten you through hard times. Not because they solved anything, but because they made you feel less alone. Because someone else put into melody what you couldn't put into words.

## Permission to Feel

One of the cruelest effects of stigma is that it polices emotion. Families dealing with substance use often feel like they're not allowed to grieve openly, not allowed to be angry, not allowed to fall apart. The world expects a certain composure.

Music gives you permission to feel everything. A song doesn't judge you for crying in the car. A melody doesn't tell you to be strong. It simply says: I know. I've been there, too.

For many families, music becomes the safest space they have — the one place where they don't have to edit their emotions or explain their pain.

## Music in the Sam's OATH Movement

At Sam's OATH, music isn't an afterthought. It's woven into the fabric of the movement. The original songs created for Sam's OATH — available on Apple Music under "Sam's OATH" — were written to give voice to the experiences families carry but rarely speak about.

Songs like "What's Hidden Doesn't Heal" take the movement's core truth and set it to music, creating something you can carry with you. "Knot on the Family Tree" explores the tangled bonds of family love and family pain. "Joy Anyway" is about finding light in the middle of darkness — not by pretending the darkness isn't there, but by refusing to let it be the only story.

These songs weren't written for critics or charts. They were written for the parent driving home after a hard day. For the sibling who can't sleep. For the person in recovery who needs to hear that they matter.

## How Families Can Use Music for Healing

You don't need to be a musician. You don't need a therapy degree. You just need to be willing to listen — really listen — and let the music do its work.

**Create a playlist for hard days.** Fill it with songs that make you feel understood, not just songs that make you feel better. Sometimes the most healing thing is a song that matches your sadness.

**Listen together.** Play a song for your family and talk about what it stirs up. "This lyric made me think of..." is often an easier entry point than "We need to talk about..."

**Write it down.** You don't have to write a song. Just write what you're feeling after listening. Stream of consciousness. No editing. Let the music unlock what's been stuck.

**Sing.** In the car, in the shower, at a campfire. Singing engages your body and your breath in ways that passive listening doesn't. It's one of the oldest forms of human healing, and it's available to everyone, regardless of talent.

**Share what resonates.** Send a song to someone who might need it. "I heard this and thought of you" is a small act that says everything.

## The Science Backs It Up

Music therapy is now an established field with decades of research supporting its effectiveness for grief, trauma, anxiety, and recovery. It's used in hospitals, rehab centers, hospices, and schools. Studies show that group music-making reduces feelings of isolation and increases a sense of belonging — which is exactly what families need most.

But you don't need a clinical setting to experience this. You just need a song and a willingness to let it in.

## What's Hidden Doesn't Heal — But What's Sung Might

Music doesn't fix things. It doesn't erase the pain of watching someone struggle. But it does something equally important: it reminds us that we're human, that we're connected, and that even in the hardest moments, beauty is still possible.

That's not denial. That's resilience.

---

**Listen to Sam's OATH music on Apple Music** and let the songs be part of your family's healing. And when you're ready, [take Sam's OATH](https://samsoath.org/take-the-oath) — because healing happens when we stop hiding and start sharing.`
  },

  // ── Post 7 ──────────────────────────────────────────────────────────────────
  {
    title: "The OATH: Four Commitments That Change Everything",
    tags: ['OATH', 'movement', 'openness', 'healing'],
    excerpt: "Openness. Authenticity. Togetherness. Healing. What each letter of the OATH means, why it matters, and how these four commitments are changing the conversation around substance use and mental health.",
    content: `## More Than an Acronym

Sam's OATH isn't a pledge to memorize and forget. It's not a bumper sticker or a hashtag, though it can certainly be shared. It's a framework — four commitments that, taken together, offer a different way of living with the realities of substance use, mental health, and family.

O-A-T-H. Openness. Authenticity. Togetherness. Healing.

Each letter represents a practice, not a destination. You don't master these. You live them, imperfectly, one day at a time. And that's exactly what makes them powerful.

## O — Openness

Openness is where it all starts.

For too long, families have been taught to keep struggles with substance use private. Don't air dirty laundry. Keep it in the family. Protect the reputation. And so millions of people suffer in silence, believing they're the only ones.

Openness is the decision to stop pretending. Not recklessly — you choose who, when, and how much to share. But the fundamental posture shifts from hiding to honest.

**Openness in practice looks like:**
- Telling a trusted friend what your family is going through
- Answering "How are you?" honestly, at least sometimes
- Asking for help when you need it
- Talking to your kids about difficult things in age-appropriate ways
- Refusing to edit your family's story to make it more comfortable for others

Openness doesn't mean you have no boundaries. It means your boundaries are based on wisdom, not shame.

## A — Authenticity

Authenticity is the companion to Openness. If Openness is about what you share, Authenticity is about how you share it.

Authenticity means showing up as who you actually are, not the polished version. It means admitting that you don't have all the answers. It means saying "I'm struggling" when you're struggling, and "I don't know what to do" when you don't.

In a culture that rewards performance — perfect families on social media, curated holiday cards, the illusion that everyone else has it together — Authenticity is a radical act.

**Authenticity in practice looks like:**
- Using honest, person-first language about substance use and mental health
- Letting go of the need to appear in control
- Being real about your emotions, even the messy ones
- Telling the truth to yourself about what's happening in your family
- Modeling vulnerability so others feel safe to do the same

## T — Togetherness

Togetherness is the recognition that isolation is the enemy of healing. Substance use thrives in secrecy and disconnection. Recovery — for everyone in the family — depends on community.

Togetherness doesn't mean you have to join a group or attend meetings (though those can be incredibly valuable). It means intentionally refusing to go through this alone.

**Togetherness in practice looks like:**
- Finding a support community — online, in person, or both
- Checking in on the people around you who might be hiding their own struggles
- Building a family culture where everyone's feelings matter
- Connecting with others who share your experience
- Showing up for someone else, even when your own situation is hard

There's something that happens when you discover that other families are carrying the same weight. The shame dissolves. The strategies multiply. The loneliness lifts. Togetherness is the antidote to the isolation that stigma creates.

## H — Healing

Healing is the destination — but it doesn't look like what most people expect.

Healing does not mean forgetting. It does not mean "getting over it." It does not mean returning to who you were before. Healing means integrating your experience into a life that still has meaning, joy, and connection.

For families, healing often means repairing relationships that substance use strained. It means processing difficult emotions instead of stuffing them down. It means learning to love someone without losing yourself.

**Healing in practice looks like:**
- Seeking professional support when you need it
- Giving yourself permission to feel, even years later
- Celebrating progress — your loved one's and your own
- Creating new family traditions that reflect who you are now
- Finding purpose in your experience — not because suffering should be "for something," but because meaning-making is part of being human

Healing is not linear. There will be setbacks, hard days, and moments when the old patterns pull you back. That's normal. The OATH isn't a promise to be perfect. It's a commitment to keep trying.

## Taking the OATH

When you take Sam's OATH, you're not signing a contract. You're making a commitment — to yourself and to the people you love — that you're done letting shame run the show.

You're saying: I will be open, even when it's scary. I will be authentic, even when it's uncomfortable. I will seek togetherness, even when isolation feels safer. I will pursue healing, even when it hurts.

Thousands of people across the country have taken this OATH. They're parents, siblings, friends, colleagues, and people in recovery themselves. They're not experts. They're not perfect. They're just people who decided that what's hidden doesn't heal — and that a better way is possible.

---

**Are you ready?** [Take Sam's OATH](https://samsoath.org/take-the-oath) and join a movement that's changing the conversation around substance use and mental health, one honest moment at a time.`
  },

  // ── Post 8 ──────────────────────────────────────────────────────────────────
  {
    title: "You're Not a Bad Parent: Substance Use and Family Guilt",
    tags: ['parents', 'guilt', 'families', 'support'],
    excerpt: "If your child is struggling with substance use, the guilt can be overwhelming. But substance use disorder is not a reflection of your parenting — and letting go of blame is the first step toward helping your family heal.",
    content: `## The Voice in Your Head

If your child is struggling with substance use, you already know the voice. It shows up at 3 a.m. and during quiet moments in the car. It sounds like your own thoughts, but it's meaner than anything you'd say to someone else.

"Where did I go wrong?"
"If I'd been stricter... If I'd been softer... If I'd noticed sooner..."
"Other parents don't have this problem. What's wrong with me?"
"I should have been enough."

That voice is guilt, and for parents of children with substance use disorders, it is relentless. It robs you of sleep, strains your relationships, and — here's the cruelest part — makes it harder for you to be the support your child actually needs.

So let's start with the truth, even if it's hard to absorb right now: **You are not a bad parent.** Substance use disorder is not a report card on your love.

## Why Parents Carry This Weight

Our culture has a deeply ingrained belief that parents are wholly responsible for how their children turn out. Good kids come from good parents. Struggling kids come from... well, the unspoken conclusion is obvious.

This belief is everywhere — in parenting books, in the sideways glances from other parents, in the silence when you don't get a call back after sharing what's happening in your family. And it's wrong.

Substance use disorder is a complex condition influenced by genetics, brain chemistry, trauma, peer environment, mental health, and factors that no parent can fully control. Research is clear on this. The National Institute on Drug Abuse states that genetics account for 40-60% of a person's vulnerability to substance use disorders. That's not parenting. That's biology.

Did your choices matter? Of course — every parent's choices matter. But no parent, no matter how loving, attentive, or "perfect," can guarantee their child will never struggle. The idea that you could have prevented this by being better is not just wrong. It's harmful.

## The Cost of Guilt

Guilt doesn't just feel bad. It actively interferes with the things your family needs most.

**Guilt paralyzes.** When you're consumed by self-blame, it's harder to take action. You second-guess every decision. Should I call a treatment center or wait? Should I confront them or give them space? The guilt makes every choice feel equally likely to be the wrong one.

**Guilt isolates.** Guilty parents don't reach out for help because they believe they don't deserve it — or because they fear judgment. So they carry everything alone, which is exactly the opposite of what works.

**Guilt damages relationships.** When parents are drowning in guilt, they sometimes overcompensate by removing every consequence in an attempt to make up for their perceived failures. Other times, guilt curdles into anger, and they become rigid. Neither extreme helps.

**Guilt steals your healing.** If your child is struggling, you're hurting too — the future you imagined, the family life you expected. But guilt tells you that you don't have the right to feel that pain because this is somehow your fault. So the feelings go underground, and buried emotions always find destructive outlets.

## Letting Go of Blame (A Practice, Not an Event)

Releasing guilt isn't a one-time decision. It's something you practice, over and over, until it starts to stick.

**Separate yourself from the condition.** Your child has a medical condition. You didn't cause it any more than you'd cause their diabetes or their asthma. You can be a factor in their environment without being the cause of their illness.

**Challenge the "good parent" myth.** Look around you. Substance use touches every kind of family — loving families, strict families, permissive families, wealthy families, struggling families, religious families, secular families. If parenting quality were the determining factor, it wouldn't be this widespread.

**Talk to other parents who understand.** Nothing dissolves guilt like hearing another parent say "me too." Support groups for parents — like CRAFT (Community Reinforcement and Family Training) or Families Anonymous — are some of the most powerful resources available.

**Get your own support.** A therapist who specializes in family dynamics can help you unpack the guilt and develop strategies that actually work. This isn't a luxury. It's a necessity.

**Forgive yourself for not knowing what you didn't know.** You made the best decisions you could with the information you had at the time. That's all any parent can do.

## What Your Child Needs From You Now

Here's what's remarkable about letting go of guilt: it actually makes you more effective. When you stop pouring energy into self-blame, you can direct it toward what matters.

Your child doesn't need a perfect parent. They need a present one. They need you to educate yourself about their condition, set healthy boundaries, offer unwavering love, and take care of your own wellbeing.

They need you to stop blaming yourself and start showing up — imperfectly, honestly, and with all the messy love that makes a family.

---

**If you're a parent carrying this weight, Sam's OATH is for you.** The movement was started by a father who understands this journey intimately. You are not alone, and you are not to blame. [Take Sam's OATH](https://samsoath.org/take-the-oath) and join a community of families choosing healing over guilt.`
  },

  // ── Post 9 ──────────────────────────────────────────────────────────────────
  {
    title: "Bringing the Conversation to Work: Substance Use in the Workplace",
    tags: ['workplace', 'employers', 'support', 'stigma'],
    excerpt: "Substance use doesn't clock out at five. Here's why workplaces need to be part of the conversation — and practical steps employers and employees can take today.",
    content: `## The Elephant in the Break Room

Every workplace in America has employees affected by substance use — and most of those employees are invisible. Not because they're hiding in some dramatic way, but because the culture of work tells them to.

Be professional. Leave your personal problems at the door. Don't be a liability.

So they do. The employee managing a family member's substance use crisis doesn't mention it. The manager whose spouse just entered treatment says everything is fine. The coworker in early recovery tells no one, afraid of what it might mean for their career.

According to the National Safety Council, nearly 21 million Americans have a substance use disorder, and the majority of them are employed. One in twelve workers. That means in a company of 100 people, roughly eight are personally navigating substance use — and many more are affected as family members, friends, or caregivers.

## Why Workplaces Avoid the Conversation

**Liability fears.** Employers worry that acknowledging substance use opens them up to legal risk. In reality, fostering a supportive environment reduces liability by encouraging employees to seek help before problems escalate.

**Stigma.** The same stigma that keeps families silent operates in the workplace. Leaders worry that talking about substance use will seem like they're condoning it.

**Discomfort.** Most managers have no training in how to talk about substance use. So they don't. And the culture of silence reinforces itself.

**The "not our problem" mindset.** Some leaders genuinely believe that what employees do outside of work is their own business. This is technically true and practically naive. When an employee is struggling, it shows up at work — in performance, in relationships, in safety, in engagement.

## What a Supportive Workplace Looks Like

Creating a workplace that addresses substance use doesn't require a massive budget or a complete culture overhaul. It requires willingness, education, and a few structural changes.

### 1. Normalize the conversation

This starts at the top. When leaders talk openly about mental health and substance use — not sharing personal medical details, but acknowledging that these are common human experiences — it gives everyone permission to be honest.

A leader who says, "Substance use has touched my family, and I know it's touched many of yours. We want this to be a place where you can get support without fear," changes the entire culture with a single statement.

### 2. Review your Employee Assistance Program (EAP)

Most companies have an EAP. Most employees don't use it, either because they don't know about it, don't trust it, or believe it's inadequate.

Make your EAP visible. Talk about it in team meetings. Reassure employees that it's confidential. And make sure it actually includes quality substance use and mental health resources.

### 3. Train managers

Managers are the front line. They're the ones who notice when an employee's performance changes or when someone seems withdrawn. But most managers have zero training in how to have these conversations.

Train them. Teach them to approach performance concerns with curiosity, not accusation. Equip them with language like, "I've noticed some changes and I want to check in. Is there anything going on that I can support you with?" Give them clear referral pathways.

### 4. Flexible policies that support recovery

People in recovery need to attend appointments, go to meetings, and sometimes take time off for treatment. Rigid attendance policies can force employees to choose between their job and their health.

Consider flexible scheduling, leave policies that accommodate treatment, and graduated return-to-work plans. These accommodations are minimal compared to the cost of losing a trained employee.

### 5. Address the culture, not just the policy

Policies matter, but culture matters more. A company can have the best EAP in the world, but if employees don't trust that they can use it without career consequences, it's worthless.

Build a culture where asking for help is seen as strength, not weakness. Where people are treated as whole humans, not just productivity units.

## For Employees: How to Navigate This

If you're an employee affected by substance use — your own or a loved one's — here are some things to know:

**You have rights.** The Americans with Disabilities Act and the Family and Medical Leave Act may protect you. Substance use disorder is recognized as a disability under federal law, and seeking treatment is protected.

**You don't have to tell everyone.** Being open doesn't mean announcing your situation company-wide. It might mean telling your manager, your HR rep, or one trusted colleague.

**Use your EAP.** It's there for this. It's confidential. And even if it's imperfect, it's a starting point.

**Find allies.** There may be others in your workplace who understand. Employee resource groups for mental health and wellbeing are increasingly common.

## The Business Case Is Clear — But the Human Case Is Clearer

Supporting employees through substance use challenges reduces turnover, increases loyalty, improves safety, and saves money. But those aren't the reasons to do it.

The reason to do it is that the people who work for you are people. They have families, struggles, and lives that don't stop at the office door. When they know you see them as whole humans, they bring their best selves to work.

---

**Sam's OATH believes the conversation about substance use belongs everywhere — including the workplace.** [Take Sam's OATH](https://samsoath.org/take-the-oath) and bring Openness, Authenticity, Togetherness, and Healing to every part of your life.`
  },

  // ── Post 10 ─────────────────────────────────────────────────────────────────
  {
    title: "From Silence to Strength: How One Family Started a Movement",
    tags: ["Sam's OATH", 'origin', 'movement', 'family'],
    excerpt: "Sam's OATH didn't start with a strategic plan. It started with a father, a promise, and the belief that what's hidden doesn't heal. This is the story of how one family's pain became a national movement.",
    content: `## It Started With Sam

Every movement has an origin. A moment when someone decides that staying silent is no longer an option. For Sam's OATH, that moment belongs to Frank Sheeder and his son Sam.

Sam was the kind of person who made you feel like the most important person in the room. He had a quick laugh, a big heart, and a way of seeing people — really seeing them — that left a mark on everyone who knew him. He was also someone who struggled. And in a world that treats struggle as something to hide, that struggle happened mostly in the shadows.

That's what families do. They protect. They present the best version. They love so hard that sometimes the love looks like silence — because talking about it means admitting that something is wrong, and admitting that something is wrong feels like failing.

Frank knows this. He lived it. And then he decided to live differently.

## The Cost of Keeping Quiet

Before Sam's OATH became a movement, before the website and the music and the map full of pins from families across the country, there was just a father sitting with a question that wouldn't let him go:

What if we had talked about this sooner?

Not just Frank and Sam. All of us. What if families didn't feel like they had to hide their struggles with substance use? What if the neighbor, the coworker, the fellow parent at school pickup — what if they were all having the same private battle, and the only reason nobody knew was because everybody was pretending?

The answer, Frank realized, was that millions of families were drowning in isolation that didn't have to exist. The silence wasn't protecting anyone. It was suffocating everyone.

What's hidden doesn't heal. It was true in Frank's family. It's true in yours. And it's true in every community that treats substance use as a shameful secret rather than a shared human challenge.

## Choosing Openness

The decision to go public with your family's story is not a small one. There's a moment of sheer vulnerability — the exposure, the way the world might respond.

Frank made that choice anyway. Not because it was easy, but because he understood something important: if one family's honesty could give another family permission to speak, then the discomfort was worth it.

And that's exactly what happened. When Frank started talking — really talking, without the careful edits and comfortable euphemisms — other families responded. Not with judgment, but with relief. "Me too" became the most common message he received. "We're going through this and we didn't know who to tell."

Those two words — "me too" — are the foundation of Sam's OATH.

## Building the OATH

The OATH framework didn't come from a marketing meeting. It came from the lived experience of a family that had been through the fire and found the things that actually helped.

**Openness** — because silence was suffocating them, and speaking up was the first thing that brought air back into the room.

**Authenticity** — because performing "fine" when you're falling apart is exhausting, and because other people can only meet you where you actually are, not where you pretend to be.

**Togetherness** — because going through it alone was the hardest part, and finding others who understood was the turning point.

**Healing** — because it's possible. Not easy, not linear, not a return to "before." But possible. And that possibility deserves to be named.

Taking the OATH isn't about raising your hand in a room. It's about making a commitment — to yourself and to the people around you — that you're done letting stigma dictate your story.

## A Map of Honesty

One of the most powerful elements of Sam's OATH is the map. When someone takes the OATH on samsoath.org, a pin appears on the map of the United States. Each pin represents a person who said: I'm done hiding. I'm choosing openness.

Watch the map fill up and something happens to you. The isolation lifts. You realize you're not the only family in your town, your state, your country that's dealing with this. The map doesn't show names or details. It just shows presence. And presence — the simple act of being seen — is sometimes all it takes to turn the corner from despair to hope.

## It's Not About One Family Anymore

Frank would be the first to tell you that Sam's OATH isn't about him or his family. Sam is the origin story. The OATH is the movement. And the movement belongs to everyone who takes it.

It belongs to the mother in Phoenix who took the OATH because her family is navigating substance use. To the teenager in Ohio who took it because his best friend is struggling. To the HR director in Chicago who brought the OATH to her company. To the person in recovery in Maine who took it because they want others to know that healing is real.

Sam's OATH is a growing community of people who believe that talking openly about substance use and mental health isn't just brave — it's necessary. People who believe that families shouldn't have to navigate this alone. People who believe that the shame has gone on long enough.

## Where It Goes From Here

Movements aren't built by one person. They're built by thousands of people making the same choice, independently, because they've seen enough and felt enough and are ready for something different.

Sam's OATH is still early. There's more to build, more families to reach, more communities to engage. But the foundation is solid because it's built on something that can't be manufactured: a father's love, a family's courage, and a truth that resonates in every home where someone is struggling in silence.

What's hidden doesn't heal. But when you speak, when you connect, when you take the OATH — healing becomes possible. For you, for your family, and for every family that comes after.

---

**This movement exists because of families like yours.** Whether you're supporting a loved one, walking your own recovery path, or simply believe that silence has gone on long enough — you belong here. [Take Sam's OATH](https://samsoath.org/take-the-oath) and add your voice to the growing chorus of families choosing honesty over hiding.`
  },
]

// ── Insert Posts ───────────────────────────────────────────────────────────────

async function seed() {
  console.log('Seeding 10 blog post drafts into blog_posts table...\n')

  const rows = posts.map((post) => ({
    title: post.title,
    slug: slugify(post.title),
    content: post.content,
    excerpt: post.excerpt,
    tags: post.tags,
    status: 'draft',
    author_name: 'Frank Sheeder',
  }))

  const { data, error } = await supabase
    .from('blog_posts')
    .insert(rows)
    .select('id, title, slug, status')

  if (error) {
    console.error('Insert failed:', error)
    process.exit(1)
  }

  console.log(`Successfully inserted ${data.length} blog post drafts:\n`)
  data.forEach((post, i) => {
    console.log(`  ${i + 1}. [${post.status}] ${post.title}`)
    console.log(`     slug: ${post.slug}`)
    console.log(`     id:   ${post.id}\n`)
  })

  console.log('All posts inserted as drafts. Frank can review & publish via the admin dashboard.')
}

seed()
