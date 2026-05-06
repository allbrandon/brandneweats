import type { Metadata } from "next";
import PostCard from "@/components/blog/PostCard";
import PageBackground from "@/components/PageBackground";
import { getPostsByDestination, getAllDestinations, getDestinationBySlug } from "@/lib/queries";

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

  const label = country.charAt(0).toUpperCase() + country.slice(1);

  return (
    <div className="relative bg-brand-bg min-h-screen overflow-hidden">
      <PageBackground image={destination?.backgroundImage ?? null} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="mb-2">
          <span className="font-mono text-sm text-gray-500">Destinations /</span>
        </div>
        <h1 className="font-mono font-bold text-4xl text-brand-black mb-2 uppercase tracking-tight">
          {label}
        </h1>
        <hr className="border-gray-300 mb-10" />

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-mono text-gray-500 text-lg">
              No {label} posts yet — check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
