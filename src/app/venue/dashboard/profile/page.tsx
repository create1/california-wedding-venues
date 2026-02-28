import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { venues, venueStyles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { VenueProfileForm } from "@/components/VenueProfileForm";
import { TIER_LIMITS } from "@/lib/constants";
import { getVenueStyles } from "@/lib/venues";

export default async function VenueProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as { venueId?: string };
  const venueId = user?.venueId;
  if (!venueId) return null;

  const [venue] = await db.select().from(venues).where(eq(venues.id, venueId)).limit(1);
  if (!venue) return null;

  const styleRows = await getVenueStyles(venue.id);
  const selectedStyleIds = styleRows.map((s) => s.id);
  const tier = (venue.listingTier ?? "free") as keyof typeof TIER_LIMITS;
  const limits = TIER_LIMITS[tier] ?? TIER_LIMITS.free;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-stone-800">Edit profile</h1>
      <p className="mt-1 text-stone-600">
        You control your listing. Changes are saved immediately and appear on your public page once approved.
      </p>
      {venue.status === "pending" && (
        <p className="mt-2 text-sm text-amber-600">Your venue is still under review. You can edit now; the live listing will update after approval.</p>
      )}
      <div className="mt-6">
        <VenueProfileForm
          venue={{
            ...venue,
            photoUrls: (venue.photoUrls as string[]) ?? [],
            videoUrls: (venue.videoUrls as string[]) ?? [],
            customSections: (venue.customSections as { title: string; body: string }[]) ?? [],
            socialLinks: (venue.socialLinks as Record<string, string>) ?? {},
          }}
          selectedStyleIds={selectedStyleIds}
          limits={limits}
          tier={tier}
        />
      </div>
    </div>
  );
}
