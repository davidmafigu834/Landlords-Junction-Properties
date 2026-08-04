"use server";

import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";
import type { PropertyStatus, PropertyType } from "@/lib/data/types";

const enquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5),
  type: z.enum(["GENERAL", "PROPERTY", "SELL"]),
  propertyId: z.string().optional(),
  agentId: z.string().optional(),
});

export type ActionResult = { ok: true; message: string } | { ok: false; message: string };

export async function submitEnquiry(formData: FormData): Promise<ActionResult> {
  const parsed = enquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
    type: formData.get("type") || "GENERAL",
    propertyId: formData.get("propertyId") || undefined,
    agentId: formData.get("agentId") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, message: "Please check the form fields and try again." };
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("enquiries").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        message: parsed.data.message,
        type: parsed.data.type,
        property_id: parsed.data.propertyId ?? null,
        agent_id: parsed.data.agentId ?? null,
      });
      if (error) throw error;
      return { ok: true, message: "Thank you — we’ll be in touch shortly." };
    } catch {
      return {
        ok: false,
        message: "We couldn’t save your enquiry right now. Please call or email the office.",
      };
    }
  }

  // Demo mode without Supabase — accept and acknowledge
  console.log("[enquiry:demo]", parsed.data);
  return {
    ok: true,
    message: "Thank you — we’ve received your message (demo mode).",
  };
}

export async function signIn(formData: FormData): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message: "Connect Supabase credentials in .env.local to enable agent login.",
    };
  }
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: "Signed in" };
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  revalidatePath("/", "layout");
  const { redirect } = await import("next/navigation");
  redirect("/login");
}

export async function createAgentAccount(formData: FormData): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, message: "Supabase is not configured." };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Not authenticated." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "ADMIN") return { ok: false, message: "Admin access required." };

  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const phone = String(formData.get("phone") || "");
  const title = String(formData.get("title") || "Agent");
  const slug = slugify(name);

  if (!name || !email || password.length < 8) {
    return { ok: false, message: "Name, email, and a password (8+ chars) are required." };
  }

  try {
    const admin = createAdminClient();
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, role: "AGENT", slug },
    });
    if (error) throw error;

    await admin.from("profiles").upsert({
      id: data.user.id,
      name,
      email,
      role: "AGENT",
      phone: phone || null,
      title,
      slug,
      active: true,
    });

    revalidatePath("/dashboard/admin/agents");
    revalidatePath("/agents");
    return { ok: true, message: `Agent ${name} created.` };
  } catch (e) {
    return {
      ok: false,
      message: e instanceof Error ? e.message : "Could not create agent.",
    };
  }
}

export async function toggleAgentActive(agentId: string, active: boolean): Promise<ActionResult> {
  if (!isSupabaseConfigured()) return { ok: false, message: "Supabase is not configured." };
  try {
    const admin = createAdminClient();
    const { error } = await admin.from("profiles").update({ active }).eq("id", agentId);
    if (error) throw error;
    revalidatePath("/dashboard/admin/agents");
    revalidatePath("/agents");
    return { ok: true, message: active ? "Agent activated." : "Agent deactivated." };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : "Update failed." };
  }
}

const propertySchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  status: z.enum(["FOR_SALE", "TO_LET"]),
  type: z.enum([
    "HOUSE",
    "APARTMENT",
    "COMMERCIAL",
    "INDUSTRIAL",
    "VACANT_LAND",
    "FARM",
    "DEVELOPMENT",
  ]),
  price: z.coerce.number().positive(),
  beds: z.coerce.number().optional().nullable(),
  baths: z.coerce.number().optional().nullable(),
  size_sqm: z.coerce.number().optional().nullable(),
  suburb: z.string().min(2),
  city: z.string().min(2),
  featured: z.boolean().optional(),
  on_show: z.boolean().optional(),
  published: z.boolean().optional(),
  images: z.string().optional(),
});

export async function saveProperty(
  formData: FormData,
  propertyId?: string,
): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, message: "Connect Supabase to manage listings." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Not authenticated." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const parsed = propertySchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    type: formData.get("type"),
    price: formData.get("price"),
    beds: formData.get("beds") || null,
    baths: formData.get("baths") || null,
    size_sqm: formData.get("size_sqm") || null,
    suburb: formData.get("suburb"),
    city: formData.get("city") || "Bulawayo",
    featured: formData.get("featured") === "on",
    on_show: formData.get("on_show") === "on",
    published: formData.get("published") === "on",
    images: formData.get("images") || "",
  });

  if (!parsed.success) {
    return { ok: false, message: "Please complete all required listing fields." };
  }

  const images = parsed.data.images
    ? parsed.data.images
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const payload = {
    title: parsed.data.title,
    description: parsed.data.description,
    status: parsed.data.status as PropertyStatus,
    type: parsed.data.type as PropertyType,
    price: parsed.data.price,
    beds: parsed.data.beds || null,
    baths: parsed.data.baths || null,
    size_sqm: parsed.data.size_sqm || null,
    suburb: parsed.data.suburb,
    city: parsed.data.city,
    featured: Boolean(parsed.data.featured),
    on_show: Boolean(parsed.data.on_show),
    published: Boolean(parsed.data.published),
    images,
    slug: slugify(parsed.data.title),
    updated_at: new Date().toISOString(),
  };

  if (propertyId) {
    let query = supabase.from("properties").update(payload).eq("id", propertyId);
    if (profile?.role !== "ADMIN") query = query.eq("agent_id", user.id);
    const { error } = await query;
    if (error) return { ok: false, message: error.message };
  } else {
    const { error } = await supabase.from("properties").insert({
      ...payload,
      agent_id: user.id,
    });
    if (error) return { ok: false, message: error.message };
  }

  revalidatePath("/properties");
  revalidatePath("/dashboard/listings");
  revalidatePath("/");
  return { ok: true, message: "Listing saved." };
}

export async function deleteProperty(propertyId: string): Promise<ActionResult> {
  if (!isSupabaseConfigured()) return { ok: false, message: "Supabase is not configured." };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Not authenticated." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  let query = supabase.from("properties").delete().eq("id", propertyId);
  if (profile?.role !== "ADMIN") query = query.eq("agent_id", user.id);
  const { error } = await query;
  if (error) return { ok: false, message: error.message };

  revalidatePath("/dashboard/listings");
  revalidatePath("/properties");
  return { ok: true, message: "Listing deleted." };
}

export async function updateProfile(formData: FormData): Promise<ActionResult> {
  if (!isSupabaseConfigured()) return { ok: false, message: "Supabase is not configured." };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Not authenticated." };

  const name = String(formData.get("name") || "");
  const phone = String(formData.get("phone") || "");
  const title = String(formData.get("title") || "");
  const bio = String(formData.get("bio") || "");
  const image_url = String(formData.get("image_url") || "");
  const password = String(formData.get("password") || "");

  const { error } = await supabase
    .from("profiles")
    .update({
      name,
      phone: phone || null,
      title: title || null,
      bio: bio || null,
      image_url: image_url || null,
      slug: slugify(name),
    })
    .eq("id", user.id);

  if (error) return { ok: false, message: error.message };

  if (password.length >= 8) {
    const { error: pwError } = await supabase.auth.updateUser({ password });
    if (pwError) return { ok: false, message: pwError.message };
  }

  revalidatePath("/dashboard/profile");
  revalidatePath("/agents");
  return { ok: true, message: "Profile updated." };
}
