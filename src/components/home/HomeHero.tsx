import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Search } from "lucide-react";
import { HERO_IMAGE } from "@/lib/data/seed";
import { HeroSearch } from "./HeroSearch";

export function HomeHero() {
  return (
    <section className="relative bg-white pb-72 sm:pb-64 md:pb-48 lg:pb-24">
      <div className="relative min-h-[34rem] bg-navy text-white sm:min-h-[38rem] lg:min-h-[41rem]">
        <Image
          src={HERO_IMAGE}
          alt="Well-managed residential property in Bulawayo"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy/70 to-navy/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/45 via-transparent to-navy/15" />

        <div className="section-pad container-site relative z-10 flex min-h-[34rem] items-center pb-20 sm:min-h-[38rem] lg:min-h-[41rem] lg:pb-28">
          <div className="w-full max-w-3xl">
            <p className="animate-rise mb-4 flex items-center gap-3 text-[0.7rem] font-bold tracking-[0.2em] text-orange uppercase">
              <span className="h-px w-9 bg-orange" />
              Trusted property stewardship
            </p>
            <h1 className="display animate-rise delay-1 max-w-3xl text-[2.35rem] leading-[1.08] sm:text-5xl lg:text-[4.3rem]">
              Protecting & growing
              <span className="block text-orange">property wealth</span>
            </h1>
            <p className="animate-rise delay-2 mt-5 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base lg:text-lg">
              We protect and grow property wealth through trusted advice, ethical execution, and
              accountable service across Bulawayo.
            </p>
            <div className="animate-rise delay-3 mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/properties" className="btn-orange !rounded-sm">
                <Search size={16} />
                Search properties
              </Link>
              <Link href="/contact" className="btn-ghost-light !rounded-sm">
                <CalendarDays size={16} />
                Book a consultation
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="section-pad absolute right-0 bottom-0 left-0 z-30 translate-y-[72%] sm:translate-y-[58%] lg:translate-y-1/2">
          <div className="container-site">
            <HeroSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
