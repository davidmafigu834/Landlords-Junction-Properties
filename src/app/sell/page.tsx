import { LeadForm } from "@/components/forms/LeadForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sell or Let" };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function SellPage({ searchParams }: Props) {
  const params = await searchParams;
  const address = typeof params.address === "string" ? params.address : "";

  return (
    <div>
      <section className="bg-navy px-0 py-12 text-white sm:py-16">
        <div className="section-pad container-site">
          <h1 className="display text-3xl sm:text-4xl md:text-5xl">Sell or let with stewardship</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
            Request a market assessment grounded in evidence. We explain risks, costs, and timing
            clearly — and never pressure you into a rushed decision.
          </p>
        </div>
      </section>
      <div className="section-pad container-site grid gap-10 py-10 sm:py-14 lg:grid-cols-2">
        <div className="min-w-0">
          <h2 className="display text-2xl text-ink sm:text-3xl">How it works</h2>
          <ol className="mt-6 space-y-4 text-sm text-muted sm:text-base">
            <li>
              <span className="font-semibold text-navy">01 — </span>
              Share your address and goals (sell, let, or both).
            </li>
            <li>
              <span className="font-semibold text-navy">02 — </span>
              We prepare a suburb-grounded assessment with comparable evidence and clear next steps.
            </li>
            <li>
              <span className="font-semibold text-navy">03 — </span>
              Your dedicated agent advises, lists, negotiates, and documents with accountability.
            </li>
          </ol>
          {address && (
            <p className="mt-8 border border-line bg-paper p-4 text-sm break-words text-ink">
              Starting with address: <strong>{address}</strong>
            </p>
          )}
        </div>
        <div className="min-w-0 border border-line bg-paper p-5 sm:p-6 md:p-8">
          <LeadForm
            type="SELL"
            title="Request a market assessment"
            submitLabel="Request assessment"
          />
        </div>
      </div>
    </div>
  );
}
