import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity.image";

interface ItineraryCardProps {
  guide: {
    _id: string;
    city: string;
    slug: { current: string };
    title: string;
    intro?: string;
    duration?: string;
    heroImage?: {
      asset: { _id: string; url: string };
      alt?: string;
    };
    destination: {
      name: string;
      slug: { current: string };
      coverImage?: {
        asset: { _id: string; url: string };
        alt?: string;
      };
    };
  };
}

export default function ItineraryCard({ guide }: ItineraryCardProps) {
  const cardImage = guide.heroImage?.asset ? guide.heroImage : guide.destination.coverImage;
  const imageUrl = cardImage?.asset
    ? urlForImage(cardImage).width(900).height(700).url()
    : null;

  return (
    <Link
      href={`/destinations/${guide.destination.slug.current}/${guide.slug.current}`}
      className="group block max-w-4xl bg-white border border-[#e8e2d5] p-3 sm:p-4 shadow-[4px_7px_22px_rgba(96,73,0,0.10)] hover:shadow-[6px_10px_28px_rgba(96,73,0,0.16)] transition-shadow"
      style={{ transform: "rotate(-0.35deg)" }}
    >
      <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-5 md:gap-8">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#eee5ce]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={cardImage?.alt || `${guide.city}, ${guide.destination.name}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 440px"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-xs font-bold uppercase tracking-widest text-brand-muted">
              {guide.city}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center px-1 pb-2 md:pr-5">
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-brand-primary">
            {guide.destination.name} <span aria-hidden="true">/</span> {guide.city}
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight text-brand-black group-hover:underline">
            {guide.title}
          </h3>
          {guide.intro && (
            <p className="mt-4 font-mono text-sm leading-relaxed text-brand-muted line-clamp-3">
              {guide.intro}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs font-bold text-brand-black">
            {guide.duration && <span className="rounded-sm bg-brand-yellow px-3 py-2">{guide.duration}</span>}
            <span className="group-hover:translate-x-1 transition-transform">View itinerary →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
