"use client";

import { saveProperty } from "@/lib/actions";
import type { Property } from "@/lib/data/types";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function PropertyForm({ property }: { property?: Property }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="max-w-2xl space-y-4 border border-line bg-white p-6"
      action={(fd) => {
        startTransition(async () => {
          const result = await saveProperty(fd, property?.id);
          setMessage(result.message);
          if (result.ok) {
            router.push("/dashboard/listings");
            router.refresh();
          }
        });
      }}
    >
      <input
        className="input"
        name="title"
        placeholder="Title"
        defaultValue={property?.title}
        required
      />
      <textarea
        className="input min-h-32"
        name="description"
        placeholder="Description"
        defaultValue={property?.description}
        required
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <select className="input" name="status" defaultValue={property?.status ?? "FOR_SALE"}>
          <option value="FOR_SALE">For Sale</option>
          <option value="TO_LET">To Let</option>
        </select>
        <select className="input" name="type" defaultValue={property?.type ?? "HOUSE"}>
          <option value="HOUSE">House</option>
          <option value="APARTMENT">Apartment</option>
          <option value="COMMERCIAL">Commercial</option>
          <option value="INDUSTRIAL">Industrial</option>
          <option value="VACANT_LAND">Vacant Land</option>
          <option value="FARM">Farm</option>
          <option value="DEVELOPMENT">Development</option>
        </select>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <input
          className="input"
          name="price"
          type="number"
          placeholder="Price (USD)"
          defaultValue={property?.price}
          required
        />
        <input
          className="input"
          name="beds"
          type="number"
          placeholder="Beds"
          defaultValue={property?.beds ?? undefined}
        />
        <input
          className="input"
          name="baths"
          type="number"
          placeholder="Baths"
          defaultValue={property?.baths ?? undefined}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <input
          className="input"
          name="size_sqm"
          type="number"
          placeholder="Size m²"
          defaultValue={property?.size_sqm ?? undefined}
        />
        <input
          className="input"
          name="suburb"
          placeholder="Suburb"
          defaultValue={property?.suburb}
          required
        />
        <input
          className="input"
          name="city"
          placeholder="City"
          defaultValue={property?.city ?? "Bulawayo"}
          required
        />
      </div>
      <textarea
        className="input min-h-24"
        name="images"
        placeholder="Image URLs (one per line)"
        defaultValue={property?.images?.join("\n")}
      />
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="featured" defaultChecked={property?.featured} />
          Featured
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="on_show" defaultChecked={property?.on_show} />
          On Show
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            defaultChecked={property?.published ?? true}
            value="on"
          />
          Published
        </label>
      </div>
      {message && <p className="text-sm text-orange">{message}</p>}
      <button type="submit" className="btn-primary" disabled={pending}>
        {pending ? "Saving…" : "Save listing"}
      </button>
    </form>
  );
}
