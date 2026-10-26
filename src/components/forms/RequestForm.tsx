"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Consent, inputClass, selectClass } from "./Field";
import { requestSchema, fieldErrors } from "@/lib/validation";
import { licenseCategories } from "@/data/license-categories";
import { packages } from "@/data/packages";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { translate, translateText } from "@/i18n/translations";
import { useLocale } from "@/components/i18n/LanguageProvider";

type Status = "idle" | "loading" | "success" | "error";

export function RequestForm({
  variant,
  defaultCategory = "",
  defaultPackage = "",
}: {
  variant: "reservering" | "contact";
  defaultCategory?: string;
  defaultPackage?: string;
}) {
  const { locale } = useLocale();
  const localize = (message?: string) =>
    message ? translate(message, locale) : undefined;
  const localizeText = (message: string) => translateText(message, locale);
  const [values, setValues] = useState({
    naam: "",
    email: "",
    telefoon: "",
    categorie: defaultCategory,
    pakket: defaultPackage,
    bericht: "",
    website: "",
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const startedAt = useRef(0);
  const summary = useRef<HTMLDivElement>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set =
    (k: keyof typeof values) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));
  const update =
    (k: keyof typeof values) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setValues((v) => ({ ...v, [k]: e.target.value }));
      setFormError("");
      setErrors((current) => {
        if (!current[k]) return current;
        const next = { ...current };
        delete next[k];
        return next;
      });
    };
  const aria = (k: string) => ({
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });
  const onConsentChange = (value: boolean) => {
    setConsent(value);
    setFormError("");
    if (value) {
      setErrors((current) => {
        if (!current.toestemming) return current;
        const next = { ...current };
        delete next.toestemming;
        return next;
      });
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    const payload = {
      ...values,
      type: variant,
      toestemming: consent,
      startedAt: startedAt.current,
    };
    const parsed = requestSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setStatus("idle");
      setTimeout(() => summary.current?.focus(), 0);
      return;
    }
    setErrors({});
    setStatus("loading");
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch("/api/aanvraag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: controller.signal,
      });
      if (res.status === 422) {
        const data = await res.json();
        setErrors(data.errors ?? {});
        setStatus("idle");
        setTimeout(() => summary.current?.focus(), 0);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Verzenden mislukt.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      const timedOut = err instanceof DOMException && err.name === "AbortError";
      setFormError(timedOut
        ? "De verbinding duurt te lang. Controleer je verbinding en probeer het opnieuw."
        : err instanceof Error && err.message
          ? err.message
          : "Het versturen is niet gelukt. Controleer je verbinding en probeer het opnieuw.");
      setTimeout(() => summary.current?.focus(), 0);
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-[15.2px] border border-success p-6">
        <p className="text-[19px] font-bold">
          {localize("Bedankt, we hebben je aanvraag ontvangen")}
        </p>
        <p className="mt-2 text-slate">
          {localize(
            "We hebben je aanvraag ontvangen. Dit is nog geen bevestigde reservering. We nemen zo snel mogelijk persoonlijk contact met je op.",
          )}
        </p>
      </div>
    );
  }

  const errorList = Object.entries(errors);
  const reserveren = variant === "reservering";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" aria-busy={status === "loading"}>
      <div
        ref={summary}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        className="outline-none"
      >
        {(errorList.length > 0 || formError) && (
          <div className="rounded-[7.6px] border border-error bg-error/5 p-3 text-[14px] text-error">
            {localize(formError) ||
              localize("Controleer de gemarkeerde velden en probeer het opnieuw.")}
          </div>
        )}
      </div>
      <p className="text-[14px] text-slate">
        {localize(
          "Vul je gegevens in; velden met een * zijn verplicht. We gebruiken je gegevens alleen om je aanvraag te beantwoorden.",
        )}
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="naam" label={localize("Naam") ?? "Naam"} error={localize(errors.naam)} required>
          <input
            id="naam"
            name="naam"
            autoComplete="name"
            value={values.naam}
            onChange={update("naam")}
            required
            maxLength={100}
            className={inputClass}
            {...aria("naam")}
          />
        </Field>
        <Field id="email" label={localize("E-mailadres") ?? "E-mailadres"} error={localize(errors.email)} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update("email")}
            required
            maxLength={200}
            className={inputClass}
            {...aria("email")}
          />
        </Field>
        <Field
          id="telefoon"
          label={localize("Telefoonnummer") ?? "Telefoonnummer"}
          error={localize(errors.telefoon)}
          optionalLabel={localize("(optioneel)")}
        >
          <input
            id="telefoon"
            name="telefoon"
            type="tel"
            autoComplete="tel"
            value={values.telefoon}
            onChange={update("telefoon")}
            maxLength={30}
            className={inputClass}
            {...aria("telefoon")}
          />
        </Field>
        {reserveren && (
          <Field
            id="categorie"
            label={localize("Rijbewijs") ?? "Rijbewijs"}
            error={localize(errors.categorie)}
            optionalLabel={localize("(optioneel)")}
          >
            <div className="relative">
              <select
                id="categorie"
                name="categorie"
                value={values.categorie}
                onChange={update("categorie")}
                className={selectClass}
                {...aria("categorie")}
              >
                <option value="">{localize("Nog niet zeker")}</option>
                {licenseCategories.map((c) => (
                  <option key={c.slug} value={c.code}>
                    {localizeText(`${c.code} · ${c.vehicleType}`)}
                  </option>
                ))}
              </select>
              <ChevronDownIcon aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate" />
            </div>
          </Field>
        )}
      </div>
      {reserveren && (
          <Field
            id="pakket"
            label={localize("Pakket of prestatie") ?? "Pakket of prestatie"}
            error={localize(errors.pakket)}
            optionalLabel={localize("(optioneel)")}
          >
          <div className="relative">
            <select
              id="pakket"
              name="pakket"
              value={values.pakket}
              onChange={update("pakket")}
              className={selectClass}
              {...aria("pakket")}
            >
              <option value="">{localize("Nog niet zeker")}</option>
              {packages.map((p) => (
                <option key={p.slug} value={p.name}>
                    {localizeText(`${p.name} · ${p.priceLabel}`)}
                </option>
              ))}
            </select>
            <ChevronDownIcon aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate" />
          </div>
        </Field>
      )}
      <Field
        id="bericht"
        label={localize("Bericht") ?? "Bericht"}
        error={localize(errors.bericht)}
        required
        hint={localize(
          "Vertel kort wat je zoekt, bijvoorbeeld je ervaring of gewenste startdatum.",
        )}
      >
        <textarea
          id="bericht"
          name="bericht"
          rows={5}
          value={values.bericht}
          onChange={update("bericht")}
          required
          minLength={5}
          maxLength={2000}
          className={inputClass}
          aria-describedby={errors.bericht ? "bericht-error" : "bericht-hint"}
          aria-invalid={!!errors.bericht}
        />
      </Field>
      {/* Honeypot: invisible pour les humains */}
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
        onChange={onConsentChange}
        error={localize(errors.toestemming)}
        consentLabel={localize(
          "Ik geef toestemming om mijn gegevens te verwerken voor deze aanvraag, zoals beschreven in het",
        )}
        privacyLabel={localize("privacybeleid")}
      />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? (
          <span className="inline-flex items-center gap-2" aria-live="polite">
            <span
              aria-hidden
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
            />
            {localize("Bezig met versturen…")}
          </span>
        )
          : reserveren
            ? localize("Aanvraag versturen")
            : localize("Bericht versturen")}
      </Button>
    </form>
  );
}
