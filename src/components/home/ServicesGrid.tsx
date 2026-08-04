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
    body: "The right tenant, clear terms and accountable rental support.",
    href: "/properties?status=TO_LET",
    icon: KeyRound,
  },
  {
    title: "Property management",
    body: "Disciplined oversight that protects income, condition and long-term value.",
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
    body: "Stewardship-minded advice for owners building lasting property wealth.",
    href: "/contact",
    icon: BarChart3,
  },
  {
    title: "Developments",
    body: "Thoughtful opportunities presented with clarity, diligence and care.",
    href: "/properties?type=DEVELOPMENT",
    icon: Hammer,
  },
];

export function ServicesGrid() {
  return (
    <section className="section-pad bg-paper py-12 sm:py-16 md:py-20">
      <div className="container-site">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold tracking-[0.18em] text-orange uppercase">
            Our services
          </p>
          <h2 className="display mt-1 text-2xl text-navy sm:text-3xl md:text-4xl">
            Comprehensive property solutions
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group flex min-h-64 flex-col items-center border border-line bg-white px-5 py-7 text-center shadow-[0_8px_24px_rgba(4,24,48,0.05)] transition hover:-translate-y-1 hover:border-orange"
              >
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
