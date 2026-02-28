import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { users, venues, venueStyles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "@/lib/utils";
import { slugify } from "@/lib/utils";
import { sendVenueApplicationReceived } from "@/lib/email";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().max(200).optional(),
  venueName: z.string().min(1).max(200),
  tagline: z.string().max(200).optional(),
  description: z.string().min(1).max(300),
  regionId: z.string().min(1),
  city: z.string().max(100).optional(),
  address: z.string().max(300).optional(),
  state: z.string().max(2).optional(),
  zip: z.string().max(20).optional(),
  website: z.string().url().max(500).optional().or(z.literal("")),
  phone: z.string().max(30).optional(),
  contactEmail: z.string().email().optional(),
  capacityMin: z.number().int().positive().optional(),
  capacityMax: z.number().int().positive().optional(),
  priceMin: z.number().int().min(0).optional(),
  priceMax: z.number().int().min(0).optional(),
  photoUrls: z.array(z.string().url()).min(8).max(8),
  styleIds: z.array(z.string()).min(1),
});

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const data = bodySchema.parse(raw);

    const [existing] = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
    }

    const venueId = nanoid();
    const userId = nanoid();
    const baseSlug = slugify(data.venueName);
    let slug = baseSlug;
    let n = 0;
    while (true) {
      const [exists] = await db.select({ id: venues.id }).from(venues).where(eq(venues.slug, slug)).limit(1);
      if (!exists) break;
      slug = `${baseSlug}-${++n}`;
    }

    const website = data.website && data.website !== "" ? data.website : null;
    await db.insert(venues).values({
      id: venueId,
      slug,
      name: data.venueName,
      tagline: data.tagline ?? null,
      description: data.description,
      status: "pending",
      regionId: data.regionId,
      address: data.address ?? null,
      city: data.city ?? null,
      state: data.state ?? "CA",
      zip: data.zip ?? null,
      website,
      phone: data.phone ?? null,
      contactEmail: data.contactEmail ?? data.email,
      capacityMin: data.capacityMin ?? null,
      capacityMax: data.capacityMax ?? null,
      priceMin: data.priceMin ?? null,
      priceMax: data.priceMax ?? null,
      photoUrls: data.photoUrls,
      videoUrls: [],
    });

    for (const styleId of data.styleIds) {
      await db.insert(venueStyles).values({ venueId, styleId });
    }

    const passwordHash = await hash(data.password, 10);
    await db.insert(users).values({
      id: userId,
      email: data.email,
      passwordHash,
      name: data.name ?? null,
      venueId,
      role: "venue_admin",
    });

    await sendVenueApplicationReceived(data.email, data.venueName);

    return NextResponse.json({
      ok: true,
      message: "Account created. Check your email for next steps. You can log in and check your dashboard for approval status.",
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: e.flatten() }, { status: 400 });
    }
    console.error("Signup error:", e);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
