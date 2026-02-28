"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const REGIONS = [
  "bay-area", "central-coast", "central-valley", "desert", "inland-empire",
  "los-angeles", "north-coast", "orange-county", "san-diego", "wine-country",
];
const STYLES = [
  "vineyard", "beach", "barn", "garden", "estate", "hotel", "rustic", "modern", "lodge", "historic", "rooftop", "other",
];

export function VenueSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [region, setRegion] = useState(searchParams.get("region") ?? "");
  const [style, setStyle] = useState(searchParams.get("style") ?? "");
  const [guests, setGuests] = useState(searchParams.get("guests") ?? "");
  const [budget, setBudget] = useState(searchParams.get("budget") ?? "");

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (region) params.set("region", region);
      if (style) params.set("style", style);
      if (guests) params.set("guests", guests);
      if (budget) params.set("budget", budget);
      router.push(`/venues?${params.toString()}`);
    },
    [router, region, style, guests, budget]
  );

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-2xl">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <select
          name="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="input"
          aria-label="Region"
        >
          <option value="">All regions</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
        <select
          name="style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="input"
          aria-label="Style"
        >
          <option value="">All styles</option>
          {STYLES.map((s) => (
            <option key={s} value={s}>
              {s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
        <select
          name="guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="input"
          aria-label="Guest count"
        >
          <option value="">Any guest count</option>
          <option value="50">Up to 50</option>
          <option value="100">Up to 100</option>
          <option value="150">Up to 150</option>
          <option value="200">Up to 200</option>
          <option value="300">200+</option>
        </select>
        <select
          name="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="input"
          aria-label="Budget"
        >
          <option value="">Any budget</option>
          <option value="5-15">$5k – $15k</option>
          <option value="15-25">$15k – $25k</option>
          <option value="25-50">$25k – $50k</option>
          <option value="50+">$50k+</option>
        </select>
      </div>
      <button type="submit" className="btn-primary mt-4 w-full sm:w-auto">
        Search venues
      </button>
    </form>
  );
}
