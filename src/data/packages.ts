import { formatEUR } from "@/lib/format";

export type Package = {
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  priceLabel: string;
  duration: string;
  includes: string[];
  note?: string;
  /** Kept for data compatibility; all packages now go through /reserveren. */
  payable: boolean;
  /** Explicitly confirmed categories. Empty means category-specific pricing is still on request. */
  categorySlugs?: string[];
};

const raw: Omit<Package, "priceLabel">[] = [
  {
    slug: "losse-les",
    name: "Losse rijles",
    description: "Eén praktijkles van 60 minuten bij een instructeur.",
    priceCents: 5500,
    duration: "60 minuten",
    includes: [
      "Praktijkles van 60 minuten",
      "Fysiek, met een instructeur",
      "Prijs inclusief btw",
    ],
    payable: false,
  },
  {
    slug: "beginner",
    name: "Pakket Beginner",
    description: "10 lessen om vol vertrouwen te starten.",
    priceCents: 52500,
    duration: "10 lessen van 60 minuten",
    includes: [
      "10 praktijklessen",
      "Vast aanspreekpunt bij Stuurvast",
      "Lessen op een tempo dat bij je past",
    ],
    payable: false,
  },
  {
    slug: "spoedcursus",
    name: "Pakket Spoedcursus",
    description: "Ongeveer 20 lessen, intensief getraind.",
    priceCents: 145000,
    duration: "ongeveer 20 lessen",
    includes: [
      "Ongeveer 20 praktijklessen",
      "Intensief traject met korte tussenpozen",
      "Voorbereiding op het CBR-examen",
    ],
    payable: false,
  },
  {
    slug: "cbr-examen",
    name: "CBR-examen",
    description: "Inclusief reservering van je examen.",
    priceCents: 30000,
    duration: "eenmalig",
    includes: [
      "Reservering van je CBR-examen",
      "Praktische begeleiding rond de examendag",
    ],
    note: "Definitieve voorwaarden volgen. Vraag dit pakket voorlopig aan via het formulier.",
    payable: false,
  },
  {
    slug: "faalangst",
    name: "Faalangsttraining",
    description: "Extra begeleiding bij examenspanning.",
    priceCents: 9500,
    duration: "eenmalig",
    includes: [
      "Begeleiding bij zenuwen voor het examen",
      "Praktische technieken voor de examendag",
    ],
    payable: false,
  },
];

export const packages: Package[] = raw.map((p) => ({
  ...p,
  priceLabel: formatEUR(p.priceCents),
}));

export function getPackage(slug: string) {
  return packages.find((p) => p.slug === slug);
}
