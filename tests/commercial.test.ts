import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  create: vi.fn(),
  construct: vi.fn(),
  send: vi.fn(),
  requestEmail: vi.fn(),
  rateLimit: vi.fn(),
  get: vi.fn(),
  set: vi.fn(),
  eval: vi.fn(),
  paymentEmail: vi.fn(),
}));
vi.mock("@/lib/rate-limit", () => ({
  rateLimit: mocks.rateLimit,
  clientIp: () => "test",
}));
vi.mock("@/lib/stripe", () => ({
  getStripe: () => ({
    checkout: { sessions: { create: mocks.create } },
    webhooks: { constructEvent: mocks.construct },
  }),
}));
vi.mock("@/lib/store", () => ({
  getStore: () => ({ get: mocks.get, set: mocks.set, eval: mocks.eval }),
}));
vi.mock("@/lib/email", () => ({
  sendRequestEmails: mocks.requestEmail,
  sendPaymentEmails: mocks.paymentEmail,
}));

import { POST as checkout } from "@/app/api/checkout/route";
import { POST as request } from "@/app/api/aanvraag/route";
import { POST as webhook } from "@/app/api/stripe/webhook/route";

const payload = {
  slug: "beginner",
  naam: "Test Bezoeker",
  email: "test@example.com",
  telefoon: "",
  toestemming: true,
  voorwaarden: true,
};
const makeRequest = (body: unknown) =>
  new Request("http://localhost/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": "00000000-0000-4000-8000-000000000000",
    },
    body: JSON.stringify(body),
  });
const paid = {
  type: "checkout.session.completed",
  data: {
    object: {
      id: "cs_test_example",
      payment_status: "paid",
      currency: "eur",
      amount_total: 52500,
      metadata: {
        slug: "beginner",
        expected_amount: "52500",
        package_name: "Pakket Beginner",
      },
      customer_email: "test@example.com",
    },
  },
};
const eventRequest = () =>
  new Request("http://localhost/api/stripe/webhook", {
    method: "POST",
    headers: { "stripe-signature": "signed-test" },
    body: "event",
  });

beforeEach(() => {
  vi.resetAllMocks();
  mocks.rateLimit.mockResolvedValue(true);
  process.env.STRIPE_WEBHOOK_SECRET = "test-only";
  process.env.RESEND_API_KEY = "test-only";
  mocks.create.mockResolvedValue({ url: "https://checkout.stripe.com/test" });
  mocks.get.mockResolvedValue(null);
  mocks.set.mockResolvedValue("OK");
  mocks.eval.mockResolvedValue(1);
  mocks.construct.mockReturnValue(structuredClone(paid));
  mocks.paymentEmail.mockResolvedValue(true);
});

describe("commercial boundaries", () => {
  it("keeps online checkout disabled for the request-first launch", async () => {
    expect((await checkout()).status).toBe(410);
    expect(mocks.create).not.toHaveBeenCalled();
  });
  it("returns a service error if shared rate limiting is unavailable", async () => {
    mocks.rateLimit.mockResolvedValue(null);
    expect((await request(makeRequest(null))).status).toBe(503);
  });
  it("handles null request JSON without crashing", async () => {
    expect((await request(makeRequest(null))).status).toBe(400);
  });
  it("does not claim a successful request when confirmation fails", async () => {
    mocks.requestEmail.mockResolvedValue(false);
    expect(
      (
        await request(
          makeRequest({
            type: "contact",
            naam: "Test",
            email: "test@example.com",
            bericht: "Testbericht",
            toestemming: true,
          }),
        )
      ).status,
    ).toBe(502);
  });
  it("rejects forged signatures", async () => {
    mocks.construct.mockImplementation(() => {
      throw new Error("invalid");
    });
    expect((await webhook(eventRequest())).status).toBe(400);
    expect(mocks.paymentEmail).not.toHaveBeenCalled();
  });
  it("allows Stripe to retry failed notifications without marking them complete", async () => {
    mocks.paymentEmail.mockResolvedValue(false);
    expect((await webhook(eventRequest())).status).toBe(503);
    expect(
      mocks.set.mock.calls.some(([key]) => key.endsWith(":complete")),
    ).toBe(false);
    mocks.paymentEmail.mockResolvedValue(true);
    expect((await webhook(eventRequest())).status).toBe(200);
    expect(
      mocks.set.mock.calls.some(([key]) => key.endsWith(":complete")),
    ).toBe(true);
  });
  it("skips a session already fully processed", async () => {
    mocks.get.mockResolvedValue({ status: "paid" });
    expect((await webhook(eventRequest())).status).toBe(200);
    expect(mocks.paymentEmail).not.toHaveBeenCalled();
  });
  it("does not acknowledge a concurrent processing lock", async () => {
    mocks.set.mockResolvedValue(null);
    expect((await webhook(eventRequest())).status).toBe(503);
    expect(mocks.paymentEmail).not.toHaveBeenCalled();
  });
  it("does not send confirmation for an unpaid session", async () => {
    const event = structuredClone(paid);
    event.data.object.payment_status = "unpaid";
    mocks.construct.mockReturnValue(event);
    expect((await webhook(eventRequest())).status).toBe(200);
    expect(mocks.paymentEmail).not.toHaveBeenCalled();
  });
  it("rejects a mismatched payment amount", async () => {
    const event = structuredClone(paid);
    event.data.object.amount_total = 1;
    mocks.construct.mockReturnValue(event);
    expect((await webhook(eventRequest())).status).toBe(400);
    expect(mocks.paymentEmail).not.toHaveBeenCalled();
  });
  it("honors the signed agreed price when the catalog price has changed", async () => {
    const event = structuredClone(paid);
    event.data.object.amount_total = 50000;
    event.data.object.metadata.expected_amount = "50000";
    mocks.construct.mockReturnValue(event);
    expect((await webhook(eventRequest())).status).toBe(200);
  });
});
