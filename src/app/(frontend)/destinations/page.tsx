import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore Vietnam, China, Japan and more — honest local travel guides from BrandNewEats.",
};

const destinations = [
  {
    id: "vietnam",
    label: "VIETNAM",
    description: "Pho, banh mi, hidden alleyways and limestone karsts.",
    color: "from-green-100 to-emerald-200",
  },
  {
    id: "china",
    label: "CHINA",
    description: "Ancient temples, street food markets and neon city nights.",
    color: "from-red-100 to-orange-200",
  },
  {
    id: "japan",
    label: "JAPAN",
    description: "Ramen, sakura, shrines and the perfect konbini snack.",
    color: "from-pink-100 to-rose-200",
  },
];

export default function DestinationsPage() {
  return (
    <div className="bg-brand-bg min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="font-mono font-bold text-4xl text-brand-black mb-2 uppercase tracking-tight text-center">
          Destinations
        </h1>
        <hr className="border-gray-300 mb-10" />

        <h2 className="font-mono font-bold text-xl text-brand-black mb-8">
          Where will you go?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.id}`}
              className="group block bg-white border-2 border-brand-black rounded overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div
                className={`relative aspect-[4/3] bg-gradient-to-br ${dest.color} flex items-end justify-center pb-4`}
              >
                <span className="font-mono font-bold text-white text-sm uppercase tracking-widest drop-shadow-lg bg-black/30 px-3 py-1 group-hover:bg-black/50 transition-colors">
                  {dest.label}
                </span>
              </div>
              <div className="p-4">
                <p className="font-mono text-sm text-gray-600">
                  {dest.description}
                </p>
                <p className="font-mono font-bold text-xs text-brand-black mt-3 group-hover:underline">
                  Explore {dest.label.charAt(0) + dest.label.slice(1).toLowerCase()} →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
