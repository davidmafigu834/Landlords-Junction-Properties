import { PropertyForm } from "@/components/dashboard/PropertyForm";
import { requireProfile } from "@/lib/auth";

export default async function NewListingPage() {
  await requireProfile();
  return (
    <div>
      <h1 className="display mb-6 text-3xl text-ink">New listing</h1>
      <PropertyForm />
    </div>
  );
}
