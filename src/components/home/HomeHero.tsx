import Image from "next/image";
import { HERO_IMAGE } from "@/lib/data/seed";
import { BRAND } from "@/lib/brand";
import { HeroSearch } from "./HeroSearch";

export function HomeHero() {
  return (
    <section className="relative bg-white">
      <div className="relative min-h-[min(78vh,680px)] overflow-hidden bg-navy text-white md:min-h-[min(82vh,760px)]">
        <Image
          src={HERO_IMAGE}
          alt="Well-managed residential property in Bulawayo"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/40 to-navy/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/45 via-transparent to-navy/25" />

        <div className="section-pad relative container-site flex min-h-[min(78vh,680px)] flex-col items-center justify-center pb-36 pt-16 text-center md:min-h-[min(82vh,760px)] md:pb-44 md:pt-20">
          <div className="w-full max-w-3xl">
            <div className="animate-rise mb-6 flex flex-col items-center md:mb-8">
              <Image
                src="/logo.png"
                alt={BRAND.name}
                width={420}
                height={252}
                className="h-auto w-[min(88vw,22rem)] object-contain drop-shadow-lg sm:w-[min(80vw,26rem)] md:w-[28rem]"
                priority
              />
            </div>
            <h1 className="display animate-rise delay-1 mx-auto max-w-2xl text-3xl leading-[1.08] sm:text-4xl md:text-6xl">
              Property care with <span className="text-orange">discipline</span>
            </h1>
            <p className="animate-rise delay-2 mx-auto mt-3 max-w-xl text-sm text-white/90 sm:mt-4 sm:text-base md:text-lg">
              We protect and grow property wealth through trusted advice, ethical execution, and
              accountable service across Bulawayo.
            </p>
          </div>
        </div>
      </div>

      <div className="section-pad relative z-30 -mt-16 pb-2 md:-mt-20">
        <div className="container-site max-w-4xl">
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}
