import { notFound } from "next/navigation";
import Link from "next/link";
import { getVenueBySlug, getVenueStyles } from "@/lib/venues";
import { formatPrice, getPhotoDisplayUrl } from "@/lib/utils";
import { InquiryForm } from "@/components/InquiryForm";

type Props = { params: Promise<{ slug: string }> };

export default async function VenueProfilePage({ params }: Props) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue || venue.status !== "approved") notFound();

  const venueStylesList = await getVenueStyles(venue.id);
  const photos = (venue.photoUrls as string[]) ?? [];
  const tier = venue.listingTier ?? "free";
  const hasBadge = tier !== "free";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-stone-500">
        <Link href="/venues" className="hover:text-sage-700">Venues</Link>
        <span>/</span>
        {venue.regionId && (
          <>
            <Link href={`/venues?region=${venue.regionId}`} className="hover:text-sage-700">
              {venue.regionId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-stone-700">{venue.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-display text-3xl font-semibold text-stone-900">{venue.name}</h1>
            {hasBadge && (
              <span className="shrink-0 rounded bg-sage-100 px-2 py-1 text-sm font-medium text-sage-700">
                Featured venue
              </span>
            )}
          </div>
          {venue.tagline && <p className="mt-2 text-lg text-stone-600">{venue.tagline}</p>}

          {photos.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3">
              {photos.slice(0, 6).map((url, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden rounded-lg bg-stone-200">
                  <img src={getPhotoDisplayUrl(url)} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {venue.description && (
            <div className="mt-6">
              <h2 className="font-display text-xl font-semibold text-stone-800">About</h2>
              <p className="mt-2 whitespace-pre-wrap text-stone-600">{venue.description}</p>
            </div>
          )}

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {(venue.capacityMin != null || venue.capacityMax != null) && (
              <div>
                <h3 className="font-medium text-stone-800">Capacity</h3>
                <p className="mt-1 text-stone-600">
                  {venue.capacityMin != null && venue.capacityMax != null
                    ? `${venue.capacityMin} – ${venue.capacityMax} guests`
                    : venue.capacityMax != null
                    ? `Up to ${venue.capacityMax} guests`
                    : `${venue.capacityMin}+ guests`}
                </p>
              </div>
            )}
            {(venue.priceMin != null || venue.priceMax != null) && (
              <div>
                <h3 className="font-medium text-stone-800">Pricing</h3>
                <p className="mt-1 text-stone-600">
                  {venue.priceMin != null && venue.priceMax != null
                    ? `${formatPrice(Number(venue.priceMin))} – ${formatPrice(Number(venue.priceMax))}`
                    : venue.priceMin != null
                    ? `From ${formatPrice(Number(venue.priceMin))}`
                    : `Up to ${formatPrice(Number(venue.priceMax!))}`}
                </p>
                {venue.priceNotes && <p className="mt-1 text-sm text-stone-500">{venue.priceNotes}</p>}
              </div>
            )}
            {venueStylesList.length > 0 && (
              <div>
                <h3 className="font-medium text-stone-800">Style</h3>
                <p className="mt-1 text-stone-600">{venueStylesList.map((s) => s.name).join(", ")}</p>
              </div>
            )}
            {(venue.address || venue.city) && (
              <div>
                <h3 className="font-medium text-stone-800">Location</h3>
                <p className="mt-1 text-stone-600">
                  {[venue.address, venue.city, venue.state, venue.zip].filter(Boolean).join(", ")}
                </p>
              </div>
            )}
          </div>

          {(venue.customSections as { title: string; body: string }[] | null)?.length ? (
            <div className="mt-8 space-y-6">
              {(venue.customSections as { title: string; body: string }[]).map((sec, i) => (
                <div key={i}>
                  <h2 className="font-display text-xl font-semibold text-stone-800">{sec.title}</h2>
                  <p className="mt-2 whitespace-pre-wrap text-stone-600">{sec.body}</p>
                </div>
              ))}
            </div>
          ) : null}

          {venue.specialOffers && (
            <div className="mt-8 rounded-lg border border-sage-200 bg-sage-50/50 p-4">
              <h2 className="font-display text-lg font-semibold text-sage-800">Special offers</h2>
              <p className="mt-2 whitespace-pre-wrap text-stone-600">{venue.specialOffers}</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="card sticky top-24 p-6">
            <h2 className="font-display text-xl font-semibold text-stone-800">Contact this venue</h2>
            <p className="mt-1 text-sm text-stone-500">
              Your message goes directly to the venue. No paywall—free for couples.
            </p>
            <InquiryForm venueId={venue.id} venueName={venue.name} />
            {venue.website && (
              <p className="mt-4 text-center text-sm">
                <a
                  href={venue.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage-600 hover:underline"
                >
                  Visit venue website →
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
