import Image from "next/image";
import { Quote } from "lucide-react";

export function TestimonialBand() {
  return (
    <section className="relative overflow-hidden bg-navy-deep text-white">
      <div className="absolute inset-y-0 right-0 hidden w-[46%] md:block">
        <Image
          src="https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1200&q=80"
          alt="A family whose property interests deserve careful stewardship"
          fill
          className="object-cover"
          sizes="46vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/35 to-transparent" />
      </div>

      <div className="section-pad container-site relative flex min-h-56 items-center py-10 md:min-h-64">
        <div className="max-w-2xl text-center md:text-left">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
            <Quote size={38} fill="currentColor" className="shrink-0 text-orange" />
            <div>
              <p className="mb-2 text-xs font-bold tracking-[0.16em] text-orange uppercase">
                Our stewardship commitment
              </p>
              <blockquote className="display text-lg leading-relaxed sm:text-2xl">
                We treat every property as a valuable asset to be protected—not merely a listing
                to be sold.
              </blockquote>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75">
                Clear advice, proper records, responsible decisions, and accountable service at
                every stage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
