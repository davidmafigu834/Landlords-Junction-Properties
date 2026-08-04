import Link from "next/link";
import { Home } from "lucide-react";

export function MarketAssessmentCTA() {
  return (
    <section className="section-pad py-10 sm:py-14">
      <div className="container-site">
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-line bg-white px-5 py-6 shadow-[0_12px_32px_color-mix(in_oklab,var(--navy)_8%,transparent)] sm:flex-row sm:gap-6 sm:px-8 sm:py-7">
          <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-orange">
            <Home size={26} aria-hidden />
          </span>
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <h2 className="display text-xl text-navy sm:text-2xl md:text-3xl">
              Looking to sell or let your property?
            </h2>
            <p className="mt-1 text-sm text-muted sm:text-base">
              Request a clear, evidence-based market assessment — without pressure or inflated
              promises.
            </p>
          </div>
          <Link href="/sell" className="btn-orange w-full shrink-0 sm:w-auto">
            List your property
          </Link>
        </div>
      </div>
    </section>
  );
}
