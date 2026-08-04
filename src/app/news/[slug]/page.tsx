import { getPostBySlug } from "@/lib/data/queries";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return { title: post?.title ?? "Article" };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="section-pad container-site py-14">
      <p className="text-xs font-semibold tracking-[0.16em] text-orange uppercase">
        {format(new Date(post.published_at), "MMMM d, yyyy")}
      </p>
      <h1 className="display mt-3 max-w-3xl text-4xl text-ink md:text-5xl">{post.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{post.excerpt}</p>
      <div className="relative mt-10 aspect-[21/9] overflow-hidden bg-paper">
        <Image src={post.cover_image} alt="" fill className="object-cover" priority />
      </div>
      <div className="prose mt-10 max-w-3xl space-y-4 text-base leading-relaxed text-muted whitespace-pre-line">
        {post.body}
      </div>
    </article>
  );
}
