import Link from "next/link";
import { ClipboardList, Mail, MessageCircle, Phone } from "lucide-react";
import { BRAND } from "@/lib/brand";

const actions = [
  { label: "Speak with us", href: "/contact", icon: MessageCircle },
  { label: "Send enquiry", href: "/contact", icon: ClipboardList },
  { label: "Email us", href: "mailto:hello@landlordsjunction.co.zw", icon: Mail },
  { label: "Call office", href: `tel:${BRAND.phoneHref}`, icon: Phone },
];

export function FloatingContactRail() {
  return (
    <aside
      className="fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 overflow-hidden rounded-l-md border border-white/10 bg-navy text-white shadow-2xl xl:block"
      aria-label="Quick contact"
    >
      {actions.map((action) => {
        const Icon = action.icon;
        const content = (
          <>
            <Icon size={16} className="text-orange" />
            <span className="text-[0.68rem] leading-tight">{action.label}</span>
          </>
        );

        return !action.href.startsWith("/") ? (
          <a
            key={action.label}
            href={action.href}
            className="flex h-16 w-[4.7rem] flex-col items-center justify-center gap-1 border-b border-white/10 text-center transition last:border-0 hover:bg-orange hover:[&>svg]:text-white"
          >
            {content}
          </a>
        ) : (
          <Link
            key={action.label}
            href={action.href}
            className="flex h-16 w-[4.7rem] flex-col items-center justify-center gap-1 border-b border-white/10 text-center transition last:border-0 hover:bg-orange hover:[&>svg]:text-white"
          >
            {content}
          </Link>
        );
      })}
    </aside>
  );
}
