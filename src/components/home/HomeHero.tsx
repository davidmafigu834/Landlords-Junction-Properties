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
      {/* Clean navy overlay — brand blue, no muddy colour mix */}
      <div className="absolute inset-0 bg-navy/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/50 to-navy/40" />

      <div className="section-pad relative container-site flex min-h-[min(88vh,760px)] flex-col items-center justify-end pb-8 pt-20 text-center md:min-h-[88vh] md:pb-14 md:pt-28">
        <div className="mb-8 w-full max-w-3xl md:mb-10">
          <div className="animate-rise mb-5 flex flex-col items-center gap-3 md:mb-6">
            <Image
              src="/logo.png"
              alt={BRAND.name}
              width={72}
              height={72}
              className="h-14 w-14 object-contain drop-shadow sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]"
              priority
            />
            <div className="min-w-0">
              <p className="display text-xl leading-tight sm:text-2xl md:text-3xl">{BRAND.name}</p>
              <div className="mx-auto mt-2 h-0.5 w-16 bg-orange" aria-hidden />
              <p className="mt-2 text-xs text-white/80 sm:text-sm">{BRAND.tagline}</p>
            </div>
          </div>
          <h1 className="display animate-rise delay-1 mx-auto max-w-2xl text-3xl leading-[1.08] sm:text-4xl md:text-6xl">
            Property care with discipline
          </h1>
          <p className="animate-rise delay-2 mx-auto mt-3 max-w-xl text-sm text-white/90 sm:mt-4 sm:text-base md:text-lg">
            We protect and grow property wealth through trusted advice, ethical execution, and
            accountable service across Bulawayo.
          </p>
        </div>
        <div className="w-full max-w-4xl">
          <HeroSearch />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.7rem] tracking-wider text-white/75 uppercase sm:text-xs">
          <Link
            href="/sell"
            className="underline decoration-orange decoration-2 underline-offset-4 transition hover:text-orange"
          >
            Request a market assessment
          </Link>
          <span className="hidden text-white/40 sm:inline" aria-hidden>
            ·
          </span>
          <Link
            href="/agents"
            className="underline decoration-orange decoration-2 underline-offset-4 transition hover:text-orange"
          >
            Meet our agents
          </Link>
        </div>
      </div>
    </section>
  );
}
