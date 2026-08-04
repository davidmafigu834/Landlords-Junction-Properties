import { CircleDollarSign, Clock3, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const stats: {
  value: string;
  title: string;
  caption: string;
  icon: LucideIcon;
}[] = [
  {
    value: "500+",
    title: "Satisfied clients",
    caption: "Across Bulawayo",
    icon: Users,
  },
  {
    value: "US$20M+",
    title: "Property transactions",
    caption: "Successfully closed",
    icon: CircleDollarSign,
  },
  {
    value: "98%",
    title: "Client satisfaction",
    caption: "From our clients",
    icon: ShieldCheck,
  },
  {
    value: "24 hours",
    title: "Average response time",
    caption: "We are here for you",
    icon: Clock3,
  },
];

export function TrustBridge() {
  return (
    <section className="section-pad relative z-20 border-b border-line bg-white py-7 sm:py-9">
      <div className="container-site grid grid-cols-2 gap-y-8 md:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`flex items-center gap-3 px-3 sm:px-5 ${
                index > 0 ? "md:border-l md:border-line" : ""
              }`}
            >
              <Icon size={39} strokeWidth={1.6} className="shrink-0 text-orange" />
              <div>
                <p className="display text-xl font-bold leading-none text-navy sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-bold tracking-[0.06em] text-navy uppercase">
                  {stat.title}
                </p>
                <p className="mt-0.5 text-xs text-muted">{stat.caption}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
