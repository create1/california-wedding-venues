import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { venues, leads } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { TIER_LIMITS } from "@/lib/constants";

export default async function VenueLeadsPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as { venueId?: string };
  const venueId = user?.venueId;
  if (!venueId) return null;

  const [venue] = await db.select().from(venues).where(eq(venues.id, venueId)).limit(1);
  if (!venue) return null;

  const tier = (venue.listingTier ?? "free") as keyof typeof TIER_LIMITS;
  const hasInbox = (TIER_LIMITS[tier] ?? TIER_LIMITS.free).hasInbox;
  const limit = (TIER_LIMITS[tier] ?? TIER_LIMITS.free).maxLeadsPerMonth;

  const leadList = await db
    .select()
    .from(leads)
    .where(eq(leads.venueId, venueId))
    .orderBy(desc(leads.createdAt))
    .limit(100);

  if (!hasInbox) {
    return (
      <div>
        <h1 className="font-display text-2xl font-semibold text-stone-800">Inquiries</h1>
        <div className="mt-6 card p-6">
          <p className="text-stone-600">
            Inquiries are sent to your contact email. To view and manage them in a single inbox, upgrade to Basic or higher.
          </p>
          <Link href="/venue/dashboard/billing" className="btn-primary mt-4 inline-block">
            View plans
          </Link>
        </div>
        <p className="mt-4 text-sm text-stone-500">
          You’ve received <strong>{leadList.length}</strong> inquiry/ies total. Reply directly to the couple’s email from your own inbox.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-stone-800">Inquiries</h1>
      <p className="mt-1 text-stone-600">
        Reply to couples directly via their email. Mark as booked when you close the deal.
      </p>
      {leadList.length === 0 ? (
        <div className="mt-8 card p-8 text-center">
          <p className="text-stone-500">No inquiries yet.</p>
          <p className="mt-2 text-sm text-stone-500">
            Make sure your profile is complete and your listing is live. Couples find venues via search and venue pages.
          </p>
          <Link href="/venue/dashboard/profile" className="btn-secondary mt-4 inline-block">
            Edit profile
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {leadList.map((lead) => (
            <li key={lead.id} className="card p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-stone-800">{lead.coupleName}</p>
                  <p className="text-sm text-stone-500">{lead.coupleEmail}</p>
                  {lead.couplePhone && <p className="text-sm text-stone-500">{lead.couplePhone}</p>}
                  {lead.weddingDate && <p className="text-sm text-stone-500">Date: {lead.weddingDate}</p>}
                  {lead.guestCount && <p className="text-sm text-stone-500">Guests: {lead.guestCount}</p>}
                </div>
                <span className="rounded bg-stone-100 px-2 py-1 text-xs capitalize text-stone-600">{lead.status}</span>
              </div>
              {lead.message && (
                <p className="mt-3 border-t border-stone-100 pt-3 text-sm text-stone-600">{lead.message}</p>
              )}
              <p className="mt-2 text-xs text-stone-400">
                {new Date(lead.createdAt).toLocaleString()} · Source: California Wedding Venues
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={`mailto:${lead.coupleEmail}?subject=Re: Your inquiry to ${venue.name}`}
                  className="btn-primary text-sm"
                >
                  Reply via email
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
