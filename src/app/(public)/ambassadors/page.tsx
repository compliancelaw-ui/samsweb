import type { Metadata } from "next";
import {
  Award,
  MapPin,
  Users,
  CheckCircle,
  Star,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Ambassadors",
  description:
    "Sam's OATH ambassadors are leading the movement in their communities. See who's involved and learn how to become one.",
};

export default function AmbassadorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-teal py-24">
        <div className="container-wide text-white text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            OATH Ambassadors
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Ambassadors are the heart of the movement. They bring the OATH to
            their communities, connect families to resources, and lead by
            example.
          </p>
        </div>
      </section>

      {/* What Ambassadors Do */}
      <SectionWrapper variant="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-10">What Ambassadors Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Connect Communities",
                description:
                  "Bring the OATH to your workplace, school, place of worship, or community organization. Help people find the words.",
              },
              {
                icon: MapPin,
                title: "Represent Their State",
                description:
                  "Ambassadors represent the movement locally. They're the face of Sam's OATH in their community.",
              },
              {
                icon: Star,
                title: "Lead With Courage",
                description:
                  "By sharing their own connection to the cause, ambassadors give others permission to do the same.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Ambassador Profiles - Empty State */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-4">Our Ambassadors</h2>
          <p className="text-center text-gray-600 text-lg mb-10">
            Meet the people leading the movement across the country.
          </p>
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">
              Ambassador profiles coming soon
            </p>
            <p className="text-gray-400">
              Be among the first to represent the movement in your state.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* How to Become an Ambassador */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-10">How to Become an Ambassador</h2>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Apply",
                description:
                  "Fill out the ambassador application below. Tell us about yourself, your connection to the cause, and how you'd like to help.",
              },
              {
                step: "2",
                title: "Connect",
                description:
                  "If your application is approved, we'll reach out to welcome you and share resources, guidelines, and your ambassador toolkit.",
              },
              {
                step: "3",
                title: "Lead",
                description:
                  "Start spreading the word in your community. Share the OATH, connect families to resources, and help break the silence.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="w-10 h-10 bg-teal rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* What We Look For */}
      <SectionWrapper variant="light">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-10">What We Look For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "A personal connection to substance use or mental health",
              "Willingness to share openly about the cause",
              "Active in their community or workplace",
              "Aligned with the OATH values (Openness, Authenticity, Togetherness, Healing)",
              "Comfortable representing the movement publicly",
              "Committed to reducing stigma with compassion",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Apply CTA */}
      <SectionWrapper variant="gradient">
        <div className="max-w-2xl mx-auto text-center">
          <Award className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-white mb-4">Ready to Lead?</h2>
          <p className="text-white/80 text-lg mb-8">
            Submit your ambassador application and join the team of leaders
            making a difference in their communities.
          </p>
          <p className="text-white/60 text-sm">
            Ambassador application form coming soon.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
