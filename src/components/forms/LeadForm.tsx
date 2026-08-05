"use client";

import { useState, useTransition } from "react";
import { submitEnquiry } from "@/lib/actions";

type Props = {
  type?: "GENERAL" | "PROPERTY" | "SELL";
  propertyId?: string;
  agentId?: string;
  title?: string;
  submitLabel?: string;
};

export function LeadForm({
  type = "GENERAL",
  propertyId,
  agentId,
  title = "How may we help?",
  submitLabel = "Submit",
}: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <h3 className="display text-xl text-ink sm:text-2xl md:text-3xl">{title}</h3>
      <form
        className="mt-6 space-y-3"
        action={(fd) => {
          startTransition(async () => {
            const result = await submitEnquiry(fd);
            setOk(result.ok);
            setMessage(result.message);
          });
        }}
      >
        <input type="hidden" name="type" value={type} />
        {propertyId && <input type="hidden" name="propertyId" value={propertyId} />}
        {agentId && <input type="hidden" name="agentId" value={agentId} />}
        <input className="input min-h-11" name="name" placeholder="Name" required />
        <input className="input min-h-11" name="phone" placeholder="Contact number" />
        <input className="input min-h-11" name="email" type="email" placeholder="Email address" required />
        <textarea className="input min-h-28" name="message" placeholder="Message" required />
        <p className="text-xs text-muted">
          By submitting, you agree that we may contact you about this enquiry and store your details
          to respond. We treat client information as confidential. See our{" "}
          <a href="/privacy" className="link-accent text-xs font-semibold">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {message && (
            <p className={`text-sm break-words ${ok ? "text-navy" : "text-orange"}`}>{message}</p>
          )}
          <button
            type="submit"
            className="btn-primary min-h-11 w-full sm:ml-auto sm:w-auto"
            disabled={pending}
          >
            {pending ? "Sending…" : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
