import { CircleDollarSign, Clock3, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const stats: {
  value: string;
  title: string;
  caption: string;
  icon: LucideIcon;
}[] = [
  {
    value: "Protection",
    title: "Before profit",
    caption: "Long-term interests come first",
    icon: Users,
  },
  {
    value: "Truth",
    title: "Before convenience",
    caption: "Material facts disclosed clearly",
    icon: CircleDollarSign,
  },
  {
    value: "Value",
    title: "Before volume",
    caption: "Evidence-led property decisions",
    icon: ShieldCheck,
  },
  {
    value: "Accountability",
    title: "Outcomes, not excuses",
    caption: "Clear ownership and follow-through",
    icon: Clock3,
  },
];

export function TrustBridge() {
  return (
    <section className="section-pad relative z-20 mt-8 border-b border-line bg-white py-8 sm:mt-10 sm:py-10 lg:mt-12">
      <div className="container-site grid grid-cols-2 gap-y-8 md:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`flex flex-col items-center gap-3 px-3 text-center sm:flex-row sm:px-5 sm:text-left ${
                index > 0 ? "md:border-l md:border-line" : ""
              }`}
            >
              <Icon size={39} strokeWidth={1.6} className="shrink-0 text-orange" />
              <div>
                <p className="display text-lg font-bold leading-none text-navy sm:text-xl">
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
