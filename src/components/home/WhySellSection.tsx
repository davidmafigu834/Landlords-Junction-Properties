"use client";

import { useState } from "react";
import { LeadForm } from "@/components/forms/LeadForm";

const reasons = [
  {
    title: "Buyers & renters database",
    body: "We actively match new listings to buyers and tenants already searching across Bulawayo — so your property meets demand faster.",
  },
  {
    title: "Suburb-level pricing",
    body: "Our assessments are grounded in recent comparable sales and street-level demand, not national averages.",
  },
  {
    title: "End-to-end agency",
    body: "From photography and listing to negotiation and handover, one dedicated agent owns the process with you.",
  },
  {
    title: "Landlord-first advice",
    body: "Whether you sell or let, we recommend the path that protects your yield and your timeline.",
  },
];

export function WhySellSection() {
  const [index, setIndex] = useState(0);
  const active = reasons[index];

  return (
    <section className="grid lg:grid-cols-2">
      <div className="bg-navy-deep px-6 py-14 text-white md:px-12 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="display text-3xl md:text-4xl">Why sell with us?</h2>
          <span className="text-xs tracking-[0.18em] text-white/55 uppercase">
            Sell / Let with us
          </span>
        </div>
        <div className="grid overflow-hidden sm:grid-cols-2">
          <div className="bg-navy p-6 md:p-8">
            <p className="text-sm font-semibold tracking-[0.14em] text-orange uppercase">
              {active.title}
            </p>
          </div>
          <div className="bg-white p-6 text-ink md:p-8">
            <p className="text-sm leading-relaxed text-muted">{active.body}</p>
          </div>
        </div>
        <div className="mt-8 flex gap-2">
          {reasons.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Reason ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1 flex-1 transition ${i === index ? "bg-white" : "bg-white/30"}`}
            />
          ))}
        </div>
      </div>
      <div className="bg-paper px-6 py-14 md:px-12 md:py-20">
        <LeadForm type="SELL" title="Let us assist you" />
      </div>
    </section>
  );
}
