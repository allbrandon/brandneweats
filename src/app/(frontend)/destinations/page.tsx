import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllDestinations } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity.image";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore Vietnam and Asia — honest local travel guides from BrandNewEats.",
};

export default async function DestinationsPage() {
  let destinations: any[] = [];
  try {
    destinations = await getAllDestinations();
  } catch {
    destinations = [];
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="font-mono font-bold text-2xl text-brand-black mb-6 uppercase tracking-widest text-center">
          Destinations
        </h1>
        <hr className="border-gray-300 mb-10" />

        <h2 className="font-mono font-bold text-xl text-brand-black mb-8">
          Where will you go?
        </h2>

        {destinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => {
              const imageUrl = dest.coverImage?.asset
                ? urlForImage(dest.coverImage).width(700).height(500).url()
                : null;

              return (
                <Link
                  key={dest._id}
                  href={`/destinations/${dest.slug.current}`}
                  className="group block relative overflow-hidden rounded border border-gray-200 aspect-[4/3] bg-gray-100"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={dest.coverImage?.alt || dest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-yellow-200" />
                  )}
                  {/* Label overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono font-bold text-white text-base uppercase tracking-widest drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                      {dest.name.toUpperCase()}
                    </span>
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
