import type { Metadata } from "next";
import { OathForm } from "@/components/forms/oath-form";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Take the OATH",
  description:
    "Take Sam's OATH — a 60-second commitment to Openness, Authenticity, Togetherness, and Healing. Join thousands of families breaking silence around substance use and mental health.",
};

export default function TakeTheOathPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 via-primary to-teal py-20">
        <div className="container-wide text-white text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Take Sam&apos;s OATH
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            A 60-second commitment to break the silence. Your pin goes on the
            map. Your voice joins the movement.
          </p>
        </div>
      </section>

      {/* OATH Meaning */}
      <SectionWrapper variant="light">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="mb-4">What You&apos;re Committing To</h2>
            <p className="text-gray-600 text-lg">
              The OATH is a personal pledge — not a contract, not a donation,
              not a membership. It&apos;s a decision to stop hiding.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { letter: "O", word: "Openness", color: "bg-teal text-white" },
              { letter: "A", word: "Authenticity", color: "bg-primary text-white" },
              { letter: "T", word: "Togetherness", color: "bg-sage text-white" },
              { letter: "H", word: "Healing", color: "bg-orange text-white" },
            ].map((item) => (
              <div key={item.letter} className="text-center">
                <div
                  className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-2`}
                >
                  {item.letter}
                </div>
                <p className="font-medium text-gray-800 text-sm">{item.word}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* The Form */}
      <SectionWrapper variant="white">
        <div className="max-w-2xl mx-auto">
          <OathForm />
        </div>
      </SectionWrapper>

      {/* What Happens Next */}
      <SectionWrapper variant="light">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-8">What Happens After You Submit</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="w-10 h-10 bg-teal-100 text-teal rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                1
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Pin on the Map
              </h3>
              <p className="text-sm text-gray-600">
                Your color-coded pin appears on our national map within seconds.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-primary-100 text-primary rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                2
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Certificate & Badge
              </h3>
              <p className="text-sm text-gray-600">
                Download your personalized OATH certificate and social media badge.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-sage-100 text-sage rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                3
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Join the Community
              </h3>
              <p className="text-sm text-gray-600">
                Share on social media and inspire others to break the silence.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
