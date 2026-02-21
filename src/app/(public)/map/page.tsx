import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Sam's OATH Map | Sam's OATH",
  description:
    "See OATH takers across the country. Every pin represents a family choosing openness over silence, connection over shame, and healing over hiding.",
  openGraph: {
    title: "Sam's OATH Map | Sam's OATH",
    description:
      "See OATH takers across the country. Every pin represents a family choosing openness over silence.",
  },
};

const OathMap = dynamic(() => import("@/components/map/oath-map"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

function MapSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="relative mx-auto mb-4">
          <div className="h-12 w-12 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-teal" />
        </div>
        <p className="text-sm font-medium text-gray-600">
          Loading the movement map...
        </p>
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <div>
      {/* ===== Heading Band ===== */}
      <div className="bg-gradient-to-r from-primary-800 via-primary to-teal px-4 py-8 text-center sm:py-10">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Sam&apos;s OATH Map
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/80 sm:text-base">
          Every pin is a family that chose openness over silence. Click to
          explore their stories.
        </p>
      </div>

      {/* ===== Map in a contained box ===== */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-lg" style={{ height: "70vh", minHeight: "500px" }}>
          <OathMap />
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          Use the +/&minus; buttons to zoom. Click any pin to see details.
        </p>
      </div>
    </div>
  );
}
