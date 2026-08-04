import { NewsCard } from "@/components/news/NewsCard";
import { getPosts } from "@/lib/data/queries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Insights" };

export default async function NewsPage() {
  const posts = await getPosts();

  return (
    <div className="section-pad container-site py-10 sm:py-14">
      <h1 className="display text-3xl text-ink sm:text-4xl md:text-5xl">Insights</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted sm:text-base">
        Practical guidance for owners, buyers, and landlords — market discipline, risk awareness, and
        property care without hype.
      </p>
      <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="min-w-0">
            <NewsCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
