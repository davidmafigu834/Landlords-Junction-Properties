import { LeadForm } from "@/components/forms/LeadForm";
import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="section-pad container-site grid gap-10 py-10 sm:gap-12 sm:py-14 lg:grid-cols-2">
      <div className="min-w-0">
        <h1 className="display text-3xl text-ink sm:text-4xl md:text-5xl">Contact us</h1>
        <p className="mt-4 max-w-md text-sm text-muted sm:text-base">
          Reach {BRAND.name} at our {BRAND.location} office. We help owners, investors, buyers, and
          tenants across Zimbabwe make informed property decisions with clear next steps and prompt
          acknowledgement.
        </p>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="font-semibold text-ink">Office</dt>
            <dd className="text-muted">{BRAND.address}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Landline</dt>
            <dd>
              <a href={`tel:${BRAND.phoneHref}`} className="link-accent">
                {BRAND.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Email</dt>
            <dd>
              <a
                href="mailto:hello@landlordsjunction.co.zw"
                className="link-accent break-all"
              >
                hello@landlordsjunction.co.zw
              </a>
            </dd>
          </div>
        </dl>
        <p className="mt-8 max-w-md text-sm text-muted italic">{BRAND.motto}</p>
      </div>
      <div className="min-w-0 border border-line bg-paper p-5 sm:p-6 md:p-8">
        <LeadForm type="GENERAL" title="Send a message" submitLabel="Send message" />
      </div>
    </div>
  );
}
