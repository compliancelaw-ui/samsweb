import Link from "next/link";
import { Home, Heart } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 via-primary to-teal flex items-center">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center text-white">
        <p className="text-8xl font-bold text-white/30 mb-4" aria-hidden="true">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          This Page Doesn&apos;t Exist
        </h1>
        <p className="text-xl text-white/80 mb-8 leading-relaxed">
          But you&apos;re not lost. The movement is still here, and so are we.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Go Home
          </Link>
          <Link
            href="/take-the-oath"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <Heart className="w-4 h-4" aria-hidden="true" />
            Take the OATH
          </Link>
        </div>

        <div className="border-t border-white/20 pt-8">
          <p className="text-white/80 text-sm mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: "Stories", href: "/stories" },
              { label: "Resources", href: "/resources" },
              { label: "OATH Map", href: "/map" },
              { label: "Music", href: "/music" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white text-sm font-medium px-3 py-1.5 rounded-full border border-white/20 hover:border-white/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
