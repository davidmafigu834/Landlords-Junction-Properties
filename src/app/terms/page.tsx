import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="section-pad container-site prose max-w-3xl py-14">
      <h1 className="display text-4xl text-ink">Terms of Service</h1>
      <p className="mt-4 text-muted">
        Listings and market commentary on this site are provided for information. Property
        availability, pricing, and particulars should be verified with your Landlords Junction
        Properties agent before making decisions. Agency mandates and sale/lease agreements are
        governed by separate written terms.
      </p>
    </div>
  );
}
