"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type Props = {
  title: string;
  href?: string;
  hrefLabel?: string;
  links?: { href: string; label: string }[];
  children: ReactNode;
};

export function SectionCarousel({ title, href, hrefLabel = "View all", links, children }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="section-pad py-12 sm:py-16 md:py-20">
      <div className="container-site">
        <div className="mb-6 flex flex-col gap-4 border-b border-line pb-4 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-end">
          <h2 className="display text-2xl text-ink sm:text-3xl md:text-4xl">{title}</h2>
          <div className="mx-4 hidden h-px flex-1 bg-line md:block" />
          <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:ml-auto sm:w-auto sm:justify-end sm:gap-4">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {links?.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="link-accent text-xs font-semibold tracking-wider uppercase"
                >
                  {l.label}
                </Link>
              ))}
              {href && (
                <Link href={href} className="link-accent text-xs font-semibold tracking-wider uppercase">
                  {hrefLabel}
                </Link>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="carousel-btn disabled:opacity-30"
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canPrev}
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="carousel-btn disabled:opacity-30"
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canNext}
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6">{children}</div>
        </div>
      </div>
    </section>
  );
}
