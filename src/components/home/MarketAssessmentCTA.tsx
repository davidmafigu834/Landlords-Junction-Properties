import Link from "next/link";
import { MapPin } from "lucide-react";

export function MarketAssessmentCTA() {
  return (
    <section className="relative overflow-hidden bg-paper py-14 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 15% 30%, color-mix(in oklab, #0b1f3a 12%, transparent) 0, transparent 42%), radial-gradient(ellipse at 85% 60%, color-mix(in oklab, #d45a1a 10%, transparent) 0, transparent 40%)",
        }}
      />
      <div className="section-pad relative container-site text-center">
        <h2 className="display text-2xl text-ink sm:text-3xl md:text-5xl">
          Request a market assessment
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
          Share your address. We prepare a clear, evidence-based assessment for selling or letting —
          without pressure or inflated promises.
        </p>
        <form
          action="/sell"
          className="mx-auto mt-8 flex w-full max-w-3xl flex-col gap-2 border border-line bg-white p-2 sm:flex-row"
        >
          <label className="relative flex min-h-11 flex-1 items-center">
            <MapPin className="absolute left-3 text-muted" size={16} />
            <input name="address" className="input min-h-11 border-0 pl-9" placeholder="Your address" />
          </label>
          <button type="submit" className="btn-primary min-h-11 w-full whitespace-nowrap sm:w-auto">
            Continue
          </button>
        </form>
        <Link
          href="/sell"
          className="link-accent mt-4 inline-block text-xs font-semibold tracking-wider uppercase"
        >
          Or complete the full sell / let form
        </Link>
      </div>
    </section>
  );
}
