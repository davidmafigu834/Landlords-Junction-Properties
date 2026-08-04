"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { MapPin, Search } from "lucide-react";

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
      className={`grid w-full gap-2 bg-white/90 p-2 shadow-lg backdrop-blur md:grid-cols-[1fr_1fr_1.6fr_auto] ${
        compact ? "" : "animate-rise delay-3"
      }`}
    >
      <select
        className="input border-0 bg-transparent"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        aria-label="Listing status"
      >
        <option value="FOR_SALE">For Sale</option>
        <option value="TO_LET">To Let</option>
      </select>
      <select
        className="input border-0 bg-transparent"
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
      <label className="relative flex items-center">
        <MapPin className="pointer-events-none absolute left-3 text-muted" size={16} />
        <input
          className="input border-0 bg-transparent pl-9"
          placeholder="Search by area, suburb or keyword"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </label>
      <button type="submit" className="btn-primary">
        <Search size={16} />
        Search
      </button>
    </form>
  );
}
