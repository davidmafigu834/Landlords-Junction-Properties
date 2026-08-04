import { PropertyCard } from "@/components/property/PropertyCard";
import { getAreaBySlug, getProperties } from "@/lib/data/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = await getAreaBySlug(slug);
  return { title: area?.name ?? "Area" };
}

export default async function AreaDetailPage({ params }: Props) {
  const { slug } = await params;
  const area = await getAreaBySlug(slug);
  if (!area) notFound();

  const properties = await getProperties({
    city: area.city,
    ...(area.slug !== "bulawayo" && area.slug !== "harare"
      ? { suburb: area.name }
      : {}),
  });

  return (
    <div>
      <div className="relative h-[38vh] min-h-64 sm:h-[42vh] sm:min-h-72">
        <Image src={area.image_url} alt={area.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-navy/20" />
        <div className="section-pad absolute inset-x-0 bottom-0 container-site pb-8 sm:pb-10">
          <h1 className="display text-3xl text-white sm:text-4xl md:text-6xl">{area.name}</h1>
        </div>
      </div>
      <div className="section-pad container-site py-10 sm:py-12">
        <p className="max-w-3xl text-base leading-relaxed text-muted sm:text-lg">{area.description}</p>
        <h2 className="display mt-10 text-2xl text-ink sm:mt-12 sm:text-3xl">
          Properties in {area.name}
        </h2>
        {properties.length === 0 ? (
          <p className="mt-4 text-muted">No listings in this area right now.</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((p) => (
              <div key={p.id} className="min-w-0">
                <PropertyCard property={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
