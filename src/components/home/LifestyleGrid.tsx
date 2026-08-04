import Image from "next/image";
import Link from "next/link";
import { lifestyles } from "@/lib/data/seed";

export function LifestyleGrid() {
  return (
    <section className="section-pad bg-paper py-12 sm:py-16 md:py-20">
      <div className="container-site">
        <div className="mb-8 text-center">
          <p className="text-[0.7rem] font-bold tracking-[0.18em] text-orange uppercase">Explore by category</p>
          <h2 className="display mt-1 text-2xl text-ink sm:text-3xl md:text-4xl">Property types</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lifestyles.map((item) => (
            <Link
              key={item.slug}
              href={`/properties?type=${item.type}`}
              className="group overflow-hidden rounded-md border border-line bg-white shadow-[0_8px_24px_rgba(4,24,48,0.06)] transition hover:-translate-y-1 hover:border-orange"
            >
              <div className="relative h-36 w-full shrink-0 overflow-hidden bg-paper">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw, 33vw"
                />
              </div>
              <div className="flex min-w-0 flex-col justify-center p-5 text-center">
                <h3 className="font-semibold text-navy">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
                <span className="mt-3 text-xs font-bold tracking-wider text-orange uppercase">
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
