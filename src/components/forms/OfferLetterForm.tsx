"use client";

import { useState, useTransition } from "react";
import { submitEnquiry } from "@/lib/actions";

export function OfferLetterForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-5"
      action={(formData) => {
        startTransition(async () => {
          const offerDetails = [
            "Property listing offer letter",
            `Property address: ${formData.get("propertyAddress")}`,
            `Property type: ${formData.get("propertyType")}`,
            `Listing intention: ${formData.get("listingIntention")}`,
            `Expected price / rent: ${formData.get("expectedPrice") || "Not specified"}`,
            `Ownership status: ${formData.get("ownershipStatus")}`,
            `Additional details: ${formData.get("details") || "None"}`,
          ].join("\n");

          formData.set("type", "SELL");
          formData.set("message", offerDetails);

          const result = await submitEnquiry(formData);
          setOk(result.ok);
          setMessage(result.message);
        });
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-ink">
          Full name
          <input className="input mt-2 min-h-11" name="name" autoComplete="name" required />
        </label>
        <label className="text-sm font-semibold text-ink">
          Contact number
          <input className="input mt-2 min-h-11" name="phone" type="tel" autoComplete="tel" required />
        </label>
      </div>

      <label className="block text-sm font-semibold text-ink">
        Email address
        <input className="input mt-2 min-h-11" name="email" type="email" autoComplete="email" required />
      </label>

      <label className="block text-sm font-semibold text-ink">
        Property address
        <input
          className="input mt-2 min-h-11"
          name="propertyAddress"
          autoComplete="street-address"
          required
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-ink">
          Property type
          <select className="input mt-2 min-h-11" name="propertyType" required defaultValue="">
            <option value="" disabled>Select a property type</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Townhouse</option>
            <option>Land</option>
            <option>Commercial</option>
            <option>Industrial</option>
            <option>Other</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-ink">
          I would like to
          <select className="input mt-2 min-h-11" name="listingIntention" required defaultValue="">
            <option value="" disabled>Select an option</option>
            <option>Sell</option>
            <option>Let</option>
            <option>Sell or let</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-ink">
          Expected price or monthly rent (USD)
          <input className="input mt-2 min-h-11" name="expectedPrice" inputMode="decimal" />
        </label>
        <label className="text-sm font-semibold text-ink">
          Ownership status
          <select className="input mt-2 min-h-11" name="ownershipStatus" required defaultValue="">
            <option value="" disabled>Select an option</option>
            <option>Registered owner</option>
            <option>Authorised representative</option>
            <option>Executor or trustee</option>
            <option>Other</option>
          </select>
        </label>
      </div>

      <label className="block text-sm font-semibold text-ink">
        Property details
        <textarea
          className="input mt-2 min-h-32"
          name="details"
          placeholder="Tell us about the property, its condition, occupancy, and preferred timing."
        />
      </label>

      <label className="flex items-start gap-3 text-xs leading-5 text-muted">
        <input className="mt-1 size-4 shrink-0 accent-orange" type="checkbox" required />
        <span>
          I confirm that the information supplied is accurate and authorise Landlords Junction
          Properties to contact me about listing this property. This submission is subject to
          verification and does not create a binding agency agreement.
        </span>
      </label>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {message && (
          <p className={`text-sm break-words ${ok ? "text-navy" : "text-orange"}`}>{message}</p>
        )}
        <button
          type="submit"
          className="btn-primary min-h-11 w-full sm:ml-auto sm:w-auto"
          disabled={pending}
        >
          {pending ? "Submitting…" : "Submit offer letter"}
        </button>
      </div>
    </form>
  );
}
