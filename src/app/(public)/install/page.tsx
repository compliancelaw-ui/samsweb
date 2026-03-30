'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SectionWrapper } from '@/components/layout/section-wrapper'

// ============================================================
// PWA Install Guide for Sam's OATH
// Lighter treatment than SeniorSupport - this is a public site,
// not an app people use daily. Focus on quick access to the OATH,
// community stories, and events.
// ============================================================

type Platform = 'ios' | 'android' | 'mac' | 'windows' | 'unknown'

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'unknown'
  const ua = navigator.userAgent.toLowerCase()
  const platform =
    (navigator as { userAgentData?: { platform?: string } }).userAgentData?.platform?.toLowerCase() || ''

  if (/iphone|ipad|ipod/.test(ua)) return 'ios'
  if (/android/.test(ua)) return 'android'
  if (/macintosh|mac os x/.test(ua) || platform === 'macos') return 'mac'
  if (/windows/.test(ua) || platform === 'windows') return 'windows'
  return 'unknown'
}

interface DeviceGuide {
  id: Platform
  device: string
  browser: string
  steps: string[]
}

const GUIDES: DeviceGuide[] = [
  {
    id: 'ios',
    device: 'iPhone / iPad',
    browser: 'Safari',
    steps: [
      'Open samsoath.org in Safari (not Chrome or other browsers).',
      'Tap the Share button (square with upward arrow) at the bottom of the screen.',
      'Scroll down and tap "Add to Home Screen."',
      'Tap "Add" to confirm.',
    ],
  },
  {
    id: 'android',
    device: 'Android',
    browser: 'Chrome',
    steps: [
      'Open samsoath.org in Chrome.',
      'Tap the three-dot menu in the top-right corner.',
      'Tap "Add to Home Screen" or "Install App."',
      'Tap "Install" to confirm.',
    ],
  },
  {
    id: 'mac',
    device: 'Mac',
    browser: 'Chrome or Edge',
    steps: [
      'Open samsoath.org in Chrome or Edge (Safari does not support this).',
      'Click the install icon in the address bar (small monitor with a download arrow).',
      'Click "Install." The app opens in its own window.',
    ],
  },
  {
    id: 'windows',
    device: 'Windows',
    browser: 'Chrome or Edge',
    steps: [
      'Open samsoath.org in Chrome or Edge.',
      'Click the install icon in the address bar.',
      'Click "Install." Pin it to your taskbar for quick access.',
    ],
  },
]

export default function InstallPage() {
  const [platform, setPlatform] = useState<Platform>('unknown')
  const [openGuide, setOpenGuide] = useState<Platform | null>(null)

  useEffect(() => {
    const detected = detectPlatform()
    setPlatform(detected)
    setOpenGuide(detected !== 'unknown' ? detected : null)
  }, [])

  return (
    <>
      {/* Hero */}
      <SectionWrapper variant="dark">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Add Sam&apos;s OATH to Your Home Screen
          </h1>
          <p className="mt-4 text-lg text-gray-300 leading-relaxed">
            Create a shortcut to Sam&apos;s OATH on your home screen for quick access
            to the movement, community stories, and upcoming events. This is not an
            app store download, just a convenient home screen shortcut to samsoath.org.
          </p>
        </div>
      </SectionWrapper>

      {/* Benefits */}
      <SectionWrapper variant="light">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Why add to home screen?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: 'Quick access to take and share the OATH',
                detail: 'One tap from your home screen. No searching, no typing URLs.',
              },
              {
                title: 'Stay connected to community stories',
                detail: 'Read new stories from people across the movement as they are published.',
              },
              {
                title: 'Never miss an event',
                detail: 'Upcoming awareness events, ambassador gatherings, and community meetups.',
              },
              {
                title: 'Share easily',
                detail: 'Send someone to samsoath.org in seconds. The best way to grow the movement is word of mouth.',
              },
            ].map((b) => (
              <div key={b.title} className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-400" />
                <div>
                  <p className="font-semibold text-gray-900">{b.title}</p>
                  <p className="mt-1 text-sm text-gray-600">{b.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Device Guides */}
      <SectionWrapper variant="white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
            How to add it
          </h2>
          <p className="text-center text-sm text-gray-500 mb-8">
            {platform !== 'unknown'
              ? 'We detected your device and highlighted it below. Tap any section to expand.'
              : 'Select your device below to see the steps.'}
          </p>

          <div className="space-y-3">
            {GUIDES.map((guide) => {
              const isCurrent = guide.id === platform
              const isOpen = openGuide === guide.id

              return (
                <div
                  key={guide.id}
                  className={`rounded-xl border transition-all ${
                    isCurrent
                      ? 'border-teal-400 ring-2 ring-teal-200'
                      : 'border-gray-200'
                  }`}
                >
                  <button
                    onClick={() => setOpenGuide(isOpen ? null : guide.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors rounded-xl"
                    aria-expanded={isOpen}
                    aria-label={`${guide.device} instructions`}
                  >
                    <div>
                      <span className="font-semibold text-gray-900">{guide.device}</span>
                      {isCurrent && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-700">
                          Your device
                        </span>
                      )}
                      <span className="block text-sm text-gray-500 mt-0.5">
                        Using {guide.browser}
                      </span>
                    </div>
                    <svg
                      className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 border-t border-gray-100">
                      <ol className="mt-4 space-y-3">
                        {guide.steps.map((step, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                              {i + 1}
                            </span>
                            <p className="text-gray-700 pt-0.5">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="default">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-gray-600 mb-6">
            Have not taken the OATH yet? Start there.
          </p>
          <Link
            href="/take-the-oath"
            className="inline-block rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Take Sam&apos;s OATH
          </Link>
        </div>
      </SectionWrapper>
    </>
  )
}
