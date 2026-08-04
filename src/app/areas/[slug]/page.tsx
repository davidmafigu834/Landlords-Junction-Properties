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
      <div className="relative h-[42vh] min-h-72">
        <Image src={area.image_url} alt={area.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-navy/20" />
        <div className="section-pad absolute inset-x-0 bottom-0 container-site pb-10">
          <h1 className="display text-4xl text-white md:text-6xl">{area.name}</h1>
        </div>
      </div>
      <div className="section-pad container-site py-12">
        <p className="max-w-3xl text-lg leading-relaxed text-muted">{area.description}</p>
        <h2 className="display mt-12 text-3xl text-ink">Properties in {area.name}</h2>
        {properties.length === 0 ? (
          <p className="mt-4 text-muted">No listings in this area right now.</p>
        ) : (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
