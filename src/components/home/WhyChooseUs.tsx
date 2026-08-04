import Link from "next/link";
import { ArrowRight, Heart, MapPin, ShieldCheck, Target } from "lucide-react";

const strengths = [
  {
    title: "Integrity & ethics",
    body: "We uphold honesty, transparency and professional standards in everything we do.",
    icon: ShieldCheck,
  },
  {
    title: "Local expertise",
    body: "Deep understanding of the Bulawayo property market and its neighbourhoods.",
    icon: MapPin,
  },
  {
    title: "Proven track record",
    body: "Focused execution and evidence-led advice that protects long-term value.",
    icon: Target,
  },
  {
    title: "Client focused",
    body: "Your goals are our priority, with one accountable team from start to finish.",
    icon: Heart,
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-pad border-b border-line bg-white py-12 sm:py-16">
      <div className="container-site grid gap-10 lg:grid-cols-[1.05fr_2fr] lg:items-center">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-orange uppercase">
            Why choose us
          </p>
          <h2 className="display mt-1 text-3xl leading-tight text-navy sm:text-4xl">
            Integrity. Expertise. Results.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            We combine deep local knowledge, professional expertise and a client-first approach to
            deliver exceptional property outcomes.
          </p>
          <Link href="/agents" className="btn-orange mt-6 !min-h-10 !rounded-sm !px-5">
            About us <ArrowRight size={14} />
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
