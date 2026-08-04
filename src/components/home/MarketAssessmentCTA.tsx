import Link from "next/link";
import { MapPin } from "lucide-react";

export function MarketAssessmentCTA() {
  return (
    <section className="relative overflow-hidden bg-[#dfe8df] py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 40%, #9bb8a3 0, transparent 28%), radial-gradient(circle at 70% 50%, #a8c4b0 0, transparent 32%), radial-gradient(circle at 45% 70%, #8aab96 0, transparent 24%)",
        }}
      />
      <div className="section-pad relative container-site text-center">
        <h2 className="display text-3xl text-ink md:text-5xl">Request a Market Assessment</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Tell us your Bulawayo address and we&apos;ll prepare a grounded valuation for selling or letting.
        </p>
        <form
          action="/sell"
          className="mx-auto mt-8 flex w-full max-w-3xl flex-col gap-2 bg-white p-2 shadow-md sm:flex-row"
        >
          <label className="relative flex flex-1 items-center">
            <MapPin className="absolute left-3 text-muted" size={16} />
            <input
              name="address"
              className="input border-0 pl-9"
              placeholder="Your address"
            />
          </label>
          <button type="submit" className="btn-primary whitespace-nowrap">
            Enter manually
          </button>
        </form>
        <Link href="/sell" className="link-accent mt-4 inline-block text-xs font-semibold tracking-wider uppercase">
          Or start the full sell / let form
        </Link>
      </div>
    </section>
  );
}
