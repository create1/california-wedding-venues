# California Wedding Venues

A self-service wedding venue directory for California. **Live:** [californiaweddingvenues.ca](https://californiaweddingvenues.ca) Venues manage their own profiles; no customer support required. Built from the [PRD](./PRD.md).

## Stack

- **Next.js 14** (App Router), TypeScript, Tailwind CSS
- **PostgreSQL** + Drizzle ORM
- **Stripe** (subscriptions, billing portal, webhooks)
- **NextAuth** (credentials for venue login)

## Setup

1. **Clone and install**
   ```bash
   npm install
   ```

2. **Environment**
   - Copy `.env.example` to `.env`
   - Set `DATABASE_URL` (PostgreSQL)
   - Set `NEXTAUTH_URL` (e.g. `http://localhost:3000`) and `NEXTAUTH_SECRET` (e.g. `openssl rand -base64 32`)
   - For Stripe: add `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and the six price IDs (Basic/Standard/Premium × monthly/annual). Create products and prices in Stripe Dashboard.
   - Optional: `RESEND_API_KEY` and `FROM_EMAIL` for sending lead and approval emails
   - Optional: `ADMIN_EMAIL` — any user with this email can access `/admin` to approve/reject venues

3. **Database**
   ```bash
   npm run db:generate   # generate migrations from schema
   npm run db:migrate    # run migrations (or use your DB tool)
   npx tsx scripts/seed.ts   # seed regions, styles, amenities
   ```

4. **Run**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Deploy to californiaweddingvenues.ca

See **[DEPLOY.md](./DEPLOY.md)** for step-by-step deployment (Vercel + PostgreSQL + custom domain + Stripe).

## Self-service design

- **Venues**: Sign up, submit application, edit profile, view leads, manage billing (Stripe Customer Portal). No profile edits by staff.
- **Admin**: Only approves or rejects venue applications. Does not edit venue content.
- **No support team**: Help center and FAQ explain everything; billing is updated/cancelled in Stripe portal.

## Stripe

1. Create products: Basic, Standard, Premium.
2. Create prices for each (monthly and annual).
3. Put the six price IDs in `.env` as `STRIPE_PRICE_BASIC_MONTHLY`, etc.
4. Webhook: point Stripe to `POST /api/stripe/webhook`, events: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`. Use the signing secret in `STRIPE_WEBHOOK_SECRET`.

## Main routes

| Route | Description |
|-------|-------------|
| `/` | Home, search |
| `/venues` | Browse venues (filters) |
| `/venues/[slug]` | Venue profile, contact form |
| `/venue/signup` | Venue registration + application |
| `/venue/login` | Venue login |
| `/venue/dashboard` | Overview, profile, leads, billing |
| `/admin` | Approval queue (admin only) |
| `/help` | Help center, FAQ |
