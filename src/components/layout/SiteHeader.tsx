"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BRAND } from "@/lib/brand";

const links = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/sell", label: "Services" },
  { href: "/agents", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

const mobileLinks = [
  ...links,
  { href: "/areas", label: "Areas" },
  { href: "/news", label: "Insights" },
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
    <header className="sticky top-0 z-50 bg-navy text-white">
      <div className="section-pad container-site flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/" className="flex min-w-0 items-center">
          <Image
            src="/logo.png"
            alt={BRAND.name}
            width={220}
            height={132}
            className="h-11 w-auto object-contain object-left md:h-14"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active = linkIsActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-[0.7rem] font-semibold tracking-[0.16em] uppercase transition ${
                  active
                    ? "text-white underline decoration-orange decoration-2 underline-offset-[10px]"
                    : "text-white/80 hover:text-white"
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
            className="btn-orange hidden !min-h-10 !px-4 !text-[0.7rem] sm:inline-flex"
          >
            Speak With Us
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center lg:hidden"
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
              Speak With Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
