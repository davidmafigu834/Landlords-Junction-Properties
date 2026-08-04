import { PropertyCard } from "@/components/property/PropertyCard";
import { LeadForm } from "@/components/forms/LeadForm";
import { getAgentBySlug, getProperties } from "@/lib/data/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  return { title: agent?.name ?? "Agent" };
}

export default async function AgentProfilePage({ params }: Props) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent) notFound();

  const listings = await getProperties({ agentId: agent.id });

  return (
    <div className="section-pad container-site py-10 sm:py-14">
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden bg-paper sm:aspect-[3/4]">
            <Image
              src={agent.image_url || "/logo.png"}
              alt={agent.name}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 400px"
            />
          </div>
        </div>
        <div className="min-w-0">
          <h1 className="display text-3xl text-ink sm:text-4xl md:text-5xl">{agent.name}</h1>
          <p className="mt-2 text-base text-muted sm:text-lg">{agent.title}</p>
          {agent.phone && (
            <a href={`tel:${agent.phone}`} className="mt-2 block break-all text-orange">
              {agent.phone}
            </a>
          )}
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{agent.bio}</p>
          <div className="mt-8 max-w-lg bg-paper p-5 sm:mt-10 sm:p-6">
            <LeadForm type="GENERAL" agentId={agent.id} title={`Contact ${agent.name}`} />
          </div>
        </div>
      </div>

      <section className="mt-12 sm:mt-16">
        <h2 className="display text-2xl text-ink sm:text-3xl">Listings by {agent.name}</h2>
        {listings.length === 0 ? (
          <p className="mt-4 text-muted">No published listings yet.</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((p) => (
              <div key={p.id} className="min-w-0">
                <PropertyCard property={p} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
