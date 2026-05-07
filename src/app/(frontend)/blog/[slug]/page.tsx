import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostHeader from "@/components/blog/PostHeader";
import PostBody from "@/components/blog/PostBody";
import { getPostBySlug, getAllPostSlugs } from "@/lib/queries";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let post: any;
  try {
    post = await getPostBySlug(slug);
  } catch {
    return {};
  }

  if (!post) return {};

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const canonical = `${siteUrl}/blog/${post.slug.current}`;

  const ogImageUrl =
    post.seo?.ogImage?.asset?.url ||
    post.heroImage?.asset?.url ||
    `${siteUrl}/og-default.jpg`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  let post: any;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            url: `${siteUrl}/blog/${post.slug.current}`,
            image: post.heroImage?.asset?.url,
            author: {
              "@type": "Person",
              name: "Brandon",
              url: siteUrl,
            },
            publisher: {
              "@type": "Person",
              name: "BrandNewEats",
              url: siteUrl,
            },
          }),
        }}
      />
      <div className="bg-brand-bg min-h-screen">
        <PostHeader
          title={post.title}
          heroImage={post.heroImage}
          publishedAt={post.publishedAt}
          readingTime={post.readingTime}
          tags={post.tags}
          destination={post.destination}
        />
        {post.content && <PostBody content={post.content} />}
      </div>
    </>
  );
}
