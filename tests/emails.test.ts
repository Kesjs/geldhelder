import { beforeEach, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ send: vi.fn(), get: vi.fn(), set: vi.fn() }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mocks.send };
  },
}));
vi.mock("@/lib/store", () => ({
  getStore: () => ({ get: mocks.get, set: mocks.set }),
}));
import { sendPaymentEmails, sendRequestEmails } from "@/lib/email";

beforeEach(() => {
  vi.resetAllMocks();
  process.env.RESEND_API_KEY = "test-only";
  mocks.get.mockResolvedValue(null);
  mocks.set.mockResolvedValue("OK");
});
it("sends the internal request notification only", async () => {
  mocks.send.mockResolvedValueOnce({ error: null });
  const data = {
    type: "contact",
    naam: "Test",
    email: "test@example.com",
    telefoon: "",
    categorie: "",
    pakket: "",
    bericht: "<script>alert(1)</script>",
  };
  expect(await sendRequestEmails(data)).toBe(true);
  expect(mocks.send.mock.calls[0][0].html).not.toContain("<script>");
  expect(mocks.send.mock.calls[0][1].idempotencyKey).toMatch(/^request\//);
  expect(mocks.send).toHaveBeenCalledTimes(1);
});
it("retries only the failed payment notification", async () => {
  mocks.get.mockResolvedValueOnce(true).mockResolvedValueOnce(null);
  mocks.send.mockResolvedValue({ error: null });
  expect(
    await sendPaymentEmails({
      naam: "Test",
      email: "test@example.com",
      telefoon: "",
      pakket: "Beginner",
      bedrag: "€ 525",
      referentie: "EXAMPLE",
      sessionId: "cs_test_example",
    }),
  ).toBe(true);
  expect(mocks.send).toHaveBeenCalledTimes(1);
  expect(mocks.send.mock.calls[0][1].idempotencyKey).toBe(
    "payment/cs_test_example/internal",
  );
});
