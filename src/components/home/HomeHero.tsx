import Image from "next/image";
import Link from "next/link";
import { HERO_IMAGE } from "@/lib/data/seed";
import { HeroSearch } from "./HeroSearch";

export function HomeHero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-navy text-white">
      <Image
        src={HERO_IMAGE}
        alt="Homes in Bulawayo"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/55 to-navy/25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,90,23,0.25),transparent_55%)]" />

      <div className="section-pad relative container-site flex min-h-[88vh] flex-col justify-end pb-10 pt-28 md:pb-14">
        <div className="mb-10 max-w-3xl">
          <div className="animate-rise mb-6 flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Landlords Junction Properties"
              width={72}
              height={72}
              className="h-16 w-16 object-contain drop-shadow md:h-[4.5rem] md:w-[4.5rem]"
              priority
            />
            <div>
              <p className="display text-2xl leading-none md:text-3xl">
                Landlords Junction Properties
              </p>
              <p className="mt-1 text-sm text-white/75 italic">
                The confluence of buyers and sellers
              </p>
            </div>
          </div>
          <h1 className="display animate-rise delay-1 max-w-2xl text-4xl leading-[1.05] md:text-6xl">
            Bulawayo&apos;s home for serious property decisions
          </h1>
          <p className="animate-rise delay-2 mt-4 max-w-xl text-base text-white/85 md:text-lg">
            Buy, rent, or list with local agents who know every suburb from Hillside to Kumalo.
          </p>
        </div>
        <HeroSearch />
        <div className="mt-4 flex flex-wrap gap-4 text-xs tracking-wider text-white/70 uppercase">
          <Link href="/sell" className="hover:text-orange">
            Request a market assessment
          </Link>
          <span aria-hidden>·</span>
          <Link href="/agents" className="hover:text-orange">
            Meet our agents
          </Link>
        </div>
      </div>
    </section>
  );
}
