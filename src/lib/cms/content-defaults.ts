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
  "take-the-oath": "Take Sam's OATH",
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
      "Someone in your life is facing substance use or mental health challenges in silence. Sam's OATH is a way forward \u2014 four commitments that turn isolation into community.",
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
    defaultContent: "Sam's OATH: A Framework for Moving Forward",
    group: "OATH Framework",
  },
  {
    pageSlug: "home",
    sectionKey: "oath.subtitle",
    label: "OATH Section Subtitle",
    contentType: "textarea",
    defaultContent:
      "Silence keeps people stuck. Sam's OATH is how they move forward \u2014 four commitments that replace shame with strength.",
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
      "Everyone who takes Sam's OATH does it for their own reason. What\u2019s yours?",
    group: "Categories",
  },
  {
    pageSlug: "home",
    sectionKey: "categories.supporting-description",
    label: "Supporting a Loved One \u2014 Description",
    contentType: "textarea",
    defaultContent:
      "Someone in your life is struggling. Sam's OATH is your commitment to share openly and find strength in community as others do the same.",
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
    defaultContent: "Sam's OATH",
    group: "Sam's OATH",
  },
  {
    pageSlug: "about",
    sectionKey: "oath.subtitle",
    label: "OATH Section Subtitle",
    contentType: "textarea",
    defaultContent:
      "Four commitments that replace shame with openness, isolation with community, and silence with healing. It takes sixty seconds.",
    group: "Sam's OATH",
  },
  {
    pageSlug: "about",
    sectionKey: "oath.o-description",
    label: "Openness Description",
    contentType: "textarea",
    defaultContent:
      "We choose to talk about substance use and mental health without shame.",
    group: "Sam's OATH",
  },
  {
    pageSlug: "about",
    sectionKey: "oath.a-description",
    label: "Authenticity Description",
    contentType: "textarea",
    defaultContent:
      "We share what we\u2019ve really been through \u2014 the truth, not the polished version.",
    group: "Sam's OATH",
  },
  {
    pageSlug: "about",
    sectionKey: "oath.t-description",
    label: "Togetherness Description",
    contentType: "textarea",
    defaultContent:
      "We stand with others who carry this weight. No one should face this alone.",
    group: "Sam's OATH",
  },
  {
    pageSlug: "about",
    sectionKey: "oath.h-description",
    label: "Healing Description",
    contentType: "textarea",
    defaultContent:
      "We commit to healing \u2014 not perfection. It starts when we stop hiding.",
    group: "Sam's OATH",
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
      "That moment proved the silence itself was the crisis. When one person spoke openly, thousands felt permission to do the same. That\u2019s the power of Sam's OATH \u2014 not one person\u2019s courage, but what happens when people give each other permission to be honest.",
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
      "It resonated with hundreds of thousands. Sam\u2019s OATH grew out of that moment \u2014 Frank\u2019s way of turning what he learned into a framework that helps anyone move from isolation to community. He wrote 15 original songs, built this movement, and now works to bring Sam's OATH into workplaces, schools, and communities across the country.",
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
      "Every person who takes Sam's OATH makes it easier for the next one. You don\u2019t need a platform or a title. You just need sixty seconds and the willingness to stop carrying this alone.",
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

  // ═══════════════════════════════════════════════════════════════════════════
  // TAKE THE OATH PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    pageSlug: "take-the-oath",
    sectionKey: "hero.title",
    label: "Hero Title",
    contentType: "text",
    defaultContent: "Take Sam\u2019s OATH",
    group: "Hero",
  },
  {
    pageSlug: "take-the-oath",
    sectionKey: "hero.subtitle",
    label: "Hero Subtitle",
    contentType: "textarea",
    defaultContent:
      "Sixty seconds. Four commitments. A pin on the map that says: I am done carrying this alone.",
    group: "Hero",
  },
  {
    pageSlug: "take-the-oath",
    sectionKey: "hero.body",
    label: "Hero Body",
    contentType: "textarea",
    defaultContent:
      "Join thousands across America who chose openness over silence. Your OATH is a personal pledge \u2014 not a contract, not a donation. Just a decision to stop hiding.",
    group: "Hero",
  },
  {
    pageSlug: "take-the-oath",
    sectionKey: "oath.title",
    label: "OATH Meaning Title",
    contentType: "text",
    defaultContent: "What You\u2019re Committing To",
    group: "OATH Meaning",
  },
  {
    pageSlug: "take-the-oath",
    sectionKey: "oath.subtitle",
    label: "OATH Meaning Subtitle",
    contentType: "textarea",
    defaultContent:
      "Sam's OATH is a personal pledge \u2014 not a contract, not a donation, not a membership. It\u2019s a decision to replace silence with community and shame with strength.",
    group: "OATH Meaning",
  },
  {
    pageSlug: "take-the-oath",
    sectionKey: "next.title",
    label: "What Happens Next Title",
    contentType: "text",
    defaultContent: "What Happens Next",
    group: "What Happens Next",
  },
  {
    pageSlug: "take-the-oath",
    sectionKey: "next.step1-title",
    label: "Step 1 Title",
    contentType: "text",
    defaultContent: "You\u2019re on the Map",
    group: "What Happens Next",
  },
  {
    pageSlug: "take-the-oath",
    sectionKey: "next.step1-description",
    label: "Step 1 Description",
    contentType: "textarea",
    defaultContent:
      "Your color-coded pin joins a growing national map of families who refused to stay silent.",
    group: "What Happens Next",
  },
  {
    pageSlug: "take-the-oath",
    sectionKey: "next.step2-title",
    label: "Step 2 Title",
    contentType: "text",
    defaultContent: "Challenge 3 People",
    group: "What Happens Next",
  },
  {
    pageSlug: "take-the-oath",
    sectionKey: "next.step2-description",
    label: "Step 2 Description",
    contentType: "textarea",
    defaultContent:
      "Share your OATH with three people you trust. Every family that joins makes the next one easier.",
    group: "What Happens Next",
  },
  {
    pageSlug: "take-the-oath",
    sectionKey: "next.step3-title",
    label: "Step 3 Title",
    contentType: "text",
    defaultContent: "Keep Going",
    group: "What Happens Next",
  },
  {
    pageSlug: "take-the-oath",
    sectionKey: "next.step3-description",
    label: "Step 3 Description",
    contentType: "textarea",
    defaultContent:
      "Share your story, become an ambassador, or bring Sam's OATH to your workplace. The movement grows with you.",
    group: "What Happens Next",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FAMILIES PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    pageSlug: "families",
    sectionKey: "hero.eyebrow",
    label: "Hero Eyebrow",
    contentType: "text",
    defaultContent: "The Sheeder Family",
    group: "Hero",
  },
  {
    pageSlug: "families",
    sectionKey: "hero.title",
    label: "Hero Title",
    contentType: "text",
    defaultContent: "Every Family Has a Story. This Is Ours.",
    group: "Hero",
  },
  {
    pageSlug: "families",
    sectionKey: "hero.subtitle",
    label: "Hero Subtitle",
    contentType: "textarea",
    defaultContent:
      "Substance use didn\u2019t happen to just one person in this family. It happened to all of them. A father, a sister, brothers, a stepmother who loved him as her own \u2014 each carrying their own weight, together.",
    group: "Hero",
  },
  {
    pageSlug: "families",
    sectionKey: "intro.title",
    label: "Introduction Title",
    contentType: "text",
    defaultContent: "A Family\u2019s Experience",
    group: "Introduction",
  },
  {
    pageSlug: "families",
    sectionKey: "intro.body-1",
    label: "Introduction \u2014 Paragraph 1",
    contentType: "textarea",
    defaultContent:
      "When someone you love struggles with substance use, the whole family feels it. Not in the same way \u2014 but deeply. A father buries his fear under long work days. A stepmother loves a child as her own while holding back tears. A sister watches her brother disappear into someone she doesn\u2019t recognize. A brother loses the person he\u2019s closest to. A best friend doesn\u2019t know what to say.",
    group: "Introduction",
  },
  {
    pageSlug: "families",
    sectionKey: "intro.body-2",
    label: "Introduction \u2014 Paragraph 2",
    contentType: "textarea",
    defaultContent:
      "For the Sheeder family, the hardest part wasn\u2019t the struggle itself. It was the silence. For years, each of them carried their pain alone \u2014 privately, quietly, the way society tells you to. After Sam\u2019s death, the family made a different choice. They chose openness. They chose each other. And they chose to make sure no other family has to carry this weight in silence.",
    group: "Introduction",
  },
  {
    pageSlug: "families",
    sectionKey: "intro.quote",
    label: "Family Quote",
    contentType: "textarea",
    defaultContent:
      "We never doubted for a moment that Sam loved each of us with his whole heart. What brings us immense comfort is knowing that Sam was just as certain of our unconditional love for him.",
    group: "Introduction",
  },
  {
    pageSlug: "families",
    sectionKey: "intro.body-3",
    label: "Introduction \u2014 Paragraph 3",
    contentType: "textarea",
    defaultContent:
      "Each member of the Sheeder family is sharing their story \u2014 in their own voice, in their own words.",
    group: "Introduction",
  },
  {
    pageSlug: "families",
    sectionKey: "cta-early.title",
    label: "Early CTA Title",
    contentType: "text",
    defaultContent: "Your Family\u2019s Story Matters Too",
    group: "Early CTA",
  },
  {
    pageSlug: "families",
    sectionKey: "cta-early.body",
    label: "Early CTA Body",
    contentType: "textarea",
    defaultContent:
      "You don\u2019t have to share everything. You just have to stop hiding. Take Sam\u2019s OATH in 60 seconds and join families across the country who chose openness over silence.",
    group: "Early CTA",
  },
  {
    pageSlug: "families",
    sectionKey: "frank.body-1",
    label: "Frank \u2014 Paragraph 1",
    contentType: "textarea",
    defaultContent:
      "Frank Sheeder is Sam\u2019s father. A business leader, a songwriter, and the founder of Sam\u2019s OATH. But before any of that, he was a dad who loved his son unconditionally \u2014 and who felt completely alone while doing it.",
    group: "Frank",
  },
  {
    pageSlug: "families",
    sectionKey: "frank.body-2",
    label: "Frank \u2014 Paragraph 2",
    contentType: "textarea",
    defaultContent:
      "For years, Frank stayed silent about what his family was going through. Even in a supportive workplace, surrounded by colleagues who cared about him, he never said a word. The shame, the guilt, the helplessness \u2014 he carried all of it privately. He wondered what he could have done differently. He wondered if anyone would understand.",
    group: "Frank",
  },
  {
    pageSlug: "families",
    sectionKey: "frank.body-3",
    label: "Frank \u2014 Paragraph 3",
    contentType: "textarea",
    defaultContent:
      "After losing Sam, Frank made a decision that changed everything. He wrote about his son publicly on LinkedIn \u2014 openly, honestly, without filter. That post reached over 345,000 people. Nearly 2,000 reactions. 484 comments. Families everywhere responded, saying the same thing: \u201cI thought I was the only one.\u201d",
    group: "Frank",
  },
  {
    pageSlug: "families",
    sectionKey: "frank.body-4",
    label: "Frank \u2014 Paragraph 4",
    contentType: "textarea",
    defaultContent:
      "Frank channeled that grief into purpose. He wrote 15 original songs, founded Sam\u2019s OATH, and committed his life to making sure no parent ever has to grieve in silence again.",
    group: "Frank",
  },
  {
    pageSlug: "families",
    sectionKey: "annie.body-1",
    label: "Annie \u2014 Paragraph 1",
    contentType: "textarea",
    defaultContent:
      "Annie is Sam\u2019s sister. Growing up alongside a sibling who struggles is its own kind of journey \u2014 one that often goes unspoken. Siblings see things parents don\u2019t. They share a closeness that can make the pain feel even sharper, because the person you\u2019re losing is also the person you grew up with, the person who knows you better than almost anyone.",
    group: "Annie",
  },
  {
    pageSlug: "families",
    sectionKey: "annie.body-2",
    label: "Annie \u2014 Paragraph 2",
    contentType: "textarea",
    defaultContent:
      "Look at any photo of Sam and Annie together and one thing is immediately clear: these two shared a beautiful, loving bond. Sam had a way of making Annie smile \u2014 genuinely, joyfully, the kind of smile that shows in your whole face. Frank has said these are some of his favorite photos in the world.",
    group: "Annie",
  },
  {
    pageSlug: "families",
    sectionKey: "annie.body-3",
    label: "Annie \u2014 Paragraph 3",
    contentType: "textarea",
    defaultContent:
      "One of the 15 songs on the Sam\u2019s OATH album is called \u201cFor Annie\u201d \u2014 written from a sister\u2019s perspective, about the unique grief and love that siblings carry. It\u2019s a reminder that when we talk about families affected by substance use, siblings deserve to be heard too.",
    group: "Annie",
  },
  {
    pageSlug: "families",
    sectionKey: "joey.body-1",
    label: "Joey \u2014 Paragraph 1",
    contentType: "textarea",
    defaultContent:
      "Joey is Nancy\u2019s son \u2014 and Sam\u2019s brother. Not \u201cstep.\u201d Just brothers. They shared the kind of bond that brothers do \u2014 quiet moments reading side by side in armchairs, loud days riding ATVs, long afternoons out on the water. The everyday stuff that, looking back, turns out to be everything.",
    group: "Joey",
  },
  {
    pageSlug: "families",
    sectionKey: "joey.body-2",
    label: "Joey \u2014 Paragraph 2",
    contentType: "textarea",
    defaultContent:
      "Being a younger sibling to someone who struggles carries its own complexity. You look up to them. You want to be like them. And when they\u2019re hurting, you feel it in a way that\u2019s hard to explain to anyone who hasn\u2019t been there. Brothers often process grief and worry differently \u2014 more internally, more silently.",
    group: "Joey",
  },
  {
    pageSlug: "families",
    sectionKey: "joey.body-3",
    label: "Joey \u2014 Paragraph 3",
    contentType: "textarea",
    defaultContent:
      "The photos of Sam and Joey together tell a story of two brothers who genuinely enjoyed each other\u2019s company. Reading, adventuring, just being together. That connection doesn\u2019t disappear. It becomes the reason you keep going.",
    group: "Joey",
  },
  {
    pageSlug: "families",
    sectionKey: "nancy.body-1",
    label: "Nancy \u2014 Paragraph 1",
    contentType: "textarea",
    defaultContent:
      "Nancy is Frank\u2019s wife and Sam\u2019s stepmother \u2014 though \u201cstep\u201d never described how she loved him. She chose Sam. She chose this family. And when substance use entered their lives, she carried that weight right alongside everyone else.",
    group: "Nancy",
  },
  {
    pageSlug: "families",
    sectionKey: "nancy.body-2",
    label: "Nancy \u2014 Paragraph 2",
    contentType: "textarea",
    defaultContent:
      "Loving a child through substance use is hard enough. Loving a stepchild through it adds another layer \u2014 the fear of overstepping, the question of whether your voice matters, the reality that your heart breaks just as completely. Nancy never wavered. Not on the hardest days, not in the darkest moments.",
    group: "Nancy",
  },
  {
    pageSlug: "families",
    sectionKey: "nancy.body-3",
    label: "Nancy \u2014 Paragraph 3",
    contentType: "textarea",
    defaultContent:
      "Nancy stood by Sam through everything. She stood by Frank, by Annie, by her son Joey. She was the steady presence in a family navigating something no one prepares you for. Her strength \u2014 quiet, unwavering, absolute \u2014 is woven into every part of this story.",
    group: "Nancy",
  },
  {
    pageSlug: "families",
    sectionKey: "gallery.title",
    label: "Gallery Title",
    contentType: "text",
    defaultContent: "Love You Can See",
    group: "Gallery",
  },
  {
    pageSlug: "families",
    sectionKey: "gallery.subtitle",
    label: "Gallery Subtitle",
    contentType: "textarea",
    defaultContent:
      "These aren\u2019t staged photos. They\u2019re real moments of a real family \u2014 laughing, hugging, adventuring, and loving each other through everything. This is what openness looks like.",
    group: "Gallery",
  },
  {
    pageSlug: "families",
    sectionKey: "cta.title",
    label: "CTA Title",
    contentType: "text",
    defaultContent: "Your Family\u2019s Story Matters Too",
    group: "CTA",
  },
  {
    pageSlug: "families",
    sectionKey: "cta.body-1",
    label: "CTA Body \u2014 Paragraph 1",
    contentType: "textarea",
    defaultContent:
      "The Sheeder family chose openness over silence. That choice became a movement. Whether you\u2019re a parent, sibling, partner, child, or chosen family \u2014 your perspective is part of this story.",
    group: "CTA",
  },
  {
    pageSlug: "families",
    sectionKey: "cta.body-2",
    label: "CTA Body \u2014 Paragraph 2",
    contentType: "textarea",
    defaultContent:
      "You don\u2019t have to share everything. You just have to stop hiding.",
    group: "CTA",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // WORKPLACE PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    pageSlug: "workplace",
    sectionKey: "hero.title",
    label: "Hero Title",
    contentType: "text",
    defaultContent: "The Workplace OATH",
    group: "Hero",
  },
  {
    pageSlug: "workplace",
    sectionKey: "hero.subtitle",
    label: "Hero Subtitle",
    contentType: "textarea",
    defaultContent:
      "Give your team permission to be honest about what they\u2019re going through \u2014 substance use or mental health challenges, or someone in their life who is. The Workplace OATH creates a culture where people get support instead of silence.",
    group: "Hero",
  },
  {
    pageSlug: "workplace",
    sectionKey: "problem.title",
    label: "Problem Section Title",
    contentType: "text",
    defaultContent: "Why This Matters at Work",
    group: "The Problem",
  },
  {
    pageSlug: "workplace",
    sectionKey: "problem.body-1",
    label: "Problem Body \u2014 Paragraph 1",
    contentType: "textarea",
    defaultContent:
      "One in five American adults has a family member struggling with substance use. Most come to work every day and say nothing \u2014 because they don\u2019t feel safe to.",
    group: "The Problem",
  },
  {
    pageSlug: "workplace",
    sectionKey: "problem.body-2",
    label: "Problem Body \u2014 Paragraph 2",
    contentType: "textarea",
    defaultContent:
      "The Workplace OATH changes that. When organizations commit publicly, employees feel safe acknowledging what they\u2019re going through \u2014 and they get help sooner.",
    group: "The Problem",
  },
  {
    pageSlug: "workplace",
    sectionKey: "programs.title",
    label: "Programs Title",
    contentType: "text",
    defaultContent: "How It Works",
    group: "Programs",
  },
  {
    pageSlug: "workplace",
    sectionKey: "programs.subtitle",
    label: "Programs Subtitle",
    contentType: "textarea",
    defaultContent:
      "Three programs designed to build a culture of openness \u2014 flexible for organizations of any size.",
    group: "Programs",
  },
  {
    pageSlug: "workplace",
    sectionKey: "programs.listener-description",
    label: "Safe Listener Training Description",
    contentType: "textarea",
    defaultContent:
      "Train managers and team leads to recognize when a colleague may be struggling, respond with empathy instead of judgment, and connect them to resources. Not therapy \u2014 just human decency at work.",
    group: "Programs",
  },
  {
    pageSlug: "workplace",
    sectionKey: "programs.corporate-description",
    label: "Corporate OATH Description",
    contentType: "textarea",
    defaultContent:
      "A comprehensive program that includes leadership training, employee awareness sessions, resource guides, and ongoing support. Your organization takes Sam's OATH as a whole \u2014 a public commitment to supporting families.",
    group: "Programs",
  },
  {
    pageSlug: "workplace",
    sectionKey: "programs.keynote-description",
    label: "Keynote Speaking Description",
    contentType: "textarea",
    defaultContent:
      "Frank Sheeder shares his family\u2019s story and Sam's OATH framework in a powerful, moving presentation. Ideal for all-hands meetings, wellness weeks, conferences, and leadership retreats.",
    group: "Programs",
  },
  {
    pageSlug: "workplace",
    sectionKey: "changes.title",
    label: "What Changes Title",
    contentType: "text",
    defaultContent: "What Changes",
    group: "What Changes",
  },
  {
    pageSlug: "workplace",
    sectionKey: "cta.title",
    label: "CTA Title",
    contentType: "text",
    defaultContent: "Bring Sam's OATH to Your Organization",
    group: "CTA",
  },
  {
    pageSlug: "workplace",
    sectionKey: "cta.body",
    label: "CTA Body",
    contentType: "textarea",
    defaultContent:
      "Your employees are already carrying this. The question is whether they carry it alone. Let\u2019s talk.",
    group: "CTA",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GET INVOLVED PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    pageSlug: "get-involved",
    sectionKey: "hero.title",
    label: "Hero Title",
    contentType: "text",
    defaultContent: "Every Action Grows the Movement",
    group: "Hero",
  },
  {
    pageSlug: "get-involved",
    sectionKey: "hero.subtitle",
    label: "Hero Subtitle",
    contentType: "textarea",
    defaultContent:
      "Sam's OATH works because people like you choose to show up. Here are the ways your action helps people move from silence to strength.",
    group: "Hero",
  },
  {
    pageSlug: "get-involved",
    sectionKey: "paths.title",
    label: "Paths Section Title",
    contentType: "text",
    defaultContent: "Pick Your Path",
    group: "Paths",
  },
  {
    pageSlug: "get-involved",
    sectionKey: "oath-card.description",
    label: "OATH Card Description",
    contentType: "textarea",
    defaultContent:
      "Sixty seconds. A pin on the map. A person who no longer carries this alone. Then challenge three people you trust to do the same.",
    group: "Paths",
  },
  {
    pageSlug: "get-involved",
    sectionKey: "story-card.description",
    label: "Story Card Description",
    contentType: "textarea",
    defaultContent:
      "When one person shares, another realizes they\u2019re not alone. Your experience \u2014 supporting someone you love, honoring someone\u2019s memory, or walking your own path \u2014 is someone else\u2019s lifeline.",
    group: "Paths",
  },
  {
    pageSlug: "get-involved",
    sectionKey: "ambassador-card.description",
    label: "Ambassador Card Description",
    contentType: "textarea",
    defaultContent:
      "Be the person who brings Sam's OATH to your community. Ambassadors connect people to the movement and make openness normal where they live.",
    group: "Paths",
  },
  {
    pageSlug: "get-involved",
    sectionKey: "spread-card.description",
    label: "Spread the Word Description",
    contentType: "textarea",
    defaultContent:
      "Every conversation about Sam's OATH makes it easier for someone to come forward. Share on social media, mention it at dinner, bring it up at work. Your voice gives others permission.",
    group: "Paths",
  },
  {
    pageSlug: "get-involved",
    sectionKey: "orgs.title",
    label: "Organizations Title",
    contentType: "text",
    defaultContent: "For Organizations",
    group: "Organizations",
  },
  {
    pageSlug: "get-involved",
    sectionKey: "orgs.subtitle",
    label: "Organizations Subtitle",
    contentType: "textarea",
    defaultContent:
      "Bring Sam's OATH into your workplace, school, or community organization.",
    group: "Organizations",
  },
  {
    pageSlug: "get-involved",
    sectionKey: "newsletter.title",
    label: "Newsletter Title",
    contentType: "text",
    defaultContent: "Stay in the Loop",
    group: "Newsletter",
  },
  {
    pageSlug: "get-involved",
    sectionKey: "newsletter.body",
    label: "Newsletter Body",
    contentType: "textarea",
    defaultContent:
      "Get movement updates, new stories, and ways to help \u2014 delivered to your inbox. No spam, ever.",
    group: "Newsletter",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONTACT PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    pageSlug: "contact",
    sectionKey: "hero.eyebrow",
    label: "Hero Eyebrow",
    contentType: "text",
    defaultContent: "Get In Touch",
    group: "Hero",
  },
  {
    pageSlug: "contact",
    sectionKey: "hero.title",
    label: "Hero Title",
    contentType: "text",
    defaultContent: "Let\u2019s Connect",
    group: "Hero",
  },
  {
    pageSlug: "contact",
    sectionKey: "hero.subtitle",
    label: "Hero Subtitle",
    contentType: "textarea",
    defaultContent:
      "Whether you want to share your story, bring Sam's OATH to your workplace, or simply say hello \u2014 we\u2019re here and we\u2019re listening.",
    group: "Hero",
  },
  {
    pageSlug: "contact",
    sectionKey: "help.title",
    label: "How Can We Help Title",
    contentType: "text",
    defaultContent: "How Can We Help?",
    group: "Contact Types",
  },
  {
    pageSlug: "contact",
    sectionKey: "help.subtitle",
    label: "How Can We Help Subtitle",
    contentType: "textarea",
    defaultContent:
      "Select a category below when you fill out the form, and we\u2019ll route your message to the right person.",
    group: "Contact Types",
  },
  {
    pageSlug: "contact",
    sectionKey: "form.title",
    label: "Form Section Title",
    contentType: "text",
    defaultContent: "Send Us a Message",
    group: "Form",
  },
  {
    pageSlug: "contact",
    sectionKey: "form.body",
    label: "Form Section Body",
    contentType: "textarea",
    defaultContent:
      "We typically respond within 1-2 business days. For urgent matters or crisis support, please call 988.",
    group: "Form",
  },
  {
    pageSlug: "contact",
    sectionKey: "media.title",
    label: "Media Section Title",
    contentType: "text",
    defaultContent: "For Media & Press",
    group: "Media",
  },
  {
    pageSlug: "contact",
    sectionKey: "media.body",
    label: "Media Section Body",
    contentType: "textarea",
    defaultContent:
      "Sam\u2019s OATH is available for interviews, features, and media collaborations. Frank Sheeder has spoken about the movement on podcasts, at conferences, and in publications.",
    group: "Media",
  },
  {
    pageSlug: "contact",
    sectionKey: "cta.title",
    label: "CTA Title",
    contentType: "text",
    defaultContent: "Join the Movement Today",
    group: "CTA",
  },
  {
    pageSlug: "contact",
    sectionKey: "cta.body",
    label: "CTA Body",
    contentType: "textarea",
    defaultContent:
      "You don\u2019t need permission to be part of this. Take Sam\u2019s OATH, share your story, or simply tell someone you know about Sam\u2019s OATH. Every conversation is a step toward healing.",
    group: "CTA",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PRESS PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    pageSlug: "press",
    sectionKey: "hero.title",
    label: "Hero Title",
    contentType: "text",
    defaultContent: "Press & Media",
    group: "Hero",
  },
  {
    pageSlug: "press",
    sectionKey: "hero.subtitle",
    label: "Hero Subtitle",
    contentType: "textarea",
    defaultContent:
      "Resources for journalists, producers, and media professionals covering the movement to break silence around substance use and mental health.",
    group: "Hero",
  },
  {
    pageSlug: "press",
    sectionKey: "origin.body-1",
    label: "Origin Story \u2014 Paragraph 1",
    contentType: "textarea",
    defaultContent:
      "Sam Sheeder (1998\u20132025) lit up every room he walked into. He was handsome, adventurous, and could strike up a conversation with anyone \u2014 from CEOs to those experiencing homelessness \u2014 making them feel seen and heard. He faced the hard road of substance use disorder with extraordinary courage and honesty, refusing to let stigma define him.",
    group: "Origin Story",
  },
  {
    pageSlug: "press",
    sectionKey: "origin.body-2",
    label: "Origin Story \u2014 Paragraph 2",
    contentType: "textarea",
    defaultContent:
      "After Sam passed away on September 28, 2025, his father Frank made a decision that changed everything. Instead of retreating into silence, Frank wrote openly on LinkedIn about Sam\u2019s life, his struggles, and his love. That post reached 345,000 people. Nearly 2,000 reactions. 484 comments. All saying the same thing: \u201cI thought I was the only one.\u201d",
    group: "Origin Story",
  },
  {
    pageSlug: "press",
    sectionKey: "origin.body-3",
    label: "Origin Story \u2014 Paragraph 3",
    contentType: "textarea",
    defaultContent:
      "Frank realized the silence itself was the crisis. Sam\u2019s OATH was born from that revelation \u2014 a movement built on the belief that what\u2019s hidden doesn\u2019t heal, and that healing begins when silence ends, and that community is where recovery starts.",
    group: "Origin Story",
  },
  {
    pageSlug: "press",
    sectionKey: "frank-bio.body-1",
    label: "Frank Bio \u2014 Paragraph 1",
    contentType: "textarea",
    defaultContent:
      "Frank Sheeder is a father, advocate, songwriter, and speaker. After losing his son Sam to substance use disorder in 2025, he channeled his grief into a national movement to break the silence that surrounds families affected by substance use and mental health challenges.",
    group: "Founder Bio",
  },
  {
    pageSlug: "press",
    sectionKey: "frank-bio.body-2",
    label: "Frank Bio \u2014 Paragraph 2",
    contentType: "textarea",
    defaultContent:
      "A seasoned business leader with decades of experience building organizations and leading teams, Frank brings the same strategic thinking and relentless energy to Sam\u2019s OATH. He is the songwriter behind all 15 original tracks on the Sam\u2019s OATH album, available on Apple Music, Spotify, YouTube, and all major streaming platforms.",
    group: "Founder Bio",
  },
  {
    pageSlug: "press",
    sectionKey: "frank-bio.body-3",
    label: "Frank Bio \u2014 Paragraph 3",
    contentType: "textarea",
    defaultContent:
      "Frank\u2019s LinkedIn post about Sam reached over 345,000 people and became one of the platform\u2019s most-engaged personal posts on substance use and mental health. He speaks to organizations, schools, and communities about breaking silence in the workplace and at home.",
    group: "Founder Bio",
  },
  {
    pageSlug: "press",
    sectionKey: "media-contact.body",
    label: "Media Contact Body",
    contentType: "textarea",
    defaultContent:
      "For interviews, press inquiries, or to request additional materials, please reach out.",
    group: "Media Contact",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SHARE YOUR STORY PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    pageSlug: "share-your-story",
    sectionKey: "hero.eyebrow",
    label: "Hero Eyebrow",
    contentType: "text",
    defaultContent: "Your Voice Matters",
    group: "Hero",
  },
  {
    pageSlug: "share-your-story",
    sectionKey: "hero.title",
    label: "Hero Title",
    contentType: "text",
    defaultContent: "Your Story Matters",
    group: "Hero",
  },
  {
    pageSlug: "share-your-story",
    sectionKey: "hero.subtitle",
    label: "Hero Subtitle",
    contentType: "textarea",
    defaultContent:
      "You don\u2019t need perfect words. You just need the willingness to be honest. Your story could be the reason someone else stops hiding.",
    group: "Hero",
  },
  {
    pageSlug: "share-your-story",
    sectionKey: "why.title",
    label: "Why Share Title",
    contentType: "text",
    defaultContent: "Why Share Your Story?",
    group: "Why Share",
  },
  {
    pageSlug: "share-your-story",
    sectionKey: "why.subtitle",
    label: "Why Share Subtitle",
    contentType: "textarea",
    defaultContent:
      "Every story shared chips away at the wall of silence that keeps people isolated.",
    group: "Why Share",
  },
  {
    pageSlug: "share-your-story",
    sectionKey: "privacy.title",
    label: "Privacy Title",
    contentType: "text",
    defaultContent: "Your Privacy. Your Terms.",
    group: "Privacy",
  },
  {
    pageSlug: "share-your-story",
    sectionKey: "privacy.subtitle",
    label: "Privacy Subtitle",
    contentType: "textarea",
    defaultContent:
      "We treat every story with care. Here\u2019s how we protect you.",
    group: "Privacy",
  },
  {
    pageSlug: "share-your-story",
    sectionKey: "form.title",
    label: "Form Title",
    contentType: "text",
    defaultContent: "Tell Us Your Story",
    group: "Form",
  },
  {
    pageSlug: "share-your-story",
    sectionKey: "form.body",
    label: "Form Body",
    contentType: "textarea",
    defaultContent:
      "Whether it\u2019s a paragraph or a page, whether you\u2019re sharing about yourself or someone you love \u2014 we\u2019re listening.",
    group: "Form",
  },
  {
    pageSlug: "share-your-story",
    sectionKey: "cta.title",
    label: "CTA Title",
    contentType: "text",
    defaultContent: "Not Ready to Share Yet?",
    group: "CTA",
  },
  {
    pageSlug: "share-your-story",
    sectionKey: "cta.body",
    label: "CTA Body",
    contentType: "textarea",
    defaultContent:
      "That\u2019s okay. There\u2019s no pressure and no timeline. You can start by taking Sam's OATH \u2014 a 60-second commitment to break the silence. When you\u2019re ready to share more, we\u2019ll be here.",
    group: "CTA",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RESOURCES PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    pageSlug: "resources",
    sectionKey: "hero.eyebrow",
    label: "Hero Eyebrow",
    contentType: "text",
    defaultContent: "Help & Support",
    group: "Hero",
  },
  {
    pageSlug: "resources",
    sectionKey: "hero.title",
    label: "Hero Title",
    contentType: "text",
    defaultContent: "You Are Not Alone",
    group: "Hero",
  },
  {
    pageSlug: "resources",
    sectionKey: "hero.subtitle",
    label: "Hero Subtitle",
    contentType: "textarea",
    defaultContent:
      "Whether you\u2019re in crisis, supporting a loved one, or looking for guidance \u2014 help is available right now. You don\u2019t have to figure this out by yourself.",
    group: "Hero",
  },
  {
    pageSlug: "resources",
    sectionKey: "leadin.body",
    label: "Lead-in Body",
    contentType: "textarea",
    defaultContent:
      "Sam\u2019s OATH is a movement, not a treatment program \u2014 but we know that breaking the silence is only the first step. Below you\u2019ll find crisis hotlines you can call right now, guides for families navigating substance use and mental health, language tools that reduce stigma, and organizations that offer direct support. Everything here is free and chosen with families like yours in mind.",
    group: "Lead-in",
  },
  {
    pageSlug: "resources",
    sectionKey: "crisis.title",
    label: "Crisis Section Title",
    contentType: "text",
    defaultContent: "If You Need Help Right Now",
    group: "Crisis Help",
  },
  {
    pageSlug: "resources",
    sectionKey: "crisis.subtitle",
    label: "Crisis Section Subtitle",
    contentType: "textarea",
    defaultContent:
      "These services are free, confidential, and available 24/7. Tap a button to call or text directly from your phone.",
    group: "Crisis Help",
  },
  {
    pageSlug: "resources",
    sectionKey: "language.title",
    label: "Language Section Title",
    contentType: "text",
    defaultContent: "Language That Heals",
    group: "Language",
  },
  {
    pageSlug: "resources",
    sectionKey: "language.subtitle",
    label: "Language Section Subtitle",
    contentType: "textarea",
    defaultContent:
      "The words we choose shape whether someone feels safe enough to ask for help. Empathetic, person-first language reminds people that they are more than a diagnosis \u2014 and that they deserve compassion, not judgment.",
    group: "Language",
  },
  {
    pageSlug: "resources",
    sectionKey: "support.title",
    label: "Support Orgs Title",
    contentType: "text",
    defaultContent: "Support Organizations",
    group: "Support",
  },
  {
    pageSlug: "resources",
    sectionKey: "support.subtitle",
    label: "Support Orgs Subtitle",
    contentType: "textarea",
    defaultContent:
      "These national organizations offer ongoing support, education, and community for individuals and families.",
    group: "Support",
  },
  {
    pageSlug: "resources",
    sectionKey: "families.title",
    label: "For Families Title",
    contentType: "text",
    defaultContent: "Supporting a Loved One",
    group: "For Families",
  },
  {
    pageSlug: "resources",
    sectionKey: "families.subtitle",
    label: "For Families Subtitle",
    contentType: "textarea",
    defaultContent:
      "If someone you love is struggling with substance use or mental health, here are some ways to show up for them.",
    group: "For Families",
  },
  {
    pageSlug: "resources",
    sectionKey: "reading.title",
    label: "Reading Title",
    contentType: "text",
    defaultContent: "Recommended Reading",
    group: "Reading",
  },
  {
    pageSlug: "resources",
    sectionKey: "reading.subtitle",
    label: "Reading Subtitle",
    contentType: "textarea",
    defaultContent:
      "Books and articles that have helped families on this journey.",
    group: "Reading",
  },
  {
    pageSlug: "resources",
    sectionKey: "cta.title",
    label: "CTA Title",
    contentType: "text",
    defaultContent: "You Don\u2019t Have to Do This Alone",
    group: "CTA",
  },
  {
    pageSlug: "resources",
    sectionKey: "cta.body",
    label: "CTA Body",
    contentType: "textarea",
    defaultContent:
      "If you or someone you know is struggling with substance use, mental health challenges, or grief \u2014 please reach out. Help is available. You are worthy of support, and your pain matters.",
    group: "CTA",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MAP PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    pageSlug: "map",
    sectionKey: "hero.badge",
    label: "Hero Badge",
    contentType: "text",
    defaultContent: "The Centerpiece of the Movement",
    group: "Hero",
  },
  {
    pageSlug: "map",
    sectionKey: "hero.title",
    label: "Hero Title",
    contentType: "text",
    defaultContent: "This Is What Happens When\nFamilies Stop Hiding",
    group: "Hero",
  },
  {
    pageSlug: "map",
    sectionKey: "hero.subtitle",
    label: "Hero Subtitle",
    contentType: "textarea",
    defaultContent:
      "Every pin on this map is someone who decided that silence was no longer an option. A parent, a sibling, a friend, a person in recovery \u2014 each one proving that no family has to face this alone.",
    group: "Hero",
  },
  {
    pageSlug: "map",
    sectionKey: "hero.body",
    label: "Hero Body",
    contentType: "textarea",
    defaultContent:
      "This map isn\u2019t data. It\u2019s proof. Proof that when one person speaks up, others find the courage to do the same.",
    group: "Hero",
  },
  {
    pageSlug: "map",
    sectionKey: "add-pin.title",
    label: "Add Pin Title",
    contentType: "text",
    defaultContent: "Add Your Pin to the Map",
    group: "Add Pin",
  },
  {
    pageSlug: "map",
    sectionKey: "add-pin.subtitle",
    label: "Add Pin Subtitle",
    contentType: "textarea",
    defaultContent:
      "Every pin makes the next family feel less alone. Whether you\u2019re supporting someone you love, standing in solidarity, or walking your own path to recovery \u2014 your pin matters.",
    group: "Add Pin",
  },
  {
    pageSlug: "map",
    sectionKey: "closing.title",
    label: "Closing Title",
    contentType: "text",
    defaultContent: "Silence Ends One Pin at a Time",
    group: "Closing",
  },
  {
    pageSlug: "map",
    sectionKey: "closing.body",
    label: "Closing Body",
    contentType: "textarea",
    defaultContent:
      "Every community in America has families carrying this weight in secret. The map proves they don\u2019t have to. When you add your pin, you\u2019re not just joining a movement \u2014 you\u2019re giving someone else permission to join too.",
    group: "Closing",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AMBASSADORS PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    pageSlug: "ambassadors",
    sectionKey: "hero.title",
    label: "Hero Title",
    contentType: "text",
    defaultContent: "OATH Ambassadors",
    group: "Hero",
  },
  {
    pageSlug: "ambassadors",
    sectionKey: "hero.subtitle",
    label: "Hero Subtitle",
    contentType: "textarea",
    defaultContent:
      "Ambassadors make Sam's OATH real where they live. They\u2019re the reason people in their community find out they don\u2019t have to carry this alone.",
    group: "Hero",
  },
  {
    pageSlug: "ambassadors",
    sectionKey: "what.title",
    label: "What Ambassadors Do Title",
    contentType: "text",
    defaultContent: "What Ambassadors Do",
    group: "What They Do",
  },
  {
    pageSlug: "ambassadors",
    sectionKey: "profiles.title",
    label: "Profiles Title",
    contentType: "text",
    defaultContent: "Our Ambassadors",
    group: "Profiles",
  },
  {
    pageSlug: "ambassadors",
    sectionKey: "profiles.subtitle",
    label: "Profiles Subtitle",
    contentType: "textarea",
    defaultContent:
      "Meet the people leading the movement across the country.",
    group: "Profiles",
  },
  {
    pageSlug: "ambassadors",
    sectionKey: "how.title",
    label: "How to Become Title",
    contentType: "text",
    defaultContent: "How to Become an Ambassador",
    group: "How To",
  },
  {
    pageSlug: "ambassadors",
    sectionKey: "look-for.title",
    label: "What We Look For Title",
    contentType: "text",
    defaultContent: "What We Look For",
    group: "What We Look For",
  },
  {
    pageSlug: "ambassadors",
    sectionKey: "form.title",
    label: "Form Title",
    contentType: "text",
    defaultContent: "Apply to Be an Ambassador",
    group: "Form",
  },
  {
    pageSlug: "ambassadors",
    sectionKey: "form.subtitle",
    label: "Form Subtitle",
    contentType: "textarea",
    defaultContent:
      "Tell us about yourself and why you want to represent Sam\u2019s OATH in your community.",
    group: "Form",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BLOG PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    pageSlug: "blog",
    sectionKey: "hero.title",
    label: "Hero Title",
    contentType: "text",
    defaultContent: "Updates & News",
    group: "Hero",
  },
  {
    pageSlug: "blog",
    sectionKey: "hero.subtitle",
    label: "Hero Subtitle",
    contentType: "textarea",
    defaultContent:
      "Updates from the movement, reflections from Frank, and stories of families finding their voice.",
    group: "Hero",
  },
  {
    pageSlug: "blog",
    sectionKey: "empty.title",
    label: "Empty State Title",
    contentType: "text",
    defaultContent: "Coming Soon",
    group: "Empty State",
  },
  {
    pageSlug: "blog",
    sectionKey: "empty.body",
    label: "Empty State Body",
    contentType: "textarea",
    defaultContent:
      "We\u2019re getting ready to share updates, reflections, and news from the movement. Check back soon or subscribe to our newsletter to be the first to know.",
    group: "Empty State",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STORIES PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    pageSlug: "stories",
    sectionKey: "hero.eyebrow",
    label: "Hero Eyebrow",
    contentType: "text",
    defaultContent: "Community Voices",
    group: "Hero",
  },
  {
    pageSlug: "stories",
    sectionKey: "hero.title",
    label: "Hero Title",
    contentType: "text",
    defaultContent: "Stories of Courage",
    group: "Hero",
  },
  {
    pageSlug: "stories",
    sectionKey: "hero.subtitle",
    label: "Hero Subtitle",
    contentType: "textarea",
    defaultContent:
      "Every story shared is a step away from silence and toward healing. These are real voices from real families who chose openness over shame.",
    group: "Hero",
  },
  {
    pageSlug: "stories",
    sectionKey: "why.title",
    label: "Why Stories Matter Title",
    contentType: "text",
    defaultContent: "Why Stories Matter",
    group: "Why Stories Matter",
  },
  {
    pageSlug: "stories",
    sectionKey: "why.subtitle",
    label: "Why Stories Matter Subtitle",
    contentType: "textarea",
    defaultContent:
      "Every story is an act of courage. Here\u2019s what happens when families speak up.",
    group: "Why Stories Matter",
  },
  {
    pageSlug: "stories",
    sectionKey: "cta.title",
    label: "CTA Title",
    contentType: "text",
    defaultContent: "Your Story Could Change a Life",
    group: "CTA",
  },
  {
    pageSlug: "stories",
    sectionKey: "cta.body",
    label: "CTA Body",
    contentType: "textarea",
    defaultContent:
      "You don\u2019t have to be a writer. You don\u2019t have to have it all figured out. You just have to be willing to be honest. Your story \u2014 in any form, at any length \u2014 matters.",
    group: "CTA",
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
