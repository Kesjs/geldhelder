import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Theorie en CBR",
  description:
    "Hoe werken theorie en het CBR-examen? Lees wat je moet weten voordat je aan je praktijklessen begint.",
};

const stappen = [
  {
    title: "Theorie-examen",
    text: "Je leert de verkeersregels en verkeersborden en legt het theorie-examen af bij het CBR.",
  },
  {
    title: "Praktijklessen",
    text: "Je oefent fysiek met een instructeur. Online lessen vervangen dit niet.",
  },
  {
    title: "Praktijkexamen",
    text: "Je rijdt het praktijkexamen bij het CBR, met een examinator in de auto.",
  },
  {
    title: "Rijbewijs aanvragen",
    text: "Na je examen vraag je het rijbewijs aan bij de gemeente.",
  },
];

const theorieBlokken = [
  ["Regels herkennen", "Verkeersborden, voorrang, snelheid en bijzondere situaties leren herkennen voordat je ze op straat tegenkomt."],
  ["Situaties begrijpen", "Oefen niet alleen losse antwoorden, maar begrijp waarom een situatie veilig en volgens de regels verloopt."],
  ["Rust bewaren", "Een goede voorbereiding helpt je om tijdens het examen rustig te blijven en je aandacht bij het verkeer te houden."],
];

export default function TheoriePage() {
  return (
    <main>
      <PageHeader
        eyebrow="Theorie en CBR"
        image={{
          src: "/images/theory.webp",
          alt: "Illustratief beeld van studiemateriaal met verkeerssituaties",
        }}
        title="Theorie bereidt je voor, het CBR beslist"
        intro="Online leren helpt je voorbereiden, maar het officiële examen leg je altijd af bij het CBR."
      >
        <ButtonLink href="/reserveren">
          Vraag naar theorie-ondersteuning
        </ButtonLink>
      </PageHeader>
      <Section
        tone="gray"
        title="Het traject naar je rijbewijs"
        intro="Stuurvast verzorgt de praktijklessen en begeleidt je door de stappen eromheen."
      >
        <ol className="grid gap-4 md:grid-cols-2">
          {stappen.map((s, i) => (
            <li
              key={s.title}
              className="flex gap-4 rounded-[15.2px] border border-slate bg-pure-white p-[19px]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[35.8px] bg-pale-lilac font-bold text-vivid-indigo">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold">{s.title}</h3>
                <p className="mt-1 text-slate">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <Section title="Zo bereid je je theorie voor" intro="Een goede voorbereiding bestaat uit kennis, herhaling en begrijpen wat je in het verkeer ziet.">
        <div className="grid gap-4 md:grid-cols-3">
          {theorieBlokken.map(([title, text], index) => (
            <article key={title} className="rounded-[15.2px] border border-fog/60 bg-pure-white p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pale-lilac font-bold text-vivid-indigo">0{index + 1}</span>
              <h3 className="mt-4 text-[19px] font-bold">{title}</h3>
              <p className="mt-2 text-slate">{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="Wat bieden we aan?">
        <div className="max-w-2xl space-y-3 text-slate">
          <p>
            We helpen je graag met het plannen van je theorie en examens. Welke
            theorie-ondersteuning we precies aanbieden, bespreken we met je
            tijdens de intake. Een online quiz of oefenmateriaal tonen we pas op
            de site wanneer dat echt beschikbaar is.
          </p>
          <p>
            Het officiële CBR-examen vervangen we niet. De examens en de uitslag
            blijven altijd bij het CBR.
          </p>
        </div>
      </Section>
      <Section tone="gray">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="image-frame relative aspect-[4/3] overflow-hidden rounded-[15.2px]">
            <Image src="/images/theory-practice.webp" alt="Instructeur en leerling tijdens een praktijkles" fill sizes="(max-width: 767px) 100vw, 560px" className="object-cover" />
          </div>
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-vivid-indigo">Theorie naar praktijk</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight">Je leert beter wanneer je begrijpt wat je ziet</h2>
            <p className="mt-3 text-slate">Tijdens de praktijklessen vertalen we verkeersregels naar echte situaties: kruispunten, snelheid, kijkgedrag en keuzes in het verkeer.</p>
            <ButtonLink href="/reserveren" className="mt-5">Bespreek je voorbereiding</ButtonLink>
          </div>
        </div>
      </Section>
      <Section tone="gray" title="Veelgestelde vragen" intro="De belangrijkste afspraken rond theorie en CBR op één plek.">
        <div className="max-w-3xl divide-y divide-fog/50 rounded-[15.2px] border border-fog/60 bg-pure-white px-5">
          {[
            ["Waar doe ik het officiële theorie-examen?", "Het officiële theorie-examen leg je af bij het CBR. Wij kunnen je helpen om je voorbereiding en planning te bespreken."],
            ["Kan ik al praktijklessen volgen zonder theoriecertificaat?", "Dat hangt af van je categorie en je situatie. Tijdens de intake bespreken we welke stap eerst logisch is."],
            ["Vervangt jullie theoriebegeleiding het CBR-examen?", "Nee. De voorbereiding helpt je leren; alleen het CBR beoordeelt het officiële examen."],
          ].map(([question, answer]) => (
            <details key={question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">{question}<span aria-hidden className="text-xl font-normal text-vivid-indigo transition-transform group-open:rotate-45">+</span></summary>
              <p className="mt-3 max-w-2xl text-slate">{answer}</p>
            </details>
          ))}
        </div>
      </Section>
      <CtaBand
        title="Vragen over theorie of examen?"
        text="Stuur ons een bericht en we leggen je stap voor stap uit wat je nodig hebt."
      />
    </main>
  );
}
