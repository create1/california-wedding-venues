/**
 * Seed regions and styles so venue signup and search work.
 * Run: npx tsx scripts/seed.ts
 * Requires DATABASE_URL (e.g. from .env).
 */
import "dotenv/config";
import { db } from "../src/lib/db";
import { regions, styles, amenities } from "../src/lib/db/schema";
import { REGIONS, STYLES, AMENITIES } from "../src/lib/constants";

async function seed() {
  for (const r of REGIONS) {
    await db.insert(regions).values({ id: r.id, name: r.name, slug: r.slug }).onConflictDoNothing({ target: regions.slug });
  }
  for (const s of STYLES) {
    await db.insert(styles).values({ id: s.id, name: s.name, slug: s.slug }).onConflictDoNothing({ target: styles.slug });
  }
  for (const a of AMENITIES) {
    await db.insert(amenities).values({ id: a.id, name: a.name, slug: a.slug }).onConflictDoNothing({ target: amenities.slug });
  }
  console.log("Seeded regions, styles, amenities.");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
