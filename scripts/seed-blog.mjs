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
  // ── Post 1: MISSION STATEMENT ──────────────────────────────────────────────
  {
    title: "Our Mission: What's Hidden Doesn't Heal",
    tags: ['mission', 'movement', 'substance use', 'mental health'],
    excerpt: "Sam's OATH exists to end the stigma around substance use and mental health. Here's what we believe, what we're building, and why it matters.",
    content: `## Why This Movement Exists

**Sam's OATH is a national movement to end the stigma around substance use and mental health. We believe that what's hidden doesn't heal — and that when people choose Openness, Authenticity, Togetherness, and Healing, everything changes.**

That's our mission. Not a program. Not a clinic. A movement — built by everyday people who are tired of the silence.

## The Problem We're Solving

Right now, across America:

- Nearly 21 million people have a substance use disorder. Only 10% receive treatment.
- One in five adults lives with a mental health condition. Nearly 60% received no treatment in the past year.
- The number one reason people don't seek help for either issue is the same: **stigma.**

Stigma is the fear of being judged. It's the reason families whisper about depression and hide substance use. It's the reason people suffer alone in rooms full of people who would help — if they only knew.

Stigma thrives in silence. And silence is what we're here to break.

## What the OATH Means

When you take Sam's OATH, you're making four commitments:

**Openness** — to stop hiding what your family is going through. Not recklessly, but honestly. To tell one person. To answer "how are you?" truthfully. To let someone in.

**Authenticity** — to use language that reflects reality, not performance. To stop pretending everything is fine when it isn't. To show up as who you actually are.

**Togetherness** — to refuse to go through this alone. To find your people — whether that's a support group, a community, or a single friend who gets it. To check on the people around you.

**Healing** — to believe that things can get better. Not perfect. Not "back to normal." But genuinely, meaningfully better. And to do the work that makes that possible.

These aren't slogans. They're daily practices. And they work — not because they're clever, but because they're honest.

## Who This Is For

Sam's OATH is for anyone touched by substance use or mental health challenges:

- **Families** navigating a loved one's struggle — or their own
- **People in recovery** who want to help others feel less alone
- **Friends and colleagues** who want to show up but don't know how
- **Communities** ready to replace judgment with support
- **Anyone** who believes that talking about hard things is better than hiding them

You don't need to have a diagnosis. You don't need a story to share. You just need to believe that what's hidden doesn't heal — and be willing to act on that belief.

## What We're Building

Every person who takes the OATH appears as a pin on our national map. Each pin is anonymous — no names, no details. Just a signal: *I'm here. I chose openness.*

Watch the map fill up and something shifts. The isolation loses its grip. You realize that the family two streets over, the coworker in the next cubicle, the parent at school pickup — they're carrying the same weight. And they're done hiding, too.

We're also building resources for families, creating music that gives voice to what people feel but can't say, and writing content that helps people talk about substance use and mental health without shame.

## Why "Sam's" OATH?

The OATH is named for Sam Sheeder, whose life and struggle inspired this movement. But Sam's OATH isn't about one person or one family. Sam is the origin. The OATH is the movement. And the movement belongs to everyone who takes it.

Think of it like Susan G. Komen — named for one person, built by millions.

## Join Us

Taking the OATH takes 60 seconds. It costs nothing. And it means everything — because every person who stands up makes it easier for the next one to stop hiding.

**What's hidden doesn't heal. But what's spoken, shared, and brought into the light — that's where healing begins.**

---

[Take Sam's OATH](https://samsoath.org/take-the-oath) and join a growing movement of people who believe that substance use and mental health deserve honesty, not silence.`
  },

  // ── Post 2: OATH DEEP DIVE ─────────────────────────────────────────────────
  {
    title: "The OATH: Four Practices That Change How Families Heal",
    tags: ['OATH', 'openness', 'authenticity', 'togetherness', 'healing'],
    excerpt: "O-A-T-H isn't just an acronym. It's a framework for living honestly with substance use and mental health challenges. Here's how each practice works — and why they matter together.",
    content: `## A Different Kind of Framework

Most approaches to substance use and mental health focus on the person who's struggling. Sam's OATH focuses on **everyone around them, too** — because when one person is affected, the whole family is affected. And when the whole family heals, recovery has a foundation.

O-A-T-H. Four letters. Four practices. Not a checklist — a way of being.

## O — Openness: The Practice of Letting People In

Openness is the hardest one for most families. We've been trained to keep mental health and substance use challenges private. "Don't air dirty laundry." "Keep it in the family." "Nobody needs to know."

But here's what happens when nobody knows: nobody helps. The person struggling feels like they're a burden. The family members feel like they're failing. And everyone performs "fine" while falling apart inside.

Openness doesn't mean posting everything on social media or telling strangers at a dinner party. It means:

- Telling **one trusted person** what you're going through
- Letting your kids know that it's okay to talk about hard things
- Answering "How are you?" with something other than "fine"
- Calling a helpline, joining a support group, or reaching out to a counselor

Every act of openness — no matter how small — breaks the cycle of silence. And once one person speaks up, others follow.

## A — Authenticity: The Practice of Dropping the Performance

Our culture rewards people who look like they have it together. Perfect families on social media. Polished holiday cards. The carefully curated story of a life without problems.

Authenticity says: enough.

When we perform wellness while struggling, we teach everyone around us that struggling is unacceptable. Kids learn to hide their anxiety. Partners learn to mask their depression. Families learn that the appearance of health matters more than actual health.

Authenticity in practice means:

- Using honest language — "substance use disorder" instead of whispered euphemisms, "I'm dealing with depression" instead of "I'm just tired"
- Admitting when you don't have the answers
- Showing your kids that adults struggle too — and that struggling doesn't make you weak
- Being real with yourself about what's happening in your family

Authenticity isn't weakness. It's the most radical form of strength most families will ever practice.

## T — Togetherness: The Practice of Refusing to Be Alone

Stigma isolates. That's its primary function. It makes families believe they're the only ones dealing with this, that their situation is uniquely shameful, that nobody else would understand.

That belief is a lie — and Togetherness is the antidote.

When you connect with even one other family who gets it, something shifts. The shame releases. The strategies multiply. The loneliness lifts. You realize that millions of families are carrying the same weight — they're just not talking about it.

Togetherness means:

- Finding a support community — Al-Anon, NAMI, online groups, or even one friend who understands
- Checking in on the people around you who might be silently struggling
- Showing up for someone else, even when your own situation is hard
- Building a family culture where everyone's feelings are valid and everyone's voice matters

Recovery from substance use and mental health challenges is not a solo journey. It never was.

## H — Healing: The Practice of Moving Forward

Healing is the word that scares people most, because they think it means "getting back to how things were." It doesn't. Healing means building something new — something honest.

Healing looks like:

- The first family dinner where someone says "this has been really hard" and nobody changes the subject
- The moment you realize you can hold both grief and joy at the same time
- Forgiving yourself for what you didn't know
- Creating new traditions that reflect who your family actually is — not who you used to pretend to be

Healing is not linear. There are setbacks. There are hard weeks after good months. But the direction matters more than the speed. And families who practice openness, authenticity, and togetherness find that healing follows — not as a destination, but as a rhythm.

## Why All Four Together

You could practice any one of these on its own. But they're designed to work together:

- **Openness** without Authenticity is oversharing without truth.
- **Authenticity** without Togetherness is honesty in isolation.
- **Togetherness** without Healing is community without direction.
- **Healing** without Openness is trying to recover what you won't name.

Together, they create a framework that meets families where they actually are — not where they should be, but where they are right now. And from there, everything can change.

---

**The OATH is free. It takes 60 seconds. And it connects you to a growing movement of people who believe that substance use and mental health deserve honesty, not hiding.** [Take Sam's OATH.](https://samsoath.org/take-the-oath)`
  },

  // ── Post 3: BREAKING SILENCE ───────────────────────────────────────────────
  {
    title: "Breaking the Silence: Why We Need to Talk About Substance Use and Mental Health",
    tags: ['stigma', 'silence', 'mental health', 'substance use', 'families'],
    excerpt: "Silence around substance use and mental health doesn't protect anyone — it isolates everyone. Here's why breaking it is the most important thing families can do.",
    content: `## Two Epidemics, One Silence

America has two overlapping health crises: substance use and mental health. Together, they affect more than 70 million people. But the most dangerous part isn't the conditions themselves — it's the silence that surrounds them.

We talk about cancer openly. We run marathons for heart disease. We put ribbons on our cars for causes we believe in. But when someone in the family is dealing with depression, anxiety, substance use, bipolar disorder, or PTSD, the conversation drops to a whisper — if it happens at all.

Why? Because we've been taught that these struggles are shameful. That they're personal failings, not health conditions. That talking about them will make things worse.

The opposite is true. What's hidden doesn't heal. And the silence is making everything worse.

## What Silence Actually Does

When families stay silent about mental health and substance use:

**The person struggling believes they're alone.** They internalize the message that their condition is too terrible to name. They stop reaching out. They stop believing they deserve help.

**Other family members suffer invisibly.** Siblings, children, and partners carry the weight of the family secret. They learn to perform normalcy while anxiety, grief, and confusion go unaddressed.

**The community can't help.** Neighbors, teachers, coaches, colleagues — many would offer support if they knew. But silence keeps the struggle invisible, and invisible problems can't receive visible help.

**Stigma reproduces itself.** Every family that stays quiet confirms the cultural belief that these issues are shameful. The next family stays quiet too. And the next. And the cycle continues.

## Mental Health and Substance Use: The Same Stigma

Here's something important: the stigma around mental health and substance use comes from the same place. Both are treated as character flaws rather than health conditions. Both trigger judgment instead of compassion. Both make people hide.

A parent who's afraid to tell anyone their child has a substance use disorder is carrying the same shame as a parent who's afraid to tell anyone their child has been hospitalized for depression. A teenager who hides their anxiety is living in the same silence as a teenager who hides their substance use.

That's why Sam's OATH addresses both together. You can't break one silence without breaking the other. They're the same silence.

## What Breaking the Silence Looks Like

Breaking the silence doesn't mean broadcasting your family's story to the world. It means choosing honesty in small, deliberate ways:

- **Telling one trusted person** what your family is going through — a friend, a counselor, a support group
- **Using accurate language** instead of euphemisms: "She has a substance use disorder," not "she's going through a rough patch." "He's dealing with depression," not "he's just in a mood."
- **Talking to your kids** about mental health and substance use in age-appropriate ways, before they encounter these issues on their own
- **Answering honestly** when someone asks how you're doing — at least sometimes, with someone you trust
- **Refusing to edit** your family's story to make others comfortable

Each small moment of honesty creates space for the next one. And each time someone says "me too," the stigma gets a little weaker.

## The Ripple Effect

When one family breaks the silence, it gives permission to the next family. And the next. That's how movements grow — not through organizations or programs, but through ordinary people making the choice to be honest.

That's what Sam's OATH is. A growing community of people who have decided that silence has done enough damage. Who believe that families dealing with substance use and mental health challenges deserve support, not shame. Who are willing to go first — so others don't have to go alone.

## Your Silence Isn't Protecting Anyone

This is the hardest truth: the silence you're keeping to protect your family is hurting your family. It's keeping your loved one from getting help. It's keeping you from getting support. And it's teaching everyone around you that these struggles should stay hidden.

What's hidden doesn't heal. But what's spoken — what's named, shared, and brought into the open — that's where healing starts. For your family and for every family that follows.

---

**Ready to break the silence?** [Take Sam's OATH](https://samsoath.org/take-the-oath) — a 60-second commitment to Openness, Authenticity, Togetherness, and Healing.`
  },

  // ── Post 4: MENTAL HEALTH FOCUS ────────────────────────────────────────────
  {
    title: "Mental Health Is Not a Weakness: Why We Need to Say It Out Loud",
    tags: ['mental health', 'stigma', 'anxiety', 'depression', 'families'],
    excerpt: "Depression, anxiety, PTSD, bipolar disorder — these are health conditions, not character flaws. Here's why normalizing the mental health conversation is central to everything we do.",
    content: `## The Conversation We're Still Not Having

We've made progress on mental health awareness. Celebrities talk about therapy. Companies offer wellness days. The language has softened — a little.

But in most families, the real conversation still isn't happening.

A parent notices their teenager withdrawing, sleeping too much, losing interest in everything — and chalks it up to "just a phase." A spouse recognizes the signs of depression in their partner but doesn't want to "make it a thing." A college student feels crushing anxiety every day but doesn't tell anyone because they don't want to seem "dramatic."

Mental health conditions affect one in five American adults. Among teenagers, rates of anxiety and depression have risen sharply over the past decade. These aren't rare events. They're common human experiences. And yet, in most homes, they're still treated as things to manage privately — or not talk about at all.

## Why We Stay Quiet

**"It's not that serious."** We minimize mental health because we've been taught to. Broken bones get X-rays. Depression gets "Have you tried going for a walk?" We treat physical health as medical and mental health as optional.

**"People will think less of us."** Stigma around mental health is real. Parents worry about their child being labeled. Adults worry about career consequences. Families worry about being seen as "dysfunctional."

**"We should be able to handle this."** There's a deep cultural belief that mental health challenges are a matter of willpower. That strong people don't get depressed. That anxiety is just worrying too much. That needing help means you've failed.

Every one of these beliefs is wrong. And every one of them keeps people from getting the support they need.

## Mental Health Is Health

Depression is not sadness you can shake off. It's a condition that alters brain chemistry, disrupts sleep, destroys motivation, and can be life-threatening. Anxiety is not worrying. It's a nervous system in overdrive that makes daily tasks feel like emergencies. PTSD is not dwelling on the past. It's the brain's inability to process trauma. Bipolar disorder is not moodiness. It's a condition that requires medical management.

These are health conditions. They have biological, genetic, and environmental causes. They respond to treatment. And the people who have them deserve the same dignity, support, and openness that we give to any other health challenge.

When Sam's OATH talks about breaking the silence, mental health is at the center of that mission — not as an afterthought, but as a core focus. Because the same stigma that keeps families from talking about substance use keeps them from talking about depression, anxiety, eating disorders, PTSD, and every other mental health condition that millions of people navigate every day.

## What Families Can Do

**Name it.** "I think I might be dealing with anxiety" is a sentence that changes everything. So is "I've noticed you seem down lately, and I want to talk about it." Naming what's happening is the first step toward addressing it.

**Normalize it.** Talk about mental health the way you talk about physical health — casually, openly, without drama. "I'm seeing a therapist" should carry the same weight as "I'm seeing a dentist." When kids hear their parents talk about mental health openly, they learn it's safe to do the same.

**Seek help without apology.** Therapy, medication, support groups, crisis lines — these are tools, not admissions of failure. SAMHSA's helpline (1-800-662-4357) covers both substance use and mental health. The 988 Suicide & Crisis Lifeline is available 24/7.

**Check on each other.** Not with a casual "how are you?" that expects "fine" as the answer. With a real check-in: "How are you actually doing? I have time to listen."

**Model vulnerability.** When adults are honest about their own struggles — "I've been feeling really anxious lately" or "I went through a period of depression" — it gives everyone around them permission to be honest, too.

## The Connection to Substance Use

Mental health and substance use are deeply intertwined. Many people begin using substances to cope with untreated anxiety, depression, or trauma. And substance use often worsens existing mental health conditions, creating a cycle that's nearly impossible to break alone.

That's why Sam's OATH addresses both together. You can't meaningfully talk about one without the other. And the stigma that silences one conversation silences both.

## A World Where It's Okay to Not Be Okay

Imagine a world where "I'm struggling" is met with "How can I help?" instead of awkward silence. Where families talk about therapy the way they talk about soccer practice. Where a teenager can say "I think I need to see someone" and the response is "I'm proud of you for saying that."

That world doesn't require a policy change or a new program. It requires millions of individual decisions to be honest. To stop performing wellness. To choose openness over pretending.

That's what the OATH is about.

---

**Mental health is not a weakness. It's a reality. And talking about it openly is one of the bravest things any family can do.** [Take Sam's OATH](https://samsoath.org/take-the-oath) and help build a world where no one suffers in silence.`
  },

  // ── Post 5: LANGUAGE ───────────────────────────────────────────────────────
  {
    title: "The Words We Choose: How Language Shapes Stigma",
    tags: ['language', 'stigma', 'mental health', 'substance use'],
    excerpt: "The words we use about substance use and mental health can open doors or slam them shut. A practical guide to language that reduces stigma and supports healing.",
    content: `## Words Build Worlds

Language is one of the most powerful tools we have — and one of the most overlooked. The words we use about substance use and mental health don't just describe reality. They shape it.

When we call someone "crazy," we reduce a complex human being to a stigmatized label. When we say "she's just an addict," we collapse an entire person into a diagnosis. When we whisper about someone "having issues," we signal that their struggle is shameful.

Most of us don't mean harm. We're using language we inherited — from news headlines, TV shows, casual conversation. But once you see the impact, you can't unsee it. And changing your language is one of the simplest, most powerful things you can do.

## Person-First Language: The Core Principle

The fundamental shift is this: **define people by who they are, not by their condition.**

| Instead of... | Try... |
|---|---|
| Addict, junkie, user | Person with a substance use disorder |
| Crazy, psycho, unstable | Person living with a mental health condition |
| She's bipolar | She has bipolar disorder |
| He's an alcoholic | He has an alcohol use disorder |
| Clean / dirty | In recovery / currently using |
| Committed suicide | Died by suicide |
| Drug abuse | Substance use / misuse |
| Mental breakdown | Mental health crisis |
| Habit | Substance use disorder |
| Relapse (as failure) | Recurrence of symptoms |

This isn't about being politically correct. It's about accuracy and dignity. We don't define people by their diabetes or their asthma. Substance use and mental health conditions deserve the same respect.

## Why It Matters in Families

Inside families, language hits differently. When a parent says "my son the addict" — even with love — it collapses an entire person into a single word. When a sibling overhears "she's always been the problem," that label sticks. When a child hears their parent whisper about someone's "mental issues," they learn that mental health is something to be ashamed of.

Families can practice new language together. It feels awkward at first, like any new skill. But over time, it reshapes how everyone thinks about what's happening. Language doesn't just describe your family's reality — it creates it.

## Language at Work and in Community

If you're a manager, teacher, coach, or community leader, your language sets the tone for everyone around you. When you use person-first language casually and consistently, you give others permission to do the same.

A manager who says "mental health days are real and valid" creates a different culture than one who says "tough it out." A teacher who says "some people's brains work differently" creates a different classroom than one who says "that kid has problems."

Small language shifts create big cultural changes. And those changes make it safer for people to seek help.

## Language About Suicide

This deserves its own section because the stakes are so high:

- Say "died by suicide," not "committed suicide." The word "committed" implies a crime.
- Avoid specifics about methods. Research shows that detailed reporting can increase risk.
- Focus on hope and help-seeking. Include resources like the 988 Suicide & Crisis Lifeline.
- Don't say "successful" or "failed" attempt. Say "survived a suicide attempt" or "died by suicide."

## You Don't Have to Be Perfect

You'll use the old words sometimes. Everyone does. The goal isn't perfection — it's awareness. When you catch yourself, just correct and move on. No guilt, no lecture.

The people in your life navigating substance use or mental health challenges will notice the effort. And that effort tells them something critical: **they are more than their struggle.**

---

**Authenticity — choosing honest, respectful language — is one of the four commitments of Sam's OATH.** [Take the OATH](https://samsoath.org/take-the-oath) and join a movement changing how we talk about the things that matter most.`
  },

  // ── Post 6: HOW TO SHOW UP ─────────────────────────────────────────────────
  {
    title: "How to Show Up When Someone You Love Is Struggling",
    tags: ['families', 'support', 'mental health', 'substance use', 'togetherness'],
    excerpt: "When someone you love is dealing with substance use or mental health challenges, knowing what to do can feel impossible. Here's practical guidance for showing up — for them and for yourself.",
    content: `## You Don't Need to Fix It — You Need to Be There

When someone you love is struggling with substance use, depression, anxiety, or any mental health challenge, the instinct is to fix it. To find the right program, say the right thing, make them see reason.

But here's what most people who've been through it will tell you: what helped most wasn't someone solving their problem. It was someone showing up and staying.

## Start With Yourself

This sounds counterintuitive when someone you love is in crisis. But you cannot support someone else if you're running on empty.

- **Talk to someone.** A therapist, a support group, a trusted friend. You need a space where you can be honest without performing strength.
- **Keep living.** Eat. Sleep. Move. These basics are the first to go when worry takes over. Protect them.
- **Set boundaries.** Not walls built from anger — guardrails built from wisdom. More on this below.

Taking care of yourself isn't selfish. It's the foundation everything else rests on.

## What Helps

**Listen more than you talk.** When someone opens up — about their depression, their substance use, their fear — resist the urge to immediately problem-solve. Sometimes the most powerful response is: "Thank you for telling me. I'm here."

**Use "I" statements.** "I'm worried about you. I've noticed some changes. I love you and I want to understand." This opens dialogue. "You always" and "you never" close it.

**Educate yourself.** Learn about what your loved one is experiencing — whether it's a substance use disorder, clinical depression, an anxiety disorder, or something else. Understanding it as a health condition (not a choice) changes how you respond.

**Offer support without conditions.** "I'm here for you, and I'll help you find support when you're ready" is different from "I'll only care about you if you change."

**Celebrate small steps.** Recovery — from anything — doesn't start with a dramatic turning point. It starts with small choices: an honest conversation, a first appointment, one good day. Notice these moments.

## Boundaries Are Part of Love

Boundaries get a bad reputation. They sound cold. Punitive. Like you're withdrawing love.

They're the opposite. Boundaries are how you love someone without losing yourself. They protect the relationship from resentment.

A boundary sounds like:
- "I love you, and I can't have this conversation when you're not sober."
- "I need honesty. That's not negotiable."
- "I will always help you get to treatment. I won't cover for you at work."

Boundaries aren't about controlling someone else's behavior. They're about defining what you can and cannot live with.

## For the Siblings, Partners, and Kids

Mental health and substance use challenges don't just affect the person experiencing them. They reshape the entire family. Children become hypervigilant. Siblings feel invisible. Partners carry impossible weight.

If you're one of these people: your pain is valid. Your needs matter. You are not being selfish for wanting support. Organizations like NAMI (National Alliance on Mental Illness), Al-Anon, and Families Anonymous exist specifically for family members. Use them.

## What Not to Do

- **Don't shame.** "Look what you're doing to this family" drives people deeper into isolation.
- **Don't minimize.** "Everyone gets stressed" dismisses someone's real experience. Depression is not stress. A substance use disorder is not a bad habit.
- **Don't go it alone.** You are not equipped to be someone's therapist, and you shouldn't have to be. Get support.

## There Is a Path Forward

Families do get through this. Not perfectly, not quickly, but genuinely. The ones who make it are the ones who get honest, get support, and refuse to let stigma keep them isolated.

Togetherness — one of the four commitments of Sam's OATH — is the practice of refusing to face these challenges alone. And it's available to you right now.

---

**Sam's OATH is built for families navigating substance use and mental health challenges.** You don't need to have it figured out. You just need to show up. [Take Sam's OATH](https://samsoath.org/take-the-oath) and connect with a community that understands.`
  },

  // ── Post 7: PARENT GUILT ───────────────────────────────────────────────────
  {
    title: "You're Not a Bad Parent: Letting Go of Blame",
    tags: ['parents', 'guilt', 'families', 'mental health', 'substance use'],
    excerpt: "If your child is dealing with substance use or mental health challenges, the guilt can be crushing. But these conditions aren't a report card on your parenting.",
    content: `## The Voice That Won't Quit

If your child is struggling — with substance use, depression, anxiety, an eating disorder, or anything else — you know the voice. It shows up at 3 a.m. and during quiet moments in the car.

"Where did I go wrong?"
"If I'd noticed sooner..."
"Other parents don't have this problem."
"I should have been enough."

That voice is guilt. And for parents of kids navigating mental health or substance use challenges, it's relentless.

Here's the truth, even if it's hard to absorb right now: **You are not a bad parent.** Your child's condition is not a report card on your love.

## Why Parents Carry This

Our culture has a deeply held belief that parents determine their children's outcomes. Good kids come from good parents. Struggling kids come from... the unspoken conclusion is obvious.

This belief is everywhere — and it's wrong.

Mental health conditions and substance use disorders are influenced by genetics, brain chemistry, trauma, environment, peer relationships, and factors no parent can fully control. The National Institute on Drug Abuse reports that genetics account for 40-60% of vulnerability to substance use disorders. Depression and anxiety run in families biologically, not just behaviorally.

Did your choices matter? Of course. But no parent — no matter how loving, attentive, or present — can guarantee their child will never struggle. The idea that you could have prevented this by being better isn't just wrong. It's harmful. Because guilt doesn't just feel terrible — it actively interferes with what your family needs.

## What Guilt Does

**It paralyzes.** You second-guess every decision. Call a therapist or give it time? Set a boundary or show more grace? Guilt makes every choice feel equally wrong.

**It isolates.** Guilty parents don't ask for help because they feel they don't deserve it. They carry everything alone — the exact opposite of what works.

**It damages relationships.** Some parents overcompensate by removing all consequences. Others become rigid and controlling. Neither helps.

**It blocks your own healing.** Your child is struggling, and you're in pain too. But guilt says you don't have the right to grieve. So your feelings go underground — and buried feelings always find destructive outlets.

## Letting Go (A Practice, Not a Decision)

Releasing guilt doesn't happen in one moment. It's something you practice:

**Separate yourself from the condition.** Your child has a health condition. You didn't cause it any more than you'd cause their asthma or their diabetes.

**Challenge the myth.** Mental health and substance use challenges touch every kind of family — loving families, strict families, permissive families, wealthy families, struggling families. If parenting were the determining factor, this wouldn't be so widespread.

**Talk to other parents who get it.** Nothing dissolves guilt faster than hearing another parent say "me too." Groups like NAMI Family Support, CRAFT, and Families Anonymous exist for exactly this.

**Get your own support.** A therapist who understands family dynamics around mental health and substance use can help you unpack the guilt and develop strategies that work.

**Forgive yourself for not knowing what you didn't know.** You made the best choices you could with the information you had. That's all any parent can do.

## What Your Child Actually Needs

Here's the remarkable thing about releasing guilt: it makes you more effective. When you stop spending energy on blame, you can direct it where it matters.

Your child doesn't need a perfect parent. They need a present one. Someone who educates themselves, sets healthy boundaries, offers unwavering love, and takes care of their own wellbeing.

They need you to stop blaming yourself and start showing up — imperfectly, honestly, with everything you've got.

---

**If you're a parent carrying this weight, you belong in this movement.** Sam's OATH is for families who are tired of silence and shame. [Take the OATH](https://samsoath.org/take-the-oath) and join a community choosing healing over guilt.`
  },

  // ── Post 8: WORKPLACE ──────────────────────────────────────────────────────
  {
    title: "The Workplace Conversation We're Not Having",
    tags: ['workplace', 'mental health', 'substance use', 'employers', 'stigma'],
    excerpt: "Mental health and substance use don't clock out at five. Here's why workplaces need to be part of the conversation — and practical steps for employers and employees.",
    content: `## The Elephant in Every Office

One in five American adults lives with a mental health condition. One in twelve has a substance use disorder. The majority of all of them are employed.

Do the math for your workplace. In a company of 100 people, roughly 20 are managing a mental health condition and 8 are personally navigating substance use. Many more are affected as caregivers, partners, or family members.

These are your best employees, your managers, your teammates. And most of them are invisible — not because they're hiding in some dramatic way, but because the culture of work tells them to. Be professional. Leave personal problems at the door.

So they do. And the silence makes everything worse.

## Why Workplaces Stay Silent

**"It's not our problem."** What happens outside work is their business. Except it's not — when someone is struggling, it shows up in performance, relationships, engagement, and safety. Pretending otherwise doesn't make it go away.

**Fear of liability.** Employers worry that acknowledging these issues opens them to legal risk. In reality, supportive environments reduce liability by encouraging early help-seeking.

**Discomfort.** Most managers have zero training in how to talk about mental health or substance use. So they don't. And the silence reinforces itself.

**Stigma.** The same stigma that keeps families quiet operates at work. Leaders worry that talking about it will seem like they're condoning it or inviting excuses. The opposite is true.

## What a Supportive Workplace Looks Like

### Normalize the conversation

This starts at the top. When leadership acknowledges that mental health and substance use are common human experiences — not employee defects — the entire culture shifts.

One statement from a CEO — "These challenges have touched my family, and I know they've touched many of yours. We want this to be a place where you can get support without fear" — changes everything.

### Make your EAP actually useful

Most companies have Employee Assistance Programs. Most employees don't use them — because they don't know about them, don't trust them, or find them inadequate.

Talk about your EAP regularly. Reassure people it's confidential. And make sure it actually covers quality mental health and substance use support.

### Train your managers

Managers are the front line. They notice when someone's performance changes, when someone's withdrawn, when something's off. But most have no idea what to say.

Train them to approach concerns with curiosity: "I've noticed some changes and I want to check in. Is there anything I can support you with?" Give them clear referral pathways. Teach them the difference between performance management and human support.

### Build flexibility into your policies

People in recovery need appointments, meetings, and sometimes time off for treatment. People managing mental health conditions need similar flexibility. Rigid attendance policies force people to choose between their job and their health.

Flexible scheduling, leave that accommodates treatment, and graduated return-to-work plans cost far less than losing trained employees.

## For Employees

If you're dealing with mental health or substance use challenges — your own or a loved one's:

**Know your rights.** The ADA and FMLA may protect you. Mental health conditions and substance use disorders are recognized as disabilities under federal law.

**Use your EAP.** It's confidential. It's a starting point.

**Choose your level of openness.** You don't have to tell everyone. Maybe it's your manager, your HR rep, or one trusted colleague.

**Find allies.** Employee resource groups for mental health are increasingly common. You may not be as alone as you think.

## The Business Case Is Real — But the Human Case Is What Matters

Supporting employees through mental health and substance use challenges reduces turnover, improves safety, and saves money. But that's not why you should do it.

You should do it because the people who work for you are people. They have families, struggles, and lives that don't stop at the door. When they know they're seen as whole humans, they bring their best selves to work.

---

**Sam's OATH believes the conversation about mental health and substance use belongs everywhere — including work.** [Take the OATH](https://samsoath.org/take-the-oath) and bring Openness, Authenticity, Togetherness, and Healing to every part of your life.`
  },

  // ── Post 9: MUSIC AND HEALING ──────────────────────────────────────────────
  {
    title: "Music as Medicine: When Words Aren't Enough",
    tags: ['music', 'healing', 'mental health', 'families', 'hope'],
    excerpt: "When talking about mental health and substance use feels impossible, music creates a space for the emotions families carry. Here's why it's central to the OATH movement.",
    content: `## Below Language

There's a moment in the middle of everything — the worry, the grief, the weight of loving someone who's struggling — when words simply can't carry what you're feeling. You've had the conversations. You've done the research. Maybe you've sat in a therapist's office and talked until you were empty.

And still, something remains. Something that lives below language.

That's where music meets you.

## Why Music Reaches What Talking Can't

Music engages the brain differently than speech. When you hear a song that resonates, it activates areas associated with emotion, memory, and reward simultaneously. It changes your neural chemistry — releasing dopamine, reducing cortisol, creating connection that transcends the rational mind.

This isn't metaphor. It's neuroscience. And families navigating mental health and substance use challenges have always known it instinctively.

The song that made you cry in the car wasn't solving anything. But it made you feel less alone. Someone else had put into melody what you couldn't put into words. And for three minutes, the isolation lifted.

## Permission to Feel

Stigma doesn't just silence conversation. It polices emotion. Families dealing with mental health challenges and substance use often feel like they're not allowed to be angry, scared, exhausted, or heartbroken. The world expects composure.

Music gives you permission to feel everything. A song doesn't judge you for crying at a red light. A melody doesn't tell you to be strong or stay positive. It says: *I know. I've been there too.*

For many families, music becomes the safest space they have — the one place where emotions don't need to be edited, explained, or justified.

## Music in the OATH Movement

At Sam's OATH, music isn't an afterthought. It's woven into the movement because we believe healing happens through every channel — conversation, community, and art.

The original songs created for Sam's OATH — available on Apple Music — were written to give voice to what families carry but rarely speak about. "What's Hidden Doesn't Heal" takes the movement's core truth and turns it into something you can carry in your pocket. "Joy Anyway" is about finding light in darkness — not by pretending the darkness isn't there, but by refusing to let it win.

These songs were written for the parent driving home from a hard conversation. For the person managing anxiety who needs to hear they're not alone. For the family in recovery discovering that hope is real.

## How to Use Music for Healing

**Create a playlist for hard days.** Not just upbeat songs — songs that match where you actually are. Sometimes the most healing music is the one that says "this is hard" right alongside you.

**Listen together.** Play a song for your family and talk about what it stirs. "This lyric made me think of..." is often easier than "we need to talk about..."

**Sing.** In the car, in the shower, wherever. Singing engages your body and breath in ways passive listening doesn't. It's one of the oldest forms of healing, available to everyone.

**Share what resonates.** Sending someone a song with "I heard this and thought of you" is a small act that says everything.

## The Research

Music therapy is an established field with decades of evidence supporting its effectiveness for anxiety, depression, trauma, grief, and recovery. Group music-making reduces isolation and increases belonging — exactly what families navigating mental health and substance use challenges need most.

But you don't need a clinical setting. You just need a song and a willingness to let it in.

---

**Listen to Sam's OATH music on Apple Music** and let the songs be part of your family's healing. [Take Sam's OATH](https://samsoath.org/take-the-oath) — because healing happens through every channel, including this one.`
  },

  // ── Post 10: PREVENTION / WHAT WORKS ───────────────────────────────────────
  {
    title: "Beyond Slogans: What Actually Helps Families",
    tags: ['prevention', 'families', 'mental health', 'substance use', 'connection'],
    excerpt: "We spent decades telling kids to 'just say no.' Here's what actually works — for substance use and mental health — and why connection is the most powerful prevention there is.",
    content: `## Why Slogans Failed

"Just Say No." Three words, a national campaign, and a generation of kids who learned that prevention was about willpower.

It didn't work. And neither did the scare tactics, the frying-pan commercials, or the D.A.R.E. programs that multiple studies later showed had no significant long-term impact.

Why? Because they oversimplified. They treated substance use as a choice made in a vacuum. And they completely ignored mental health — which is often the soil in which substance use grows.

If we're serious about helping families, we need to move beyond slogans and start looking at what the evidence actually says.

## What Research Shows

### 1. Connection is the most powerful protective factor

The single strongest predictor of whether a young person will develop substance use or mental health problems isn't neighborhood, income, or parenting style. It's **connection** — a warm, communicative relationship with at least one caring adult.

Kids who feel they can talk to a parent, teacher, or mentor about hard things — without being judged — are significantly less resilient to both substance use and mental health challenges.

This isn't about being permissive. It's about being present, curious, and honest.

### 2. Mental health and substance use are deeply linked

Many people begin using substances to cope with untreated anxiety, depression, or trauma. And substance use often worsens existing mental health conditions, creating a cycle that's nearly impossible to break alone.

Prevention that ignores mental health is incomplete. Teaching emotional regulation, normalizing therapy, and providing early access to counseling aren't just "nice to have." They're essential.

### 3. Honest conversations beat scare tactics

Instead of one big scary talk, effective prevention looks like an ongoing dialogue:

"Some people use substances to cope with hard feelings. It can seem to help at first, but it changes the brain over time. If you're ever curious, pressured, or struggling — with anything — I want to be the person you come to."

"Lots of people deal with anxiety or depression. It doesn't mean something is wrong with you. It means you're human. And there's help."

These conversations — repeated and adapted over years — are worth more than any program.

### 4. Community and belonging matter enormously

People who feel connected to their communities — through sports, arts, faith, service, or simply having a place where they belong — are more resilient to both substance use and mental health challenges.

Isolation is a risk factor. Connection is a protective one. This is true for teenagers, adults, and families.

### 5. Life skills outperform substance-specific programs

Programs that teach critical thinking, stress management, decision-making, and social-emotional skills have been shown to reduce both substance use and mental health problems. They work because they give people tools to navigate difficulty, rather than a list of things to avoid.

## What This Means for Families

You don't need a curriculum. You need:

- **Honest conversations** about mental health and substance use — ongoing, not one-time
- **Real connection** — time together where devices are down and defenses are down
- **Early mental health support** — if your child is struggling with anxiety, depression, or emotional regulation, get them help now
- **A family culture of openness** — where hard things are talked about, not hidden

If your family has a history of substance use or mental health challenges, talk about it. Not with fear, but with honesty: "This is something our family has navigated. It doesn't define us, but it means we look out for each other."

## Prevention Is Not a Program — It's a Relationship

The most effective prevention strategy isn't a slogan, a drug test, or a scared-straight presentation. It's a relationship — one built on trust, honesty, and the willingness to talk about hard things.

That's exactly what Sam's OATH is about. Openness. Authenticity. Togetherness. Healing. Four practices that don't just help families cope — they help families prevent.

---

**Sam's OATH believes that connection is the antidote to both substance use and mental health stigma.** [Take the OATH](https://samsoath.org/take-the-oath) and commit to a different approach — for your family and for every family that follows.`
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
