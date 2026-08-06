import type { Metadata } from "next";
import { FileText, ShieldCheck } from "lucide-react";
import { OfferLetterForm } from "@/components/forms/OfferLetterForm";

export const metadata: Metadata = { title: "List Your Property" };

export default function ListPropertyPage() {
  return (
    <div>
      <section className="bg-navy py-12 text-white sm:py-16">
        <div className="section-pad container-site">
          <p className="text-xs font-bold tracking-[0.18em] text-orange uppercase">
            Property owners
          </p>
          <h1 className="display mt-2 text-3xl sm:text-4xl md:text-5xl">
            List your property
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
            Complete the offer letter below to introduce your property to our team. We will verify
            the details and contact you before any listing is published.
          </p>
        </div>
      </section>

      <div className="section-pad container-site grid gap-10 py-10 sm:py-14 lg:grid-cols-[0.7fr_1.3fr]">
        <aside className="min-w-0">
          <h2 className="display text-2xl text-ink sm:text-3xl">What happens next?</h2>
          <div className="mt-6 space-y-5 text-sm text-muted">
            <div className="flex gap-3">
              <FileText className="mt-0.5 shrink-0 text-orange" size={20} />
              <p>
                An adviser reviews your property information, ownership status, and listing goals.
              </p>
            </div>
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 shrink-0 text-orange" size={20} />
              <p>
                We contact you to verify the details and explain valuation, marketing, fees, and the
                formal mandate.
              </p>
            </div>
          </div>
          <p className="mt-8 border border-line bg-paper p-4 text-xs leading-5 text-muted">
            This online offer letter is an expression of interest in listing your property. It is
            not a sale, lease, or binding agency mandate.
          </p>
        </aside>

        <section className="min-w-0 border border-line bg-paper p-5 sm:p-6 md:p-8">
          <h2 className="display text-2xl text-ink sm:text-3xl">Property To Be Sold</h2>
          <p className="mt-2 text-sm text-muted">
            Please provide accurate contact, ownership, and property details.
          </p>
          <div className="mt-7">
            <OfferLetterForm />
          </div>
        </section>
      </div>
    </div>
  );
}
