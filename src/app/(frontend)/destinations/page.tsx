import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageBackground from "@/components/PageBackground";
import { getAllDestinations, getSiteSettings } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity.image";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore Vietnam and Asia — honest local travel guides from BrandNewEats.",
};

const rotations = [-1.5, 1.2, -0.8, 1.8, -1.1, 0.6];

export default async function DestinationsPage() {
  let destinations: any[] = [];
  let settings: any = null;
  try {
    [destinations, settings] = await Promise.all([getAllDestinations(), getSiteSettings()]);
  } catch {
    destinations = [];
  }

  return (
    <div className="relative bg-brand-bg min-h-screen overflow-hidden">
      <PageBackground image={settings?.destinationsBackground ?? null} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <h1 className="font-mono font-bold text-4xl text-brand-black mb-2 tracking-tight">
          Destinations
        </h1>
        <hr className="border-gray-300 mb-10" />

        {destinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 px-4 py-4">
            {destinations.map((dest, i) => {
              const imageUrl = dest.coverImage?.asset
                ? urlForImage(dest.coverImage).width(700).height(500).url()
                : null;
              const rotate = rotations[i % rotations.length];

              return (
                <Link
                  key={dest._id}
                  href={`/destinations/${dest.slug.current}`}
                  className="group block bg-white shadow-[4px_6px_20px_rgba(0,0,0,0.12)] hover:shadow-2xl hover:scale-[1.03] transition-all duration-200"
                  style={{ transform: `rotate(${rotate}deg)` }}
                >
                  {/* Image area */}
                  <div className="p-2 pb-0">
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={dest.coverImage?.alt || dest.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-yellow-200 flex items-center justify-center">
                          <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                            {dest.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Postcard label */}
                  <div className="px-3 pt-4 pb-5 text-center">
                    <span
                      className="font-display font-black text-3xl sm:text-4xl uppercase tracking-widest text-brand-primary leading-none"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      {dest.name}
                    </span>
                    {dest.tagline && (
                      <p className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.15em] mt-2">
                        {dest.tagline}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="font-mono text-gray-500 text-center py-20">
            No destinations yet — add one in the Sanity Studio.
          </p>
        )}
      </div>
    </div>
  );
}
