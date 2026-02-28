import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { nanoid } from "@/lib/utils";
import { getVenueById } from "@/lib/venues";
import { sendLeadEmail } from "@/lib/email";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const bodySchema = z.object({
  venueId: z.string().min(1),
  coupleName: z.string().min(1).max(200),
  coupleEmail: z.string().email(),
  couplePhone: z.string().max(50).optional(),
  weddingDate: z.string().max(50).optional(),
  guestCount: z.string().max(50).optional(),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const data = bodySchema.parse(raw);
    const venue = await getVenueById(data.venueId);
    if (!venue || venue.status !== "approved") {
      return NextResponse.json({ error: "Venue not found" }, { status: 404 });
    }

    const id = nanoid();
    await db.insert(leads).values({
      id,
      venueId: venue.id,
      coupleName: data.coupleName,
      coupleEmail: data.coupleEmail,
      couplePhone: data.couplePhone ?? null,
      weddingDate: data.weddingDate ?? null,
      guestCount: data.guestCount ?? null,
      message: data.message ?? null,
      source: "site",
    });

    let venueEmail = venue.contactEmail;
    if (!venueEmail) {
      const [venueUser] = await db.select({ email: users.email }).from(users).where(eq(users.venueId, venue.id)).limit(1);
      venueEmail = venueUser?.email ?? undefined;
    }
    await sendLeadEmail({
      venueName: venue.name,
      venueEmail: venueEmail ?? undefined,
      coupleName: data.coupleName,
      coupleEmail: data.coupleEmail,
      couplePhone: data.couplePhone,
      weddingDate: data.weddingDate,
      guestCount: data.guestCount,
      message: data.message,
    });

    return NextResponse.json({ ok: true, id });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: e.flatten() }, { status: 400 });
    }
    console.error("Inquiry error:", e);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
