import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="section-pad container-site prose max-w-3xl py-14">
      <h1 className="display text-4xl text-ink">Privacy Policy</h1>
      <p className="mt-4 text-muted">
        Landlords Junction Properties collects enquiry details (name, contact information, and
        message content) solely to respond to property and agency requests. Client information is
        treated as a private trust. We do not sell personal data. Contact the office to request
        access or deletion of your information.
      </p>
    </div>
  );
}
