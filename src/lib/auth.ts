import { isSupabaseConfigured } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/data/types";
import { redirect } from "next/navigation";

export async function requireUser() {
  if (!isSupabaseConfigured()) {
    redirect("/login");
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return { supabase, user };
}

export async function requireProfile(): Promise<{
  profile: Profile;
  supabase: Awaited<ReturnType<typeof createClient>>;
}> {
  const { supabase, user } = await requireUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.active) redirect("/login");
  return { profile: profile as Profile, supabase };
}

export async function requireAdmin() {
  const ctx = await requireProfile();
  if (ctx.profile.role !== "ADMIN") redirect("/dashboard");
  return ctx;
}
