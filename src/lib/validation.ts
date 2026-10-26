import { z } from "zod";
import { licenseCategories } from "@/data/license-categories";
import { packages } from "@/data/packages";

const naam = z
  .string()
  .trim()
  .min(2, "Vul je naam in.")
  .max(100, "Deze naam is te lang.");
const email = z
  .string()
  .trim()
  .email("Vul een geldig e-mailadres in.")
  .max(200);
const telefoon = z
  .string()
  .trim()
  .max(30)
  .refine(
    (v) => v === "" || /^[0-9+()\-\s]{8,20}$/.test(v),
    "Vul een geldig telefoonnummer in.",
  );
const toestemming = z.literal(true, {
  errorMap: () => ({
    message: "Geef toestemming om je gegevens te verwerken.",
  }),
});

export const requestSchema = z.object({
  type: z.enum(["reservering", "contact"]),
  naam,
  email,
  telefoon: telefoon.optional().default(""),
  categorie: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || licenseCategories.some((c) => c.code === v),
      "Kies een geldig rijbewijs.",
    )
    .optional()
    .default(""),
  pakket: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || packages.some((p) => p.name === v),
      "Kies een geldig pakket.",
    )
    .optional()
    .default(""),
  bericht: z
    .string()
    .trim()
    .min(5, "Schrijf een kort bericht.")
    .max(2000, "Je bericht is te lang."),
  toestemming,
  // anti-spam
  website: z.string().max(0).optional().default(""),
  startedAt: z.number().optional(),
});
export type RequestInput = z.infer<typeof requestSchema>;

export const checkoutSchema = z.object({
  slug: z.string().trim().min(1).max(40),
  naam,
  email,
  telefoon: telefoon.optional().default(""),
  toestemming,
  voorwaarden: z.literal(true, {
    errorMap: () => ({ message: "Ga akkoord met de algemene voorwaarden." }),
  }),
  website: z.string().max(0).optional().default(""),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
