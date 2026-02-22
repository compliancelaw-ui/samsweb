import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ArrowRight,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { MUSIC_TRACKS } from "@/lib/constants";
import { SocialFollowButtonsLabeled } from "@/components/ui/social-follow-buttons";

export const metadata: Metadata = {
  title: "Original Music for Healing | Songs About Addiction & Loss",
  description:
    "Listen to 15 original songs about addiction, grief, family love, and hope. Music that speaks what words alone cannot say. From the Sam's OATH movement.",
};

export default function MusicPage() {
  return (
    <>
      {/* ===== HERO — split with Sam at piano ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal py-16 md:py-24">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
                Original Music
              </p>
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Music That Heals
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                15 original songs written for every family that knows the
                weight of silence — and the relief of finally being heard.
                Music has a way of saying what words alone can&apos;t.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/photos/sam-piano.jpg"
                alt="Sam at the piano"
                width={1295}
                height={1632}
                className="w-full max-w-sm h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED TRACK — APPLE MUSIC EMBED ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-orange font-medium mb-2 uppercase tracking-wide text-sm">
              Featured Track
            </p>
            <h2 className="mb-4">What&apos;s Hidden Doesn&apos;t Heal</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The title track and anthem of the movement. A declaration that
              silence is not safety, and healing begins when we speak.
            </p>
          </div>

          {/* Apple Music embed — featured track */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0"
              height="175"
              style={{ width: "100%", overflow: "hidden", borderRadius: "10px" }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src="https://embed.music.apple.com/us/album/whats-hidden-doesnt-heal/1863071795"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* ===== ALL TRACKS WITH EMBEDS ===== */}
      <SectionWrapper variant="light">
        <div className="text-center mb-12">
          <h2 className="mb-4">All 15 Tracks</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Each song carries a piece of this movement&apos;s heart. From grief
            to hope, from silence to strength — this is the soundtrack of
            healing.
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-4">
          {MUSIC_TRACKS.map((track, index) => (
            <div key={track.title} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-4 p-4 pb-2">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {track.title}
                  </h3>
                  <p className="text-sm text-gray-500">{track.theme}</p>
                </div>
              </div>
              <div className="px-4 pb-4">
                <iframe
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                  frameBorder="0"
                  height="52"
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: "8px",
                  }}
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  src={`https://embed.music.apple.com/us/album/${track.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${track.appleId}`}
                />
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== ABOUT THE MUSIC ===== */}
      <SectionWrapper variant="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <div>
            <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
              The Story Behind the Songs
            </p>
            <h2 className="mb-6">Songs Born from the Journey</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              These aren&apos;t just songs — they&apos;re chapters of a
              story that millions of families know by heart. Written by Frank
              Sheeder after the loss of his son Sam, each track captures a
              moment in the journey from silence to healing.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Music was a thread that ran through Sam&apos;s life — whether he
              was playing or listening, it brought him immense joy. These songs
              honor that connection. From the raw grief of &ldquo;If Love Could
              Have Saved You&rdquo; to the defiant hope of &ldquo;Joy
              Anyway,&rdquo; they give voice to the emotions families often
              struggle to express.
            </p>
            <p className="text-gray-600 leading-relaxed">
              They&apos;re for the parent who can&apos;t sleep, the sibling who
              feels forgotten, the friend who doesn&apos;t know what to say.
            </p>
          </div>
          <div className="space-y-6">
            <Image
              src="/images/photos/frank-sam-concert.jpg"
              alt="Frank and Sam at a concert together"
              width={624}
              height={623}
              className="w-full max-w-xs h-auto rounded-2xl shadow-md mx-auto lg:mx-0"
            />
            <div className="bg-gradient-to-br from-orange-50 to-primary-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Songs for Every Part of the Journey
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: "For the Grieving", tracks: "If Love Could Have Saved You, Hole in My Heart" },
                  { title: "For Hope", tracks: "Joy Anyway, Still Water, Fifteen Seconds" },
                  { title: "For Families", tracks: "Knot on the Family Tree, For Annie" },
                  { title: "For the Journey", tracks: "Healing is a Slow Song, You Can't Outrun Grief" },
                ].map((group) => (
                  <div key={group.title} className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="font-medium text-gray-900 text-sm">{group.title}</p>
                    <p className="text-xs text-gray-500">{group.tracks}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== STREAMING + FOLLOW LINKS ===== */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-4">Listen &amp; Follow</h2>
          <p className="text-white/80 text-xl mb-10 leading-relaxed">
            Sam&apos;s OATH is on Apple Music, Spotify, YouTube, and dozens of
            streaming platforms. Follow us to hear new releases and help these
            songs reach the families who need them most.
          </p>
          <div className="flex justify-center">
            <SocialFollowButtonsLabeled
              platforms={["appleMusic", "spotify", "youtube", "tiktok", "instagram", "facebook"]}
            />
          </div>
          <p className="text-white/50 text-sm mt-6">
            Search &ldquo;Sam&apos;s OATH&rdquo; on any streaming platform
          </p>
        </div>
      </SectionWrapper>

      {/* ===== CLOSING NOTE ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-10 h-10 mx-auto mb-4 text-orange" />
          <h2 className="mb-4">A Note from Frank</h2>
          <blockquote className="text-lg text-gray-600 leading-relaxed italic mb-8">
            &ldquo;These songs were born in the hardest season of my life. I
            wrote them because the words I needed to say were too heavy to just
            speak — they needed melody, they needed music, they needed a place
            to land. If even one of these songs reaches a family in their darkest
            hour and reminds them they&apos;re not alone, then every note was
            worth it.&rdquo;
          </blockquote>
          <p className="text-gray-500 mb-8">
            — Frank Sheeder, Founder of Sam&apos;s OATH
          </p>
          <Link
            href="/take-the-oath"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-primary-600 transition-colors"
          >
            Take Sam&apos;s OATH
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
