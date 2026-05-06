import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity.image";

const rotations = [1.2, -0.8, 1.5, -1.2, 0.6, -0.4];

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
  index?: number;
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  const imageUrl = post.heroImage
    ? urlForImage(post.heroImage).width(600).height(400).url()
    : null;

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-AU", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const rotate = rotations[index % rotations.length];

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block bg-white border border-gray-300 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="p-2 pb-0">
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
            <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-yellow-200 flex items-center justify-center">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                {post.destination || "Travel"}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-mono font-bold text-brand-black leading-snug mb-2 group-hover:underline line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between">
          {date && <span className="font-mono text-xs text-gray-400 uppercase">{date}</span>}
          <span className="font-mono text-xs text-brand-black">Read More →</span>
        </div>
      </div>
    </Link>
  );
}
