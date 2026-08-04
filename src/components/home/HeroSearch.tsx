"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Building2, ChevronDown, Home, MapPin, Search } from "lucide-react";

export function HeroSearch({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [status, setStatus] = useState("FOR_SALE");
  const [type, setType] = useState("ALL");
  const [q, setQ] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (status !== "ALL") params.set("status", status);
    if (type !== "ALL") params.set("type", type);
    if (q.trim()) params.set("q", q.trim());
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`surface-elevated grid w-full grid-cols-1 gap-2 p-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.5fr_auto] lg:gap-3 lg:p-4 ${
        compact ? "" : "animate-rise delay-3"
      }`}
    >
      <label className="relative">
        <Home
          className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-orange"
          size={16}
          aria-hidden
        />
        <select
          className="input min-h-12 appearance-none rounded-lg !pl-10 !pr-9"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Listing status"
        >
          <option value="FOR_SALE">For Sale</option>
          <option value="TO_LET">To Let</option>
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted"
          size={16}
          aria-hidden
        />
      </label>

      <label className="relative">
        <Building2
          className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-orange"
          size={16}
          aria-hidden
        />
        <select
          className="input min-h-12 appearance-none rounded-lg !pl-10 !pr-9"
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Property type"
        >
          <option value="ALL">All Types</option>
          <option value="HOUSE">Residential</option>
          <option value="APARTMENT">Apartments</option>
          <option value="COMMERCIAL">Commercial</option>
          <option value="VACANT_LAND">Vacant Land</option>
          <option value="FARM">Farms</option>
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted"
          size={16}
          aria-hidden
        />
      </label>

      <label className="relative flex min-h-12 items-center sm:col-span-2 lg:col-span-1">
        <MapPin
          className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-orange"
          size={16}
          aria-hidden
        />
        <input
          className="input min-h-12 rounded-lg !pl-10"
          placeholder="Area, suburb or keyword"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </label>

      <button
        type="submit"
        className="btn-orange min-h-12 w-full rounded-lg sm:col-span-2 lg:col-span-1 lg:w-auto lg:min-w-[9.5rem]"
      >
        <Search size={16} />
        Search
      </button>
    </form>
  );
}
