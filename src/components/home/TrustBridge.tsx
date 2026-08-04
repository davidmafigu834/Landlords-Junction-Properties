import Link from "next/link";
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

export function TrustBridge() {
  return (
    <div className="section-pad relative z-20 py-8 sm:py-10 md:py-12">
      <div className="trust-bridge animate-rise delay-2 container-site overflow-hidden px-2 py-3 sm:px-4 sm:py-4">
        <ul className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-0">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <li
                key={pillar.title}
                className={`relative min-w-[78%] shrink-0 snap-center sm:min-w-0 sm:shrink ${
                  index < pillars.length - 1
                    ? "lg:after:absolute lg:after:top-5 lg:after:right-0 lg:after:bottom-5 lg:after:w-px lg:after:bg-white/15"
                    : ""
                }`}
              >
                <Link
                  href={pillar.href}
                  className="group flex h-full flex-col items-center gap-2.5 rounded-xl px-4 py-5 text-center transition hover:bg-white/5 sm:gap-3 sm:px-5 sm:py-7"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-orange/15 text-orange ring-1 ring-orange/35 transition group-hover:bg-orange group-hover:text-white">
                    <Icon size={20} aria-hidden />
                  </span>
                  <p className="text-xs font-bold tracking-[0.16em] text-white uppercase">
                    {pillar.title}
                  </p>
                  <p className="max-w-[16rem] text-[0.8rem] leading-relaxed text-white/75">
                    {pillar.body}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
