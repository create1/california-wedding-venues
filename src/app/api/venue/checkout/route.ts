import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe, getPriceId } from "@/lib/stripe";
import { db } from "@/lib/db";
import { venues } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { venueId?: string };
  if (!user?.venueId) {
    return NextResponse.redirect(new URL("/venue/login", req.url));
  }

  const { searchParams } = new URL(req.url);
  const plan = searchParams.get("plan") as "basic" | "standard" | "premium" | null;
  const cycle = searchParams.get("cycle") as "monthly" | "annual" | null;
  if (!plan || !cycle || !["basic", "standard", "premium"].includes(plan) || !["monthly", "annual"].includes(cycle)) {
    return NextResponse.redirect(new URL("/venue/dashboard/billing", req.url));
  }

  const [venue] = await db.select().from(venues).where(eq(venues.id, user.venueId)).limit(1);
  if (!venue) return NextResponse.redirect(new URL("/venue/dashboard", req.url));

  const priceId = getPriceId(plan, cycle);
  if (!priceId) return NextResponse.redirect(new URL("/venue/dashboard/billing", req.url));

  const baseUrl = process.env.NEXTAUTH_URL ?? req.headers.get("origin") ?? "http://localhost:3000";
  let customerId = venue.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: undefined,
      metadata: { venueId: venue.id },
    });
    customerId = customer.id;
    await db.update(venues).set({ stripeCustomerId: customerId, updatedAt: new Date() }).where(eq(venues.id, venue.id));
  }

  const sessionStripe = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/venue/dashboard/billing?success=1`,
    cancel_url: `${baseUrl}/venue/dashboard/billing`,
    subscription_data: {
      metadata: { venueId: venue.id },
      trial_period_days: 7,
    },
  });

  if (sessionStripe.url) {
    return NextResponse.redirect(sessionStripe.url);
  }
  return NextResponse.redirect(new URL("/venue/dashboard/billing", req.url));
}
