import type { Metadata } from "next";
import PostCard from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/queries";

export const revalidate = false;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Honest travel guides, itineraries and best eats for Vietnam and Asia.",
};

export default async function BlogPage() {
  let posts: any[] = [];
  try {
    posts = await getAllPosts();
  } catch {
    posts = [];
  }

  return (
    <div className="bg-brand-bg min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="font-mono font-bold text-4xl text-brand-black mb-2 uppercase tracking-tight">
          Blog
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
              No posts yet. Add your first post in the Sanity Studio.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
