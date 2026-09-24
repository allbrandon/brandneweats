import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CityItinerary, { type ItineraryDay } from "@/components/destinations/CityItinerary";
import { getAllCityGuidePaths, getCityGuide } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity.image";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ country: string; city: string }>;
}

export async function generateStaticParams() {
  try {
    return await getAllCityGuidePaths();
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country, city } = await params;
  const guide = await getCityGuide(country, city).catch(() => null);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.intro || `Explore ${guide.city} with BrandNewEats.`,
  };
}

export default async function CityGuidePage({ params }: PageProps) {
  const { country, city } = await params;
  const guide = await getCityGuide(country, city).catch(() => null);
  if (!guide) notFound();

  const heroImageUrl = guide.heroImage?.asset
    ? urlForImage(guide.heroImage).width(1500).height(900).url()
    : null;
  const days: ItineraryDay[] = (guide.days || []).map((day: any) => ({
    ...day,
    activities: (day.activities || []).map((activity: any) => ({
      ...activity,
      image: activity.image?.asset
        ? {
            url: urlForImage(activity.image).width(320).height(320).url(),
            fullUrl: urlForImage(activity.image).width(1400).url(),
            alt: activity.image.alt,
          }
        : null,
    })),
  }));

  return (
    <div className="min-h-screen bg-brand-bg text-brand-black">
      <main className="mx-auto max-w-5xl px-5 pb-20 pt-12 sm:px-8 md:pt-20">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-brand-muted">
          <Link href="/destinations" className="hover:text-brand-terracotta">← Destinations</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/destinations/${country}`} className="hover:text-brand-terracotta">{guide.destination?.name || country}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-brand-black">{guide.city}</span>
        </nav>

        <header className="max-w-4xl">
          <h1 className="font-display text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">{guide.title}</h1>
          {guide.intro && <p className="mt-5 max-w-2xl font-mono text-base leading-relaxed text-brand-muted md:text-lg">{guide.intro}</p>}
          {(guide.duration || guide.budget) && (
            <div className="mt-6 flex flex-wrap gap-2">
              {guide.duration && <span className="rounded-lg border border-[#e8e2d5] bg-white px-3 py-2 font-mono text-xs font-bold shadow-[0_2px_8px_rgba(96,73,0,0.04)]"><span className="mr-2 text-brand-primary" aria-hidden="true">▣</span>Duration: {guide.duration}</span>}
              {guide.budget && <span className="rounded-lg border border-[#e8e2d5] bg-white px-3 py-2 font-mono text-xs font-bold shadow-[0_2px_8px_rgba(96,73,0,0.04)]"><span className="mr-2 text-brand-primary" aria-hidden="true">▤</span>Est. budget: {guide.budget}</span>}
            </div>
          )}
        </header>

        <figure className="mt-8 rotate-[-0.35deg] rounded-md border border-[#e8e2d5] bg-white p-3 pb-4 shadow-[0_8px_24px_rgba(96,73,0,0.09)] md:mt-10 md:p-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-[#eee5ce]">
            {heroImageUrl ? (
              <Image src={heroImageUrl} alt={guide.heroImage.alt || guide.city} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_30%_30%,#f8eaca_0%,#eee2c6_45%,#e9dcc2_100%)] text-center">
                <span className="font-editorial text-5xl text-brand-primary opacity-60 md:text-8xl" aria-hidden="true">✳</span>
                <span className="px-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-muted md:text-sm">Add a {guide.city} photo in Sanity</span>
              </div>
            )}
          </div>
          <figcaption className="mt-3 flex flex-wrap justify-between gap-2 px-1 font-mono text-[10px] uppercase tracking-[0.1em] text-brand-muted">
            <span>{guide.city} · {guide.destination?.name || country}</span>
            {guide.heroCaption && <span className="italic normal-case">{guide.heroCaption}</span>}
          </figcaption>
        </figure>

        {days.length > 0 && <CityItinerary days={days} />}
      </main>
    </div>
  );
}
