"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { BarChart3, Headphones, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const pillars: {
  title: string;
  body: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Trusted",
    body: "Ethical advice and transparent process on every mandate.",
    href: "/agents",
    icon: ShieldCheck,
  },
  {
    title: "Results driven",
    body: "Evidence-led pricing and focused execution that closes.",
    href: "/properties",
    icon: BarChart3,
  },
  {
    title: "Local experts",
    body: "Bulawayo suburb knowledge that protects long-term value.",
    href: "/areas",
    icon: Users,
  },
  {
    title: "Personal service",
    body: "One accountable agent from first call to handover.",
    href: "/contact",
    icon: Headphones,
  },
];

function PillarCard({
  pillar,
  className = "",
}: {
  pillar: (typeof pillars)[number];
  className?: string;
}) {
  const Icon = pillar.icon;
  return (
    <Link
      href={pillar.href}
      className={`group flex h-full flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-center shadow-[0_10px_28px_color-mix(in_oklab,black_22%,transparent)] backdrop-blur-sm transition hover:border-orange/40 hover:bg-white/10 ${className}`}
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange text-white shadow-md transition group-hover:scale-105">
        <Icon size={22} aria-hidden />
      </span>
      <p className="text-xs font-bold tracking-[0.16em] text-white uppercase">{pillar.title}</p>
      <p className="max-w-[16rem] text-[0.85rem] leading-relaxed text-white/80">{pillar.body}</p>
    </Link>
  );
}

export function TrustBridge() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || paused) return;
    const id = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 3200);
    return () => window.clearInterval(id);
  }, [emblaApi, paused]);

  return (
    <div className="section-pad relative z-20 py-8 sm:py-10 md:py-12">
      <div className="trust-bridge animate-rise delay-2 container-site overflow-hidden px-2 py-4 sm:px-4 sm:py-5">
        {/* Mobile: auto-moving cards */}
        <div
          className="lg:hidden"
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="min-w-0 shrink-0 grow-0 basis-[82%] px-2 sm:basis-[55%]">
                  <PillarCard pillar={pillar} className="min-h-[11.5rem]" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2" aria-label="Trust pillar slides">
            {pillars.map((pillar, index) => (
              <button
                key={pillar.title}
                type="button"
                aria-label={`Show ${pillar.title}`}
                aria-current={selected === index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  selected === index ? "w-6 bg-orange" : "w-2 bg-white/35"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: full grid */}
        <ul className="hidden gap-0 lg:grid lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <li
              key={pillar.title}
              className={`relative px-2 ${
                index < pillars.length - 1
                  ? "lg:after:absolute lg:after:top-5 lg:after:right-0 lg:after:bottom-5 lg:after:w-px lg:after:bg-white/15"
                  : ""
              }`}
            >
              <PillarCard pillar={pillar} className="border-transparent bg-transparent shadow-none hover:bg-white/5" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
