"use client";

import { useState } from "react";
import { CustomSelect } from "./CustomSelect";

const purposes = ["Persoonlijke uitgaven", "Auto", "Verbouwing", "Verduurzaming", "Schulden samenvoegen"].map((value) => ({ value, label: value }));
const amounts = [5000, 10000, 15000, 25000, 35000, 50000].map((x) => ({ value: `€ ${x.toLocaleString("nl-NL")}`, label: `€ ${x.toLocaleString("nl-NL")}` }));
const terms = ["36 maanden", "60 maanden", "84 maanden", "120 maanden"].map((value) => ({ value, label: value }));

export function LoanForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [purpose, setPurpose] = useState(""), [amount, setAmount] = useState(""), [term, setTerm] = useState("36 maanden");
  const field = (name: string) => `loan-field ${errors[name] ? "loan-field-error" : ""}`;
  const clear = (name: string) => setErrors((current) => { const next = { ...current }; delete next[name]; return next; });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError(""); setErrors({});
    const form = new FormData(e.currentTarget);
    try {
      const r = await fetch("/api/aanvraag", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
      const data = await r.json().catch(() => ({}));
      if (r.status === 422) { setErrors(data.errors ?? {}); setError("Controleer les champs indiqués ci-dessous."); return; }
      if (!r.ok) throw new Error(data.error ?? "Verzenden mislukt.");
      setSent(true);
    } catch (x) { setError(x instanceof Error ? x.message : "Verzenden mislukt."); }
    finally { setBusy(false); }
  }

  if (sent) return <div role="status" className="rounded-2xl border border-[#9ed4c9] bg-[#eefaf7] p-7"><h3 className="text-xl font-bold text-[#073b3a]">Bedankt, je aanvraag is ontvangen.</h3><p className="mt-2 text-[#4c6866]">We nemen je gegevens door en nemen persoonlijk contact met je op. Controleer ook je inbox.</p></div>;
  return <form onSubmit={submit} className="grid gap-5 rounded-[28px] border border-[#d9e8e5] bg-white p-6 shadow-[0_16px_50px_rgba(7,59,58,.07)] sm:grid-cols-2 sm:p-8">
    {error && <p className="sm:col-span-2 rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
    <label className="grid gap-2 text-sm font-semibold">Voornaam en achternaam<input required name="name" autoComplete="name" className={field("name")} onChange={() => clear("name")} />{errors.name && <span className="field-error-message">{errors.name}</span>}</label>
    <label className="grid gap-2 text-sm font-semibold">E-mailadres<input required type="email" name="email" autoComplete="email" className={field("email")} onChange={() => clear("email")} />{errors.email && <span className="field-error-message">{errors.email}</span>}</label>
    <label className="grid gap-2 text-sm font-semibold">Telefoonnummer<input required type="tel" name="phone" autoComplete="tel" className={field("phone")} onChange={() => clear("phone")} />{errors.phone && <span className="field-error-message">{errors.phone}</span>}</label>
    <label className="grid gap-2 text-sm font-semibold">Leendoel<CustomSelect required name="purpose" value={purpose} onChange={(value) => { setPurpose(value); clear("purpose"); }} options={purposes} placeholder="Kies een doel" error={errors.purpose} />{errors.purpose && <span className="field-error-message">{errors.purpose}</span>}</label>
    <label className="grid gap-2 text-sm font-semibold">Gewenst bedrag<CustomSelect required name="amount" value={amount} onChange={(value) => { setAmount(value); clear("amount"); }} options={amounts} placeholder="Kies een bedrag" error={errors.amount} />{errors.amount && <span className="field-error-message">{errors.amount}</span>}</label>
    <label className="grid gap-2 text-sm font-semibold">Looptijd<CustomSelect required name="term" value={term} onChange={(value) => { setTerm(value); clear("term"); }} options={terms} placeholder="Kies een looptijd" error={errors.term} />{errors.term && <span className="field-error-message">{errors.term}</span>}</label>
    <label className="grid gap-2 text-sm font-semibold sm:col-span-2">Opmerking<textarea name="message" rows={4} placeholder="Vertel kort iets over je aanvraag..." className={`${field("message")} min-h-28`} onChange={() => clear("message")} />{errors.message && <span className="field-error-message">{errors.message}</span>}</label>
    <label className="flex gap-3 text-sm text-[#637b78] sm:col-span-2"><input required type="checkbox" name="consent" className="mt-1 accent-[#0f766e]" />Ik geef toestemming om mijn aanvraag te behandelen en contact met mij op te nemen.</label>
    <button disabled={busy} className="rounded-full bg-[#0f766e] px-6 py-3.5 font-semibold text-white disabled:opacity-60 sm:col-span-2">{busy ? "Bezig met verzenden…" : "Aanvraag versturen →"}</button>
    <p className="text-xs leading-5 text-[#718985] sm:col-span-2">Let op! Geld lenen kost geld. Een aanvraag is geen garantie op acceptatie.</p>
  </form>;
}
