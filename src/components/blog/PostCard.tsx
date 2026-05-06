import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity.image";

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    heroImage?: {
      asset: { _id: string; url: string };
      alt?: string;
      hotspot?: { x: number; y: number };
    };
    destination?: string;
    publishedAt?: string;
    readingTime?: number;
    excerpt?: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const imageUrl = post.heroImage
    ? urlForImage(post.heroImage).width(600).height(400).url()
    : null;

  const destLabel = post.destination
    ? post.destination.toUpperCase()
    : "TRAVEL";

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block bg-white border-2 border-brand-black rounded overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.heroImage?.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-300 flex items-center justify-center">
            <span className="font-mono font-bold text-brand-black text-lg">
              {destLabel}
            </span>
          </div>
        )}
        <div className="absolute inset-0 flex items-end justify-center pb-4">
          <span className="font-mono font-bold text-white text-sm uppercase tracking-widest drop-shadow-lg bg-black/30 px-3 py-1">
            {destLabel}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-mono font-bold text-brand-black text-base leading-tight group-hover:underline line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="font-mono text-sm text-gray-600 mt-2 line-clamp-2">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 mt-3 text-xs font-mono text-gray-500">
          {post.publishedAt && (
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-AU", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
          {post.readingTime && <span>{post.readingTime} min read</span>}
        </div>
      </div>
    </Link>
  );
}
