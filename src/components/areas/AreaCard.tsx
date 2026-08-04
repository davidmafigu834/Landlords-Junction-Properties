import Image from "next/image";
import Link from "next/link";
import type { Area, Property } from "@/lib/data/types";

export function AreaCard({
  area,
  properties,
}: {
  area: Area;
  properties: Property[];
}) {
  const residentialSale = properties.filter(
    (p) =>
      p.city.toLowerCase().includes(area.city.toLowerCase()) &&
      (p.type === "HOUSE" || p.type === "APARTMENT") &&
      p.status === "FOR_SALE",
  ).length;
  const residentialLet = properties.filter(
    (p) =>
      p.city.toLowerCase().includes(area.city.toLowerCase()) &&
      (p.type === "HOUSE" || p.type === "APARTMENT") &&
      p.status === "TO_LET",
  ).length;
  const commercialSale = properties.filter(
    (p) =>
      p.city.toLowerCase().includes(area.city.toLowerCase()) &&
      p.type === "COMMERCIAL" &&
      p.status === "FOR_SALE",
  ).length;
  const commercialLet = properties.filter(
    (p) =>
      p.city.toLowerCase().includes(area.city.toLowerCase()) &&
      p.type === "COMMERCIAL" &&
      p.status === "TO_LET",
  ).length;

  return (
    <article className="min-w-0 shrink-0 basis-[90%] sm:basis-[70%] lg:basis-[calc(50%-0.75rem)]">
      <Link href={`/areas/${area.slug}`} className="group relative block aspect-[16/10] overflow-hidden">
        <Image
          src={area.image_url}
          alt={area.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width:1024px) 90vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
        <h3 className="display absolute bottom-4 left-4 text-3xl text-white md:text-4xl">{area.name}</h3>
      </Link>
      <div className="mt-5 grid gap-6 md:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="font-semibold text-ink">
            Living, buying & investing in {area.name}, Zimbabwe.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{area.description}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-orange">Residential</p>
          <p className="mt-1 text-muted">
            For Sale ({residentialSale}) · To Let ({residentialLet})
          </p>
          <p className="mt-3 font-semibold text-orange">Commercial</p>
          <p className="mt-1 text-muted">
            For Sale ({commercialSale}) · To Let ({commercialLet})
          </p>
        </div>
      </div>
    </article>
  );
}
