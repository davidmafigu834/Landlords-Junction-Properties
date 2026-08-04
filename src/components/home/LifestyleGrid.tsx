import Image from "next/image";
import Link from "next/link";
import { lifestyles } from "@/lib/data/seed";

export function LifestyleGrid() {
  return (
    <section className="section-pad py-12 sm:py-16 md:py-20">
      <div className="container-site">
        <div className="mb-6 flex items-end gap-4 border-b border-line pb-4 sm:mb-8">
          <h2 className="display text-2xl text-ink sm:text-3xl md:text-4xl">Property types</h2>
          <div className="mx-4 hidden h-px flex-1 bg-line md:block" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lifestyles.map((item) => (
            <Link
              key={item.slug}
              href={`/properties?type=${item.type}`}
              className="group flex flex-col gap-4 border border-line p-3 transition hover:border-navy sm:flex-row"
            >
              <div className="relative h-40 w-full shrink-0 overflow-hidden bg-paper sm:h-28 sm:w-32">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw, 128px"
                />
              </div>
              <div className="flex min-w-0 flex-col justify-center py-1">
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
                <span className="mt-3 text-sm font-semibold text-navy underline decoration-orange decoration-2 underline-offset-4">
                  View Listings
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
