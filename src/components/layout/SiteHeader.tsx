"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { BRAND } from "@/lib/brand";

const links = [
  { href: "/properties?status=FOR_SALE", label: "Buy" },
  { href: "/properties?status=TO_LET", label: "Rent" },
  { href: "/sell", label: "Sell / Let" },
  { href: "/areas", label: "Areas" },
  { href: "/agents", label: "Agents" },
  { href: "/news", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-navy text-white">
      <div className="section-pad container-site grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-2 md:h-[4.5rem]">
        <div className="justify-self-start">
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
            <span className="hidden sm:inline">Menu</span>
          </button>
        </div>

        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo.png"
            alt={BRAND.name}
            width={48}
            height={48}
            className="h-10 w-10 object-contain md:h-12 md:w-12"
            priority
          />
          <span className="hidden text-left lg:block">
            <span className="display block text-sm leading-tight font-semibold tracking-wide md:text-base">
              Landlords Junction
            </span>
            <span className="block text-[0.65rem] tracking-[0.22em] text-white/70 uppercase">
              Properties
            </span>
          </span>
        </Link>

        <Link
          href="/properties"
          className="inline-flex min-h-11 items-center justify-self-end gap-2 text-xs font-semibold tracking-[0.14em] uppercase transition hover:text-white/80"
        >
          <Search size={16} />
          <span className="hidden sm:inline">Browse</span>
          <span className="hidden md:inline"> properties</span>
        </Link>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-navy-deep/95 text-white backdrop-blur-sm supports-[padding:max(0px)]:pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="section-pad container-site flex h-16 items-center justify-between">
            <Image src="/logo.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
          <nav className="section-pad container-site grid gap-1 pt-6 pb-12">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="display animate-rise border-b border-white/10 py-4 text-2xl text-white/95 transition hover:text-orange sm:text-3xl"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="btn-primary mt-8 inline-flex w-full max-w-xs justify-center sm:w-fit"
            >
              Agent Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
