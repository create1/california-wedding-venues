# Product Requirements Document (PRD)
# California Wedding Venues — Full-Stack Wedding Venue Directory

**Version:** 1.0  
**Date:** February 27, 2025  
**Status:** Draft for Development  
**Scope:** Single PRD sufficient to build the entire site, payment portal, subscription tiers, and revenue model.

---

## 1. Executive Summary

### 1.1 Product Vision
A California-focused wedding venue directory that combines the best of Zola, WeddingWire, Here Comes The Guide, Wedding Spot, and WeddingPro: **curated quality**, **transparent pricing**, **no fake leads**, **venue-first UX**, and **flexible subscription tiers** including a free tier to achieve critical mass (~3,000 California venues).

### 1.2 Strategic Goals
- **Couples:** Find, compare, and contact California wedding venues by location, style, budget, guest count, and availability—with clear pricing where possible.
- **Venues:** Generate qualified leads, control their listing and placement, and access analytics and optional education—without long-term contracts or fake leads.
- **Business:** Reach profitability with ~500 paying venues across tiers while maintaining a large free tier for SEO and conversion funnel.

### 1.3 Success Metrics (Year 1)
| Metric | Target |
|--------|--------|
| Total California venues listed | 2,800–3,200 |
| Paying venues (any tier) | 500 |
| Monthly recurring revenue (MRR) | $32,000+ |
| Couple inquiries per paying venue/month | 3–8 qualified |
| Organic traffic (monthly pageviews) | 500K+ |
| Venue churn (monthly) | <5% |

---

## 2. Competitive Synthesis & Differentiators

### 2.1 Best Practices Incorporated

| Source | Practice | How We Use It |
|--------|----------|----------------|
| **Zola** | Free for couples; pay-per-connect or unlimited plans for vendors; filters (location, price, date, style); budget tool integration | Free couple usage; optional lead-credit add-on for venues; rich filters; budget/estimate tools. |
| **WeddingWire** | Tiered storefronts (Lite/Premium/Gold); lead alerts; placement above free listings; performance tracking | Tiered subscriptions with clear placement rules; email/SMS lead alerts; analytics dashboard. |
| **Here Comes The Guide** | Curated/editorial quality; month-to-month; no competitor ads on venue page; venue education; no fake leads; 48hr approval | Editorial standards for approval; cancel anytime; exclusive venue profile (no competitor ads); optional venue education; lead verification; fast onboarding. |
| **Wedding Spot** | Price visibility; “Spot Estimates”; side-by-side venue comparison; guest count + budget filters | Transparent pricing fields; venue comparison tool; guest-count and budget filters; cost estimates. |
| **WeddingPro / The Knot** | Storefront (photos, videos, pricing, reviews); unified inbox; insights dashboard; review showcase | Rich storefront; centralized inquiry inbox; analytics; review display and collection. |

### 2.2 Our Differentiators
- **California-only:** Deep coverage and SEO for “California wedding venues” and regional long-tail.
- **No fake leads:** Policy and (where feasible) technical measures to ensure inquiries are from real couples.
- **Transparent pricing:** Venues can show price ranges; couples can compare and estimate cost.
- **Month-to-month:** No long-term contracts; 30-day notice to cancel.
- **Free tier:** Drives inventory (3,000 venues) and upgrades; paid tiers get placement and feature advantages.
- **Venue-first:** No competitor ads on venue profile pages; optional education and resources.

---

## 3. User Personas & Jobs to Be Done

### 3.1 Couples (Primary)
- **Jobs:** Discover venues, filter by location/style/budget/guests/dates, compare options, see pricing, contact venues, save favorites.
- **Needs:** Trustworthy info, fast load, mobile-friendly, no paywall to browse or contact.

### 3.2 Venue Owners / Managers (Primary)
- **Jobs:** Get qualified leads, showcase venue, manage listing, track performance, (optional) learn marketing/sales.
- **Needs:** Predictable cost, real leads, control over profile, cancel anytime.

### 3.3 Site Operator / Admin (Secondary)
- **Jobs:** Approve venues, moderate content, run payouts, handle support, view business metrics.

---

## 4. Subscription Tiers & Feature Matrix

### 4.1 Tier Overview

| Tier | Monthly (billed monthly) | Monthly (billed annually) | Annual (total) | Target % of Paying Venues |
|------|---------------------------|----------------------------|----------------|----------------------------|
| **Free** | $0 | $0 | $0 | — (base of ~2,500 listed) |
| **Basic** | $39/mo | $35/mo | $420 | 50% |
| **Standard** | $89/mo | $79/mo | $948 | 35% |
| **Premium** | $179/mo | $149/mo | $1,788 | 15% |

**Pricing rationale:** Below The Knot/WeddingWire (often $1,200–$10,000+/year) and in line with Here Comes The Guide and smaller directories; annual discount encourages commitment and reduces churn.

### 4.2 Feature Matrix by Tier

#### A. Listing & Profile

| Feature | Free | Basic | Standard | Premium |
|---------|------|--------|----------|---------|
| Venue profile page (exclusive, no competitor ads on page) | ✓ | ✓ | ✓ | ✓ |
| Business name, address, region, contact | ✓ | ✓ | ✓ | ✓ |
| Photo gallery (max images) | 8 | 25 | 50 | Unlimited |
| Video slots | 0 | 2 | 5 | 10 |
| Logo / cover image | ✓ | ✓ | ✓ | ✓ |
| Description (char limit) | 300 | 600 | 1,200 | 2,500 |
| Amenities & capacity (structured data) | ✓ | ✓ | ✓ | ✓ |
| Price range display (min–max or “From $X”) | ✓ | ✓ | ✓ | ✓ |
| “Starting at” / custom pricing fields | — | ✓ | ✓ | ✓ |
| Custom sections (e.g., catering, accommodations) | — | 1 | 3 | 5 |
| Social links (Instagram, etc.) | ✓ | ✓ | ✓ | ✓ |
| Special offers / promotions section | — | ✓ | ✓ | ✓ |
| PDF brochure / packet upload | — | — | ✓ | ✓ |
| Virtual tour / 360° embed | — | — | ✓ | ✓ |
| Featured placement in category/region (rotating or guaranteed) | — | — | 1 placement | 3 placements |
| “Verified” or “Featured” badge on listing | — | ✓ | ✓ | ✓ |
| Priority in default search order (below Premium) | — | Basic order | Higher | Highest |

#### B. Leads & Communication

| Feature | Free | Basic | Standard | Premium |
|---------|------|--------|----------|---------|
| Receive inquiries through platform | ✓ | ✓ | ✓ | ✓ |
| Lead delivery (email) | ✓ | ✓ | ✓ | ✓ |
| Lead delivery (SMS) | — | ✓ | ✓ | ✓ |
| In-platform inbox (view/reply) | — | ✓ | ✓ | ✓ |
| Couple contact info (email/phone) in lead | ✓ | ✓ | ✓ | ✓ |
| Lead source tracking (e.g., “from California Wedding Venues”) | ✓ | ✓ | ✓ | ✓ |
| Max inquiries included per month | 5 | 25 | 75 | Unlimited |
| Overage: paid lead packs or per-lead fee | Optional add-on | Optional add-on | Optional add-on | N/A |
| Auto-responder / saved replies | — | ✓ | ✓ | ✓ |
| Canned responses / templates | — | 3 | 10 | Unlimited |
| Internal notes on leads | — | ✓ | ✓ | ✓ |
| Mark lead as booked/lost/archived | — | ✓ | ✓ | ✓ |

#### C. Search & Discovery (Couple-Facing)

| Feature | Free | Basic | Standard | Premium |
|---------|------|--------|----------|---------|
| Appear in location/region search | ✓ | ✓ | ✓ | ✓ |
| Appear in style/category search | ✓ | ✓ | ✓ | ✓ |
| Appear in “Compare venues” tool | ✓ | ✓ | ✓ | ✓ |
| Placement in “Featured” or “Editor’s Picks” (home/category) | — | Rotating | Guaranteed 1x | Guaranteed 3x |
| Inclusion in “Budget-friendly” / “Luxury” etc. collections | ✓ | ✓ | ✓ | ✓ |
| Map pin visibility | ✓ | ✓ | ✓ | ✓ |
| Higher map/default sort position | — | ✓ | ✓ | ✓ (top) |

#### D. Reviews & Social Proof

| Feature | Free | Basic | Standard | Premium |
|---------|------|--------|----------|---------|
| Display couple reviews on profile | ✓ (max 5) | ✓ (max 15) | ✓ (max 50) | Unlimited |
| Request reviews from couples (in-platform) | — | ✓ | ✓ | ✓ |
| Review response (venue reply) | — | ✓ | ✓ | ✓ |
| Review highlights / featured review | — | — | 1 | 3 |
| Aggregate rating (stars) display | ✓ | ✓ | ✓ | ✓ |
| Review moderation (flag/respond) | ✓ | ✓ | ✓ | ✓ |

#### E. Analytics & Insights

| Feature | Free | Basic | Standard | Premium |
|---------|------|--------|----------|---------|
| Monthly summary email (views, leads) | ✓ | ✓ | ✓ | ✓ |
| Dashboard: profile views (last 30 days) | — | ✓ | ✓ | ✓ |
| Dashboard: leads, response rate | — | ✓ | ✓ | ✓ |
| Dashboard: traffic source breakdown | — | — | ✓ | ✓ |
| Export leads/views (CSV) | — | — | ✓ | ✓ |
| Comparison to category/region average | — | — | — | ✓ |
| Historical trends (6+ months) | — | — | — | ✓ |

#### F. Support & Education

| Feature | Free | Basic | Standard | Premium |
|---------|------|--------|----------|---------|
| Help center / FAQ access | ✓ | ✓ | ✓ | ✓ |
| Email support | ✓ | ✓ | ✓ | ✓ |
| Priority email support (SLA e.g. 24h) | — | — | ✓ | ✓ |
| Optional: Venue marketing boot camp / courses | — | ✓ | ✓ | ✓ |
| Optional: Newsletter with tips & product updates | ✓ | ✓ | ✓ | ✓ |
| Dedicated account manager (optional add-on) | — | — | — | Available |

#### G. Add-Ons (All Tiers)

| Add-On | Price | Description |
|--------|--------|-------------|
| Lead pack (10 leads) | $29 | One-time; credits applied when monthly lead cap is exceeded. |
| Lead pack (25 leads) | $59 | Same; volume discount. |
| Extra featured placement (1 month) | $49 | One additional featured slot in a chosen category/region. |
| Highlight in newsletter | $79 | One inclusion in “Venue spotlight” email to couples. |
| Annual contract discount | — | 2 months free when paying annually (already reflected in annual price). |

### 4.3 Free Tier Limits (Summary)
- **Purpose:** Maximize number of California venues (target ~2,500–3,000) for SEO and couple value; funnel into paid tiers.
- **Limits:** 8 photos, 0 videos, 300-character description, 5 leads/month, no inbox, no SMS, no featured placement, no analytics dashboard, basic support.
- **Upgrade prompts:** Shown when approaching lead limit, when editing profile (e.g., “Add more photos with Basic”), and in monthly summary email.

---

## 5. Revenue Plan & Path to Profitability

### 5.1 Assumptions
- **Total California venues (listed):** ~3,000.
- **Paying venues:** 500 (mix across Basic, Standard, Premium).
- **Mix of paying venues (target):** 50% Basic (250), 35% Standard (175), 15% Premium (75).
- **Annual vs monthly:** Assume 40% of paying venues on annual plans (lower effective monthly price).

### 5.2 Monthly Recurring Revenue (MRR) — Target

| Tier | Paying Venues | Monthly Plan (60%) | Annual Plan (40%) | MRR Contribution |
|------|----------------|--------------------|--------------------|------------------|
| Basic | 250 | 150 × $39 = $5,850 | 100 × $35 = $3,500 | $9,350 |
| Standard | 175 | 105 × $89 = $9,345 | 70 × $79 = $5,530 | $14,875 |
| Premium | 75 | 45 × $179 = $8,055 | 30 × $149 = $4,470 | $12,525 |
| **Total MRR** | **500** | | | **$36,750** |

Rounded target: **~$32,000–$37,000 MRR** at 500 paying venues.

### 5.3 Add-On & Other Revenue (Conservative)
- Lead packs: ~$1,500/mo.
- Featured placement / newsletter: ~$800/mo.  
- **Total add-on:** ~$2,300/mo.

### 5.4 Annual Revenue (Year 1 Target)
- Subscription: $36,750 × 12 = **$441,000**.
- Add-ons: $2,300 × 12 = **$27,600**.
- **Total:** **~$468,600**.

### 5.5 Cost Structure (Annual, Approximate)

| Category | Annual Cost | Notes |
|----------|-------------|--------|
| Hosting & infra (app, DB, CDN, email) | $15,000 | Scale with traffic |
| Payment processing (Stripe ~2.9% + $0.30) | ~$14,000 | On ~$470K revenue |
| SEO / content / marketing | $30,000 | Blog, guides, backlinks |
| Customer success / support (1 FTE or part-time) | $50,000 | Email, onboarding, retention |
| Sales / partnerships (optional, part-time) | $25,000 | Venue outreach |
| Legal, accounting, insurance | $15,000 | |
| Contingency / buffer | $20,000 | |
| **Total costs** | **~$169,000** | |

### 5.6 Profitability
- **Revenue (Year 1):** ~$469,000.  
- **Costs:** ~$169,000.  
- **Gross profit (Year 1):** ~$300,000 (before founder salary or heavy growth reinvestment).  

**Conclusion:** With 500 paying venues and the tier mix above, the site reaches profitability. Sensitivity: if only 400 paying venues at same mix, MRR ~$29,400 (~$353K/year), still above stated costs; if 600 paying, MRR ~$44,100 (~$529K/year).

### 5.7 Conversion Funnel (Venues)
- **Listed (free):** 3,000.
- **Sign-up (account created):** 2,800.
- **Trial or first paid month:** 700 (assume 7-day trial or first month half-off for Basic).
- **Paying at month 3:** 550.
- **Paying at month 12:** 500 (after churn).

Tactics: onboarding email series, lead-limit upgrade prompts, “Your profile could rank higher with Standard” messaging, annual discount, optional education to increase perceived value.

---

## 6. Functional Requirements

### 6.1 Public Site (Couples)

#### 6.1.1 Homepage
- Hero with search (location/region, style, guest count, budget range).
- “Featured” / “Editor’s Picks” carousel (Standard/Premium venues).
- “Browse by region” (e.g., Bay Area, LA, San Diego, Wine Country, Central Coast, Desert, etc.).
- “Browse by style” (e.g., vineyard, beach, barn, garden, estate, hotel, rustic, modern).
- “Compare venues” CTA.
- Trust elements: “No fake leads,” “3,000+ California venues,” “Cancel anytime.”
- Footer: regions, styles, blog, for venues, login, contact.

#### 6.1.2 Search & Filters
- **Location:** State (CA), region/county, city, ZIP, “within X miles.”
- **Style:** Multi-select (vineyard, beach, barn, garden, estate, hotel, ranch, etc.).
- **Guest count:** Min–max or “up to X.”
- **Budget:** Price range (e.g., $5K–$15K, $15K–$25K, $25K+) or “starting at” filter.
- **Date:** Optional “available for [month/year]” (if venues provide availability).
- **Amenities:** Outdoor ceremony, indoor reception, catering on-site, lodging, etc.
- **Sort:** Relevance, price (low/high), featured first, newest.
- **Map view:** Toggle; pins for results; click for preview card.

#### 6.1.3 Venue Profile (Public)
- Venue name, region, short tagline.
- Photo gallery (responsive, lightbox).
- Videos (if any).
- Description, amenities, capacity (min–max), price range or “From $X.”
- Custom sections (e.g., catering, accommodations).
- Reviews (paginated), aggregate rating, venue response.
- “Contact venue” CTA → inquiry form or modal.
- “Add to compare” and “Save to favorites” (requires light auth or cookie).
- No competitor ads on this page.
- Structured data (JSON-LD) for venue (Organization/Place) and reviews for SEO.

#### 6.1.4 Inquiry Flow
- Form: couple name, email, phone, wedding date (optional), guest count (optional), message.
- Optional: “I agree to be contacted by this venue and California Wedding Venues.”
- Submit → confirmation; email to couple; lead created and sent to venue (email + optional SMS); optional in-app inbox.
- No paywall; couples never pay.

#### 6.1.5 Compare Tool
- “Add to compare” from search or profile; max 3–4 venues.
- Compare page: side-by-side table (price range, capacity, style, key amenities, “Contact” CTA).
- Optional: simple “estimate cost” for each (if venue provided pricing).

#### 6.1.6 Favorites / Saved Venues
- Save venues (cookie or light account); list view with “Contact” and “Remove.”

#### 6.1.7 Blog / Guides (SEO & Trust)
- Categories: “By region,” “By style,” “Planning tips,” “Real weddings.”
- Articles link to venue profiles and search.
- No paywall.

#### 6.1.8 Auth (Couples)
- Optional account: email/password or OAuth (Google). Used for saved venues, inquiry history (optional). No subscription.

### 6.2 Venue Dashboard (Authenticated)

#### 6.2.1 Registration & Onboarding
- Sign up: venue name, email, password, region, website.
- Application: upload 8+ photos, description, capacity, price range, at least 3 past weddings (or “we’re new” path).
- Terms: listing guidelines, no fake leads, cancellation policy.
- Review: admin approves within 48 hours (target); venue gets email (approved/request changes).
- On approval: venue can complete profile and choose plan (stay Free or upgrade).

#### 6.2.2 Profile Management
- Edit all fields per tier limits (photos, videos, description, amenities, pricing, custom sections, social, offers).
- Preview public profile.
- “Upgrade to get more photos/leads” CTAs when at limit.

#### 6.2.3 Inbox (Basic+)
- List of leads (date, couple name, message snippet, status: new/replied/booked/archived).
- Open lead: full message, couple contact info, reply form (sends email from platform or via BCC).
- Canned responses; internal notes (not sent to couple).
- Mark as booked/lost/archived.

#### 6.2.4 Analytics (Basic+)
- Basic: profile views (last 30 days), leads received, response rate (if we track replies).
- Standard+: traffic source, export CSV.
- Premium: comparison to average, 6+ months history.

#### 6.2.5 Billing & Subscription
- Current plan, next billing date, payment method.
- Upgrade/downgrade: select plan, prorate or immediate; confirm.
- Cancel: 30-day notice; access until period end.
- Invoices: view and download (PDF).
- Lead packs and add-ons: purchase, apply to account.

#### 6.2.6 Reviews
- See new reviews; respond (one response per review); flag inappropriate.
- Request review (template email to past couples).

#### 6.2.7 Education (Optional)
- Link to “Venue Boot Camp” (videos/articles) or hosted content; gated for Basic+.

### 6.3 Payments & Billing (Backend)

#### 6.3.1 Payment Provider
- **Stripe:** Subscriptions (monthly/annual), one-time (lead packs, add-ons), invoices, customer portal (update card, view invoices).
- **No stored card for Free tier** until upgrade; collect at first paid signup.

#### 6.3.2 Subscription Logic
- Plans: Free, Basic, Standard, Premium.
- Billing: monthly or annual (annual = 12× discounted monthly, 2 months free equivalent).
- Trial: optional 7-day trial for Basic (configurable); no charge until trial end; remind to add payment method.
- Upgrade: immediate; prorate for mid-cycle upgrade.
- Downgrade: at period end; feature limits apply from then.
- Cancel: access until end of billing period; no renewal.

#### 6.3.3 One-Time Purchases
- Lead pack: add N lead credits to venue; deduct 1 per lead when over cap.
- Featured placement (1 month): enable extra placement for 30 days.
- Newsletter highlight: one-time; mark in CMS for next newsletter.

#### 6.3.4 Dunning & Retry
- Failed payment: retry (Stripe Smart Retries); email venue to update card.
- After X failures: downgrade to Free and email; retain profile, turn off paid features.

#### 6.3.5 Invoicing & Receipts
- Stripe Invoice PDF; available in dashboard and email.
- Tax: Stripe Tax or manual; support CA sales tax if required.

### 6.4 Admin / Operator

#### 6.4.1 Venue Moderation
- Queue: pending applications (photos, description, capacity, etc.).
- Approve / request changes / reject (with reason).
- Edit venue (name, region, hide) in exceptional cases.

#### 6.4.2 Content Moderation
- Review flags (reviews, venue content); hide/remove or dismiss.

#### 6.4.3 Users & Billing
- List venues; filter by plan, status; view subscription and payment history; manual adjustments (e.g., comp month).

#### 6.4.4 Reporting
- MRR, paying venues by tier, churn, new signups, leads delivered, top regions/styles.
- Export for accounting.

#### 6.4.5 CMS (Optional)
- Blog posts, static pages, “Editor’s Picks” selection.

### 6.5 Non-Functional Requirements

- **Performance:** LCP < 2.5s on 4G; search results < 1s.
- **SEO:** Server-rendered or static for key pages; sitemaps; robots.txt; structured data.
- **Security:** HTTPS; no storage of full card numbers; PCI via Stripe; hashed passwords; rate limiting on inquiry form and login.
- **Availability:** 99.5% uptime target.
- **Compliance:** Privacy policy, cookie notice, CCPA-friendly (Do Not Sell, data export/delete).
- **Mobile:** Responsive; touch-friendly; usable inquiry and signup on mobile.

---

## 7. Data Model (Core Entities)

### 7.1 Venue
- id, slug, name, tagline, description, status (pending, approved, suspended), region_id, address (optional display), city, state, zip, lat/lng, website, phone, email (contact).
- capacity_min, capacity_max, price_min, price_max, price_notes.
- style_ids (array or junction), amenity_ids.
- photo_urls (array), video_urls, logo_url, cover_url.
- custom_sections (JSON), social_links (JSON), special_offers (text).
- owner_user_id, created_at, updated_at, approved_at.
- listing_tier (free, basic, standard, premium), billing_cycle (monthly, annual), stripe_subscription_id, stripe_customer_id.
- lead_credits_balance (for overage packs), featured_placements_remaining (for add-on).

### 7.2 User (Venue)
- id, email, password_hash, name, venue_id, role (venue_admin, venue_staff), created_at, last_login.

### 7.3 User (Couple) — Optional
- id, email, password_hash or oauth_id, name, created_at.

### 7.4 Lead (Inquiry)
- id, venue_id, couple_name, couple_email, couple_phone, wedding_date, guest_count, message, source (site, widget), status (new, replied, booked, archived), created_at.
- Optional: user_id (if couple logged in).

### 7.5 Review
- id, venue_id, author_name, author_email (hashed or not stored after send), rating (1–5), body, venue_response, status (pending, approved, hidden), created_at, responded_at.

### 7.6 Subscription / Billing
- Use Stripe as source of truth; local cache: venue_id, plan, current_period_end, status (active, past_due, canceled).

### 7.7 Region, Style, Amenity
- Lookup tables: id, name, slug, sort_order. Venue linked via venue_regions, venue_styles, venue_amenities (many-to-many).

### 7.8 Featured Placement
- id, venue_id, region_id or style_id, placement_type (home, category), start_date, end_date (for add-on months).

---

## 8. Integrations

### 8.1 Stripe
- Products: Basic (monthly + annual), Standard (monthly + annual), Premium (monthly + annual).
- One-time: Lead pack 10, Lead pack 25, Featured placement 1 month, Newsletter highlight.
- Webhooks: subscription created/updated/deleted, invoice paid/failed; update venue tier and access, send receipts, trigger dunning.

### 8.2 Email
- Transactional: SendGrid, Postmark, or Resend. For: lead delivery to venue, inquiry confirmation to couple, password reset, approval/rejection, billing (receipt, failed payment, downgrade).
- Marketing (optional): Newsletter for venues; optional couple newsletter.

### 8.3 SMS (Optional)
- Twilio or similar: lead alert to venue (Basic+); opt-in required.

### 8.4 Maps
- Google Maps or Mapbox: map view, venue pins, optional “directions.”

### 8.5 Analytics
- Google Analytics 4 and/or Plausible: traffic, search usage, conversion (inquiry, signup, upgrade). No PII in events.

---

## 9. Technical Architecture (High Level)

### 9.1 Stack Suggestions
- **Frontend:** Next.js (or Nuxt) for SSR/SEO, React/Vue components, Tailwind CSS.
- **Backend:** Next.js API routes or separate Node/Python service; REST or GraphQL.
- **Database:** PostgreSQL (venues, users, leads, reviews); Redis for cache/sessions if needed.
- **Payments:** Stripe SDK (server-side); Stripe Customer Portal for self-service billing.
- **Hosting:** Vercel, Railway, or AWS; DB on managed Postgres (e.g., Neon, Supabase, RDS).
- **Storage:** S3 or R2 for photos/videos; CDN in front.
- **Auth:** NextAuth, Auth0, or custom (JWT) for venue and optional couple login.

### 9.2 Key Flows
- **Couple submits inquiry:** Form → API → create Lead → send email to venue (+ SMS if Basic+) → send confirmation to couple; if venue over lead cap and has credits, deduct 1.
- **Venue upgrades:** Select plan → Stripe Checkout or Customer Portal → webhook → update venue listing_tier and feature flags; prorate if mid-cycle.
- **Search:** Filters + region/style/amenity → query Venues (approved only) + apply tier-based sort (Premium first, then Standard, then Basic, then Free) + relevance; return IDs and minimal fields; then full venue payload for displayed results; cache hot queries.

---

## 10. Launch Phases

### Phase 1 — MVP (Weeks 1–10)
- Public: homepage, search (location, style, guest count, budget), venue profile, inquiry form, compare (2–3 venues), map view.
- Venue: signup, application, profile edit (Free tier limits), view leads in email only (no inbox).
- Payments: Stripe; Free + Basic + Standard only; monthly only; no trial.
- Admin: approve venues, view venues and plans.
- **Goal:** 500 venues listed, 100 paying (mostly Basic).

### Phase 2 — Growth (Weeks 11–18)
- Venue inbox, SMS lead alerts, Basic/Standard/Premium feature enforcement, analytics dashboard (views, leads), annual billing, 7-day trial.
- Lead packs and featured placement add-ons.
- Reviews: collect and display; venue response.
- **Goal:** 1,500 venues, 250 paying.

### Phase 3 — Scale (Weeks 19–26)
- Premium tier and all feature gates; newsletter highlight add-on; education section (or links).
- Advanced analytics (export, comparison); optional account manager for Premium.
- Blog/guides; CCPA/privacy flows; performance and SEO polish.
- **Goal:** 2,800 venues, 500 paying; MRR $32K+.

### Phase 4 — Optimize (Ongoing)
- A/B tests on pricing and upgrade prompts; retention campaigns; optional pay-per-lead or hybrid for low-commitment venues; API for partners.

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Not enough venues sign up (free) | Outreach to venues (email, partnerships with associations); SEO for “list your venue”; minimal friction application. |
| Low free→paid conversion | Clear value: lead limits, placement, analytics; trial; social proof (“Venues get 5x more leads on Standard”). |
| High churn | Month-to-month and good support; lead quality (no fake leads); check-in before renewal; exit survey. |
| Couple traffic doesn’t scale | SEO-first (region/style pages, blog); optional paid ads; partnerships (planners, blogs). |
| Fake or low-quality leads | Clear form; optional reCAPTCHA; no lead selling; venue feedback loop to flag issues. |
| Payment disputes | Clear terms; receipt and invoice; Stripe dispute handling; responsive support. |

---

## 12. Appendix

### A. California Regions (Suggested)
- Bay Area, Central Coast, Central Valley, Desert (Palm Springs area), Inland Empire, Los Angeles, North Coast, Orange County, San Diego, Wine Country (Napa/Sonoma), etc. (expand to ~15–20 for filter and landing pages).

### B. Venue Styles (Suggested)
- Vineyard/Winery, Beach/Coastal, Barn/Ranch, Garden, Estate/Mansion, Hotel/Resort, Rustic, Modern/Industrial, Lodge/Mountain, Backyard/Private, Historic, Rooftop, Other.

### C. Glossary
- **Lead:** A couple inquiry (form submit) sent to one venue.
- **Listing tier:** Free, Basic, Standard, or Premium.
- **Featured placement:** Inclusion in a highlighted slot on homepage or category/region page.
- **Exclusive profile:** Venue’s profile page shows only that venue (no competitor ads).

### D. Document History
- v1.0 (Feb 27, 2025): Initial PRD covering full product, tiers, revenue plan, and build scope.

---

**End of PRD.** This document is intended to be sufficient to design, build, and launch the California Wedding Venues directory with full payment portal, subscription tiers, and a path to profitability at ~500 paying venues.
