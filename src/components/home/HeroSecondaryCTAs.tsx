import Link from "next/link";
import { ClipboardList, Users } from "lucide-react";

export function HeroSecondaryCTAs() {
  return (
    <div className="section-pad pt-6 pb-2 sm:pt-8">
      <div className="container-site grid max-w-4xl gap-3 sm:mx-auto sm:grid-cols-2">
        <Link href="/sell" className="btn-outline-navy w-full">
          <ClipboardList size={18} className="text-orange" aria-hidden />
          Request a market assessment
        </Link>
        <Link href="/agents" className="btn-outline-navy w-full">
          <Users size={18} className="text-orange" aria-hidden />
          Meet our agents
        </Link>
      </div>
    </div>
  );
}
