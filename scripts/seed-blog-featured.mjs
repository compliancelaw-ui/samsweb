/**
 * Seed script: Insert 3 featured blog posts into Supabase.
 *
 * Usage:
 *   node scripts/seed-blog-featured.mjs
 *
 * Posts are inserted as status 'published' with today's date.
 * If a slug already exists, that post is skipped.
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.')
  console.error('Run with: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-blog-featured.mjs')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

const posts = [
  // ── Post 1: WHY WE CREATED SAM'S OATH ──────────────────────────────────────
  {
    title: "Why We Created Sam's OATH",
    slug: "why-we-created-sams-oath",
    tags: ['our story', 'fentanyl', 'stigma', 'mission', 'OATH'],
    excerpt: "Frank Sheeder lost his son Sam to fentanyl. Instead of retreating into silence, he built a movement. This is the story of why Sam's OATH exists, and what the four commitments mean for every family touched by substance use.",
    author: "Frank Sheeder",
    content: `On a Tuesday morning in 2022, I became one of the 100,000 families who lose someone to overdose every year in America. My son Sam died from fentanyl poisoning. He was young, bright, loved, and struggling with something he felt he had to hide.

That hiding is what this movement is about.

I want to be clear about something from the start: Sam was not a statistic. He was a person with a quick laugh, a sharp mind, and a heart that wanted to do right. He also had a substance use disorder that he carried mostly in silence, because the world told him - in a thousand small ways - that needing help meant being broken.

The world was wrong.


The Silence That Surrounds Us

After Sam died, the silence was the loudest thing in the room. Friends didn't know what to say. Some disappeared entirely. Others whispered about it the way people whisper about things they're afraid of catching.

I understood it. I had been part of that same silence for years. When Sam was struggling, I didn't post about it on social media. I didn't bring it up at dinner parties. I talked about his accomplishments, not his pain. I thought I was protecting him. I was protecting myself.

And I was wrong about that, too.

The silence around substance use and mental health does not protect anyone. It isolates them. It tells people that what they're going through is too shameful to say out loud. It pushes them further from help, further from community, further from the people who love them.

When Sam died, I decided that silence would not be his legacy.


What the OATH Means

Sam's OATH is four commitments. Not rules, not slogans - commitments. Promises you make to yourself about how you'll move through a world where substance use and mental health challenges touch nearly every family.

Openness: I will talk about substance use and mental health without shame. Not recklessly. Not performatively. But honestly. When someone asks how my family is doing, I will tell the truth.

Authenticity: I will stop pretending. I will use language that reflects reality. I will say "substance use disorder" instead of "junkie." I will say "person in recovery" instead of "reformed addict." The words we use shape the world we live in.

Togetherness: I will not carry this alone, and I will not let others carry it alone either. I will build community. I will check on people. I will show up when showing up is hard.

Healing: I will believe that things can get better - not perfect, not "back to normal," but genuinely, meaningfully better. And I will do the work that healing requires.

These four commitments are simple. They are not easy. And they are the foundation of everything we do at Sam's OATH.


Why Personal Commitment Matters More Than Policy

There are good organizations doing good policy work on substance use. They fight for funding, treatment access, harm reduction, and criminal justice reform. That work matters.

But policy alone does not change how a father talks to his son about what he's going through. Policy alone does not change the way a coworker reacts when someone says they're in recovery. Policy alone does not change the fact that most people who need help never ask for it, because they've been taught that needing help is a personal failure.

That is a cultural problem. And cultural problems require cultural solutions.

Sam's OATH is a cultural solution. When you take the OATH, you put a pin on the map. You become a visible reminder that someone in your community chose openness over silence. You join thousands of people across the country who are changing the conversation, one honest moment at a time.

No one is going to legislate their way out of stigma. But millions of people, each making four simple commitments, can build a world where the next Sam doesn't feel like he has to hide.

That is what we are building. That is why we created Sam's OATH.


If You're Reading This and You're Struggling

You are not broken. You are not a burden. What you're going through has a name, and there are people who understand it, and help exists.

If you or someone you love is in crisis, please reach out:
- 988 Suicide and Crisis Lifeline: call or text 988
- SAMHSA National Helpline: 1-800-662-4357 (free, confidential, 24/7)
- Crisis Text Line: text HELLO to 741741

You don't have to carry this alone. That's the whole point.

Take Sam's OATH. Put your pin on the map. And know that when you do, Sam's legacy lives in every person you help feel less alone.`,
  },

  // ── Post 2: THE LANGUAGE OF STIGMA ──────────────────────────────────────────
  {
    title: "The Language of Stigma: Words That Hurt, Words That Heal",
    slug: "language-of-stigma",
    tags: ['stigma', 'language', 'person-first', 'advocacy', 'education'],
    excerpt: "The words we use about substance use and mental health carry real weight. 'Addict' vs. 'person with substance use disorder' is not just semantics - it shapes whether people seek help or stay hidden. A practical guide to language that heals.",
    author: "Frank Sheeder",
    content: `Words matter more than most people realize. The language we use to talk about substance use and mental health does not just describe reality - it shapes it. Every time we call someone an "addict" or describe their drug test as "dirty," we add another brick to the wall of stigma that keeps people from getting help.

This is not about being politically correct. This is about being accurate. And it is about understanding that the words you choose can either push someone toward help or push them deeper into hiding.


The Words We Grew Up With

Most of us learned to talk about substance use from movies, news stories, and casual conversation. The vocabulary we inherited is loaded with judgment:

"Addict." "Junkie." "Druggie." "Crackhead." "Pillhead."

These words reduce a human being to a single behavior. They erase everything else about a person - their relationships, their talents, their history, their humanity. When we call someone an "addict," we are saying that their substance use is the most important thing about them. It is their identity. It is who they are.

That is not just unkind. It is wrong.

A person with substance use disorder is a person first. They are a parent, a sibling, a friend, a colleague, a neighbor. They are someone who is dealing with a medical condition that affects the brain. They deserve the same language of dignity that we extend to people with any other health condition.

Nobody calls a person with diabetes "a diabetic failure." Nobody calls a person with cancer "a tumor."


The "Clean" and "Dirty" Problem

One of the most common and most damaging language patterns is the use of "clean" and "dirty" to describe drug test results or recovery status.

When we say someone is "clean," the implication is clear: they were dirty before. Their substance use made them contaminated, impure, soiled. And when they relapse - as many people do, because substance use disorder is a chronic condition - they become dirty again.

This language framework turns recovery into a moral binary. You are either clean or dirty, good or bad, worthy or unworthy. It leaves no room for the messy, nonlinear, deeply human process that recovery actually is.

Better alternatives:
- Instead of "clean," say "in recovery" or "not currently using"
- Instead of "dirty test," say "positive test result"
- Instead of "relapse," consider "recurrence" (the same term we use for other chronic conditions)


Person-First Language: A Practical Guide

Person-first language puts the human being before the condition. It is simple to learn and powerful in practice.

Instead of "addict" or "substance abuser," say "person with substance use disorder."

Instead of "alcoholic," say "person with alcohol use disorder."

Instead of "drug habit," say "substance use disorder" (it is a medical condition, not a habit).

Instead of "abuse" (as in "drug abuse"), say "use" or "misuse." The word "abuse" implies a moral failing. The word "use" describes a behavior.

Instead of "medication-assisted treatment," say "medications for addiction treatment" or simply "medication for substance use disorder." The word "assisted" implies the medication is secondary, when for many people it is the foundation of their recovery.

Instead of "former addict," say "person in recovery" or "person in long-term recovery." Recovery is ongoing. It is not something you were. It is something you are.


What the Research Says

This is not theoretical. Research consistently shows that the language used to describe people with substance use disorders directly affects how they are treated.

A landmark study by Kelly and Westerhoff (2010) found that when clinicians read a case study describing a "substance abuser," they were significantly more likely to recommend punitive measures than when the same case study described a "person with a substance use disorder." Same person. Same behavior. Different words. Different treatment.

A 2018 study in Drug and Alcohol Dependence found that stigmatizing language was one of the top barriers preventing people from seeking treatment. People who felt judged by the language used around them were less likely to ask for help, less likely to enter treatment, and less likely to stay in treatment.

The National Institute on Drug Abuse (NIDA) has officially recommended person-first, non-stigmatizing language in all communications about substance use. So has the Associated Press, which updated its style guide to discourage terms like "addict" and "alcoholic" as nouns.

The evidence is clear: language that reduces, shames, and dehumanizes keeps people sick. Language that dignifies, includes, and humanizes helps people heal.


What to Say (and What Not to Say) to Someone Who Is Struggling

If someone in your life is dealing with substance use or mental health challenges, here are some practical guidelines:

Say: "I'm here for you. You don't have to go through this alone."
Not: "You just need to get clean" or "Why can't you just stop?"

Say: "I care about you and I'm worried."
Not: "You're ruining your life" or "Think about what you're doing to your family."

Say: "What kind of support would help you right now?"
Not: "Have you tried just not doing it?" or "You need to go to rehab."

Say: "Recovery looks different for everyone. I respect your path."
Not: "My cousin's friend got sober by going cold turkey - you should try that."

Say: "I don't fully understand what you're going through, but I want to."
Not: "I know exactly how you feel" (unless you truly do).

The goal is not to have perfect language. The goal is to lead with compassion, listen more than you speak, and remember that the person in front of you is a whole human being, not a diagnosis.


Changing the Culture, One Conversation at a Time

Sam's OATH is built on the belief that cultural change happens at the level of individual conversations. Every time you choose "person with substance use disorder" over "addict," you are changing the culture. Every time you describe a positive drug test without calling someone "dirty," you are changing the culture. Every time you talk about your own family's experience honestly instead of hiding it, you are changing the culture.

This is what Authenticity looks like in practice. It is the "A" in OATH. It means choosing words that reflect reality instead of reinforcing shame.

You do not have to be perfect at this. You will slip up. We all do. What matters is the direction you're moving.


Take the Next Step

Share this post with someone who might benefit from it. Save it as a reference when you're not sure what to say. And if you haven't already, take Sam's OATH and become part of a community that is rewriting the language of substance use, one honest word at a time.

If you or someone you love needs support right now:
- 988 Suicide and Crisis Lifeline: call or text 988
- SAMHSA National Helpline: 1-800-662-4357 (free, confidential, 24/7)
- Crisis Text Line: text HELLO to 741741`,
  },

  // ── Post 3: WHAT FAMILIES NEED TO KNOW ──────────────────────────────────────
  {
    title: "What Families Need to Know: Warning Signs and How to Help",
    slug: "what-families-need-to-know",
    tags: ['families', 'warning signs', 'support', 'resources', 'naloxone'],
    excerpt: "Knowing the warning signs of substance use disorder can save a life. This guide covers what to look for, how to start a compassionate conversation, and where to find help, including naloxone access and treatment resources.",
    author: "Frank Sheeder",
    content: `If you are reading this because you are worried about someone you love, you are already doing something important. You are paying attention. You are looking for answers. And you are refusing to look the other way.

That takes courage. And it matters more than you know.

This post is a practical guide for families. It covers the warning signs of substance use disorder, how to approach a conversation with compassion instead of confrontation, the difference between enabling and supporting, and where to find help. None of this is theoretical. It comes from the experience of families who have been where you are, including mine.


Warning Signs: What to Look For

Substance use disorder does not always look the way movies portray it. It is not always obvious. It is not always dramatic. Sometimes it looks like a person who is slowly becoming someone you don't quite recognize.

Behavioral changes:
- Increasing secrecy, especially about whereabouts and spending
- Withdrawal from activities, hobbies, and relationships they used to enjoy
- Sudden changes in friend groups
- Missing school, work, or family events
- Unexplained financial problems or requests for money
- Defensiveness or anger when asked about substance use
- Loss of interest in personal appearance or hygiene
- Lying about small things (which often accompanies lying about bigger things)

Physical signs:
- Unexplained weight loss or gain
- Bloodshot or glazed eyes, unusually large or small pupils
- Frequent nosebleeds or sniffling (not related to illness)
- Unusual body odor or breath
- Slurred speech or impaired coordination
- Changes in sleep patterns, either excessive sleep or inability to sleep
- Tremors, shakiness, or poor physical coordination
- Marks on arms or other body parts (though many substances leave no visible marks)

Emotional and social signs:
- Mood swings that seem out of proportion to circumstances
- Increased anxiety, paranoia, or fearfulness
- Periods of unusual energy followed by crashes
- Loss of motivation or ambition
- Expressions of hopelessness or statements like "nothing matters"
- Isolation from family and close friends

No single sign on this list means your loved one has a substance use disorder. Many of these changes can have other explanations. But if you are seeing a pattern, if multiple signs are present and worsening over time, trust your instinct. You know this person. If something feels wrong, it probably is.


How to Start the Conversation

This is the hardest part. And it is the most important part.

The instinct when you are scared for someone you love is to confront them. To demand answers. To say, "I know what you're doing and you need to stop." This approach feels urgent and necessary. It is also, in most cases, counterproductive.

Confrontation triggers defensiveness. Defensiveness triggers denial. Denial ends the conversation before it starts. And the person you love goes further underground.

Instead, lead with love. Here is what that looks like in practice:

Choose the right moment. Do not start this conversation when you are angry, when they are impaired, or when you are in a public setting. Choose a time when you are both calm, private, and not rushed.

Use "I" statements instead of "you" statements. "I've noticed you seem really stressed lately, and I'm worried about you" lands very differently than "You've been acting weird and I think you're using drugs."

Be specific, not accusatory. "I noticed you missed dinner three times this week and you haven't been returning my calls" is an observation. "You're always disappearing and lying to me" is an accusation.

Listen more than you talk. The goal of the first conversation is not to solve the problem. It is to open a door. Ask questions. Listen to the answers. Resist the urge to lecture.

Express love clearly and unconditionally. "I love you no matter what. I'm here for you no matter what. I'm not going anywhere." These are the words that cut through shame.

Do not expect immediate results. The first conversation may not go well. They may deny everything. They may get angry. They may shut down. That does not mean the conversation failed. It means they heard you, and what you said is working its way through layers of fear and shame. Keep the door open.


The Difference Between Enabling and Supporting

This is one of the most difficult distinctions families face, and there is no perfect formula. But understanding the general principle can help.

Enabling means removing the natural consequences of someone's substance use in ways that make it easier for them to continue using. Examples include paying their rent so they can spend money on substances, making excuses for their behavior to employers or family members, or pretending nothing is wrong to avoid conflict.

Supporting means maintaining your relationship and your love while refusing to participate in the cycle of use. Examples include helping them research treatment options, driving them to appointments, attending family therapy, setting boundaries and holding them, and being honest about what you see.

The line between enabling and supporting is not always clear. It shifts depending on circumstances. And the guilt that comes with setting boundaries can be overwhelming.

Here is what I have learned: you cannot love someone into recovery. But you can love them while they find their way there. And you can refuse to pretend that everything is fine when it is not.

If you are struggling with this balance, Al-Anon, Nar-Anon, and family therapy programs exist specifically for this purpose. You do not have to figure this out alone.


Resources: Where to Find Help

If your loved one is ready for help (or if you want to be prepared when they are):

SAMHSA National Helpline: 1-800-662-4357
Free, confidential, 24/7, 365-day-a-year treatment referral and information service (in English and Spanish). They can help you find local treatment facilities, support groups, and community-based organizations.

SAMHSA Treatment Locator: findtreatment.gov
Search for treatment facilities by location and type of care.

988 Suicide and Crisis Lifeline: call or text 988
For anyone in suicidal crisis or emotional distress.

Crisis Text Line: text HELLO to 741741
Text-based crisis support available 24/7.

Naloxone (Narcan) access:
Naloxone is a life-saving medication that can reverse an opioid overdose. It is available without a prescription at most pharmacies. Many states also offer free naloxone distribution programs. Having naloxone on hand is not a sign of giving up. It is a sign of being prepared. The CDC recommends that anyone who lives with or cares about a person at risk of opioid overdose should keep naloxone accessible.

NEXT Distro (nextdistro.org) offers free mail-based naloxone if you cannot access it locally.

Al-Anon (al-anon.org): Support groups for families and friends of people with alcohol use disorder.

Nar-Anon (nar-anon.org): Support groups for families and friends of people with substance use disorder.

Learn to Cope (learn2cope.org): Peer support network for families dealing with addiction and substance use disorder.


What I Wish I Had Known

When Sam was struggling, I wish I had known that substance use disorder is a medical condition, not a moral failure. I wish I had known that my shame was his shame, and that my silence was making his world smaller. I wish I had known that asking for help is not weakness. It is the bravest thing a person can do. And I wish I had known that there were thousands of other families going through the exact same thing, hiding the exact same way I was.

You are not alone in this. Your family is not the only one. And what is happening to your loved one is not their fault - or yours.

Take Sam's OATH. Join a community of people who understand. Put your pin on the map and know that every pin represents a family that chose openness over silence, connection over isolation, and hope over shame.

Your loved one deserves that. And so do you.


If you or someone you love is in immediate danger, call 911. For crisis support:
- 988 Suicide and Crisis Lifeline: call or text 988
- SAMHSA National Helpline: 1-800-662-4357
- Crisis Text Line: text HELLO to 741741`,
  },
]

async function seed() {
  console.log('Seeding 3 featured blog posts...\n')

  for (const post of posts) {
    // Check if slug already exists
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', post.slug)
      .maybeSingle()

    if (existing) {
      console.log(`  SKIP: "${post.title}" (slug already exists)`)
      continue
    }

    const now = new Date().toISOString()
    const { error } = await supabase.from('blog_posts').insert({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      author_name: post.author,
      tags: post.tags,
      status: 'published',
      published_at: now,
      created_at: now,
      updated_at: now,
    })

    if (error) {
      console.error(`  ERROR: "${post.title}":`, error.message)
    } else {
      console.log(`  OK: "${post.title}"`)
    }
  }

  console.log('\nDone.')
}

seed().catch(console.error)
