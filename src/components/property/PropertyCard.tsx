import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/data/types";
import { formatPrice, formatSpecs } from "@/lib/utils";

export function PropertyCard({
  property,
  badge,
}: {
  property: Property;
  badge?: string;
}) {
  const label =
    badge ||
    (property.on_show ? "On Show" : property.featured ? "Featured" : undefined);

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block min-w-0 w-full shrink-0 basis-[85%] sm:basis-[calc(50%-0.75rem)] md:basis-[calc(45%-0.75rem)] lg:basis-[calc(25%-1.125rem)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-paper">
        <Image
          src={property.images[0] || "/logo.png"}
          alt={property.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 85vw, (max-width:1024px) 45vw, 25vw"
        />
        {label && <span className="badge absolute top-3 left-3 z-10">{label}</span>}
      </div>
      <div className="pt-4">
        <p className="text-lg font-semibold text-ink sm:text-xl">
          {formatPrice(property.price, property.currency, property.status)}
        </p>
        <p className="mt-1 text-sm text-muted">
          <span className="font-semibold text-ink">{formatSpecs(property)}</span>
        </p>
        <p className="mt-1 line-clamp-2 text-sm break-words text-muted">{property.title}</p>
      </div>
    </Link>
  );
}
