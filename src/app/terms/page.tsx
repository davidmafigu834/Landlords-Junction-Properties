import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="section-pad container-site prose max-w-3xl py-14">
      <h1 className="display text-4xl text-ink">Terms of Service</h1>
      <div className="mt-6 space-y-6 text-muted">
        <section>
          <h2 className="text-lg font-semibold text-ink">Property information</h2>
          <p className="mt-2">
            Listings, images, prices, availability, measurements, and market commentary are
            provided for general information and may change. Material particulars should be
            confirmed in writing before a decision is made.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink">Independent verification</h2>
          <p className="mt-2">
            Buyers, sellers, landlords, and tenants remain responsible for appropriate inspections,
            document checks, professional advice, and verification of title or authority where
            applicable. We will explain known material facts and risks within our mandate.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink">Written agreements</h2>
          <p className="mt-2">
            Website use or an enquiry does not create an agency relationship. Agency mandates,
            valuations, property management, and sale or lease transactions are governed by their
            own written terms and applicable requirements.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink">Responsible use</h2>
          <p className="mt-2">
            Users must not submit false information, misuse listing content, interfere with the
            service, or attempt to access confidential records without authority.
          </p>
        </section>
      </div>
    </div>
  );
}
