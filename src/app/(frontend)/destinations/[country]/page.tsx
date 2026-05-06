import type { Metadata } from "next";
import Image from "next/image";
import PostCard from "@/components/blog/PostCard";
import PageBackground from "@/components/PageBackground";
import { getPostsByDestination, getAllDestinations, getDestinationBySlug } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity.image";

interface PageProps {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  try {
    const destinations = await getAllDestinations();
    return destinations.map((d: any) => ({ country: d.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const label = country.charAt(0).toUpperCase() + country.slice(1);
  return {
    title: `${label} Travel Guides`,
    description: `Honest ${label} travel guides, itineraries and best eats from BrandNewEats.`,
  };
}

export default async function DestinationCountryPage({ params }: PageProps) {
  const { country } = await params;

  let posts: any[] = [];
  let destination: any = null;
  try {
    [posts, destination] = await Promise.all([
      getPostsByDestination(country),
      getDestinationBySlug(country),
    ]);
  } catch {
    posts = [];
  }

  const label = destination?.name || (country.charAt(0).toUpperCase() + country.slice(1));

  const coverImageUrl = destination?.coverImage?.asset
    ? urlForImage(destination.coverImage).width(900).height(600).url()
    : null;

  return (
    <div className="relative bg-brand-bg overflow-hidden">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="text-center px-6 pt-12 pb-6 max-w-3xl mx-auto">
        <h1
          className="font-mono font-bold text-6xl md:text-7xl text-brand-primary mb-4 tracking-tight"
        >
          {label}
        </h1>
        {destination?.tagline && (
          <p className="font-mono text-lg text-brand-muted italic leading-relaxed max-w-md mx-auto">
            {destination.tagline}
          </p>
        )}
      </section>

      {/* ── Postcard ─────────────────────────────────────── */}
      {coverImageUrl && (
        <section className="max-w-2xl mx-auto px-6 mb-10">
          <div className="bg-white border-[3px] border-gray-100 shadow-[6px_8px_24px_rgba(0,0,0,0.07)] p-3">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={coverImageUrl}
                alt={destination.coverImage?.alt || label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>
            {destination?.coverCaption && (
              <p className="font-mono text-[10px] text-center mt-3 tracking-[0.18em] uppercase text-gray-400">
                {destination.coverCaption}
              </p>
            )}
          </div>
        </section>
      )}

      <hr className="border-gray-200 max-w-6xl mx-auto px-6 mb-12" />

      {/* ── Essentials + Cities ───────────────────────────── */}
      {(destination?.essentials || destination?.cities?.length > 0) && (
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row gap-0 items-start">

            {/* The Essentials */}
            {destination?.essentials && (
              <div className="w-full md:w-52 flex-shrink-0 md:pr-12">
                <div className="flex items-center gap-2 mb-6">
                  <svg className="w-4 h-4 text-brand-terracotta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span className="font-mono font-bold text-brand-terracotta text-sm tracking-wide">
                    The Essentials
                  </span>
                </div>
                {destination.essentials.bestTimeToVisit && (
                  <div className="mb-5">
                    <p className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.15em] mb-1">Best Time to Visit</p>
                    <p className="font-mono font-semibold text-brand-black">{destination.essentials.bestTimeToVisit}</p>
                  </div>
                )}
                {destination.essentials.currency && (
                  <div className="mb-5">
                    <p className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.15em] mb-1">Currency</p>
                    <p className="font-mono font-semibold text-brand-black">{destination.essentials.currency}</p>
                  </div>
                )}
                {destination.essentials.mustTry && (
                  <div className="mb-5">
                    <p className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.15em] mb-1">Must Try</p>
                    <p className="font-mono font-semibold text-brand-black">{destination.essentials.mustTry}</p>
                  </div>
                )}
              </div>
            )}

            {/* Vertical divider */}
            {destination?.essentials && destination?.cities?.length > 0 && (
              <div className="hidden md:block w-px bg-gray-200 self-stretch mx-0" />
            )}

            {/* Explore Cities */}
            {destination?.cities?.length > 0 && (
              <div className="flex-1 md:pl-12">
                <h2 className="font-mono font-bold text-3xl text-brand-black mb-10">
                  Explore Cities
                </h2>
                {/* Extra padding so rotated cards don't clip */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10 px-4 py-4">
                  {destination.cities.map((city: any, i: number) => {
                    const cityImageUrl = city.image?.asset
                      ? urlForImage(city.image).width(400).height(400).url()
                      : null;
                    const rotations = [-1.8, 1.2, -0.6, 1.6, -1.1, 0.5];
                    const rotate = rotations[i % rotations.length];
                    return (
                      <div
                        key={i}
                        className="relative bg-white border border-gray-300 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-default"
                        style={{ transform: `rotate(${rotate}deg)` }}
                      >
                        {city.isMustSee && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-brand-yellow px-3 py-0.5 font-mono text-[9px] uppercase tracking-widest text-brand-black shadow-sm border border-yellow-400">
                            Must-see
                          </div>
                        )}
                        {/* Polaroid image area */}
                        <div className="p-2 pb-0">
                          <div className="relative aspect-square overflow-hidden bg-gray-100">
                            {cityImageUrl ? (
                              <Image
                                src={cityImageUrl}
                                alt={city.image?.alt || city.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 50vw, 33vw"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-50" />
                            )}
                          </div>
                        </div>
                        {/* Polaroid caption strip */}
                        <p className="font-mono text-sm text-center py-3 px-2 text-brand-black">
                          {city.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <hr className="border-gray-200 max-w-6xl mx-auto px-6 mb-12" />

      {/* ── Recent Blogs ─────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <h2 className="font-mono font-bold text-2xl text-brand-black mb-12">Recent Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 px-4 py-4">
            {posts.map((post: any, i: number) => (
              <PostCard key={post._id} post={post} index={i} />
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && !destination?.cities?.length && (
        <div className="text-center py-20 relative z-10">
          <p className="font-mono text-gray-500 text-lg">
            No {label} posts yet — check back soon!
          </p>
        </div>
      )}

      {/* ── CTA Banner ───────────────────────────────────── */}
      {/* TODO: wire up newsletter signup
      <section className="bg-brand-yellow px-6 py-16 mb-0 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-black text-3xl md:text-4xl text-brand-primary mb-3 tracking-tight">
            Start Your {label} Story
          </h2>
          <p className="font-mono text-base text-brand-muted mb-8 max-w-sm mx-auto leading-relaxed">
            Join our community and get a curated travel kit including maps, packing lists, and local phrases for your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Your traveler email"
              className="flex-1 px-4 py-3 font-mono text-sm border border-brand-primary/30 bg-white focus:outline-none focus:border-brand-primary"
            />
            <button className="bg-brand-primary text-white font-mono font-bold px-5 py-3 text-sm whitespace-nowrap hover:opacity-90 transition-opacity">
              Get the Kit
            </button>
          </div>
        </div>
      </section>
      */}

      {/* ── Background illustration ───────────────────────── */}
      <PageBackground image={destination?.backgroundImage ?? null} />
    </div>
  );
}
