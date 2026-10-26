export const site = {
  name: "Stuurvast Rijschool",
  tagline: "Jouw rijbewijs, stap voor stap helder",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rijrouteutrecht.nl",
  address: "Stationsplein 12, 3511 ED Utrecht",
  street: "Stationsplein 12",
  postalCode: "3511 ED",
  city: "Utrecht",
  phone: "06 12 34 56 78",
  phoneHref: "tel:+31612345678",
  email: "contact@rijrouteutrecht.nl",
  emailHref: "mailto:contact@rijrouteutrecht.nl",
  kvk: "12345678",
  serviceArea: "Utrecht en omliggende gemeenten",
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
