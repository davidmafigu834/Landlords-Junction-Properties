import Image from "next/image";
import { ChevronRight, Quote } from "lucide-react";

export function TestimonialBand() {
  return (
    <section className="relative overflow-hidden bg-navy-deep text-white">
      <div className="absolute inset-y-0 right-0 hidden w-[46%] md:block">
        <Image
          src="https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1200&q=80"
          alt="Happy property clients"
          fill
          className="object-cover"
          sizes="46vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/35 to-transparent" />
      </div>

      <div className="section-pad container-site relative flex min-h-56 items-center py-10 md:min-h-64">
        <div className="max-w-2xl">
          <div className="flex gap-4">
            <Quote size={38} fill="currentColor" className="shrink-0 text-orange" />
            <div>
              <blockquote className="display text-lg leading-relaxed sm:text-2xl">
                LJP sold my property in just three weeks at a great price. Their professionalism is
                unmatched.
              </blockquote>
              <p className="mt-4 text-xs font-semibold text-white/75">— Tinashe M., Property Seller</p>
            </div>
          </div>
          <div className="mt-7 flex items-center gap-3 pl-14" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-white/35" />
            <span className="h-2 w-2 rounded-full bg-orange" />
            <span className="h-2 w-2 rounded-full bg-white/35" />
            <span className="ml-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/30">
              <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
