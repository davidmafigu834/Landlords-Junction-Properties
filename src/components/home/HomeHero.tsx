import Image from "next/image";
import { HERO_IMAGE } from "@/lib/data/seed";
import { BRAND } from "@/lib/brand";
import { HeroSearch } from "./HeroSearch";

export function HomeHero() {
  return (
    <section className="relative bg-white">
      <div className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-navy text-white md:min-h-[calc(100svh-4.5rem)]">
        <Image
          src={HERO_IMAGE}
          alt="Well-managed residential property in Bulawayo"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/55 via-navy/45 to-navy/88" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/45 via-transparent to-navy/25" />

        <div className="section-pad relative flex flex-1 flex-col items-center justify-center px-4 pt-6 pb-4 text-center sm:pt-8 md:pt-10">
          <div className="w-full max-w-3xl">
            <div className="animate-rise mb-3 flex flex-col items-center sm:mb-4 md:mb-5">
              <Image
                src="/logo.png"
                alt={BRAND.name}
                width={420}
                height={252}
                className="h-auto w-[min(72vw,14.5rem)] object-contain drop-shadow-lg sm:w-[min(60vw,17rem)] md:w-[19rem]"
                priority
              />
            </div>
            <h1 className="display animate-rise delay-1 mx-auto max-w-2xl text-[1.85rem] leading-[1.12] sm:text-4xl md:text-5xl">
              Property care with <span className="text-orange">discipline</span>
            </h1>
            <p className="animate-rise delay-2 mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-white/90 sm:mt-3.5 sm:text-base md:text-lg">
              We protect and grow property wealth through trusted advice, ethical execution, and
              accountable service across Bulawayo.
            </p>
          </div>
        </div>

        <div className="section-pad relative z-30 w-full pb-5 sm:pb-6 md:pb-8">
          <div className="container-site max-w-4xl">
            <HeroSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
