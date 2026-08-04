import { AreaCard } from "@/components/areas/AreaCard";
import { getAreas, getProperties } from "@/lib/data/queries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Our Areas" };

export default async function AreasPage() {
  const [areas, properties] = await Promise.all([getAreas(), getProperties()]);

  return (
    <div className="section-pad container-site py-14">
      <h1 className="display text-4xl text-ink md:text-5xl">Our Areas</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Bulawayo-first coverage with selected opportunities across Zimbabwe.
      </p>
      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        {areas.map((area) => (
          <AreaCard key={area.id} area={area} properties={properties} />
        ))}
      </div>
    </div>
  );
}
