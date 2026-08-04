import { PropertyForm } from "@/components/dashboard/PropertyForm";
import { requireProfile } from "@/lib/auth";
import type { Property } from "@/lib/data/types";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function EditListingPage({ params }: Props) {
  const { id } = await params;
  const { profile, supabase } = await requireProfile();

  let query = supabase.from("properties").select("*").eq("id", id);
  if (profile.role !== "ADMIN") query = query.eq("agent_id", profile.id);
  const { data } = await query.maybeSingle();
  if (!data) notFound();

  return (
    <div>
      <h1 className="display mb-6 text-3xl text-ink">Edit listing</h1>
      <PropertyForm property={data as Property} />
    </div>
  );
}
