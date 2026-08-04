"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Building2, ChevronDown, Home, KeyRound, MapPin, Search, Trees } from "lucide-react";

export function HeroSearch({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [status, setStatus] = useState("FOR_SALE");
  const [type, setType] = useState("ALL");
  const [q, setQ] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("");

  function selectTab(nextStatus: string, nextType = "ALL") {
    setStatus(nextStatus);
    setType(nextType);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (status !== "ALL") params.set("status", status);
    if (type !== "ALL") params.set("type", type);
    if (q.trim()) params.set("q", q.trim());
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (beds) params.set("beds", beds);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`overflow-hidden rounded-xl border border-white/10 bg-navy p-4 text-white shadow-[0_22px_55px_rgba(4,24,48,0.32)] sm:p-5 lg:p-6 ${
        compact ? "" : "animate-rise delay-3"
      }`}
    >
      <div className="mb-5 flex flex-wrap gap-x-6 gap-y-3 border-b border-white/15 pb-4">
        {[
          { key: "sale", status: "FOR_SALE", type: "ALL", label: "For sale", icon: Home },
          { key: "let", status: "TO_LET", type: "ALL", label: "To let", icon: KeyRound },
          { key: "commercial", status: "ALL", type: "COMMERCIAL", label: "Commercial", icon: Building2 },
          { key: "land", status: "ALL", type: "VACANT_LAND", label: "Stands & land", icon: Trees },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = status === tab.status && type === tab.type;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => selectTab(tab.status, tab.type)}
              className={`flex items-center gap-2 text-xs font-bold uppercase transition ${
                active ? "text-orange" : "text-white/70 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 items-end gap-3 md:grid-cols-3 xl:grid-cols-[1.5fr_1fr_0.8fr_0.8fr_0.75fr_auto]">
        <label className="relative col-span-2 min-w-0 md:col-span-1">
          <span className="mb-1.5 block text-xs font-semibold text-white/80">Location</span>
          <MapPin
            className="pointer-events-none absolute bottom-4 left-3 z-10 text-orange"
            size={16}
            aria-hidden
          />
          <input
            className="input min-h-12 !rounded-sm !border-white/15 !bg-white/10 !pl-10 !text-white placeholder:!text-white/55"
            placeholder="Area, suburb or keyword"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>

        <label className="relative min-w-0">
          <span className="mb-1.5 block text-xs font-semibold text-white/80">Property type</span>
          <select
            className="input min-h-12 appearance-none !rounded-sm !border-white/15 !bg-white/10 !pr-9 !text-white"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="ALL">All Types</option>
            <option value="HOUSE">Residential</option>
            <option value="APARTMENT">Apartments</option>
            <option value="COMMERCIAL">Commercial</option>
            <option value="VACANT_LAND">Vacant Land</option>
            <option value="FARM">Farms</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 bottom-4 text-white/55" size={16} />
        </label>

        <label className="relative min-w-0">
          <span className="mb-1.5 block text-xs font-semibold text-white/80">Min price</span>
          <select
            className="input min-h-12 appearance-none !rounded-sm !border-white/15 !bg-white/10 !pr-8 !text-white"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          >
            <option value="">No minimum</option>
            <option value="25000">US$25,000</option>
            <option value="50000">US$50,000</option>
            <option value="100000">US$100,000</option>
            <option value="200000">US$200,000</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 bottom-4 text-white/55" size={15} />
        </label>

        <label className="relative min-w-0">
          <span className="mb-1.5 block text-xs font-semibold text-white/80">Max price</span>
          <select
            className="input min-h-12 appearance-none !rounded-sm !border-white/15 !bg-white/10 !pr-8 !text-white"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          >
            <option value="">No maximum</option>
            <option value="75000">US$75,000</option>
            <option value="150000">US$150,000</option>
            <option value="300000">US$300,000</option>
            <option value="500000">US$500,000</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 bottom-4 text-white/55" size={15} />
        </label>

        <label className="relative min-w-0">
          <span className="mb-1.5 block text-xs font-semibold text-white/80">Bedrooms</span>
          <select
            className="input min-h-12 appearance-none !rounded-sm !border-white/15 !bg-white/10 !pr-8 !text-white"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 bottom-4 text-white/55" size={15} />
        </label>

        <button
          type="submit"
          className="btn-orange col-span-2 min-h-12 w-full !rounded-sm md:col-span-1 xl:w-auto xl:min-w-[8.5rem]"
        >
          <Search size={16} />
          Search
        </button>
      </div>
    </form>
  );
}
