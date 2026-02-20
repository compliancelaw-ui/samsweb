import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Users,
  ArrowRight,
  Music,
  HandHeart,
  Handshake,
  Camera,
  Play,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "The Sheeder Family | Sam's OATH",
  description:
    "Substance use and mental health affect every member of the family. Meet the Sheeder family — Frank, Nancy, Annie, Joey, and Rony — and see the love that drives the movement.",
};

export default function FamiliesPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange to-primary py-24 md:py-32">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center">
          <p className="text-orange-200 text-lg font-medium mb-4 tracking-wide uppercase">
            The Sheeder Family
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Every Family Has a Story. This Is Ours.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Substance use didn&apos;t happen to just one person in this family.
            It happened to all of them. A father, a sister, brothers, a
            stepmother who loved him as her own &mdash; each carrying their own
            weight, together.
          </p>
        </div>
      </section>

      {/* ===== INTRODUCTION ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-6">A Family&apos;s Experience</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              When someone you love struggles with substance use, the whole
              family feels it. Not in the same way &mdash; but deeply. A father
              buries his fear under long work days. A stepmother loves a child
              as her own while holding back tears. A sister watches her brother
              disappear into someone she doesn&apos;t recognize. A brother
              loses the person he&apos;s closest to. A best friend doesn&apos;t
              know what to say.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              For the Sheeder family, the hardest part wasn&apos;t the struggle
              itself. It was the silence. For years, each of them carried their
              pain alone &mdash; privately, quietly, the way society tells you
              to. After Sam&apos;s death, the family made a different choice.
              They chose openness. They chose each other. And they chose to make
              sure no other family has to carry this weight in silence.
            </p>
            <blockquote className="border-l-4 border-orange pl-6 my-8 italic text-lg text-gray-700">
              &ldquo;We never doubted for a moment that Sam loved each of us with
              his whole heart. What brings us immense comfort is knowing that Sam
              was just as certain of our unconditional love for him.&rdquo;
            </blockquote>
            <p className="text-gray-600 text-lg leading-relaxed">
              Each member of the Sheeder family is sharing their story &mdash; in
              their own voice, in their own words.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/photos/family-beach-sunset.jpg"
              alt="The Sheeder family at sunset"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* ===== FRANK: A FATHER ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/photos/frank-sam-concert.jpg"
                alt="Frank and Sam at a concert"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Heart className="w-4 h-4" />A Father&apos;s Perspective
              </div>
              <h2 className="mb-6">Frank</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Frank Sheeder is Sam&apos;s father. A business leader, a
                  songwriter, and the founder of Sam&apos;s OATH. But before any
                  of that, he was a dad who loved his son unconditionally &mdash;
                  and who felt completely alone while doing it.
                </p>
                <p>
                  For years, Frank stayed silent about what his family was going
                  through. Even in a supportive workplace, surrounded by
                  colleagues who cared about him, he never said a word. The
                  shame, the guilt, the helplessness &mdash; he carried all of
                  it privately. He wondered what he could have done differently.
                  He wondered if anyone would understand.
                </p>
                <p>
                  After losing Sam, Frank made a decision that changed
                  everything. He wrote about his son publicly on LinkedIn
                  &mdash; openly, honestly, without filter. That post reached
                  over 345,000 people. Nearly 2,000 reactions. 484 comments.
                  Families everywhere responded, saying the same thing:
                  &ldquo;I thought I was the only one.&rdquo;
                </p>
                <p>
                  Frank channeled that grief into purpose. He wrote 15 original
                  songs, founded Sam&apos;s OATH, and committed his life to
                  making sure no parent ever has to grieve in silence again.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
                <Music className="w-4 h-4 text-primary" />
                <span>
                  Listen to Frank&apos;s music on the{" "}
                  <Link
                    href="/music"
                    className="text-primary font-medium hover:text-primary-600 transition-colors"
                  >
                    Sam&apos;s OATH album
                  </Link>
                </span>
              </div>
            </div>
          </div>
          {/* Additional Frank photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/photos/frank-sam-boat.jpg"
                alt="Frank and Sam Sheeder"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/photos/frank-sam-lighthouse.jpg"
                alt="Frank and Sam boating"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          {/* Frank video placeholder */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900/5 border border-gray-200 flex items-center justify-center group cursor-pointer hover:bg-gray-900/10 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Play className="w-8 h-8 text-primary" />
                </div>
                <p className="font-semibold text-gray-900">Frank&apos;s Story</p>
                <p className="text-sm text-gray-500">Video coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== ANNIE: A SISTER ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal px-4 py-2 rounded-full text-sm font-medium mb-4">
                <HandHeart className="w-4 h-4" />A Sister&apos;s Perspective
              </div>
              <h2 className="mb-6">Annie</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Annie is Sam&apos;s sister. Growing up alongside a sibling who
                  struggles is its own kind of journey &mdash; one that often
                  goes unspoken. Siblings see things parents don&apos;t. They
                  share a closeness that can make the pain feel even sharper,
                  because the person you&apos;re losing is also the person you
                  grew up with, the person who knows you better than almost
                  anyone.
                </p>
                <p>
                  Look at any photo of Sam and Annie together and one thing is
                  immediately clear: these two shared a beautiful, loving bond.
                  Sam had a way of making Annie smile &mdash; genuinely,
                  joyfully, the kind of smile that shows in your whole face.
                  Frank has said these are some of his favorite photos in the
                  world.
                </p>
                <p>
                  One of the 15 songs on the Sam&apos;s OATH album is called
                  &ldquo;For Annie&rdquo; &mdash; written from a sister&apos;s
                  perspective, about the unique grief and love that siblings
                  carry. It&apos;s a reminder that when we talk about families
                  affected by substance use, siblings deserve to be heard too.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
                <Music className="w-4 h-4 text-teal" />
                <span>
                  Listen to &ldquo;For Annie&rdquo; on the{" "}
                  <Link
                    href="/music"
                    className="text-teal font-medium hover:text-teal-600 transition-colors"
                  >
                    Sam&apos;s OATH album
                  </Link>
                </span>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/photos/sam-annie-smile-1.jpg"
                  alt="Sam making his sister Annie smile"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                  <p className="text-white text-sm italic">
                    One of Frank&apos;s favorite photos &mdash; Sam making Annie
                    smile
                  </p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/photos/sam-annie-smile-2.jpg"
                  alt="Sam and Annie sharing a moment"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          {/* Additional Annie photos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/photos/sam-annie-siblings.jpg"
                alt="Sam and Annie Sheeder"
                width={500}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/photos/sam-annie-fall.jpg"
                alt="Sam and Annie in autumn"
                width={500}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/photos/sam-annie-dog.jpg"
                alt="Sam and Annie with their dog"
                width={500}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          {/* Annie video placeholder */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900/5 border border-gray-200 flex items-center justify-center group cursor-pointer hover:bg-gray-900/10 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-3">
                  <Play className="w-8 h-8 text-teal" />
                </div>
                <p className="font-semibold text-gray-900">Annie&apos;s Story</p>
                <p className="text-sm text-gray-500">Video coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== JOEY: A BROTHER ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/photos/sam-joey-reading.jpg"
                alt="Sam and Joey reading together"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-sage-50 text-sage px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Users className="w-4 h-4" />A Brother&apos;s Perspective
              </div>
              <h2 className="mb-6">Joey</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Joey is Nancy&apos;s son &mdash; and Sam&apos;s brother. Not
                  &ldquo;step.&rdquo; Just brothers. They shared the kind of
                  bond that brothers do &mdash; quiet moments reading side by
                  side in armchairs, loud days riding ATVs, long afternoons out
                  on the water. The everyday stuff that, looking back, turns out
                  to be everything.
                </p>
                <p>
                  Being a younger sibling to someone who struggles carries its
                  own complexity. You look up to them. You want to be like them.
                  And when they&apos;re hurting, you feel it in a way that&apos;s
                  hard to explain to anyone who hasn&apos;t been there. Brothers
                  often process grief and worry differently &mdash; more
                  internally, more silently.
                </p>
                <p>
                  The photos of Sam and Joey together tell a story of two
                  brothers who genuinely enjoyed each other&apos;s company.
                  Reading, adventuring, just being together. That connection
                  doesn&apos;t disappear. It becomes the reason you keep going.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/photos/sam-joey-atv.jpg"
                alt="Sam and Joey on an ATV"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-md bg-sage-50 flex items-center justify-center p-8">
              <blockquote className="text-center">
                <p className="text-sage-700 text-lg italic leading-relaxed">
                  &ldquo;The everyday stuff &mdash; reading, riding, boating
                  &mdash; turns out to be everything.&rdquo;
                </p>
              </blockquote>
            </div>
          </div>
          {/* Joey video placeholder */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900/5 border border-gray-200 flex items-center justify-center group cursor-pointer hover:bg-gray-900/10 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-3">
                  <Play className="w-8 h-8 text-sage" />
                </div>
                <p className="font-semibold text-gray-900">Joey&apos;s Story</p>
                <p className="text-sm text-gray-500">Video coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== NANCY: A STEPMOTHER ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Heart className="w-4 h-4" />A Stepmother&apos;s Perspective
              </div>
              <h2 className="mb-6">Nancy</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Nancy is Frank&apos;s wife and Sam&apos;s stepmother &mdash;
                  though &ldquo;step&rdquo; never described how she loved him.
                  She chose Sam. She chose this family. And when substance use
                  entered their lives, she carried that weight right alongside
                  everyone else.
                </p>
                <p>
                  Loving a child through substance use is hard enough. Loving a
                  stepchild through it adds another layer &mdash; the fear of
                  overstepping, the question of whether your voice matters, the
                  reality that your heart breaks just as completely. Nancy never
                  wavered. Not on the hardest days, not in the darkest moments.
                </p>
                <p>
                  Nancy stood by Sam through everything. She stood by Frank, by
                  Annie, by her son Joey. She was the steady presence in a family
                  navigating something no one prepares you for. Her strength
                  &mdash; quiet, unwavering, absolute &mdash; is woven into
                  every part of this story.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/photos/frank-nancy-sunset.jpg"
                  alt="Frank and Nancy Sheeder"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                  <p className="text-white text-sm italic">
                    Frank and Nancy &mdash; partners in life and in this mission
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Nancy video placeholder */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900/5 border border-gray-200 flex items-center justify-center group cursor-pointer hover:bg-gray-900/10 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange/10 flex items-center justify-center mx-auto mb-3">
                  <Play className="w-8 h-8 text-orange" />
                </div>
                <p className="font-semibold text-gray-900">Nancy&apos;s Story</p>
                <p className="text-sm text-gray-500">Video coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== RONY: CHOSEN FAMILY ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/photos/sam-rony.jpg"
                alt="Sam and his chosen brother Rony"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <p className="text-white text-sm italic">
                  Sam and Rony with their deep-fried turkey &mdash; chosen
                  brothers
                </p>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Handshake className="w-4 h-4" />
                Chosen Family
              </div>
              <h2 className="mb-6">Rony</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Sam&apos;s circle of friends knew no boundaries. He moved with
                  ease among people from all walks of life, and so many people
                  called Sam their brother. Rony Robinson is one of them &mdash;
                  Sam&apos;s chosen brother, proof that the bonds we choose can
                  be just as deep, just as real, and just as powerful as the ones
                  we&apos;re born into.
                </p>
                <p>
                  Sam and Rony shared the kind of friendship that becomes
                  family. They cooked together &mdash; including a memorable
                  deep-fried turkey. They shared experiences, supported each
                  other, and built a bond that went beyond anything casual.
                  When someone you love that deeply is struggling, it
                  doesn&apos;t matter whether you share DNA. The worry is
                  the same. The helplessness is the same. The love is the same.
                </p>
                <p>
                  Rony&apos;s presence in this family&apos;s story is a
                  powerful reminder: if someone you consider family is
                  struggling with substance use or mental health, you are a
                  family member affected by this crisis. Your grief is valid.
                  Your voice matters. You belong in this conversation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== FAMILY PHOTO GALLERY ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Camera className="w-4 h-4" />
              Family Moments
            </div>
            <h2 className="mb-4">Love You Can See</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These aren&apos;t staged photos. They&apos;re real moments of a
              real family &mdash; laughing, hugging, adventuring, and loving each
              other through everything. This is what openness looks like.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: "/images/photos/family-couch.jpg",
                alt: "Frank, Annie, and Sam laughing together",
                caption: "Frank, Annie, and Sam",
              },
              {
                src: "/images/photos/family-hug.jpg",
                alt: "The Sheeder family",
                caption: "Annie, Frank, and Sam",
              },
              {
                src: "/images/photos/sam-annie-smile-1.jpg",
                alt: "Sam making his sister Annie smile",
                caption: "Sam and Annie",
              },
              {
                src: "/images/photos/frank-sam-boat.jpg",
                alt: "Frank and Sam Sheeder",
                caption: "Frank and Sam",
              },
              {
                src: "/images/photos/sam-joey-reading.jpg",
                alt: "Sam and Joey reading together",
                caption: "Sam and Joey",
              },
              {
                src: "/images/photos/sam-rony.jpg",
                alt: "Sam and his chosen brother Rony",
                caption: "Sam and Rony",
              },
              {
                src: "/images/photos/frank-nancy-sunset.jpg",
                alt: "Frank and Nancy Sheeder",
                caption: "Frank and Nancy",
              },
              {
                src: "/images/photos/sam-annie-siblings.jpg",
                alt: "Sam and Annie Sheeder",
                caption: "Sam and Annie",
              },
              {
                src: "/images/photos/family-beach-sunset.jpg",
                alt: "The Sheeder family at sunset",
                caption: "The Sheeder family",
              },
            ].map((photo) => (
              <div
                key={photo.src}
                className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={600}
                  height={450}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-medium">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ===== CTA ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-2xl mx-auto text-center">
          <Heart className="w-10 h-10 text-orange mx-auto mb-4" />
          <h2 className="mb-4">Your Family&apos;s Story Matters Too</h2>
          <p className="text-gray-600 text-lg mb-4">
            The Sheeder family chose openness over silence. That choice became a
            movement. Whether you&apos;re a parent, sibling, partner, child, or
            chosen family &mdash; your perspective is part of this story.
          </p>
          <p className="text-gray-600 text-lg mb-8">
            You don&apos;t have to share everything. You just have to stop
            hiding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/share-your-story"
              className="inline-flex items-center justify-center gap-2 bg-orange text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Share Your Story <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 bg-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors"
            >
              <Users className="w-4 h-4" />
              Take Sam&apos;s OATH
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
