import { formatEUR } from "@/lib/format";

export type FaqItem = { q: string; a: string };

export type LicenseCategory = {
  slug: string;
  code: string;
  vehicleType: string;
  shortDescription: string;
  priceCents: number;
  priceLabel: string;
  priceBasis: string;
  summary: string;
  vehicles: string[];
  subcategories: { code: string; label: string }[];
  requirements: string[];
  steps: { title: string; text: string }[];
  packageSlugs: string[];
  priceRows?: { label: string; value: string }[];
  faq: FaqItem[];
};

const common = {
  checkNote:
    "Controleer altijd de actuele voorwaarden bij het CBR of de RDW, ze kunnen wijzigen.",
};

const stepsStandard = (practice: string) => [
  {
    title: "Intake en kennismaking",
    text: "We bespreken je ervaring en doelen en bepalen samen waar je start.",
  },
  {
    title: "Theorie voorbereiden",
    text: "Je bereidt je voor op het theorie-examen. Het examen zelf leg je af bij het CBR.",
  },
  { title: "Praktijklessen", text: practice },
  {
    title: "Examen bij het CBR",
    text: "Als jij en je instructeur het eens zijn dat je klaar bent, plan je het praktijkexamen.",
  },
  {
    title: "Rijbewijs aanvragen",
    text: "Na het examen vraag je het rijbewijs zelf aan bij de gemeente.",
  },
];

const raw: Omit<LicenseCategory, "priceLabel">[] = [
  {
    slug: "am",
    code: "AM",
    vehicleType: "Scooter en bromfiets",
    shortDescription: "Je eerste rijbewijs, vanaf 16 jaar.",
    priceCents: 62915,
    priceBasis: "Richtprijs voor een compleet AM-traject",
    summary:
      "Met rijbewijs AM mag je op een scooter of bromfiets rijden. Voor veel jongeren is het het eerste rijbewijs.",
    vehicles: [
      "Bromfiets en snorfiets",
      "Scooter tot 45 km/u",
      "Brommobiel (lichte vierwieler)",
    ],
    subcategories: [],
    requirements: [
      "Theorie-examen vanaf 15,5 jaar; praktijklessen en praktijkexamen vanaf 16 jaar",
      "Geldig identiteitsbewijs",
      "Voor AM is geen Gezondheidsverklaring nodig",
    ],
    steps: stepsStandard(
      "Je oefent in het verkeer met een instructeur, op een scooter of bromfiets.",
    ),
    packageSlugs: ["losse-les", "beginner", "cbr-examen"],
    faq: [
      {
        q: "Vanaf welke leeftijd kan ik AM halen?",
        a: "Vanaf 16 jaar. Controleer de actuele voorwaarden bij het CBR.",
      },
      {
        q: "Moet ik een eigen scooter meenemen?",
        a: "Dat bespreken we bij de intake. Vraag naar de mogelijkheden via het formulier.",
      },
    ],
  },
  {
    slug: "a",
    code: "A",
    vehicleType: "Motor",
    shortDescription: "Alle motorcategorieën, inclusief A1 en A2.",
    priceCents: 145000,
    priceBasis: "Richtprijs voor een compleet motortraject",
    summary:
      "Rijbewijs A is voor motoren. Welke motor je mag besturen hangt af van je leeftijd en de subcategorie.",
    vehicles: [
      "Lichte motoren (A1)",
      "Middelzware motoren (A2)",
      "Zware motoren (A)",
    ],
    subcategories: [
      { code: "A1", label: "Lichte motor" },
      { code: "A2", label: "Middelzware motor" },
      { code: "A", label: "Onbeperkt vermogen" },
    ],
    requirements: [
      "Minimumleeftijd hangt af van de subcategorie",
      "Geldig identiteitsbewijs",
      "Eigen verklaring over je gezondheid",
      common.checkNote,
    ],
    steps: stepsStandard(
      "Je leert op een motor, eerst op een afgesloten terrein en daarna in het verkeer.",
    ),
    packageSlugs: ["losse-les", "beginner", "cbr-examen"],
    faq: [
      {
        q: "Wat is het verschil tussen A1, A2 en A?",
        a: "Het verschil zit in het motorvermogen en de minimumleeftijd. We leggen je op de intake uit welke route bij je past.",
      },
    ],
  },
  {
    slug: "b",
    code: "B",
    vehicleType: "Personenauto",
    shortDescription: "Het standaard autorijbewijs.",
    priceCents: 362500,
    priceBasis: "Richtprijs voor een compleet autotraject",
    summary:
      "Rijbewijs B is het standaard autorijbewijs. Het aantal lessen dat je nodig hebt verschilt sterk per persoon.",
    vehicles: ["Personenauto", "Bestelwagen tot 3.500 kg"],
    subcategories: [],
    requirements: [
      "Rijlessen vanaf 16,5 jaar; praktijkexamen vanaf 17 jaar",
      "Tot 18 jaar rijd je met een begeleider en begeleiderspas",
      "Geldig identiteitsbewijs",
      "Eigen verklaring over je gezondheid",
      common.checkNote,
    ],
    steps: stepsStandard(
      "Je rijdt met een instructeur in een lesauto, van rustige wegen tot drukke stadsroutes.",
    ),
    packageSlugs: [
      "losse-les",
      "beginner",
      "spoedcursus",
      "cbr-examen",
      "faalangst",
    ],
    faq: [
      {
        q: "Hoeveel lessen heb ik nodig?",
        a: "Dat verschilt per persoon. Een pakket geeft een duidelijke start, en extra lessen zijn altijd los bij te boeken.",
      },
      {
        q: "Kan ik een spoedcursus doen?",
        a: "Ja, met Pakket Spoedcursus volg je ongeveer 20 lessen in een intensief traject.",
      },
    ],
  },
  {
    slug: "be",
    code: "BE",
    vehicleType: "Auto met aanhanger",
    shortDescription: "Voor wie regelmatig met aanhanger rijdt.",
    priceCents: 84900,
    priceBasis: "Richtprijs voor een compleet BE-traject",
    summary:
      "Met rijbewijs BE mag je met een zwaardere aanhanger of caravan rijden dan met alleen rijbewijs B.",
    vehicles: [
      "Personenauto met zware aanhanger",
      "Auto met caravan of paardentrailer",
    ],
    subcategories: [],
    requirements: [
      "Je hebt al rijbewijs B",
      "Geldig identiteitsbewijs",
      common.checkNote,
    ],
    steps: stepsStandard(
      "Je oefent met koppelen, achteruit rijden en manoeuvreren met een aanhanger.",
    ),
    packageSlugs: ["losse-les", "cbr-examen"],
    faq: [
      {
        q: "Heb ik BE nodig voor een caravan?",
        a: "Dat hangt af van het gewicht van je auto en caravan. We kijken er graag samen met je naar.",
      },
    ],
  },
  {
    slug: "c",
    code: "C",
    vehicleType: "Vrachtwagen",
    shortDescription: "Inclusief C1 voor lichtere vrachtwagens.",
    priceCents: 338800,
    priceBasis: "Richtprijs voor een compleet C-traject",
    summary:
      "Rijbewijs C is voor zware vrachtwagens. Voor beroepsmatig rijden komen er extra eisen bij.",
    vehicles: ["Vrachtwagen", "Lichtere vrachtwagen (C1)"],
    subcategories: [
      { code: "C1", label: "Lichtere vrachtwagen" },
      { code: "C", label: "Zware vrachtwagen" },
      { code: "CE", label: "Vrachtwagen met aanhanger" },
    ],
    requirements: [
      "Je hebt meestal al rijbewijs B",
      "Medische keuring",
      "Voor beroepsmatig rijden gelden aanvullende eisen",
      common.checkNote,
    ],
    steps: stepsStandard(
      "Je leert rijden met een vrachtwagen: afmetingen, dode hoeken en laden en lossen.",
    ),
    packageSlugs: ["losse-les", "cbr-examen"],
    faq: [
      {
        q: "Heb ik een beroepskwalificatie nodig?",
        a: "Voor beroepsmatig rijden wel. Vraag ons naar jouw situatie.",
      },
    ],
  },
  {
    slug: "d",
    code: "D",
    vehicleType: "Bus",
    shortDescription: "Inclusief D1 en DE waar relevant.",
    priceCents: 329750,
    priceBasis: "Richtprijs voor een compleet D-traject",
    summary:
      "Rijbewijs D is voor het besturen van bussen. Hierbij komt veel aandacht voor passagiersveiligheid.",
    vehicles: ["Bus", "Kleine bus (D1)"],
    subcategories: [
      { code: "D1", label: "Kleine bus" },
      { code: "D", label: "Bus" },
      { code: "DE", label: "Bus met aanhanger" },
    ],
    requirements: [
      "Je hebt meestal al rijbewijs B",
      "Medische keuring",
      "Voor beroepsmatig rijden gelden aanvullende eisen",
      common.checkNote,
    ],
    steps: stepsStandard(
      "Je leert rijden met een bus, met aandacht voor passagiers en bijzondere manoeuvres.",
    ),
    packageSlugs: ["losse-les", "cbr-examen"],
    faq: [
      {
        q: "Wat is het verschil tussen D1 en D?",
        a: "D1 geldt voor kleinere bussen, D voor grotere bussen. We leggen uit welke bij jouw doel past.",
      },
    ],
  },
  {
    slug: "t",
    code: "T",
    vehicleType: "Tractor en landbouwvoertuig",
    shortDescription:
      "Voor tractoren en landbouwvoertuigen op de openbare weg.",
    priceCents: 175000,
    priceBasis: "Richtprijs voor 12 lessen plus examen",
    summary:
      "Rijbewijs T heb je nodig om met een tractor of ander landbouwvoertuig op de openbare weg te rijden.",
    vehicles: [
      "Tractor",
      "Landbouwvoertuig",
      "Mobiele werktuigen op de openbare weg",
    ],
    subcategories: [],
    requirements: [
      "Theorie-examen vanaf 15,5 jaar; praktijkexamen vanaf 16 jaar",
      "Geldig identiteitsbewijs",
      "Gezondheidsverklaring",
      common.checkNote,
    ],
    steps: stepsStandard(
      "Je oefent met een tractor, op het erf en op de openbare weg.",
    ),
    packageSlugs: ["losse-les", "cbr-examen"],
    priceRows: [
      { label: "Losse les van 60 minuten", value: "€ 120 (€ 115 tot € 125)" },
      { label: "Theorie-examen", value: "ongeveer € 53" },
      { label: "Praktijkexamen CBR", value: "ongeveer € 490" },
      { label: "6 lessen plus examen", value: "ongeveer € 1.100" },
      { label: "12 lessen plus examen", value: "ongeveer € 1.750" },
      { label: "16 lessen plus examen", value: "ongeveer € 2.150" },
      { label: "20 lessen plus examen", value: "ongeveer € 2.580" },
    ],
    faq: [
      {
        q: "Welk traject past bij mij?",
        a: "Dat hangt af van je ervaring met tractoren. Met 12 lessen plus examen als referentie kunnen we samen een traject kiezen.",
      },
    ],
  },
];

export const licenseCategories: LicenseCategory[] = raw.map((c) => ({
  ...c,
  priceLabel: formatEUR(c.priceCents),
}));

export function getCategory(slug: string) {
  return licenseCategories.find((c) => c.slug === slug);
}
