CREATE TABLE IF NOT EXISTS "amenities" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"sort_order" integer DEFAULT 0,
	CONSTRAINT "amenities_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lead_notes" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"lead_id" varchar(32) NOT NULL,
	"user_id" varchar(32) NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "leads" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"venue_id" varchar(32) NOT NULL,
	"couple_name" varchar(200) NOT NULL,
	"couple_email" varchar(255) NOT NULL,
	"couple_phone" varchar(50),
	"wedding_date" varchar(50),
	"guest_count" varchar(50),
	"message" text,
	"status" varchar(20) DEFAULT 'new',
	"source" varchar(50) DEFAULT 'site',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "regions" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"sort_order" integer DEFAULT 0,
	CONSTRAINT "regions_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"venue_id" varchar(32) NOT NULL,
	"author_name" varchar(200) NOT NULL,
	"rating" integer NOT NULL,
	"body" text,
	"venue_response" text,
	"status" varchar(20) DEFAULT 'approved',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"responded_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "styles" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"sort_order" integer DEFAULT 0,
	CONSTRAINT "styles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"name" varchar(200),
	"venue_id" varchar(32),
	"role" varchar(20) DEFAULT 'venue_admin' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_login_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "venue_amenities" (
	"venue_id" varchar(32),
	"amenity_id" varchar(32),
	CONSTRAINT "venue_amenities_venue_id_amenity_id_pk" PRIMARY KEY("venue_id","amenity_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "venue_regions" (
	"venue_id" varchar(32),
	"region_id" varchar(32),
	CONSTRAINT "venue_regions_venue_id_region_id_pk" PRIMARY KEY("venue_id","region_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "venue_styles" (
	"venue_id" varchar(32),
	"style_id" varchar(32),
	CONSTRAINT "venue_styles_venue_id_style_id_pk" PRIMARY KEY("venue_id","style_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "venues" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"slug" varchar(120) NOT NULL,
	"name" varchar(200) NOT NULL,
	"tagline" varchar(200),
	"description" text,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"region_id" varchar(32),
	"address" varchar(300),
	"city" varchar(100),
	"state" varchar(2) DEFAULT 'CA',
	"zip" varchar(20),
	"lat" numeric(10, 7),
	"lng" numeric(10, 7),
	"website" varchar(500),
	"phone" varchar(30),
	"contact_email" varchar(255),
	"capacity_min" integer,
	"capacity_max" integer,
	"price_min" integer,
	"price_max" integer,
	"price_notes" text,
	"photo_urls" jsonb DEFAULT '[]'::jsonb,
	"video_urls" jsonb DEFAULT '[]'::jsonb,
	"logo_url" varchar(500),
	"cover_url" varchar(500),
	"custom_sections" jsonb DEFAULT '[]'::jsonb,
	"social_links" jsonb DEFAULT '{}'::jsonb,
	"special_offers" text,
	"approved_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"listing_tier" varchar(20) DEFAULT 'free' NOT NULL,
	"billing_cycle" varchar(20) DEFAULT 'monthly',
	"stripe_customer_id" varchar(255),
	"stripe_subscription_id" varchar(255),
	"current_period_end" timestamp,
	"lead_credits_balance" integer DEFAULT 0,
	CONSTRAINT "venues_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lead_notes" ADD CONSTRAINT "lead_notes_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lead_notes" ADD CONSTRAINT "lead_notes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "leads" ADD CONSTRAINT "leads_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_amenities" ADD CONSTRAINT "venue_amenities_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_amenities" ADD CONSTRAINT "venue_amenities_amenity_id_amenities_id_fk" FOREIGN KEY ("amenity_id") REFERENCES "amenities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_regions" ADD CONSTRAINT "venue_regions_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_regions" ADD CONSTRAINT "venue_regions_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_styles" ADD CONSTRAINT "venue_styles_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_styles" ADD CONSTRAINT "venue_styles_style_id_styles_id_fk" FOREIGN KEY ("style_id") REFERENCES "styles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venues" ADD CONSTRAINT "venues_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
