import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { venues, leads } from "@/lib/db/schema";
import { eq, and, gte, sql } from "drizzle-orm";
import Link from "next/link";

export default async function VenueDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { venueId?: string };
  const venueId = user?.venueId;
  if (!venueId) return null;

  const [venue] = await db.select().from(venues).where(eq(venues.id, venueId)).limit(1);
  if (!venue) return null;

  const params = await searchParams;
  const welcome = params.welcome === "1";

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const monthLeads = await db
    .select({ count: sql`count(*)` })
    .from(leads)
    .where(and(eq(leads.venueId, venueId), gte(leads.createdAt, startOfMonth)));
  const leadCount = Number(monthLeads[0]?.count ?? 0);

  const limit = venue.listingTier === "free" ? 5 : venue.listingTier === "basic" ? 25 : venue.listingTier === "standard" ? 75 : 999;
  const atLimit = limit < 999 && leadCount >= limit;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-stone-800">Dashboard</h1>
      {venue.status === "pending" && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
          <p className="font-medium">Your venue is under review</p>
          <p className="mt-1 text-sm">
            We’ll email you within 48 hours once it’s approved. You can still edit your profile below.
          </p>
          <Link href="/help#approval" className="mt-2 inline-block text-sm font-medium text-amber-700 hover:underline">
            How does approval work? →
          </Link>
        </div>
      )}
      {welcome && venue.status === "pending" && (
        <div className="mt-4 rounded-lg border border-sage-200 bg-sage-50 p-4 text-sage-800">
          <p className="font-medium">Account created</p>
          <p className="mt-1 text-sm">Check your email for confirmation. We’ll notify you when your listing is approved.</p>
        </div>
      )}
      {venue.status === "approved" && (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="card p-4">
              <p className="text-sm text-stone-500">Listing status</p>
              <p className="mt-1 font-medium text-stone-800">Live</p>
              <Link href={`/venues/${venue.slug}`} target="_blank" rel="noopener noreferrer" className="mt-2 text-sm text-sage-600 hover:underline">
                View your listing →
              </Link>
            </div>
            <div className="card p-4">
              <p className="text-sm text-stone-500">Inquiries this month</p>
              <p className="mt-1 font-medium text-stone-800">{leadCount}{limit < 999 ? ` / ${limit}` : ""}</p>
              {atLimit && (
                <p className="mt-2 text-sm text-amber-600">
                  At limit. <Link href="/venue/dashboard/billing" className="font-medium hover:underline">Upgrade or buy lead packs</Link>
                </p>
              )}
            </div>
            <div className="card p-4">
              <p className="text-sm text-stone-500">Plan</p>
              <p className="mt-1 font-medium capitalize text-stone-800">{venue.listingTier}</p>
              <Link href="/venue/dashboard/billing" className="mt-2 text-sm text-sage-600 hover:underline">
                Manage billing →
              </Link>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="font-display text-lg font-semibold text-stone-800">Quick actions</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/venue/dashboard/profile" className="text-sage-600 hover:underline">
                  Edit your profile (photos, description, pricing)
                </Link>
              </li>
              <li>
                <Link href="/venue/dashboard/leads" className="text-sage-600 hover:underline">
                  View and reply to inquiries
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sage-600 hover:underline">
                  Help center & FAQ (no support team—everything is self-serve)
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
