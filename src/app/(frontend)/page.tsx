import Link from "next/link";
import PostCard from "@/components/blog/PostCard";
import { getLatestPosts } from "@/lib/queries";

export const revalidate = false;

export default async function HomePage() {
  let latestPosts: any[] = [];
  try {
    latestPosts = await getLatestPosts(3);
  } catch {
    latestPosts = [];
  }

  return (
    <div className="bg-brand-bg">
      {/* Hero section */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 max-w-lg">
          <h1 className="font-mono font-bold text-4xl md:text-5xl leading-tight text-brand-black mb-5">
            Travel Vietnam &amp; Asia Like a Local
          </h1>
          <p className="font-mono text-base text-brand-black mb-5 leading-relaxed">
            No more tourist traps. Let me show you the real spots. And equip you
            with everything you need to know before you go!
          </p>
          <p className="font-mono font-bold text-base text-brand-black mb-8">
            Honest guides, itineraries &amp; best eats{" "}
            <span className="font-normal">ONLY. Pinky promise.</span>
          </p>
          <Link
            href="/blog"
            className="inline-block bg-brand-black text-brand-yellow font-mono font-bold px-6 py-3 rounded hover:opacity-80 transition-opacity"
          >
            Read the Blog →
          </Link>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          {/* Illustrated hero image placeholder — replace with actual asset */}
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 rounded-full bg-yellow-100 opacity-60 blur-2xl" />
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-2">🍜</div>
                <p className="font-mono font-bold text-brand-black text-sm">
                  Add your hero illustration here
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-200 max-w-4xl mx-auto" />

      {/* Latest Blog Posts */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="font-mono font-bold text-2xl text-brand-black mb-8">
          Latest Blog Posts
        </h2>
        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder cards while Sanity is being set up */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border-2 border-brand-black rounded overflow-hidden"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-yellow-50 to-yellow-200 flex items-end justify-center pb-4">
                  <span className="font-mono font-bold text-white text-sm uppercase tracking-widest drop-shadow-lg bg-black/30 px-3 py-1">
                    VIETNAM
                  </span>
                </div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-full mb-1" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-block border-2 border-brand-black font-mono font-bold px-6 py-3 rounded hover:bg-brand-yellow transition-colors"
          >
            View All Posts →
          </Link>
        </div>
      </section>

      {/* About section */}
      <section className="bg-yellow-50 border-t border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1">
            <h2 className="font-mono font-bold text-3xl text-brand-black mb-4">
              Hi, I&apos;m{" "}
              <span className="bg-brand-yellow px-1">Brandon</span>!
            </h2>
            <p className="font-mono text-base text-brand-black leading-relaxed">
              A Vietnamese-Australian currently based in both Vietnam and
              Australia. Since 2025, I quit my job to chase my passions – to
              travel &amp; create content full time. Travelling to me is about
              unlocking stories, culture and brand new cuisine.
            </p>
          </div>
          <div className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-gray-200 relative">
            {/* Replace with actual photo */}
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <p className="font-mono text-sm text-gray-500 text-center px-4">
                Add Brandon&apos;s photo here
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
