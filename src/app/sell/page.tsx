import { LeadForm } from "@/components/forms/LeadForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sell or Let" };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function SellPage({ searchParams }: Props) {
  const params = await searchParams;
  const address = typeof params.address === "string" ? params.address : "";

  return (
    <div>
      <section className="bg-navy px-0 py-16 text-white">
        <div className="section-pad container-site">
          <h1 className="display text-4xl md:text-5xl">Sell or let with us</h1>
          <p className="mt-3 max-w-2xl text-white/75">
            Request a market assessment and let a Bulawayo agent guide your next move.
          </p>
        </div>
      </section>
      <div className="section-pad container-site grid gap-10 py-14 lg:grid-cols-2">
        <div>
          <h2 className="display text-3xl text-ink">How it works</h2>
          <ol className="mt-6 space-y-4 text-muted">
            <li>
              <span className="font-semibold text-orange">01 — </span>
              Share your address and goals (sell, let, or both).
            </li>
            <li>
              <span className="font-semibold text-orange">02 — </span>
              We prepare a suburb-grounded market assessment.
            </li>
            <li>
              <span className="font-semibold text-orange">03 — </span>
              Your dedicated agent lists, markets, and negotiates.
            </li>
          </ol>
          {address && (
            <p className="mt-8 border border-line bg-paper p-4 text-sm text-ink">
              Starting with address: <strong>{address}</strong>
            </p>
          )}
        </div>
        <div className="bg-paper p-6 md:p-8">
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
