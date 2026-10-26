export const site = {
  name: "GeldHelder",
  tagline: "Duidelijke informatie voor je financiële keuze",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://geldhelder.vercel.app",
  address: "Nederland",
  street: "",
  postalCode: "",
  city: "",
  phone: "",
  phoneHref: "",
  email: process.env.EMAIL_TO ?? "contact@geldhelder.nl",
  emailHref: `mailto:${process.env.EMAIL_TO ?? "contact@geldhelder.nl"}`,
  kvk: "",
  serviceArea: "Nederland",
  // Horaires: à compléter par Stuurvast. Laisser vide tant que non confirmés.
  hours: [] as { days: string; time: string }[],
};

export const nav = [
  { label: "Rijbewijzen", href: "/rijbewijzen" },
  { label: "Pakketten", href: "/pakketten" },
  { label: "Theorie", href: "/theorie" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Instructeurs", href: "/instructeurs" },
];

export const priceDisclaimer =
  "Richtprijzen op basis van de Nederlandse markt in 2026. De uiteindelijke kosten hangen af van je niveau en het aantal lessen dat je nodig hebt.";
