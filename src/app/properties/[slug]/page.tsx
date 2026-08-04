import { LeadForm } from "@/components/forms/LeadForm";
import { getPropertyBySlug } from "@/lib/data/queries";
import { formatPrice, formatSpecs } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  return { title: property?.title ?? "Property" };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  return (
    <div className="section-pad container-site py-10 md:py-14">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden bg-paper">
            <Image
              src={property.images[0] || "/logo.png"}
              alt={property.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width:1024px) 100vw, 60vw"
            />
            {(property.featured || property.on_show) && (
              <span className="badge absolute top-4 left-4">
                {property.on_show ? "On Show" : "Featured"}
              </span>
            )}
          </div>
          {property.images.length > 1 && (
            <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {property.images.slice(1).map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden bg-paper">
                  <Image src={src} alt="" fill className="object-cover" sizes="200px" />
                </div>
              ))}
            </div>
          )}

          <div className="mt-8">
            <p className="text-3xl font-semibold text-ink">
              {formatPrice(property.price, property.currency, property.status)}
            </p>
            <p className="mt-2 font-medium text-ink">{formatSpecs(property)}</p>
            <h1 className="display mt-3 text-3xl text-ink md:text-4xl">{property.title}</h1>
            <p className="mt-2 text-muted">
              {property.suburb}, {property.city}
            </p>
            <div className="mt-8 space-y-4 text-base leading-relaxed text-muted whitespace-pre-line">
              {property.description}
            </div>
          </div>
        </div>

        <aside className="space-y-8">
          {property.agent && (
            <div className="border border-line p-6">
              <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                Listed by
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden bg-paper">
                  <Image
                    src={property.agent.image_url || "/logo.png"}
                    alt={property.agent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-ink">{property.agent.name}</p>
                  <p className="text-sm text-muted">{property.agent.title}</p>
                  {property.agent.phone && (
                    <a href={`tel:${property.agent.phone}`} className="text-sm text-orange">
                      {property.agent.phone}
                    </a>
                  )}
                </div>
              </div>
              <Link
                href={`/agents/${property.agent.slug}`}
                className="link-accent mt-4 inline-block text-xs font-semibold tracking-wider uppercase"
              >
                View profile
              </Link>
            </div>
          )}

          <div className="bg-paper p-6">
            <LeadForm
              type="PROPERTY"
              propertyId={property.id}
              agentId={property.agent_id}
              title="Enquire about this property"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
