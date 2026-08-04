import { requireAdmin } from "@/lib/auth";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default async function AdminListingsPage() {
  const { supabase } = await requireAdmin();
  const { data: listings } = await supabase
    .from("properties")
    .select("*, agent:profiles(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="display text-3xl text-ink">All Listings</h1>
      <div className="mt-8 overflow-x-auto border border-line bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line bg-paper text-xs tracking-wider text-muted uppercase">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Agent</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {(listings ?? []).map((listing) => (
              <tr key={listing.id} className="border-b border-line">
                <td className="px-4 py-3 font-medium">{listing.title}</td>
                <td className="px-4 py-3 text-muted">
                  {(listing.agent as { name?: string } | null)?.name ?? "—"}
                </td>
                <td className="px-4 py-3">
                  {formatPrice(Number(listing.price), listing.currency, listing.status)}
                </td>
                <td className="px-4 py-3">{listing.status}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/dashboard/listings/${listing.id}`}
                    className="text-xs font-semibold tracking-wider text-orange uppercase"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {!listings?.length && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No listings in the database yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
