import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  boolean,
  decimal,
  jsonb,
  primaryKey,
} from "drizzle-orm/pg-core";

export const regions = pgTable("regions", {
  id: varchar("id", { length: 32 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  sortOrder: integer("sort_order").default(0),
});

export const styles = pgTable("styles", {
  id: varchar("id", { length: 32 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  sortOrder: integer("sort_order").default(0),
});

export const amenities = pgTable("amenities", {
  id: varchar("id", { length: 32 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  sortOrder: integer("sort_order").default(0),
});

export const venues = pgTable("venues", {
  id: varchar("id", { length: 32 }).primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  tagline: varchar("tagline", { length: 200 }),
  description: text("description"),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending | approved | suspended
  regionId: varchar("region_id", { length: 32 }).references(() => regions.id),
  address: varchar("address", { length: 300 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 2 }).default("CA"),
  zip: varchar("zip", { length: 20 }),
  lat: decimal("lat", { precision: 10, scale: 7 }),
  lng: decimal("lng", { precision: 10, scale: 7 }),
  website: varchar("website", { length: 500 }),
  phone: varchar("phone", { length: 30 }),
  contactEmail: varchar("contact_email", { length: 255 }),
  capacityMin: integer("capacity_min"),
  capacityMax: integer("capacity_max"),
  priceMin: integer("price_min"),
  priceMax: integer("price_max"),
  priceNotes: text("price_notes"),
  photoUrls: jsonb("photo_urls").$type<string[]>().default([]),
  videoUrls: jsonb("video_urls").$type<string[]>().default([]),
  logoUrl: varchar("logo_url", { length: 500 }),
  coverUrl: varchar("cover_url", { length: 500 }),
  customSections: jsonb("custom_sections").$type<{ title: string; body: string }[]>().default([]),
  socialLinks: jsonb("social_links").$type<Record<string, string>>().default({}),
  specialOffers: text("special_offers"),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  // Subscription
  listingTier: varchar("listing_tier", { length: 20 }).notNull().default("free"), // free | basic | standard | premium
  billingCycle: varchar("billing_cycle", { length: 20 }).default("monthly"), // monthly | annual
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  currentPeriodEnd: timestamp("current_period_end"),
  leadCreditsBalance: integer("lead_credits_balance").default(0),
});

export const venueRegions = pgTable(
  "venue_regions",
  {
    venueId: varchar("venue_id", { length: 32 }).references(() => venues.id, { onDelete: "cascade" }),
    regionId: varchar("region_id", { length: 32 }).references(() => regions.id, { onDelete: "cascade" }),
  },
  (t) => ({ pk: primaryKey({ columns: [t.venueId, t.regionId] }) })
);

export const venueStyles = pgTable(
  "venue_styles",
  {
    venueId: varchar("venue_id", { length: 32 }).references(() => venues.id, { onDelete: "cascade" }),
    styleId: varchar("style_id", { length: 32 }).references(() => styles.id, { onDelete: "cascade" }),
  },
  (t) => ({ pk: primaryKey({ columns: [t.venueId, t.styleId] }) })
);

export const venueAmenities = pgTable(
  "venue_amenities",
  {
    venueId: varchar("venue_id", { length: 32 }).references(() => venues.id, { onDelete: "cascade" }),
    amenityId: varchar("amenity_id", { length: 32 }).references(() => amenities.id, { onDelete: "cascade" }),
  },
  (t) => ({ pk: primaryKey({ columns: [t.venueId, t.amenityId] }) })
);

export const users = pgTable("users", {
  id: varchar("id", { length: 32 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 200 }),
  venueId: varchar("venue_id", { length: 32 }).references(() => venues.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 20 }).notNull().default("venue_admin"), // venue_admin | admin
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at"),
});

export const leads = pgTable("leads", {
  id: varchar("id", { length: 32 }).primaryKey(),
  venueId: varchar("venue_id", { length: 32 }).references(() => venues.id, { onDelete: "cascade" }).notNull(),
  coupleName: varchar("couple_name", { length: 200 }).notNull(),
  coupleEmail: varchar("couple_email", { length: 255 }).notNull(),
  couplePhone: varchar("couple_phone", { length: 50 }),
  weddingDate: varchar("wedding_date", { length: 50 }),
  guestCount: varchar("guest_count", { length: 50 }),
  message: text("message"),
  status: varchar("status", { length: 20 }).default("new"), // new | replied | booked | archived
  source: varchar("source", { length: 50 }).default("site"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const leadNotes = pgTable("lead_notes", {
  id: varchar("id", { length: 32 }).primaryKey(),
  leadId: varchar("lead_id", { length: 32 }).references(() => leads.id, { onDelete: "cascade" }).notNull(),
  userId: varchar("user_id", { length: 32 }).references(() => users.id).notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: varchar("id", { length: 32 }).primaryKey(),
  venueId: varchar("venue_id", { length: 32 }).references(() => venues.id, { onDelete: "cascade" }).notNull(),
  authorName: varchar("author_name", { length: 200 }).notNull(),
  rating: integer("rating").notNull(), // 1-5
  body: text("body"),
  venueResponse: text("venue_response"),
  status: varchar("status", { length: 20 }).default("approved"), // pending | approved | hidden
  createdAt: timestamp("created_at").defaultNow().notNull(),
  respondedAt: timestamp("responded_at"),
});

export type Venue = typeof venues.$inferSelect;
export type VenueInsert = typeof venues.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type User = typeof users.$inferSelect;
