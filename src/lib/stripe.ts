import Stripe from "stripe";

let client: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (
    !key.startsWith("sk_test_") &&
    !(
      key.startsWith("sk_live_") &&
      process.env.STRIPE_LIVE_ENABLED === "true" &&
      process.env.BUSINESS_DETAILS_VERIFIED === "true" &&
      process.env.PACKAGE_PRICES_VERIFIED === "true"
    )
  )
    return null;
  client ??= new Stripe(key);
  return client;
}
