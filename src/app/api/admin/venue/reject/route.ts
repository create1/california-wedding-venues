import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { db } from "@/lib/db";
import { venues, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendVenueRejected } from "@/lib/email";

const bodySchema = z.object({
  venueId: z.string().min(1),
  reason: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string; email?: string };
  const adminEmail = process.env.ADMIN_EMAIL;
  const isAdmin = user?.role === "admin" || (adminEmail && user?.email === adminEmail);
  if (!session || !isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const raw = await req.json().catch(() => ({}));
  const { venueId, reason } = bodySchema.parse(raw);

  const [venue] = await db.select().from(venues).where(eq(venues.id, venueId)).limit(1);
  if (!venue) return NextResponse.json({ error: "Venue not found" }, { status: 404 });
  if (venue.status !== "pending") return NextResponse.json({ error: "Not pending" }, { status: 400 });

  await db
    .update(venues)
    .set({ status: "rejected", updatedAt: new Date() })
    .where(eq(venues.id, venueId));

  const [venueUser] = await db.select({ email: users.email }).from(users).where(eq(users.venueId, venueId)).limit(1);
  if (venueUser?.email) {
    await sendVenueRejected(venueUser.email, venue.name, reason);
  }

  return NextResponse.json({ ok: true });
}
