import { Suspense } from "react";
import Link from "next/link";
import { VenueSearchForm } from "@/components/VenueSearchForm";
import { getVenues } from "@/lib/venues";
import { formatPrice, getPhotoDisplayUrl } from "@/lib/utils";

type PageProps = { searchParams: Promise<{ region?: string; style?: string; guests?: string; budget?: string }> };

export default async function VenuesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const venues = await getVenues({
    region: params.region ?? undefined,
    style: params.style ?? undefined,
    guests: params.guests ?? undefined,
    budget: params.budget ?? undefined,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display text-3xl font-semibold text-stone-800">Wedding venues in California</h1>
      <p className="mt-1 text-stone-600">Filter by region, style, guest count, and budget.</p>
      <div className="mt-6">
        <VenueSearchForm />
      </div>

      <Suspense fallback={<div className="mt-8 text-stone-500">Loading…</div>}>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {venues.length === 0 ? (
            <p className="col-span-full text-center text-stone-500">
              No venues match your filters. Try broadening your search.
            </p>
          ) : (
            venues.map((v) => (
              <Link
                key={v.id}
                href={`/venues/${v.slug}`}
                className="card overflow-hidden transition hover:border-sage-300 hover:shadow-md"
              >
                <div className="aspect-[4/3] bg-stone-200">
                  {(v.coverUrl || (v.photoUrls && (v.photoUrls as string[])[0])) ? (
                    <img
                      src={getPhotoDisplayUrl((v.coverUrl || (v.photoUrls as string[])[0]) as string)}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-stone-400">No image</div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-display text-lg font-semibold text-stone-800">{v.name}</h2>
                    {(v.listingTier === "basic" || v.listingTier === "standard" || v.listingTier === "premium") && (
                      <span className="shrink-0 rounded bg-sage-100 px-1.5 py-0.5 text-xs font-medium text-sage-700">
                        Featured
                      </span>
                    )}
                  </div>
                  {v.tagline && <p className="mt-1 line-clamp-2 text-sm text-stone-600">{v.tagline}</p>}
                  <div className="mt-2 flex flex-wrap gap-x-3 text-xs text-stone-500">
                    {v.regionId && (
                      <span>{v.regionId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</span>
                    )}
                    {v.capacityMax && <span>Up to {v.capacityMax} guests</span>}
                    {v.priceMin != null && (
                      <span>From {formatPrice(Number(v.priceMin))}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </Suspense>
    </div>
  );
}
