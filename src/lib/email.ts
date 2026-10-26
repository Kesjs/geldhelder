import { Resend } from "resend";
import nodemailer from "nodemailer";
import { site } from "@/data/site";
import { createHash } from "node:crypto";
import { getStore } from "@/lib/store";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const from = () => process.env.EMAIL_FROM ?? `${site.name} <${site.email}>`;
const inbox = () => process.env.EMAIL_TO ?? site.email;
const logoUrl = () => `${site.url.replace(/\/$/, "")}/brand/stuurvast-logo-mark.png`;

const smtpConfig = () => {
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  if (!user || !password) return null;

  const port = Number(process.env.SMTP_PORT ?? 465);
  return {
    host: process.env.SMTP_HOST ?? "smtp.hostinger.com",
    port,
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : port === 465,
    auth: { user, pass: password },
  };
};

async function send(
  opts: { to: string; subject: string; html: string; replyTo?: string },
  idempotencyKey: string,
) {
  const smtp = smtpConfig();
  if (smtp) {
    try {
      await nodemailer.createTransport(smtp).sendMail({
        from: from(),
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
        replyTo: opts.replyTo,
      });
      return { ok: true as const };
    } catch {
      console.error("[email] SMTP-verzending mislukt");
      return { ok: false as const };
    }
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[email] verzending niet geconfigureerd");
    return { ok: false as const };
  }
  try {
    const { error } = await new Resend(key).emails.send(
      {
        from: from(),
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
        replyTo: opts.replyTo,
      },
      { idempotencyKey },
    );
    if (error) {
      console.error("[email] verzenden mislukt");
      return { ok: false as const };
    }
    return { ok: true as const };
  } catch {
    console.error("[email] verbinding mislukt");
    return { ok: false as const };
  }
}

const wrap = (body: string) =>
  `<div style="font-family:Inter,Arial,sans-serif;color:#222;max-width:560px;line-height:1.5">
  <div style="padding:0 0 18px;border-bottom:1px solid #eaeaf7;margin-bottom:22px">
    <img src="${logoUrl()}" alt="${esc(site.name)}" width="72" height="72" style="display:block;width:72px;height:72px;object-fit:contain" />
  </div>
  ${body}
  <hr style="border:none;border-top:1px solid #eaeaf7;margin:24px 0"/>
  <p style="margin:0;color:#222;font-weight:700">${esc(site.name)}</p>
  <p style="margin:4px 0 0;color:#686878;font-size:13px">${esc(site.address)} · ${esc(site.phone)}</p>
  <p style="margin:4px 0 0;font-size:13px"><a href="${esc(site.emailHref)}" style="color:#4d4bd5">${esc(site.email)}</a> · <a href="${esc(site.url)}" style="color:#4d4bd5">${esc(site.url.replace(/^https?:\/\//, ""))}</a></p>
  </div>`;

const rows = (items: [string, string][]) =>
  `<table style="border-collapse:collapse;width:100%">${items
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#686878;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0">${esc(v)}</td></tr>`,
    )
    .join("")}</table>`;

const panel = (title: string, body: string) =>
  `<div style="border:1px solid #e5e5f4;border-radius:12px;padding:18px 20px;margin:16px 0">
    <p style="margin:0 0 10px;color:#4d4bd5;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">${esc(title)}</p>
    ${body}
  </div>`;

export async function sendRequestEmails(d: {
  type: string;
  naam: string;
  email: string;
  telefoon: string;
  categorie: string;
  pakket: string;
  bericht: string;
}) {
  const key = createHash("sha256").update(JSON.stringify(d)).digest("hex");
  const label =
    d.type === "reservering" ? "Nieuwe aanvraag" : "Nieuw contactbericht";
  const receivedAt = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Brussels",
  }).format(new Date());
  const internal = await send(
    {
      to: inbox(),
      replyTo: d.email,
      subject: `${label} — ${d.naam}`,
      html: wrap(
        `<div style="border-bottom:1px solid #e5e5f4;padding-bottom:16px;margin-bottom:18px">
          <p style="margin:0 0 6px;color:#4d4bd5;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">Stuurvast Rijschool</p>
          <h2 style="margin:0;font-size:24px;line-height:1.2">${esc(label)}</h2>
          <p style="margin:8px 0 0;color:#686878">Reçu le ${esc(receivedAt)}</p>
        </div>
        ${panel("Coordonnées du client", rows([
          ["Nom", d.naam],
          ["E-mail", d.email],
          ["Téléphone", d.telefoon],
        ]))}
        ${panel("Demande", rows([
          ["Permis", d.categorie],
          ["Forfait", d.pakket],
        ]))}
        ${panel("Message", `<p style="margin:0;white-space:pre-wrap">${esc(d.bericht)}</p>`)}
        <p style="margin:20px 0 0;color:#686878;font-size:13px">Utilise le bouton « Répondre » de Gmail pour répondre directement à ${esc(d.naam)}.</p>`,
      ),
    },
    `request/${key}/internal`,
  );
  return internal.ok;
}

export async function sendPaymentEmails(d: {
  naam: string;
  email: string;
  telefoon: string;
  pakket: string;
  bedrag: string;
  referentie: string;
  sessionId: string;
}) {
  const store = getStore();
  if (!store) return false;
  const deliver = async (kind: string, opts: Parameters<typeof send>[0]) => {
    const key = `vooruit:payment:${d.sessionId}:${kind}`;
    if (await store.get(key)) return true;
    const result = await send(opts, `payment/${d.sessionId}/${kind}`);
    if (!result.ok) return false;
    await store.set(key, true);
    return true;
  };
  const visitor = await deliver("visitor", {
    to: d.email,
    subject: `Betaling ontvangen: ${d.pakket}`,
    html: wrap(
      `<h2>Bedankt voor je betaling, ${esc(d.naam)}</h2>
      <p>We hebben je betaling ontvangen. Stuurvast neemt contact met je op om de lessen in te plannen.</p>
      ${rows([
        ["Pakket", d.pakket],
        ["Bedrag", d.bedrag],
        ["Referentie", d.referentie],
      ])}`,
    ),
  });
  if (!visitor) return false;
  const internal = await deliver("internal", {
    to: inbox(),
    replyTo: d.email,
    subject: `Betaald: ${d.pakket} (${d.naam})`,
    html: wrap(
      `<h2>Nieuwe betaling</h2>${rows([
        ["Naam", d.naam],
        ["E-mail", d.email],
        ["Telefoon", d.telefoon],
        ["Pakket", d.pakket],
        ["Bedrag", d.bedrag],
        ["Referentie", d.referentie],
      ])}<p>Neem contact op met de klant om de lessen in te plannen.</p>`,
    ),
  });
  return internal;
}
