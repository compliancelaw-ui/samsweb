export interface ContentFieldDef {
  pageSlug: string;
  sectionKey: string;
  label: string;
  contentType: "text" | "textarea" | "richtext";
  defaultContent: string;
  group: string;
}

// ─── PAGE LABELS (for admin UI tabs) ────────────────────────────────────────
export const PAGE_LABELS: Record<string, string> = {
  home: "Home",
  about: "About",
  "take-the-oath": "Take the OATH",
  music: "Music",
  families: "Families",
  workplace: "Workplace",
  "get-involved": "Get Involved",
  contact: "Contact",
  press: "Press",
  "share-your-story": "Share Your Story",
  resources: "Resources",
  map: "Map",
  ambassadors: "Ambassadors",
  blog: "Blog",
  stories: "Stories",
};

// ─── CONTENT REGISTRY ───────────────────────────────────────────────────────
export const CONTENT_REGISTRY: ContentFieldDef[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // HOME PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    pageSlug: "home",
    sectionKey: "hero.eyebrow",
    label: "Hero Eyebrow",
    contentType: "text",
    defaultContent: "A National Movement",
    group: "Hero",
  },
  {
    pageSlug: "home",
    sectionKey: "hero.title",
    label: "Hero Title",
    contentType: "text",
    defaultContent: "What\u2019s Hidden\nDoesn\u2019t Heal",
    group: "Hero",
  },
  {
    pageSlug: "home",
    sectionKey: "hero.subtitle",
    label: "Hero Subtitle",
    contentType: "textarea",
    defaultContent:
      "Someone in your life is facing substance use or mental health challenges in silence. The OATH is a way forward \u2014 four commitments that turn isolation into community.",
    group: "Hero",
  },
  {
    pageSlug: "home",
    sectionKey: "hero.body",
    label: "Hero Body",
    contentType: "textarea",
    defaultContent:
      "Sixty seconds. A pin on the map. A person who no longer carries this alone. Take Sam\u2019s OATH and join thousands who chose openness over silence.",
    group: "Hero",
  },
  {
    pageSlug: "home",
    sectionKey: "oath.title",
    label: "OATH Section Title",
    contentType: "text",
    defaultContent: "The OATH: A Framework for Moving Forward",
    group: "OATH Framework",
  },
  {
    pageSlug: "home",
    sectionKey: "oath.subtitle",
    label: "OATH Section Subtitle",
    contentType: "textarea",
    defaultContent:
      "Silence keeps people stuck. The OATH is how they move forward \u2014 four commitments that replace shame with strength.",
    group: "OATH Framework",
  },
  {
    pageSlug: "home",
    sectionKey: "oath.o-description",
    label: "Openness Description",
    contentType: "textarea",
    defaultContent:
      "When we talk about substance use and mental health without shame, we give others permission to do the same.",
    group: "OATH Framework",
  },
  {
    pageSlug: "home",
    sectionKey: "oath.a-description",
    label: "Authenticity Description",
    contentType: "textarea",
    defaultContent:
      "When families share what they\u2019ve really been through, isolation loses its grip. Your real story is your most powerful tool.",
    group: "OATH Framework",
  },
  {
    pageSlug: "home",
    sectionKey: "oath.t-description",
    label: "Togetherness Description",
    contentType: "textarea",
    defaultContent:
      "No family should face this alone. Together we are stronger than any stigma and louder than any silence.",
    group: "OATH Framework",
  },
  {
    pageSlug: "home",
    sectionKey: "oath.h-description",
    label: "Healing Description",
    contentType: "textarea",
    defaultContent:
      "Healing starts when we stop hiding. We choose healing \u2014 for ourselves, our families, and our communities.",
    group: "OATH Framework",
  },
  {
    pageSlug: "home",
    sectionKey: "categories.title",
    label: "Categories Section Title",
    contentType: "text",
    defaultContent: "Find Your Place in the Movement",
    group: "Categories",
  },
  {
    pageSlug: "home",
    sectionKey: "categories.subtitle",
    label: "Categories Section Subtitle",
    contentType: "textarea",
    defaultContent:
      "Everyone who takes the OATH does it for their own reason. What\u2019s yours?",
    group: "Categories",
  },
  {
    pageSlug: "home",
    sectionKey: "categories.supporting-description",
    label: "Supporting a Loved One \u2014 Description",
    contentType: "textarea",
    defaultContent:
      "Someone in your life is struggling. The OATH is your commitment to share openly and find strength in community as others do the same.",
    group: "Categories",
  },
  {
    pageSlug: "home",
    sectionKey: "categories.standing-description",
    label: "Standing With You \u2014 Description",
    contentType: "textarea",
    defaultContent:
      "You believe no one should face this in silence. Your OATH says: I see you, I stand with you, and you are not alone.",
    group: "Categories",
  },
  {
    pageSlug: "home",
    sectionKey: "categories.recovery-description",
    label: "Hope & Recovery \u2014 Description",
    contentType: "textarea",
    defaultContent:
      "You\u2019re walking your own path to recovery or finding hope. Your OATH lights the way for someone still in the dark.",
    group: "Categories",
  },
  {
    pageSlug: "home",
    sectionKey: "movement.title",
    label: "Movement Section Title",
    contentType: "text",
    defaultContent: "The Movement Is Growing",
    group: "Movement Map",
  },
  {
    pageSlug: "home",
    sectionKey: "movement.subtitle",
    label: "Movement Section Subtitle",
    contentType: "textarea",
    defaultContent:
      "Every pin on the map is a person who chose community over isolation. This is what happens when people stop hiding and start healing.",
    group: "Movement Map",
  },
  {
    pageSlug: "home",
    sectionKey: "mission.eyebrow",
    label: "Mission Eyebrow",
    contentType: "text",
    defaultContent: "Our Mission",
    group: "Mission",
  },
  {
    pageSlug: "home",
    sectionKey: "mission.title",
    label: "Mission Title",
    contentType: "text",
    defaultContent: "End the Stigma. Start the Conversation.",
    group: "Mission",
  },
  {
    pageSlug: "home",
    sectionKey: "mission.body-1",
    label: "Mission Body \u2014 Paragraph 1",
    contentType: "textarea",
    defaultContent:
      "Sam\u2019s OATH is a national movement to end the stigma around substance use and mental health. We believe that when people choose Openness, Authenticity, Togetherness, and Healing, everything changes.",
    group: "Mission",
  },
  {
    pageSlug: "home",
    sectionKey: "mission.body-2",
    label: "Mission Body \u2014 Paragraph 2",
    contentType: "textarea",
    defaultContent:
      "Named for Sam Sheeder, whose life inspired this movement \u2014 but built by thousands of people across the country who believe that what\u2019s hidden doesn\u2019t heal, and that no one should carry this weight alone.",
    group: "Mission",
  },
  {
    pageSlug: "home",
    sectionKey: "cta.title",
    label: "Final CTA Title",
    contentType: "text",
    defaultContent: "From Silence to Strength. It Starts Here.",
    group: "Final CTA",
  },
  {
    pageSlug: "home",
    sectionKey: "cta.body",
    label: "Final CTA Body",
    contentType: "textarea",
    defaultContent:
      "Substance use and mental health challenges thrive in silence. Community breaks that silence. Take Sam\u2019s OATH, put your pin on the map, and join a growing movement of people who believe that no one should carry this weight alone.",
    group: "Final CTA",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ABOUT PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    pageSlug: "about",
    sectionKey: "hero.eyebrow",
    label: "Hero Eyebrow",
    contentType: "text",
    defaultContent: "About Sam\u2019s OATH",
    group: "Hero",
  },
  {
    pageSlug: "about",
    sectionKey: "hero.title",
    label: "Hero Title",
    contentType: "text",
    defaultContent: "What\u2019s Hidden Doesn\u2019t Heal",
    group: "Hero",
  },
  {
    pageSlug: "about",
    sectionKey: "hero.subtitle",
    label: "Hero Subtitle",
    contentType: "textarea",
    defaultContent:
      "Millions of people face substance use and mental health challenges in silence. Sam\u2019s OATH is a movement to change that \u2014 replacing shame with openness, isolation with community, and silence with healing.",
    group: "Hero",
  },
  {
    pageSlug: "about",
    sectionKey: "oath.title",
    label: "OATH Section Title",
    contentType: "text",
    defaultContent: "The OATH",
    group: "The OATH",
  },
  {
    pageSlug: "about",
    sectionKey: "oath.subtitle",
    label: "OATH Section Subtitle",
    contentType: "textarea",
    defaultContent:
      "Four commitments that replace shame with openness, isolation with community, and silence with healing. It takes sixty seconds.",
    group: "The OATH",
  },
  {
    pageSlug: "about",
    sectionKey: "oath.o-description",
    label: "Openness Description",
    contentType: "textarea",
    defaultContent:
      "We choose to talk about substance use and mental health without shame.",
    group: "The OATH",
  },
  {
    pageSlug: "about",
    sectionKey: "oath.a-description",
    label: "Authenticity Description",
    contentType: "textarea",
    defaultContent:
      "We share what we\u2019ve really been through \u2014 the truth, not the polished version.",
    group: "The OATH",
  },
  {
    pageSlug: "about",
    sectionKey: "oath.t-description",
    label: "Togetherness Description",
    contentType: "textarea",
    defaultContent:
      "We stand with others who carry this weight. No one should face this alone.",
    group: "The OATH",
  },
  {
    pageSlug: "about",
    sectionKey: "oath.h-description",
    label: "Healing Description",
    contentType: "textarea",
    defaultContent:
      "We commit to healing \u2014 not perfection. It starts when we stop hiding.",
    group: "The OATH",
  },
  {
    pageSlug: "about",
    sectionKey: "topics.title",
    label: "Topics Section Title",
    contentType: "text",
    defaultContent: "Learn More",
    group: "Topic Cards",
  },
  {
    pageSlug: "about",
    sectionKey: "topics.subtitle",
    label: "Topics Section Subtitle",
    contentType: "textarea",
    defaultContent: "The movement, the mission, and how it all started.",
    group: "Topic Cards",
  },
  {
    pageSlug: "about",
    sectionKey: "people.title",
    label: "People Section Title",
    contentType: "text",
    defaultContent: "People Behind the Movement",
    group: "People",
  },
  {
    pageSlug: "about",
    sectionKey: "people.subtitle",
    label: "People Section Subtitle",
    contentType: "textarea",
    defaultContent:
      "Substance use and mental health challenges don\u2019t happen in isolation. The people closest to you carry the weight too.",
    group: "People",
  },
  {
    pageSlug: "about",
    sectionKey: "people.frank-quote",
    label: "Frank\u2019s Quote",
    contentType: "textarea",
    defaultContent:
      "I stayed silent for years. After losing Sam, I chose a different path.",
    group: "People",
  },
  {
    pageSlug: "about",
    sectionKey: "people.annie-quote",
    label: "Annie\u2019s Quote",
    contentType: "textarea",
    defaultContent:
      "Siblings see things others don\u2019t. Our voices deserve to be heard too.",
    group: "People",
  },
  {
    pageSlug: "about",
    sectionKey: "people.nancy-quote",
    label: "Nancy\u2019s Quote",
    contentType: "textarea",
    defaultContent:
      "She chose this family and never wavered \u2014 through every challenge.",
    group: "People",
  },
  {
    pageSlug: "about",
    sectionKey: "origin.eyebrow",
    label: "Origin Eyebrow",
    contentType: "text",
    defaultContent: "The Origin Story",
    group: "Origin Story",
  },
  {
    pageSlug: "about",
    sectionKey: "origin.title",
    label: "Origin Title",
    contentType: "text",
    defaultContent: "How It Started",
    group: "Origin Story",
  },
  {
    pageSlug: "about",
    sectionKey: "origin.body-1",
    label: "Origin Body \u2014 Paragraph 1",
    contentType: "textarea",
    defaultContent:
      "Sam Sheeder lit up every room he entered. Adventurous, brilliant, and deeply authentic \u2014 he had a gift for making anyone feel seen and heard. He loved music, the outdoors, and connecting with people from every walk of life.",
    group: "Origin Story",
  },
  {
    pageSlug: "about",
    sectionKey: "origin.body-2",
    label: "Origin Body \u2014 Paragraph 2",
    contentType: "textarea",
    defaultContent:
      "Sam also faced the hard and often lonely road of substance use disorder. He never shied away from the truth of his journey, even when the world\u2019s judgment made it harder to seek help. He taught everyone around him that it\u2019s ok not to be ok \u2014 and that openness and authenticity matter more than appearances.",
    group: "Origin Story",
  },
  {
    pageSlug: "about",
    sectionKey: "origin.body-3",
    label: "Origin Body \u2014 Paragraph 3",
    contentType: "textarea",
    defaultContent:
      "After losing Sam, his father Frank made a choice: instead of continuing the silence, he would tell the truth publicly. That act of openness became the spark for Sam\u2019s OATH \u2014 a movement built on the values Sam lived by.",
    group: "Origin Story",
  },
  {
    pageSlug: "about",
    sectionKey: "spark.eyebrow",
    label: "Spark Eyebrow",
    contentType: "text",
    defaultContent: "Proof That People Needed Permission to Talk",
    group: "The Spark",
  },
  {
    pageSlug: "about",
    sectionKey: "spark.title",
    label: "Spark Title",
    contentType: "text",
    defaultContent: "The Spark",
    group: "The Spark",
  },
  {
    pageSlug: "about",
    sectionKey: "spark.body-1",
    label: "Spark Body \u2014 Paragraph 1",
    contentType: "textarea",
    defaultContent:
      "One raw, honest LinkedIn post about substance use and mental health \u2014 and the silence that surrounds it \u2014 reached 345,000 people. But what was remarkable wasn\u2019t the number. It was the response.",
    group: "The Spark",
  },
  {
    pageSlug: "about",
    sectionKey: "spark.body-2",
    label: "Spark Body \u2014 Paragraph 2",
    contentType: "textarea",
    defaultContent:
      "Parents, siblings, partners, and friends who had been carrying the same weight in secret all said the same thing:",
    group: "The Spark",
  },
  {
    pageSlug: "about",
    sectionKey: "spark.quote",
    label: "Spark Quote",
    contentType: "text",
    defaultContent: "I thought I was the only one.",
    group: "The Spark",
  },
  {
    pageSlug: "about",
    sectionKey: "spark.body-3",
    label: "Spark Body \u2014 Paragraph 3",
    contentType: "textarea",
    defaultContent:
      "That moment proved the silence itself was the crisis. When one person spoke openly, thousands felt permission to do the same. That\u2019s the power of the OATH \u2014 not one person\u2019s courage, but what happens when people give each other permission to be honest.",
    group: "The Spark",
  },
  {
    pageSlug: "about",
    sectionKey: "founder.eyebrow",
    label: "Founder Eyebrow",
    contentType: "text",
    defaultContent: "The Founder",
    group: "Founder",
  },
  {
    pageSlug: "about",
    sectionKey: "founder.title",
    label: "Founder Title",
    contentType: "text",
    defaultContent: "Frank Sheeder",
    group: "Founder",
  },
  {
    pageSlug: "about",
    sectionKey: "founder.body-1",
    label: "Founder Body \u2014 Paragraph 1",
    contentType: "textarea",
    defaultContent:
      "Frank spent his career as a lawyer \u2014 the person others turned to when they faced their toughest challenges. He built a reputation for solving complex problems and guiding people through their hardest moments. Yet when it came to his own son\u2019s struggle with substance use, he couldn\u2019t fix it. And like so many others, he carried that weight in silence.",
    group: "Founder",
  },
  {
    pageSlug: "about",
    sectionKey: "founder.body-2",
    label: "Founder Body \u2014 Paragraph 2",
    contentType: "textarea",
    defaultContent:
      "After losing Sam, Frank made a choice that most people in his situation never make \u2014 he spoke publicly about what his family had been going through. Not to draw attention to himself, but because he believed that if his story resonated with even a few people, the silence was the real problem.",
    group: "Founder",
  },
  {
    pageSlug: "about",
    sectionKey: "founder.body-3",
    label: "Founder Body \u2014 Paragraph 3",
    contentType: "textarea",
    defaultContent:
      "It resonated with hundreds of thousands. Sam\u2019s OATH grew out of that moment \u2014 Frank\u2019s way of turning what he learned into a framework that helps anyone move from isolation to community. He wrote 15 original songs, built this movement, and now works to bring the OATH into workplaces, schools, and communities across the country.",
    group: "Founder",
  },
  {
    pageSlug: "about",
    sectionKey: "founder.body-4",
    label: "Founder Body \u2014 Paragraph 4",
    contentType: "textarea",
    defaultContent:
      "His message is simple: you don\u2019t have to do this alone, and you don\u2019t have to be silent anymore.",
    group: "Founder",
  },
  {
    pageSlug: "about",
    sectionKey: "founder.bio",
    label: "Founder Bio Card",
    contentType: "textarea",
    defaultContent:
      "Lawyer, advocate, songwriter, and father. Frank turned a personal loss into a national movement to end the silence around substance use and mental health.",
    group: "Founder",
  },
  {
    pageSlug: "about",
    sectionKey: "vision.title",
    label: "Vision Title",
    contentType: "text",
    defaultContent: "Where This Is Going",
    group: "Vision",
  },
  {
    pageSlug: "about",
    sectionKey: "vision.subtitle",
    label: "Vision Subtitle",
    contentType: "textarea",
    defaultContent:
      "Sam\u2019s OATH isn\u2019t a support group or a counseling service \u2014 it\u2019s a national movement to change how people experience substance use and mental health challenges.",
    group: "Vision",
  },
  {
    pageSlug: "about",
    sectionKey: "vision.pin-description",
    label: "Vision \u2014 Pin Card",
    contentType: "textarea",
    defaultContent:
      "A national map where every pin proves another person chose community over isolation.",
    group: "Vision",
  },
  {
    pageSlug: "about",
    sectionKey: "vision.workplace-description",
    label: "Vision \u2014 Workplace Card",
    contentType: "textarea",
    defaultContent:
      "Programs that give employees permission to be honest about what they\u2019re going through.",
    group: "Vision",
  },
  {
    pageSlug: "about",
    sectionKey: "vision.compassion-description",
    label: "Vision \u2014 Compassion Card",
    contentType: "textarea",
    defaultContent:
      "A world where people facing substance use and mental health challenges are met with support instead of stigma.",
    group: "Vision",
  },
  {
    pageSlug: "about",
    sectionKey: "cta.title",
    label: "CTA Title",
    contentType: "text",
    defaultContent: "Ready to Be Part of This?",
    group: "CTA",
  },
  {
    pageSlug: "about",
    sectionKey: "cta.body",
    label: "CTA Body",
    contentType: "textarea",
    defaultContent:
      "Every person who takes the OATH makes it easier for the next one. You don\u2019t need a platform or a title. You just need sixty seconds and the willingness to stop carrying this alone.",
    group: "CTA",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MUSIC PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    pageSlug: "music",
    sectionKey: "hero.title",
    label: "Hero Title",
    contentType: "text",
    defaultContent: "Music That Heals",
    group: "Hero",
  },
  {
    pageSlug: "music",
    sectionKey: "hero.subtitle",
    label: "Hero Subtitle",
    contentType: "textarea",
    defaultContent:
      "15 original songs for anyone who knows the weight of silence \u2014 and the relief of finally being heard. Music has a way of saying what words alone can\u2019t.",
    group: "Hero",
  },
  {
    pageSlug: "music",
    sectionKey: "sam-video.title",
    label: "Sam Video Title",
    contentType: "text",
    defaultContent: "\u201cI Am\u201d \u2014 Performed by Sam",
    group: "Sam Video",
  },
  {
    pageSlug: "music",
    sectionKey: "sam-video.description",
    label: "Sam Video Description",
    contentType: "textarea",
    defaultContent:
      "Before everything else, there was Sam and his music. This is Sam performing \u201cI Am\u201d \u2014 his voice, his heart, his words.",
    group: "Sam Video",
  },
  {
    pageSlug: "music",
    sectionKey: "anthem.description",
    label: "Anthem Description",
    contentType: "textarea",
    defaultContent:
      "The title track and anthem of the movement. A declaration that silence is not safety, and healing begins when we speak.",
    group: "Anthem",
  },
  {
    pageSlug: "music",
    sectionKey: "story.title",
    label: "Story Behind the Songs Title",
    contentType: "text",
    defaultContent: "Songs Born from the Journey",
    group: "Story Behind Songs",
  },
  {
    pageSlug: "music",
    sectionKey: "story.body-1",
    label: "Story Body \u2014 Paragraph 1",
    contentType: "textarea",
    defaultContent:
      "These songs were born from the journey that inspired Sam\u2019s OATH \u2014 but they belong to everyone who\u2019s carried the weight of substance use or mental health challenges in silence. Each track captures a moment in the journey from silence to healing.",
    group: "Story Behind Songs",
  },
  {
    pageSlug: "music",
    sectionKey: "story.body-2",
    label: "Story Body \u2014 Paragraph 2",
    contentType: "richtext",
    defaultContent:
      "Grief isn\u2019t just about loss through death. You can grieve for the person someone used to be, for lost experiences, for the relationship you wish you had \u2014 even while they\u2019re still here. These songs give voice to all of it. From the raw weight of \u201cIf Love Could Have Saved You\u201d to the defiant hope of \u201cJoy Anyway,\u201d they speak to emotions that are often too heavy for words.",
    group: "Story Behind Songs",
  },
  {
    pageSlug: "music",
    sectionKey: "story.body-3",
    label: "Story Body \u2014 Paragraph 3",
    contentType: "textarea",
    defaultContent:
      "They\u2019re for the parent who can\u2019t sleep, the partner who feels helpless, the sibling who feels forgotten, and the friend who doesn\u2019t know what to say.",
    group: "Story Behind Songs",
  },
  {
    pageSlug: "music",
    sectionKey: "frank-note",
    label: "Frank\u2019s Note",
    contentType: "richtext",
    defaultContent:
      "These songs were born in the hardest season of my life. I wrote them because the words I needed to say were too heavy to just speak \u2014 they needed melody, they needed music, they needed a place to land. If even one of these songs reaches someone in their darkest hour and reminds them they\u2019re not alone, then every note was worth it.",
    group: "Frank Note",
  },
];

// ─── HELPER FUNCTIONS ───────────────────────────────────────────────────────

export function getDefaultsForPage(
  pageSlug: string
): Record<string, string> {
  const map: Record<string, string> = {};
  for (const field of CONTENT_REGISTRY) {
    if (field.pageSlug === pageSlug) {
      map[field.sectionKey] = field.defaultContent;
    }
  }
  return map;
}

export function getFieldsForPage(pageSlug: string): ContentFieldDef[] {
  return CONTENT_REGISTRY.filter((f) => f.pageSlug === pageSlug);
}

export function getAllPageSlugs(): string[] {
  return Array.from(new Set(CONTENT_REGISTRY.map((f) => f.pageSlug)));
}
