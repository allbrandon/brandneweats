import Link from "next/link";
import Image from "next/image";
import PostCard from "@/components/blog/PostCard";
import PageBackground from "@/components/PageBackground";
import { getLatestPosts, getSiteSettings } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity.image";

export const revalidate = 60;

export default async function HomePage() {
  let latestPosts: any[] = [];
  let settings: any = null;
  try {
    [latestPosts, settings] = await Promise.all([
      getLatestPosts(3),
      getSiteSettings(),
    ]);
  } catch {
    latestPosts = [];
  }

  const heroImageUrl = settings?.heroImage?.asset
    ? urlForImage(settings.heroImage).width(600).height(600).url()
    : null;

  const profileImageUrl = settings?.profileImage?.asset
    ? urlForImage(settings.profileImage).width(640).height(640).url()
    : null;

  const heroHeading = settings?.heroHeading || "Travel Vietnam & Asia Like a Local";
  const heroSubtext = settings?.heroSubtext || "No more tourist traps. Let me show you the real spots. And equip you with everything you need to know before you go!";
  const heroTagline = settings?.heroTagline || "Honest guides, itineraries & best eats ONLY.";
  const aboutName = settings?.aboutName || "Brandon";
  const aboutBio = settings?.aboutBio || "A Vietnamese-Australian currently based in both Vietnam and Australia. Since 2025, I quit my job to chase my passions – to travel & create content full time. Travelling to me is about unlocking stories, culture and brand new cuisine.";

  return (
    <div className="relative bg-brand-bg overflow-hidden">
      <PageBackground image={settings?.homeBackground ?? null} />
      {/* Hero section */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 max-w-lg">
          <h1 className="font-mono font-bold text-4xl md:text-5xl leading-tight text-brand-black mb-5">
            {heroHeading}
          </h1>
          <p className="font-mono text-base text-brand-black mb-5 leading-relaxed">
            {heroSubtext}
          </p>
          <p className="font-mono font-bold text-base text-brand-black mb-8">
            {heroTagline}
          </p>
          <Link
            href="/blog"
            className="inline-block bg-brand-black text-brand-yellow font-mono font-bold px-6 py-3 rounded hover:opacity-80 transition-opacity"
          >
            Read the Blog →
          </Link>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          {heroImageUrl ? (
            <div className="relative w-[345px] h-[345px] md:w-[460px] md:h-[460px]">
              <Image
                src={heroImageUrl}
                alt={settings.heroImage?.alt || "BrandNewEats hero"}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 345px, 460px"
              />
            </div>
          ) : (
            <div className="relative w-[345px] h-[345px] md:w-[460px] md:h-[460px]">
              <div className="absolute inset-0 rounded-full bg-yellow-100 opacity-60 blur-2xl" />
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-2">🍜</div>
                  <p className="font-mono font-bold text-brand-black text-sm">
                    Upload hero image in Studio → Site Settings
                  </p>
                </div>
              </div>
            </div>
          )}
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
            {latestPosts.map((post, i) => (
              <PostCard key={post._id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <span className="bg-brand-yellow px-1">{aboutName}</span>!
            </h2>
            <p className="font-mono text-base text-brand-black leading-relaxed">
              {aboutBio}
            </p>
          </div>
          <div
            className="flex-shrink-0 bg-white border border-gray-200 shadow-[6px_8px_24px_rgba(0,0,0,0.10)] p-3 pb-10"
            style={{ transform: "rotate(-2deg)" }}
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72 overflow-hidden bg-gray-100">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt={settings.profileImage?.alt || "Brandon Nguyen"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 224px, 288px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="font-mono text-sm text-gray-500 text-center px-4">
                    Upload profile photo in Studio → Site Settings
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
