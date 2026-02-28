import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { venues } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (e) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    const venueId = sub.metadata?.venueId;
    if (!venueId) return NextResponse.json({ ok: true });

    const tier =
      sub.status === "active" || sub.status === "trialing"
        ? (sub.items.data[0]?.price?.id && getTierFromPriceId(sub.items.data[0].price.id)) || "free"
        : "free";
    const periodEnd = sub.current_period_end ? new Date(sub.current_period_end * 1000) : null;
    await db
      .update(venues)
      .set({
        listingTier: tier,
        stripeSubscriptionId: sub.id,
        currentPeriodEnd: periodEnd,
        billingCycle: sub.items.data[0]?.plan?.interval === "year" ? "annual" : "monthly",
        updatedAt: new Date(),
      })
      .where(eq(venues.id, venueId));
  }

  if (event.type === "customer.subscription.created") {
    const sub = event.data.object as Stripe.Subscription;
    const venueId = sub.metadata?.venueId;
    if (!venueId) return NextResponse.json({ ok: true });
    const tier = getTierFromPriceId(sub.items.data[0]?.price?.id ?? "") || "free";
    const periodEnd = sub.current_period_end ? new Date(sub.current_period_end * 1000) : null;
    await db
      .update(venues)
      .set({
        listingTier: tier,
        stripeSubscriptionId: sub.id,
        currentPeriodEnd: periodEnd,
        billingCycle: sub.items.data[0]?.plan?.interval === "year" ? "annual" : "monthly",
        updatedAt: new Date(),
      })
      .where(eq(venues.id, venueId));
  }

  return NextResponse.json({ received: true });
}

function getTierFromPriceId(priceId: string): string | null {
  const pid = process.env.STRIPE_PRICE_BASIC_MONTHLY;
  if (pid && priceId === pid) return "basic";
  if (process.env.STRIPE_PRICE_BASIC_ANNUAL === priceId) return "basic";
  if (process.env.STRIPE_PRICE_STANDARD_MONTHLY === priceId) return "standard";
  if (process.env.STRIPE_PRICE_STANDARD_ANNUAL === priceId) return "standard";
  if (process.env.STRIPE_PRICE_PREMIUM_MONTHLY === priceId) return "premium";
  if (process.env.STRIPE_PRICE_PREMIUM_ANNUAL === priceId) return "premium";
  return null;
}
