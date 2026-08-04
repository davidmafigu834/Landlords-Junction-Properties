import Image from "next/image";
import Link from "next/link";
import type { Profile } from "@/lib/data/types";

export function AgentCard({ agent }: { agent: Profile }) {
  return (
    <div className="min-w-0 w-full shrink-0 basis-[78%] sm:basis-[calc(50%-0.75rem)] md:basis-[calc(40%-0.75rem)] lg:basis-[calc(25%-1.125rem)] xl:basis-[calc(20%-1.2rem)]">
      <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-paper">
        <Image
          src={agent.image_url || "/logo.png"}
          alt={agent.name}
          fill
          className="object-cover"
          sizes="(max-width:768px) 78vw, 240px"
        />
      </div>
      <p className="text-lg font-semibold text-ink">{agent.name}</p>
      <p className="text-sm text-muted">{agent.title || "Agent"}</p>
      <Link
        href={`/agents/${agent.slug}`}
        className="link-accent mt-3 inline-block text-xs font-semibold tracking-wider uppercase"
      >
        View my bio
      </Link>
    </div>
  );
}
