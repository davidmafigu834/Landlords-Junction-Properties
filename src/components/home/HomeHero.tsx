import Image from "next/image";
import Link from "next/link";
import { HERO_IMAGE } from "@/lib/data/seed";
import { BRAND } from "@/lib/brand";
import { HeroSearch } from "./HeroSearch";

export function HomeHero() {
  return (
    <section className="relative min-h-[min(88vh,760px)] overflow-hidden bg-navy text-white md:min-h-[88vh]">
      <Image
        src={HERO_IMAGE}
        alt="Well-managed residential property in Bulawayo"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy/70 to-navy/35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,90,26,0.18),transparent_50%)]" />

      <div className="section-pad relative container-site flex min-h-[min(88vh,760px)] flex-col justify-end pb-8 pt-20 md:min-h-[88vh] md:pb-14 md:pt-28">
        <div className="mb-8 max-w-3xl md:mb-10">
          <div className="animate-rise mb-5 flex items-center gap-3 sm:gap-4 md:mb-6">
            <Image
              src="/logo.png"
              alt={BRAND.name}
              width={72}
              height={72}
              className="h-12 w-12 object-contain drop-shadow sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]"
              priority
            />
            <div className="min-w-0">
              <p className="display text-xl leading-tight sm:text-2xl md:text-3xl">{BRAND.name}</p>
              <p className="mt-1 text-xs text-white/75 sm:text-sm">{BRAND.tagline}</p>
            </div>
          </div>
          <h1 className="display animate-rise delay-1 max-w-2xl text-3xl leading-[1.08] sm:text-4xl md:text-6xl">
            Property care with discipline
          </h1>
          <p className="animate-rise delay-2 mt-3 max-w-xl text-sm text-white/85 sm:mt-4 sm:text-base md:text-lg">
            We protect and grow property wealth through trusted advice, ethical execution, and
            accountable service across Bulawayo.
          </p>
        </div>
        <HeroSearch />
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[0.7rem] tracking-wider text-white/70 uppercase sm:text-xs">
          <Link href="/sell" className="transition hover:text-white">
            Request a market assessment
          </Link>
          <span className="hidden text-white/40 sm:inline" aria-hidden>
            ·
          </span>
          <Link href="/agents" className="transition hover:text-white">
            Meet our agents
          </Link>
        </div>
      </div>
    </section>
  );
}
