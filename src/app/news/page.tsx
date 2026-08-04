import { NewsCard } from "@/components/news/NewsCard";
import { getPosts } from "@/lib/data/queries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "The Know" };

export default async function NewsPage() {
  const posts = await getPosts();

  return (
    <div className="section-pad container-site py-14">
      <h1 className="display text-4xl text-ink md:text-5xl">The Know</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Guides and market notes for Zimbabwe property buyers, sellers, and landlords.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
