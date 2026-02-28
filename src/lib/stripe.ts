import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const STRIPE_PRICES = {
  basicMonthly: process.env.STRIPE_PRICE_BASIC_MONTHLY!,
  basicAnnual: process.env.STRIPE_PRICE_BASIC_ANNUAL!,
  standardMonthly: process.env.STRIPE_PRICE_STANDARD_MONTHLY!,
  standardAnnual: process.env.STRIPE_PRICE_STANDARD_ANNUAL!,
  premiumMonthly: process.env.STRIPE_PRICE_PREMIUM_MONTHLY!,
  premiumAnnual: process.env.STRIPE_PRICE_PREMIUM_ANNUAL!,
} as const;

export type PlanId = "basic" | "standard" | "premium";
export type BillingCycle = "monthly" | "annual";

export function getPriceId(plan: PlanId, cycle: BillingCycle): string {
  const key = `${plan}${cycle === "annual" ? "Annual" : "Monthly"}` as keyof typeof STRIPE_PRICES;
  return STRIPE_PRICES[key] ?? "";
}
