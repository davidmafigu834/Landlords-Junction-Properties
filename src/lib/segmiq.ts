export type SegmiqLeadPayload = {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  type: "GENERAL" | "PROPERTY" | "SELL";
  listingReference?: string | null;
  agentReference?: string | null;
};

export function isSegmiqConfigured() {
  return Boolean(
    process.env.SEGMIQ_API_URL?.trim() &&
      process.env.SEGMIQ_WEBSITE_API_KEY?.trim() &&
      !process.env.SEGMIQ_API_URL.includes("your-segmiq"),
  );
}

function typeLabel(type: SegmiqLeadPayload["type"]) {
  switch (type) {
    case "PROPERTY":
      return "Property enquiry";
    case "SELL":
      return "Sell / let enquiry";
    default:
      return "General enquiry";
  }
}

/**
 * Forward a website enquiry to SegmiQ (POST /api/external-leads/submit).
 * Soft-fails: SegmiQ often returns HTTP 200 with { ok: false }.
 */
export async function forwardEnquiryToSegmiq(
  payload: SegmiqLeadPayload,
): Promise<{ ok: boolean; leadId?: string; error?: string }> {
  const baseUrl = process.env.SEGMIQ_API_URL?.trim().replace(/\/$/, "");
  const apiKey = process.env.SEGMIQ_WEBSITE_API_KEY?.trim();
  if (!baseUrl || !apiKey) {
    return { ok: false, error: "SegmiQ is not configured." };
  }

  const message = [`[${typeLabel(payload.type)}]`, payload.message].filter(Boolean).join("\n\n");

  const body: Record<string, string> = {
    api_key: apiKey,
    source: "website",
    name: payload.name,
    email: payload.email,
    message,
    enquiry_type: payload.type,
  };
  if (payload.phone) body.phone = payload.phone;
  if (payload.listingReference) body.listing_reference = payload.listingReference;
  if (payload.agentReference) body.agent_reference = payload.agentReference;

  try {
    const res = await fetch(`${baseUrl}/api/external-leads/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const json = (await res.json().catch(() => null)) as {
      ok?: boolean;
      lead_id?: string;
      error?: string;
      soft_fail?: boolean;
    } | null;

    if (!json?.ok) {
      const error = json?.error || `SegmiQ request failed (${res.status})`;
      console.error("[segmiq]", error, json);
      return { ok: false, error };
    }

    return { ok: true, leadId: json.lead_id };
  } catch (err) {
    const error = err instanceof Error ? err.message : "SegmiQ request failed";
    console.error("[segmiq]", error);
    return { ok: false, error };
  }
}
