import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { db } from "@/lib/db";
import { venues, venueStyles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { TIER_LIMITS } from "@/lib/constants";

const bodySchema = z.object({
  name: z.string().min(1).max(200),
  tagline: z.string().max(200).optional(),
  description: z.string().max(2500).optional(),
  regionId: z.string().min(1),
  city: z.string().max(100).optional(),
  address: z.string().max(300).optional(),
  zip: z.string().max(20).optional(),
  website: z.string().url().max(500).nullable().optional(),
  phone: z.string().max(30).optional().nullable(),
  contactEmail: z.string().email().optional().nullable(),
  capacityMin: z.number().int().positive().optional().nullable(),
  capacityMax: z.number().int().positive().optional().nullable(),
  priceMin: z.number().int().min(0).optional().nullable(),
  priceMax: z.number().int().min(0).optional().nullable(),
  priceNotes: z.string().optional().nullable(),
  photoUrls: z.array(z.string().url()),
  videoUrls: z.array(z.string().url()),
  customSections: z.array(z.object({ title: z.string(), body: z.string() })),
  socialLinks: z.object({ instagram: z.string().optional(), facebook: z.string().optional() }).optional(),
  specialOffers: z.string().optional().nullable(),
  styleIds: z.array(z.string()).min(1),
});

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { id?: string; venueId?: string };
  if (!user?.venueId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [venue] = await db.select().from(venues).where(eq(venues.id, user.venueId)).limit(1);
    if (!venue) return NextResponse.json({ error: "Venue not found" }, { status: 404 });

    const raw = await req.json();
    const data = bodySchema.parse(raw);
    const tier = (venue.listingTier ?? "free") as keyof typeof TIER_LIMITS;
    const limits = TIER_LIMITS[tier] ?? TIER_LIMITS.free;

    if (data.photoUrls.length > limits.maxPhotos) {
      return NextResponse.json({ error: `Maximum ${limits.maxPhotos} photos for your plan.` }, { status: 400 });
    }
    if (data.videoUrls.length > limits.maxVideos) {
      return NextResponse.json({ error: `Maximum ${limits.maxVideos} videos for your plan.` }, { status: 400 });
    }
    if ((data.description?.length ?? 0) > limits.maxDescriptionChars) {
      return NextResponse.json({ error: `Description must be ${limits.maxDescriptionChars} characters or fewer.` }, { status: 400 });
    }
    const maxSections = (limits as { maxCustomSections?: number }).maxCustomSections ?? 0;
    if (data.customSections.length > maxSections) {
      return NextResponse.json({ error: `Maximum ${maxSections} custom sections for your plan.` }, { status: 400 });
    }

    await db
      .update(venues)
      .set({
        name: data.name,
        tagline: data.tagline ?? null,
        description: data.description ?? null,
        regionId: data.regionId,
        city: data.city ?? null,
        address: data.address ?? null,
        zip: data.zip ?? null,
        website: data.website ?? null,
        phone: data.phone ?? null,
        contactEmail: data.contactEmail ?? null,
        capacityMin: data.capacityMin ?? null,
        capacityMax: data.capacityMax ?? null,
        priceMin: data.priceMin ?? null,
        priceMax: data.priceMax ?? null,
        priceNotes: data.priceNotes ?? null,
        photoUrls: data.photoUrls,
        videoUrls: data.videoUrls,
        customSections: data.customSections,
        socialLinks: data.socialLinks ?? {},
        specialOffers: data.specialOffers ?? null,
        updatedAt: new Date(),
      })
      .where(eq(venues.id, user.venueId));

    await db.delete(venueStyles).where(eq(venueStyles.venueId, user.venueId));
    for (const styleId of data.styleIds) {
      await db.insert(venueStyles).values({ venueId: user.venueId, styleId });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: e.flatten() }, { status: 400 });
    }
    console.error("Profile update error:", e);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
