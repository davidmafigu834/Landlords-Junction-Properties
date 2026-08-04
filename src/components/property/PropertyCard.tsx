import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
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
      className="group block min-w-0 w-full shrink-0 basis-[85%] overflow-hidden rounded-md bg-white shadow-[0_10px_30px_rgba(4,24,48,0.12)] transition duration-300 hover:-translate-y-1 sm:basis-[calc(50%-0.75rem)] md:basis-[calc(45%-0.75rem)] lg:basis-[calc(25%-1.125rem)]"
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
        <p className="absolute right-0 bottom-0 bg-navy px-3 py-1.5 text-sm font-bold text-white">
          {formatPrice(property.price, property.currency, property.status)}
        </p>
      </div>
      <div className="p-4">
        <p className="line-clamp-2 font-semibold text-base break-words text-navy">{property.title}</p>
        <p className="mt-2 flex items-center gap-1 text-sm text-muted">
          <MapPin size={13} className="text-orange" />
          {property.suburb}, {property.city}
        </p>
        <p className="mt-3 border-y border-line py-2 text-sm font-semibold text-muted">
          {formatSpecs(property)}
        </p>
        <span className="mt-3 flex items-center gap-1 text-xs font-bold tracking-wider text-orange uppercase">
          View details <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}
