"use client";

import { useState } from "react";
import { LeadForm } from "@/components/forms/LeadForm";

const reasons = [
  {
    title: "Protect before profit",
    body: "We treat every property as a valuable asset to be protected — not merely a listing to be sold. Advice starts with long-term value, not commission.",
  },
  {
    title: "Evidence-led pricing",
    body: "Assessments are grounded in comparable evidence, suburb demand, and risk — so sellers and landlords decide with clarity, not guesswork.",
  },
  {
    title: "Accountable execution",
    body: "From documentation and disclosure to negotiation and handover, one dedicated agent owns the process and closes every loop.",
  },
  {
    title: "Stewardship for landlords",
    body: "Whether you sell or let, we recommend the path that preserves value, reduces avoidable loss, and respects every legitimate stakeholder.",
  },
];

export function WhySellSection() {
  const [index, setIndex] = useState(0);
  const active = reasons[index];

  return (
    <section className="grid lg:grid-cols-2">
      <div className="bg-navy-deep px-5 py-12 text-white sm:px-6 md:px-12 md:py-20">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <h2 className="display text-2xl sm:text-3xl md:text-4xl">
            Why entrust your property to us?
          </h2>
          <span className="hidden text-xs tracking-[0.18em] text-orange uppercase lg:block">
            Stewardship
          </span>
        </div>
        <div className="grid overflow-hidden sm:grid-cols-2">
          <div className="bg-navy p-5 md:p-8">
            <p className="text-sm font-semibold tracking-[0.14em] text-orange uppercase">
              {active.title}
            </p>
          </div>
          <div className="bg-white p-5 text-ink md:p-8">
            <p className="text-sm leading-relaxed text-muted">{active.body}</p>
          </div>
        </div>
        <div className="mt-6 flex gap-1 sm:mt-8 sm:gap-2">
          {reasons.map((reason, i) => (
            <button
              key={reason.title}
              type="button"
              aria-label={reason.title}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="flex min-h-11 flex-1 items-center px-0.5"
            >
              <span
                className={`block h-1.5 w-full transition ${
                  i === index ? "bg-white" : "bg-white/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="bg-paper px-5 py-12 sm:px-6 md:px-12 md:py-20">
        <LeadForm type="SELL" title="Tell us about your property" submitLabel="Request guidance" />
      </div>
    </section>
  );
}
