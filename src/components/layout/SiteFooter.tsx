import Link from "next/link";
import Image from "next/image";
import { getListingCounts } from "@/lib/data/queries";
import { BRAND } from "@/lib/brand";

export async function SiteFooter() {
  const counts = await getListingCounts();

  const lookingTo = [
    { href: "/properties?status=FOR_SALE", label: `Buy property (${counts.forSale})` },
    { href: "/properties?status=TO_LET", label: `Rent property (${counts.toLet})` },
    { href: "/sell", label: "Sell / let with stewardship" },
    { href: "/properties?onShow=1", label: `Properties on show (${counts.onShow})` },
    { href: "/contact", label: "Contact us" },
    { href: "/sell", label: "Request a market assessment" },
  ];

  const searchProps = [
    { href: "/properties?onShow=1", label: "On Show", count: counts.onShow },
    {
      href: "/properties?status=TO_LET&type=HOUSE",
      label: "Residential To Let",
      count: counts.byType.HOUSE
        ? Math.max(1, Math.round(counts.toLet * 0.7))
        : counts.toLet,
    },
    {
      href: "/properties?status=FOR_SALE&type=HOUSE",
      label: "Residential For Sale",
      count: counts.byType.HOUSE ?? 0,
    },
    {
      href: "/properties?status=FOR_SALE&type=COMMERCIAL",
      label: "Commercial For Sale",
      count: counts.byType.COMMERCIAL ?? 0,
    },
    {
      href: "/properties?status=FOR_SALE&type=VACANT_LAND",
      label: "Vacant Land",
      count: counts.byType.VACANT_LAND ?? 0,
    },
    {
      href: "/properties?status=FOR_SALE&type=FARM",
      label: "Farms & Small Holdings",
      count: counts.byType.FARM ?? 0,
    },
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="section-pad container-site grid gap-10 py-12 sm:py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
            Looking to
          </p>
          <ul className="space-y-2 text-sm text-white/85">
            {lookingTo.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition hover:text-orange">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
            Search properties
          </p>
          <ul className="space-y-2 text-sm text-white/85">
            {searchProps.map((item) => (
              <li key={item.label} className="flex items-start justify-between gap-4">
                <Link href={item.href} className="min-w-0 transition hover:text-orange">
                  {item.label}
                </Link>
                <span className="shrink-0 text-orange">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
            About
          </p>
          <ul className="space-y-2 text-sm text-white/85">
            <li>
              <Link href="/agents" className="hover:text-orange">
                Our agents
              </Link>
            </li>
            <li>
              <Link href="/areas" className="hover:text-orange">
                Our areas
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-orange">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
            Guidance
          </p>
          <ul className="space-y-2 text-sm text-white/85">
            <li>
              <Link href="/news" className="hover:text-orange">
                Insights
              </Link>
            </li>
            <li>
              <Link href="/sell" className="hover:text-orange">
                Market assessment
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-orange">
                Speak with an adviser
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <Image
            src="/logo.png"
            alt={BRAND.name}
            width={72}
            height={72}
            className="mb-4 h-16 w-16 object-contain"
          />
          <p className="display text-lg leading-snug">{BRAND.name}</p>
          <p className="mt-2 text-sm text-white/70">{BRAND.tagline}</p>
          <p className="mt-4 text-sm text-white/75">{BRAND.location}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-pad container-site flex flex-col gap-3 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/login" className="hover:text-white">
              Agent Login
            </Link>
          </div>
          <p>
            © {new Date().getFullYear()} {BRAND.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
