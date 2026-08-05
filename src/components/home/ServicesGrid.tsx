import Link from "next/link";
import {
  BarChart3,
  Building2,
  ClipboardCheck,
  Hammer,
  Home,
  KeyRound,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const services: { title: string; body: string; href: string; icon: LucideIcon }[] = [
  {
    title: "Property sales",
    body: "Residential, commercial and investment property represented with care.",
    href: "/properties?status=FOR_SALE",
    icon: Home,
  },
  {
    title: "Property letting",
    body: "Structured tenant placement, clear terms, and accountable rental support.",
    href: "/properties?status=TO_LET",
    icon: KeyRound,
  },
  {
    title: "Property management",
    body: "Disciplined oversight of occupancy, records, maintenance, and long-term value.",
    href: "/sell",
    icon: Building2,
  },
  {
    title: "Market assessments",
    body: "Evidence-led guidance grounded in comparable sales and local demand.",
    href: "/sell",
    icon: ClipboardCheck,
  },
  {
    title: "Investment guidance",
    body: "Disciplined advice for owners focused on lasting property value.",
    href: "/contact",
    icon: BarChart3,
  },
  {
    title: "Developments",
    body: "Development opportunities presented with factual information, diligence, and care.",
    href: "/properties?type=DEVELOPMENT",
    icon: Hammer,
  },
];

export function ServicesGrid() {
  return (
    <section className="section-pad bg-paper py-12 sm:py-16 md:py-20">
      <div className="container-site">
        <div className="mb-5 text-center sm:mb-8">
          <p className="text-xs font-bold tracking-[0.18em] text-orange uppercase">
            Our services
          </p>
          <h2 className="display mt-1 text-2xl text-navy sm:text-3xl md:text-4xl">
            Property stewardship services
          </h2>
          <p className="mt-3 text-xs font-semibold tracking-wide text-muted uppercase sm:hidden">
            Swipe to explore services →
          </p>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pr-0 lg:grid-cols-3 xl:grid-cols-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group relative flex min-h-64 w-[78vw] max-w-sm shrink-0 snap-start flex-col items-center overflow-hidden border border-line bg-white px-5 py-7 text-center shadow-[0_8px_24px_rgba(4,24,48,0.05)] transition hover:-translate-y-1 hover:border-orange sm:w-auto sm:max-w-none"
              >
                <span className="absolute top-4 right-4 text-[0.65rem] font-bold tracking-wider text-navy/35">
                  {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </span>
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-orange/25 bg-orange/5 text-orange">
                  <Icon size={25} strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 text-sm font-bold tracking-[0.06em] text-navy uppercase">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{service.body}</p>
                <span className="mt-5 flex items-center gap-1 text-xs font-bold tracking-wider text-orange uppercase">
                  Learn more <ArrowRight size={12} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
