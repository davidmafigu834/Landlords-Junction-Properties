import { LeadForm } from "@/components/forms/LeadForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="section-pad container-site grid gap-12 py-14 lg:grid-cols-2">
      <div>
        <h1 className="display text-4xl text-ink md:text-5xl">Contact us</h1>
        <p className="mt-4 max-w-md text-muted">
          Visit or reach the Landlords Junction Properties team in Bulawayo. We&apos;re here for
          buyers, sellers, landlords, and tenants.
        </p>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="font-semibold text-ink">Office</dt>
            <dd className="text-muted">Bulawayo, Zimbabwe</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Email</dt>
            <dd>
              <a href="mailto:hello@landlordsjunction.co.zw" className="text-orange">
                hello@landlordsjunction.co.zw
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Phone</dt>
            <dd className="text-muted">+263 29 XXX XXXX</dd>
          </div>
        </dl>
      </div>
      <div className="bg-paper p-6 md:p-8">
        <LeadForm type="GENERAL" title="Send a message" />
      </div>
    </div>
  );
}
