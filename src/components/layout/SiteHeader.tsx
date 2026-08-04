"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";

const links = [
  { href: "/properties?status=FOR_SALE", label: "Buy" },
  { href: "/properties?status=TO_LET", label: "Rent" },
  { href: "/sell", label: "Sell / Let" },
  { href: "/areas", label: "Areas" },
  { href: "/agents", label: "Agents" },
  { href: "/news", label: "The Know" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy text-white">
      <div className="section-pad container-site flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={18} />
          Menu
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase"
            onClick={() => setOpen(true)}
          >
            <Menu size={16} />
            Menu
          </button>
        </nav>

        <Link href="/" className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3">
          <Image
            src="/logo.png"
            alt="Landlords Junction Properties"
            width={48}
            height={48}
            className="h-10 w-10 object-contain md:h-12 md:w-12"
            priority
          />
          <span className="hidden text-left sm:block">
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
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase transition hover:text-orange"
        >
          <Search size={16} />
          <span className="hidden sm:inline">Find Your Home</span>
        </Link>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] bg-navy-deep/95 text-white backdrop-blur-sm">
          <div className="section-pad container-site flex h-16 items-center justify-between">
            <Image src="/logo.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          <nav className="section-pad container-site grid gap-1 pt-8">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="display animate-rise border-b border-white/10 py-4 text-3xl text-white/95 transition hover:text-orange"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex w-fit btn-orange"
            >
              Agent Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
