"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, MapPin, Menu, UserRound, X } from "lucide-react";
import { BRAND } from "@/lib/brand";

const links = [
  { href: "/", label: "Home" },
  { href: "/properties?status=FOR_SALE", label: "Buy" },
  { href: "/properties?status=TO_LET", label: "Rent" },
  { href: "/sell", label: "Services" },
  { href: "/properties?type=DEVELOPMENT", label: "Developments" },
  { href: "/agents", label: "Our Advisers" },
  { href: "/news", label: "Resources" },
  { href: "/contact", label: "Contact Us" },
];

const mobileLinks = [
  ...links,
  { href: "/areas", label: "Areas" },
  { href: "/login", label: "Agent Login" },
];

function linkIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white shadow-[0_4px_18px_rgba(4,24,48,0.08)]">
      <div className="hidden bg-navy text-white md:block">
        <div className="section-pad container-site flex h-10 items-center justify-between text-sm">
          <div className="flex items-center gap-6 text-white/80">
            <a href="mailto:hello@landlordsjunction.co.zw" className="flex items-center gap-2 hover:text-orange">
              <Mail size={13} className="text-orange" />
              hello@landlordsjunction.co.zw
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={13} className="text-orange" />
              {BRAND.location}
            </span>
          </div>
          <Link href="/login" className="flex items-center gap-2 text-white/80 hover:text-orange">
            <UserRound size={13} />
            Agent login
          </Link>
        </div>
      </div>
      <div className="section-pad container-site flex h-[4.6rem] items-center justify-between gap-4 lg:h-[5.35rem]">
        <Link href="/" className="flex min-w-0 items-center">
          <Image
            src="/logo.png"
            alt={BRAND.name}
            width={220}
            height={132}
            className="h-16 w-auto object-contain object-left lg:h-[5rem]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-0 xl:flex" aria-label="Primary">
          {links.map((link) => {
            const active = linkIsActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-2.5 py-3 text-xs font-bold tracking-[0.05em] uppercase transition ${
                  active
                    ? "text-orange after:absolute after:right-3 after:bottom-0 after:left-3 after:h-0.5 after:bg-orange"
                    : "text-navy hover:text-orange"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="btn-orange hidden !min-h-11 !rounded-sm !px-4 !text-xs sm:inline-flex"
          >
            Request assessment
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-navy xl:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-navy-deep/95 text-white backdrop-blur-sm supports-[padding:max(0px)]:pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="section-pad container-site flex h-16 items-center justify-between">
            <Image
              src="/logo.png"
              alt={BRAND.name}
              width={180}
              height={108}
              className="h-10 w-auto object-contain object-left"
            />
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
            {mobileLinks.map((link, i) => (
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
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-orange mt-8 inline-flex w-full max-w-xs justify-center sm:w-fit"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
