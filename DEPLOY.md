# Deploy to californiaweddingvenues.ca

This guide gets the site live on **https://californiaweddingvenues.ca** using Vercel (hosting) + a managed PostgreSQL database (Neon or Supabase).

---

## Push updates to the live site

After the project is connected to Vercel, you can update the live site in either of these ways:

**Option A: Push to Git (recommended)**  
Push to the branch that Vercel uses for production (usually `main`). Vercel will build and deploy automatically.

```bash
git add .
git commit -m "Your message"
git push origin main
```

**Option B: Deploy from your machine (no Git push)**  
Use the Vercel CLI to deploy your current folder directly to production. No need to push to GitHub.

```bash
npm i -g vercel    # one-time: install Vercel CLI
vercel --prod      # deploy current code to production
```

The first time you run `vercel --prod`, log in and link this folder to your Vercel project. After that, every `vercel --prod` updates the live site.

---

## 1. Database (PostgreSQL)

Create a Postgres database that Vercel can reach over the internet.

### Option A: Neon (recommended)

1. Go to [neon.tech](https://neon.tech) and sign up.
2. Create a new project (e.g. `california-wedding-venues`), region **US West** or closest to you.
3. Copy the **connection string** (e.g. `postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`). You’ll use this as `DATABASE_URL`.

#### Enable Neon Auth (optional)

Neon Auth is a managed auth service that stores users and sessions in your Neon database (in a `neon_auth` schema). It supports email/password and OAuth, and branches with your DB for preview environments.

**To enable in the Neon Console:**

1. Open your project in the [Neon Console](https://console.neon.tech).
2. In the left sidebar, go to **Auth** (or **Integrations** → Auth).
3. Click **Enable Neon Auth** (or **Set up**). Neon provisions the auth service and creates the `neon_auth` schema in your database.
4. After setup, copy from the Auth dashboard:
   - **Neon Auth URL** (or Base URL) → use as `NEON_AUTH_BASE_URL`
   - **Cookie secret** → use as `NEON_AUTH_COOKIE_SECRET` (generate one if not shown: e.g. `openssl rand -base64 32`)

**Env vars for Neon Auth:**

| Name | Value |
|------|--------|
| `NEON_AUTH_BASE_URL` | From Neon Console → Auth (e.g. `https://auth.xxx.neon.tech`) |
| `NEON_AUTH_COOKIE_SECRET` | 32+ character secret for signing session cookies |

**Note:** This app currently uses **NextAuth** for venue login (credentials). To use Neon Auth instead, the codebase would need to be updated to use `@neondatabase/auth` (Neon’s Next.js SDK) and to link Neon Auth users to your `users` / `venues` tables. If you enable Neon Auth in the Console, you can use it for other tools or a future migration; the app will keep working with NextAuth until you switch.

### Option B: Supabase

1. Go to [supabase.com](https://supabase.com) and create a project.
2. In **Settings → Database**, copy the **URI** (use “Transaction” mode). It looks like `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`.
3. Use that as `DATABASE_URL`.

### Run migrations and seed

**If the Vercel build log shows `relation "venues" does not exist`**, your production database has no tables. Run migrations against the same `DATABASE_URL` you use in Vercel (Neon or Supabase).

From your machine (with `DATABASE_URL` in `.env` pointing at that production DB):

```bash
# Generate migrations from schema (if you haven’t)
npm run db:generate

# Apply migrations
npm run db:migrate

# Seed regions, styles, amenities
npx tsx scripts/seed.ts
```

If your provider has a “Run SQL” or “Migration” UI, you can paste the contents of the migration file there instead.

---

## 2. Vercel (Next.js hosting)

1. **Push your code to GitHub** (if you haven’t). Vercel deploys from Git.

2. **Import the project in Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in (e.g. with GitHub).
   - Click **Add New… → Project** and import the repo.
   - **Framework Preset:** Next.js (auto-detected).
   - **Root Directory:** leave default.
   - **Build Command:** `npm run build` (default).
   - **Output Directory:** leave default.

3. **Environment variables**  
   In the project → **Settings → Environment Variables**, add these for **Production** (and Preview if you want):

   | Name | Value | Notes |
   |------|--------|------|
   | `DATABASE_URL` | `postgresql://...` | From Neon or Supabase |
   | `NEXTAUTH_URL` | `https://californiaweddingvenues.ca` | Must match live domain |
   | `NEXTAUTH_SECRET` | (random string) | e.g. `openssl rand -base64 32` |
   | `STRIPE_SECRET_KEY` | `sk_live_...` | From Stripe Dashboard |
   | `STRIPE_WEBHOOK_SECRET` | `whsec_...` | From Stripe webhook (see step 4) |
   | `STRIPE_PRICE_BASIC_MONTHLY` | `price_...` | Stripe price ID |
   | `STRIPE_PRICE_BASIC_ANNUAL` | `price_...` | Stripe price ID |
   | `STRIPE_PRICE_STANDARD_MONTHLY` | `price_...` | Stripe price ID |
   | `STRIPE_PRICE_STANDARD_ANNUAL` | `price_...` | Stripe price ID |
   | `STRIPE_PRICE_PREMIUM_MONTHLY` | `price_...` | Stripe price ID |
   | `STRIPE_PRICE_PREMIUM_ANNUAL` | `price_...` | Stripe price ID |
   | `RESEND_API_KEY` | `re_...` | Optional; for lead/approval emails |
   | `FROM_EMAIL` | `noreply@californiaweddingvenues.ca` | Optional; sender for emails |
   | `ADMIN_EMAIL` | Your email | Optional; for access to `/admin` |
   | `NEON_AUTH_BASE_URL` | Neon Auth URL (e.g. `...neonauth.../neondb/auth`) | If you enabled Neon Auth |
   | `NEON_AUTH_JWKS_URL` | Neon JWKS URL (e.g. `.../auth/.well-known/jwks.json`) | If you enabled Neon Auth |
   | `NEON_AUTH_COOKIE_SECRET` | 32+ char secret (for Neon Auth SDK sessions) | Optional |
   | `BLOB_READ_WRITE_TOKEN` | From Vercel → Storage → Blob → Create | Required for photo uploads |

4. **Deploy**  
   Click **Deploy**. The first build may take a couple of minutes.

---

## 3. Custom domain: californiaweddingvenues.ca

1. In Vercel: **Project → Settings → Domains**.
2. Add **californiaweddingvenues.ca** (and **www.californiaweddingvenues.ca** if you want).
3. Vercel will show the DNS records to add at your registrar (e.g. **A** `76.76.21.21` or **CNAME** `cname.vercel-dns.com`).
4. At your **.ca domain registrar** (where you bought californiaweddingvenues.ca):
   - Add the A record or CNAME Vercel shows.
   - For apex (californiaweddingvenues.ca): use the A record, or CNAME if your registrar supports “flat” CNAME for root.
   - For www: add a CNAME `www` → `cname.vercel-dns.com` (or what Vercel shows).
5. Wait for DNS to propagate (minutes to 48 hours). Vercel will issue HTTPS automatically.

---

## 4. Stripe (production)

1. In [Stripe Dashboard](https://dashboard.stripe.com), switch to **Live mode**.
2. Create **Products**: Basic, Standard, Premium. For each, create **Prices**: one monthly, one annual.
3. Copy the 6 **Price IDs** into the Vercel env vars above.
4. **Webhook** for live:
   - **Developers → Webhooks → Add endpoint**.
   - URL: `https://californiaweddingvenues.ca/api/stripe/webhook`
   - Events: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`.
   - Copy the **Signing secret** (`whsec_...`) into `STRIPE_WEBHOOK_SECRET` in Vercel.

---

## 5. Post-deploy checklist

- [ ] **If the site shows 503:** Open **https://californiaweddingvenues.ca/api/health**. It returns `{ ok, env: { hasDatabase, hasNextAuth } }`. If `ok` is false, add the missing env vars in Vercel (Settings → Environment Variables). Also check Vercel → Deployments → latest → Function Logs for the real error.
- [ ] Open **https://californiaweddingvenues.ca** and confirm the homepage loads.
- [ ] Try **Browse Venues** (empty until venues are added).
- [ ] **List your venue** → sign up → submit an application.
- [ ] If you set `ADMIN_EMAIL`, log in with that email → go to **/admin** → approve a venue.
- [ ] Confirm the approved venue appears on **/venues** and on its profile page.
- [ ] Send a test inquiry from the venue profile.
- [ ] In Stripe Dashboard, confirm the webhook is receiving events (and fix any failures).

---

## 6. Optional: Vercel Postgres

If you prefer to keep everything on Vercel:

1. In the Vercel project, go to **Storage → Create Database → Postgres**.
2. Connect it to the project; Vercel will add `POSTGRES_URL` (or similar). Use that as `DATABASE_URL` (or set `DATABASE_URL` to the same value).
3. Run migrations and seed from your machine using that URL, or use Vercel’s run command / a one-off script.

---

## Summary

| Item | Where |
|------|--------|
| App | Vercel (from GitHub) |
| Domain | californiaweddingvenues.ca → Vercel |
| Database | Neon or Supabase (or Vercel Postgres) |
| Payments | Stripe (live mode + webhook) |
| Auth | NextAuth (NEXTAUTH_URL = https://californiaweddingvenues.ca) |

After DNS and env vars are set, the site is live at **https://californiaweddingvenues.ca**.
