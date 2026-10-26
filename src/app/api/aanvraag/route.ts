import { NextResponse } from "next/server";
import { requestSchema, fieldErrors } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { sendRequestEmails } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const allowed = await rateLimit(`aanvraag:${clientIp(req)}`);
  if (allowed === null)
    return NextResponse.json(
      {
        error:
          "Aanvragen zijn tijdelijk niet beschikbaar. Neem contact met ons op.",
      },
      { status: 503 },
    );
  if (!allowed) {
    return NextResponse.json(
      { error: "Te veel aanvragen. Probeer het later opnieuw." },
      { status: 429 },
    );
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  // Honeypot rempli ou formulaire envoyé trop vite: on feint le succès pour les bots.
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }
  const b = body as { website?: string; startedAt?: number };
  if (
    (b.website ?? "") !== "" ||
    (typeof b.startedAt === "number" && Date.now() - b.startedAt < 2000)
  ) {
    return NextResponse.json({ ok: true });
  }

  const loanBody = body as Record<string, unknown>;
  const normalized = {
    type: "lening",
    naam: String(loanBody.name ?? ""),
    email: String(loanBody.email ?? ""),
    telefoon: String(loanBody.phone ?? ""),
    categorie: String(loanBody.purpose ?? ""),
    pakket: `${String(loanBody.amount ?? "")} · ${String(loanBody.term ?? "")}`,
    bericht: String(loanBody.message ?? ""),
    toestemming: loanBody.consent === "on" || loanBody.consent === true || loanBody.consent === "true",
    website: "",
    startedAt: Date.now() - 3000,
  };
  const parsed = requestSchema.safeParse(normalized);
  if (!parsed.success)
    return NextResponse.json(
      { errors: fieldErrors(parsed.error) },
      { status: 422 },
    );

  const ok = await sendRequestEmails(parsed.data);
  if (!ok)
    return NextResponse.json({ error: "Verzenden mislukt." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
