import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getPackage } from "@/data/packages";
import { formatEUR } from "@/lib/format";
import { sendPaymentEmails } from "@/lib/email";
import { getStore } from "@/lib/store";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret)
    return NextResponse.json({ error: "Niet geconfigureerd" }, { status: 503 });

  const signature = req.headers.get("stripe-signature");
  if (!signature)
    return NextResponse.json(
      { error: "Handtekening ontbreekt" },
      { status: 400 },
    );

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, secret);
  } catch {
    return NextResponse.json(
      { error: "Ongeldige handtekening" },
      { status: 400 },
    );
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === "paid") {
      const pkg = getPackage(session.metadata?.slug ?? "");
      // Server-written, signed metadata preserves the agreed price if the catalog later changes.
      const expected = Number(session.metadata?.expected_amount);
      if (
        !pkg ||
        !Number.isSafeInteger(expected) ||
        expected <= 0 ||
        session.currency !== "eur" ||
        session.amount_total !== expected
      ) {
        return NextResponse.json(
          { error: "Bestelling komt niet overeen" },
          { status: 400 },
        );
      }
      const store = getStore();
      if (!store)
        return NextResponse.json(
          { error: "Opslag niet geconfigureerd" },
          { status: 503 },
        );
      const lock = `vooruit:payment:${session.id}:lock`;
      const token = randomUUID();
      try {
        if (await store.get(`vooruit:payment:${session.id}:complete`)) {
          return NextResponse.json({ received: true });
        }
        if (!(await store.set(lock, token, { nx: true, ex: 60 }))) {
          return NextResponse.json(
            { error: "Verwerking bezig" },
            { status: 503 },
          );
        }
        const sent = await sendPaymentEmails({
          naam: session.metadata?.naam ?? "klant",
          email:
            session.customer_details?.email ?? session.customer_email ?? "",
          telefoon: session.metadata?.telefoon ?? "",
          pakket: session.metadata?.package_name ?? pkg.name,
          bedrag: formatEUR(session.amount_total ?? 0),
          referentie: session.id.slice(-10).toUpperCase(),
          sessionId: session.id,
        });
        if (!sent)
          return NextResponse.json(
            { error: "Bevestiging niet verstuurd" },
            { status: 503 },
          );
        await store.set(`vooruit:payment:${session.id}:complete`, {
          package: pkg.slug,
          amount: session.amount_total,
          currency: session.currency,
          status: "paid",
        });
      } catch {
        console.error("[webhook] verwerking mislukt");
        return NextResponse.json(
          { error: "Verwerking mislukt" },
          { status: 503 },
        );
      } finally {
        await store
          .eval(
            "if redis.call('GET', KEYS[1]) == ARGV[1] then return redis.call('DEL', KEYS[1]) end; return 0",
            [lock],
            [token],
          )
          .catch(() => {});
      }
    }
  }
  return NextResponse.json({ received: true });
}
