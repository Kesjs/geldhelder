import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Payments are intentionally disabled for the request-first launch.
 * Visitors submit the reservation form and Stuurvast contacts them directly.
 */
export async function POST() {
  return NextResponse.json(
    {
      error:
        "Online betalen is niet beschikbaar. Stuur een aanvraag via het formulier.",
    },
    { status: 410 },
  );
}
