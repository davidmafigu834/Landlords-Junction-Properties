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
    <section className="section-pad py-16 md:py-20">
      <div className="container-site">
        <div className="mb-8 flex flex-wrap items-end gap-4 border-b border-line pb-4">
          <h2 className="display shrink-0 text-3xl text-ink md:text-4xl">{title}</h2>
          <div className="mx-4 hidden h-px flex-1 bg-line md:block" />
          <div className="ml-auto flex items-center gap-4">
            {links?.map((l) => (
              <Link key={l.href} href={l.href} className="link-accent text-xs font-semibold tracking-wider uppercase">
                {l.label}
              </Link>
            ))}
            {href && (
              <Link href={href} className="link-accent text-xs font-semibold tracking-wider uppercase">
                {hrefLabel}
              </Link>
            )}
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
          <div className="flex gap-6">{children}</div>
        </div>
      </div>
    </section>
  );
}
