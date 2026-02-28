import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { venues } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  const session = await getServerSession(authOptions);
  const user = session?.user as { venueId?: string };
  if (!user?.venueId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [venue] = await db.select().from(venues).where(eq(venues.id, user.venueId)).limit(1);
  if (!venue?.stripeCustomerId) {
    return NextResponse.json({ error: "No billing account. Upgrade a plan first." }, { status: 400 });
  }

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const portal = await stripe.billingPortal.sessions.create({
    customer: venue.stripeCustomerId,
    return_url: `${baseUrl}/venue/dashboard/billing`,
  });
  return NextResponse.json({ url: portal.url });
}
