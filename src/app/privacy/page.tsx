import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="section-pad container-site prose max-w-3xl py-14">
      <h1 className="display text-4xl text-ink">Privacy Policy</h1>
      <div className="mt-6 space-y-6 text-muted">
        <section>
          <h2 className="text-lg font-semibold text-ink">Information we collect</h2>
          <p className="mt-2">
            We collect information you provide through enquiries, including your name, contact
            details, message, and the property or service concerned.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink">How we use information</h2>
          <p className="mt-2">
            We use this information to respond, keep appropriate records, assign an adviser, and
            manage the requested property service. We do not sell personal information.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink">Service providers and confidentiality</h2>
          <p className="mt-2">
            Authorised service providers may process information on our behalf where required to
            operate the enquiry and property-management systems. Access is limited to legitimate
            business purposes, and client information is treated as a private trust.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink">Retention and your requests</h2>
          <p className="mt-2">
            Records are retained only for as long as reasonably required for the enquiry, service,
            record-keeping, or applicable legal obligations. Contact the office to request access,
            correction, or deletion of your information, subject to any records we must retain.
          </p>
        </section>
      </div>
    </div>
  );
}
