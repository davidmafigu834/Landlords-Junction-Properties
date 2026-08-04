import { requireProfile } from "@/lib/auth";
import { deleteProperty } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default async function ListingsPage() {
  const { profile, supabase } = await requireProfile();

  let query = supabase.from("properties").select("*").order("created_at", { ascending: false });
  if (profile.role !== "ADMIN") query = query.eq("agent_id", profile.id);
  const { data: listings } = await query;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="display text-3xl text-ink">My Listings</h1>
        <Link href="/dashboard/listings/new" className="btn-orange">
          New listing
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-line bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line bg-paper text-xs tracking-wider text-muted uppercase">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {(listings ?? []).map((listing) => (
              <tr key={listing.id} className="border-b border-line">
                <td className="px-4 py-3 font-medium text-ink">{listing.title}</td>
                <td className="px-4 py-3 text-muted">{listing.status.replace("_", " ")}</td>
                <td className="px-4 py-3">
                  {formatPrice(Number(listing.price), listing.currency, listing.status)}
                </td>
                <td className="px-4 py-3">{listing.published ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/dashboard/listings/${listing.id}`}
                    className="mr-3 text-xs font-semibold tracking-wider text-navy uppercase"
                  >
                    Edit
                  </Link>
                  <form
                    className="inline"
                    action={async () => {
                      "use server";
                      await deleteProperty(listing.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-xs font-semibold tracking-wider text-orange uppercase"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {!listings?.length && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted">
                  No listings yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
