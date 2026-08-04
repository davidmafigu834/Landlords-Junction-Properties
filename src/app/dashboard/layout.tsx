import Link from "next/link";
import { signOut } from "@/lib/actions";
import { requireProfile } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await requireProfile();
  const isAdmin = profile.role === "ADMIN";

  const links = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/listings", label: "My Listings" },
    { href: "/dashboard/profile", label: "Profile" },
    ...(isAdmin
      ? [
          { href: "/dashboard/admin/agents", label: "Manage Agents" },
          { href: "/dashboard/admin/listings", label: "All Listings" },
        ]
      : []),
  ];

  return (
    <div className="min-h-[70vh] bg-paper">
      <div className="border-b border-line bg-white">
        <div className="section-pad container-site flex flex-wrap items-center justify-between gap-4 py-4">
          <div>
            <p className="text-xs tracking-[0.16em] text-muted uppercase">Agent portal</p>
            <p className="font-semibold text-ink">{profile.name}</p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-navy hover:text-orange">
                {l.label}
              </Link>
            ))}
            <form action={signOut}>
              <button type="submit" className="text-muted hover:text-orange">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </div>
      <div className="section-pad container-site py-10">{children}</div>
    </div>
  );
}
