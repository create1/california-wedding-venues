import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { venues } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { BillingPortalButton } from "@/components/BillingPortalButton";

export default async function VenueBillingPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as { venueId?: string };
  const venueId = user?.venueId;
  if (!venueId) return null;

  const [venue] = await db.select().from(venues).where(eq(venues.id, venueId)).limit(1);
  if (!venue) return null;

  const tier = venue.listingTier ?? "free";
  const hasSubscription = Boolean(venue.stripeCustomerId);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-stone-800">Billing</h1>
      <p className="mt-1 text-stone-600">
        Manage your subscription, payment method, and invoices. Cancel anytime—no long-term contracts.
      </p>

      <div className="mt-8 card p-6">
        <h2 className="font-display text-lg font-semibold text-stone-800">Current plan</h2>
        <p className="mt-1 capitalize text-stone-700">{tier}</p>
        {tier === "free" && (
          <p className="mt-2 text-sm text-stone-500">
            Free tier includes 5 leads/month, 8 photos, and basic listing. Upgrade for more leads, photos, and featured placement.
          </p>
        )}
        {hasSubscription && venue.currentPeriodEnd && (
          <p className="mt-2 text-sm text-stone-500">
            Current period ends: {new Date(venue.currentPeriodEnd).toLocaleDateString()}
          </p>
        )}
        <div className="mt-4">
          <BillingPortalButton />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold text-stone-800">Plans</h2>
        <ul className="mt-4 space-y-4">
          <li className="card p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-medium text-stone-800">Basic — $39/mo</p>
                <p className="text-sm text-stone-500">25 photos, 2 videos, 25 leads/mo, inbox, analytics, featured badge</p>
              </div>
              {tier !== "basic" && (
                <Link href="/api/venue/checkout?plan=basic&cycle=monthly" className="btn-primary text-sm">
                  Upgrade
                </Link>
              )}
            </div>
          </li>
          <li className="card p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-medium text-stone-800">Standard — $89/mo</p>
                <p className="text-sm text-stone-500">50 photos, 5 videos, 75 leads/mo, 1 featured placement</p>
              </div>
              {tier !== "standard" && (
                <Link href="/api/venue/checkout?plan=standard&cycle=monthly" className="btn-primary text-sm">
                  Upgrade
                </Link>
              )}
            </div>
          </li>
          <li className="card p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-medium text-stone-800">Premium — $179/mo</p>
                <p className="text-sm text-stone-500">Unlimited photos/videos/leads, 3 featured placements</p>
              </div>
              {tier !== "premium" && (
                <Link href="/api/venue/checkout?plan=premium&cycle=monthly" className="btn-primary text-sm">
                  Upgrade
                </Link>
              )}
            </div>
          </li>
        </ul>
        <p className="mt-4 text-sm text-stone-500">
          Annual billing saves ~2 months. After clicking Upgrade, you’ll complete payment securely with Stripe. You can switch plans or cancel anytime in the portal above.
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-stone-200 bg-stone-50 p-4">
        <h2 className="font-display text-lg font-semibold text-stone-800">Self-service only</h2>
        <p className="mt-1 text-sm text-stone-600">
          There is no billing support team. Use the “Manage billing” button to update your card, download invoices, or cancel. For other questions, see the <Link href="/help" className="text-sage-600 hover:underline">Help center</Link>.
        </p>
      </div>
    </div>
  );
}
