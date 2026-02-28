import { db } from "./db";
import { venues, venueStyles, styles } from "./db/schema";
import { eq, desc, sql, gte, lte, and } from "drizzle-orm";

type VenueFilters = {
  region?: string;
  style?: string;
  guests?: string;
  budget?: string;
};

export async function getVenues(filters: VenueFilters = {}, limit = 50) {
  const conditions = [eq(venues.status, "approved")];
  if (filters.region) conditions.push(eq(venues.regionId, filters.region));
  if (filters.guests) {
    const maxGuests = parseInt(filters.guests, 10);
    if (!isNaN(maxGuests)) conditions.push(gte(venues.capacityMax, maxGuests));
  }
  if (filters.budget) {
    const parts = filters.budget.split("-").map((x) => parseInt(x.replace(/\D/g, ""), 10));
    const high = parts[1] ?? parts[0];
    if (high) conditions.push(lte(venues.priceMin, high * 1000));
  }

  const rows = await db
    .select({
      id: venues.id,
      slug: venues.slug,
      name: venues.name,
      tagline: venues.tagline,
      regionId: venues.regionId,
      city: venues.city,
      priceMin: venues.priceMin,
      priceMax: venues.priceMax,
      capacityMin: venues.capacityMin,
      capacityMax: venues.capacityMax,
      photoUrls: venues.photoUrls,
      coverUrl: venues.coverUrl,
      listingTier: venues.listingTier,
    })
    .from(venues)
    .where(conditions.length > 1 ? and(...conditions) : conditions[0])
    .orderBy(
      sql`CASE WHEN ${venues.listingTier} = 'premium' THEN 1 WHEN ${venues.listingTier} = 'standard' THEN 2 WHEN ${venues.listingTier} = 'basic' THEN 3 ELSE 4 END`,
      desc(venues.approvedAt)
    )
    .limit(limit);

  if (filters.style) {
    const withStyle = await db
      .select({ venueId: venueStyles.venueId })
      .from(venueStyles)
      .where(eq(venueStyles.styleId, filters.style));
    const ids = new Set(withStyle.map((r) => r.venueId));
    return rows.filter((r) => ids.has(r.id));
  }
  return rows;
}

export async function getVenueBySlug(slug: string) {
  const [v] = await db.select().from(venues).where(eq(venues.slug, slug)).limit(1);
  return v ?? null;
}

export async function getVenueById(id: string) {
  const [v] = await db.select().from(venues).where(eq(venues.id, id)).limit(1);
  return v ?? null;
}

export async function getVenueStyles(venueId: string) {
  const rows = await db
    .select({ id: styles.id, name: styles.name, slug: styles.slug })
    .from(venueStyles)
    .innerJoin(styles, eq(venueStyles.styleId, styles.id))
    .where(eq(venueStyles.venueId, venueId));
  return rows;
}
