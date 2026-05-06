import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostCard from "@/components/blog/PostCard";
import { getPostsByDestination, getAllDestinations } from "@/lib/queries";

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
  try {
    posts = await getPostsByDestination(country);
  } catch {
    posts = [];
  }

  // 404 only if there are genuinely no posts AND no matching destination
  // (destination might exist but just have no posts yet — still show the page)
  const label = country.charAt(0).toUpperCase() + country.slice(1);

  return (
    <div className="bg-brand-bg min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
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
