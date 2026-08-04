import { requireProfile } from "@/lib/auth";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default async function DashboardPage() {
  const { profile, supabase } = await requireProfile();

  let listingsQuery = supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });
  if (profile.role !== "ADMIN") {
    listingsQuery = listingsQuery.eq("agent_id", profile.id);
  }
  const { data: listings } = await listingsQuery;

  let enquiriesQuery = supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);
  if (profile.role !== "ADMIN") {
    enquiriesQuery = enquiriesQuery.eq("agent_id", profile.id);
  }
  const { data: enquiries } = await enquiriesQuery;

  const count = listings?.length ?? 0;
  const featured = listings?.filter((l) => l.featured).length ?? 0;
  const onShow = listings?.filter((l) => l.on_show).length ?? 0;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display text-3xl text-ink md:text-4xl">Dashboard</h1>
          <p className="mt-1 text-muted">
            {profile.role === "ADMIN" ? "Administrator overview" : "Your listings and enquiries"}
          </p>
        </div>
        <Link href="/dashboard/listings/new" className="btn-orange">
          New listing
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Listings", value: count },
          { label: "Featured", value: featured },
          { label: "On Show", value: onShow },
        ].map((stat) => (
          <div key={stat.label} className="border border-line bg-white p-5">
            <p className="text-xs tracking-[0.16em] text-muted uppercase">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-ink">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="border border-line bg-white p-5">
          <h2 className="font-semibold text-ink">Recent listings</h2>
          <ul className="mt-4 divide-y divide-line">
            {(listings ?? []).slice(0, 5).map((listing) => (
              <li key={listing.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                <div>
                  <p className="font-medium text-ink">{listing.title}</p>
                  <p className="text-muted">
                    {formatPrice(Number(listing.price), listing.currency, listing.status)}
                  </p>
                </div>
                <Link
                  href={`/dashboard/listings/${listing.id}`}
                  className="text-xs font-semibold tracking-wider text-orange uppercase"
                >
                  Edit
                </Link>
              </li>
            ))}
            {!listings?.length && <li className="py-6 text-sm text-muted">No listings yet.</li>}
          </ul>
        </section>

        <section className="border border-line bg-white p-5">
          <h2 className="font-semibold text-ink">Recent enquiries</h2>
          <ul className="mt-4 divide-y divide-line">
            {(enquiries ?? []).map((enquiry) => (
              <li key={enquiry.id} className="py-3 text-sm">
                <p className="font-medium text-ink">{enquiry.name}</p>
                <p className="text-muted">{enquiry.email}</p>
                <p className="mt-1 line-clamp-2 text-muted">{enquiry.message}</p>
              </li>
            ))}
            {!enquiries?.length && (
              <li className="py-6 text-sm text-muted">No enquiries yet.</li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
