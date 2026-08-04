import { clsx, type ClassValue } from "clsx";
import type { Property } from "./data/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number, currency = "USD", status?: string) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
  if (status === "TO_LET") return `${formatted} / month`;
  return formatted;
}

export function formatSpecs(property: Pick<Property, "beds" | "baths" | "size_sqm">) {
  const parts: string[] = [];
  if (property.beds != null) parts.push(`${property.beds} Beds`);
  if (property.baths != null)
    parts.push(`${property.baths} Bathroom${property.baths === 1 ? "" : "s"}`);
  if (property.size_sqm != null)
    parts.push(
      `${property.size_sqm >= 1000 ? property.size_sqm.toLocaleString() : property.size_sqm}m²`,
    );
  return parts.join(" / ");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project"),
  );
}
