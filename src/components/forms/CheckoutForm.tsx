"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Consent, AgreementCheckbox, inputClass } from "./Field";
import { checkoutSchema, fieldErrors } from "@/lib/validation";
import { site } from "@/data/site";

export function CheckoutForm({ slug }: { slug: string }) {
  const [values, setValues] = useState({
    naam: "",
    email: "",
    telefoon: "",
    website: "",
  });
  const [consent, setConsent] = useState(false);
  const [terms, setTerms] = useState(false);
  const requestId = useRef("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const summary = useRef<HTMLDivElement>(null);

  const set =
    (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));
  const aria = (k: string) => ({
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    const parsed = checkoutSchema.safeParse({
      ...values,
      slug,
      toestemming: consent,
      voorwaarden: terms,
    });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setTimeout(() => summary.current?.focus(), 0);
      return;
    }
    setErrors({});
    setLoading(true);
    requestId.current ||= crypto.randomUUID();
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": requestId.current,
        },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 422) {
        setErrors(data.errors ?? {});
        setLoading(false);
        return;
      }
      if (!res.ok || !data.url) throw new Error(data.error);
      window.location.assign(data.url);
    } catch (err) {
      setLoading(false);
      setFormError(
        (err instanceof Error && err.message) ||
          `Betalen is nu niet gelukt. Probeer het opnieuw of neem contact op via ${site.phone}.`,
      );
      setTimeout(() => summary.current?.focus(), 0);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" aria-busy={loading}>
      <div
        ref={summary}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        className="outline-none"
      >
        {(formError || Object.keys(errors).length > 0) && (
          <div className="rounded-[7.6px] border border-error bg-error/5 p-3 text-[14px] text-error">
            {formError ||
              "Controleer de gemarkeerde velden en probeer het opnieuw."}
          </div>
        )}
      </div>
      <Field id="naam" label="Naam" error={errors.naam} required>
        <input
          id="naam"
          autoComplete="name"
          value={values.naam}
          onChange={set("naam")}
          className={inputClass}
          {...aria("naam")}
        />
      </Field>
      <Field
        id="email"
        label="E-mailadres"
        error={errors.email}
        required
        hint="Hier sturen we je bevestiging naartoe."
      >
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={set("email")}
          className={inputClass}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : "email-hint"}
        />
      </Field>
      <Field id="telefoon" label="Telefoonnummer" error={errors.telefoon}>
        <input
          id="telefoon"
          type="tel"
          autoComplete="tel"
          value={values.telefoon}
          onChange={set("telefoon")}
          className={inputClass}
          {...aria("telefoon")}
        />
      </Field>
      <div
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={set("website")}
          />
        </label>
      </div>
      <Consent
        checked={consent}
        onChange={setConsent}
        error={errors.toestemming}
      />
      <AgreementCheckbox
        checked={terms}
        onChange={setTerms}
        error={errors.voorwaarden}
        errorId="voorwaarden-error"
      >
        Ik ga akkoord met de{" "}
        <a href="/algemene-voorwaarden" className="font-bold text-vivid-indigo underline">
          algemene voorwaarden
        </a>
        .
      </AgreementCheckbox>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Je wordt doorgestuurd…" : "Doorgaan naar betalen"}
      </Button>
      <p className="text-center text-[13px] text-slate">
        Je betaalt veilig via Stripe. Wij bewaren geen bankgegevens.
      </p>
    </form>
  );
}
