import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/data/types";
import { format } from "date-fns";

export function NewsCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group min-w-0 w-full shrink-0 basis-[85%] sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-paper">
        <Image
          src={post.cover_image}
          alt={post.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width:1024px) 85vw, 33vw"
        />
        <span className="badge absolute bottom-3 left-3">
          {format(new Date(post.published_at), "MMM dd").toUpperCase()}
        </span>
      </div>
      <h3 className="mt-4 line-clamp-2 text-base font-semibold text-ink sm:text-lg">{post.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted">{post.excerpt}</p>
    </Link>
  );
}
