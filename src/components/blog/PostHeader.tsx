import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity.image";

interface Tag {
  name: string;
  slug: { current: string };
}

interface PostHeaderProps {
  title: string;
  heroImage?: {
    asset: { _id: string; url: string };
    alt?: string;
    hotspot?: { x: number; y: number };
  };
  publishedAt?: string;
  readingTime?: number;
  tags?: Tag[];
  destination?: string;
}

export default function PostHeader({
  title,
  heroImage,
  publishedAt,
  readingTime,
  tags,
  destination,
}: PostHeaderProps) {
  const imageUrl = heroImage
    ? urlForImage(heroImage).width(1200).height(630).url()
    : null;

  return (
    <header className="max-w-3xl mx-auto px-6 pt-12 pb-8">
      {/* Breadcrumb */}
      <div className="font-mono text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>{" "}
        / <span className="text-brand-black">{title}</span>
      </div>

      {/* Destination badge */}
      {destination && (
        <div className="mb-4">
          <span className="font-mono font-bold text-xs uppercase tracking-widest bg-brand-yellow px-3 py-1 rounded">
            {destination}
          </span>
        </div>
      )}

      <h1 className="font-mono font-bold text-3xl md:text-4xl lg:text-5xl text-brand-black leading-tight mb-6">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 font-mono text-sm text-gray-600 mb-8">
        {publishedAt && (
          <time dateTime={publishedAt}>
            {new Date(publishedAt).toLocaleDateString("en-AU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
        {readingTime && (
          <>
            <span>·</span>
            <span>{readingTime} min read</span>
          </>
        )}
        {tags && tags.length > 0 && (
          <>
            <span>·</span>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.slug.current}
                  className="bg-gray-100 px-2 py-0.5 rounded text-xs"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {imageUrl && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-10">
          <Image
            src={imageUrl}
            alt={heroImage?.alt || title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
      )}
    </header>
  );
}
