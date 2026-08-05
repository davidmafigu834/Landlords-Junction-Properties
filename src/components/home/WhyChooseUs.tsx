import Link from "next/link";
import { ArrowRight, FileCheck2, Heart, Scale, ShieldCheck } from "lucide-react";

const strengths = [
  {
    title: "Integrity & ethics",
    body: "Material facts, risks, and next steps are explained clearly—without selective disclosure.",
    icon: ShieldCheck,
  },
  {
    title: "Prudent advice",
    body: "Recommendations are based on checks, comparable evidence, and sound professional judgment.",
    icon: Scale,
  },
  {
    title: "Accountability",
    body: "We keep proper records, provide clear updates, and take ownership until each matter is closed.",
    icon: FileCheck2,
  },
  {
    title: "Respect & empathy",
    body: "Every landlord, tenant, buyer, and seller is treated with patience, fairness, and dignity.",
    icon: Heart,
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-pad border-b border-line bg-white py-12 sm:py-16">
      <div className="container-site grid gap-10 lg:grid-cols-[1.05fr_2fr] lg:items-center">
        <div className="text-center lg:text-left">
          <p className="text-xs font-bold tracking-[0.18em] text-orange uppercase">
            Our approach
          </p>
          <h2 className="display mt-1 text-3xl leading-tight text-navy sm:text-4xl">
            Clear judgment. Responsible care.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted lg:mx-0">
            Our work combines local knowledge, disciplined process, and long-term thinking to help
            clients make informed property decisions and manage risk responsibly.
          </p>
          <Link href="/agents" className="btn-orange mt-6 !min-h-10 !rounded-sm !px-5">
            Meet our advisers <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
          {strengths.map((strength, index) => {
            const Icon = strength.icon;
            return (
              <div
                key={strength.title}
                className={`px-4 text-center sm:px-5 ${
                  index > 0 ? "sm:border-l sm:border-line" : ""
                }`}
              >
                <Icon size={35} strokeWidth={1.6} className="mx-auto text-orange" />
                <h3 className="mt-4 text-sm font-bold text-navy sm:text-base">{strength.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">{strength.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
