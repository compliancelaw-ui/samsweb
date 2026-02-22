import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { OathForm } from "@/components/forms/oath-form";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { getPageContent } from "@/lib/cms/get-page-content";

export const metadata: Metadata = {
  title: "Take the OATH | End Stigma Around Substance Use & Mental Health",
  description:
    "Take the OATH to break the silence around substance use and mental health. Join thousands pledging to speak openly and end the stigma.",
};

export default async function TakeTheOathPage() {
  const c = await getPageContent("take-the-oath");

  return (
    <>
      {/* Hero — split layout with image */}
      <section className="bg-gradient-to-br from-primary-800 via-primary to-teal py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
                {c["hero.title"]}
              </h1>
              <p className="text-xl text-white/80 mb-6">
                {c["hero.subtitle"]}
              </p>
              <p className="text-white/60">
                {c["hero.body"]}
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/photos/family-hug.jpg"
                alt="Family embracing"
                width={1272}
                height={838}
                className="w-full h-auto rounded-2xl shadow-lg max-w-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OATH Meaning */}
      <SectionWrapper variant="light">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="mb-4">{c["oath.title"]}</h2>
            <p className="text-gray-600 text-lg">
              {c["oath.subtitle"]}
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
          <Suspense fallback={null}>
            <OathForm />
          </Suspense>
        </div>
      </SectionWrapper>

      {/* What Happens Next — horizontal timeline */}
      <SectionWrapper variant="light">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-2">
              <Image
                src="/images/photos/frank-sam-lighthouse.jpg"
                alt="Frank and Sam at a lighthouse"
                width={4032}
                height={3024}
                className="w-full h-auto rounded-2xl shadow-md"
              />
            </div>
            <div className="lg:col-span-3">
              <h2 className="mb-8">{c["next.title"]}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 text-teal rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {c["next.step1-title"]}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {c["next.step1-description"]}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 text-primary rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {c["next.step2-title"]}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {c["next.step2-description"]}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sage-100 text-sage rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {c["next.step3-title"]}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {c["next.step3-description"]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
