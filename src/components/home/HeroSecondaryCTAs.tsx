import Link from "next/link";
import { ClipboardList, Users } from "lucide-react";

export function HeroSecondaryCTAs() {
  return (
    <div className="section-pad pt-2 pb-10 sm:pt-4 sm:pb-12 md:pb-14">
      <div className="container-site grid max-w-4xl grid-cols-2 gap-3 sm:mx-auto sm:gap-5">
        <Link href="/sell" className="btn-outline-navy w-full !px-2 !text-[0.65rem] sm:!px-5 sm:!text-[0.75rem]">
          <ClipboardList size={16} className="shrink-0 text-orange sm:size-[18px]" aria-hidden />
          <span className="text-center leading-snug">Request a market assessment</span>
        </Link>
        <Link href="/agents" className="btn-outline-navy w-full !px-2 !text-[0.65rem] sm:!px-5 sm:!text-[0.75rem]">
          <Users size={16} className="shrink-0 text-orange sm:size-[18px]" aria-hidden />
          <span className="text-center leading-snug">Meet our agents</span>
        </Link>
      </div>
    </div>
  );
}
