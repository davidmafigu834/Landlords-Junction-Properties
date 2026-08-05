import { PropertyCard } from "@/components/property/PropertyCard";
import { HeroSearch } from "@/components/home/HeroSearch";
import { getProperties } from "@/lib/data/queries";
import type { PropertyStatus, PropertyType } from "@/lib/data/types";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Properties",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const status = (typeof params.status === "string" ? params.status : "ALL") as
    | PropertyStatus
    | "ALL";
  const type = (typeof params.type === "string" ? params.type : "ALL") as
    | PropertyType
    | "ALL";
  const q = typeof params.q === "string" ? params.q : undefined;
  const onShow = params.onShow === "1" || params.onShow === "true";
  const city = typeof params.city === "string" ? params.city : undefined;
  const suburb = typeof params.suburb === "string" ? params.suburb : undefined;
  const minPrice =
    typeof params.minPrice === "string" && Number.isFinite(Number(params.minPrice))
      ? Number(params.minPrice)
      : undefined;
  const maxPrice =
    typeof params.maxPrice === "string" && Number.isFinite(Number(params.maxPrice))
      ? Number(params.maxPrice)
      : undefined;
  const beds =
    typeof params.beds === "string" && Number.isFinite(Number(params.beds))
      ? Number(params.beds)
      : undefined;

  const properties = await getProperties({
    status: status === "ALL" ? undefined : status,
    type: type === "ALL" ? undefined : type,
    q,
    onShow: onShow || undefined,
    city,
    suburb,
    minPrice,
    maxPrice,
    beds,
  });

  return (
    <div>
      <div className="bg-navy px-0 pt-8 pb-8 text-white sm:pt-10">
        <div className="section-pad container-site">
          <h1 className="display text-3xl sm:text-4xl md:text-5xl">Browse properties</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/75 sm:text-base">
            Search listings for sale and to let across Bulawayo and beyond.
          </p>
          <div className="mt-6">
            <HeroSearch compact />
          </div>
        </div>
      </div>

      <div className="section-pad container-site py-8 sm:py-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            {properties.length} propert{properties.length === 1 ? "y" : "ies"} found
          </p>
          <div className="flex flex-wrap gap-3 text-xs font-semibold tracking-wider uppercase">
            <Link href="/properties?status=FOR_SALE" className="link-accent">
              For Sale
            </Link>
            <Link href="/properties?status=TO_LET" className="link-accent">
              To Let
            </Link>
            <Link href="/properties?onShow=1" className="link-accent">
              On Show
            </Link>
          </div>
        </div>

        {properties.length === 0 ? (
          <p className="py-20 text-center text-muted">No listings match these filters yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
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
