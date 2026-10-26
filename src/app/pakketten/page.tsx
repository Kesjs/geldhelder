import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { PackageCard } from "@/components/category/PackageCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { packages } from "@/data/packages";

export const metadata: Metadata = {
  title: "Pakketten en tarieven",
  description:
    "Losse rijles, Pakket Beginner, Pakket Spoedcursus, CBR-examen en Faalangsttraining. Kies een formule en stuur een aanvraag naar Stuurvast.",
};

export default function PakkettenPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Pakketten"
        image={{
          src: "/images/packages.webp",
          alt: "Illustratief beeld van een planning voor rijlessen met autosleutels",
        }}
        title="Van een losse les tot een volledige spoedcursus"
        intro="Onze pakketten hebben een richtprijs, inclusief btw. Kies een formule en stuur je aanvraag; we nemen daarna persoonlijk contact met je op."
      />
      <Section tone="gray">
        <div className="mb-10 max-w-2xl">
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-vivid-indigo">Kies je startpunt</p>
          <h2 className="mt-3 text-[28px] font-bold leading-tight md:text-[34px]">Een pakket dat past bij jouw manier van leren</h2>
          <p className="mt-3 text-slate">Begin rustig met één les, kies een vast aantal lessen of vraag begeleiding rond je examen. Je hoeft vandaag nog niet precies te weten hoeveel lessen je nodig hebt.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <PackageCard key={p.slug} pkg={p} />
          ))}
        </div>
      </Section>
      <Section tone="white" title="Welk traject past bij je?" intro="Gebruik deze drie situaties als eerste oriëntatie. Tijdens de intake kunnen we je keuze bijstellen.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Ik wil eerst proberen", "Start met een losse les en ontdek waar je staat. Daarna kun je gericht beslissen over een pakket.", "Losse rijles"],
            ["Ik wil een stevige basis", "Met Pakket Beginner krijg je tien lessen om rustig routine op te bouwen en je volgende stap te bepalen.", "Pakket Beginner"],
            ["Ik heb een duidelijke deadline", "Een spoedcursus werkt met korte tussenpozen. Bespreek vooraf je agenda, ervaring en examenplanning.", "Pakket Spoedcursus"],
          ].map(([title, text, label]) => (
            <article key={title} className="rounded-[15.2px] border border-fog/60 bg-pure-white p-6">
              <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-vivid-indigo">{label}</span>
              <h3 className="mt-3 text-[20px] font-bold">{title}</h3>
              <p className="mt-2 text-slate">{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="gray" title="Wat zit er precies in?" intro="Een helder overzicht van de belangrijkste verschillen tussen de meest gekozen lesopties.">
        <div className="overflow-x-auto rounded-[15.2px] border border-fog/60 bg-pure-white">
          <table className="w-full min-w-[720px] border-collapse text-left text-[14px]">
            <caption className="sr-only">Vergelijking van rijschoolpakketten</caption>
            <thead>
              <tr className="border-b border-fog/50 text-[13px] uppercase tracking-[0.08em] text-slate">
                <th scope="col" className="px-5 py-4 font-bold">Onderdeel</th>
                <th scope="col" className="px-5 py-4 font-bold">Losse les</th>
                <th scope="col" className="px-5 py-4 font-bold">Beginner</th>
                <th scope="col" className="px-5 py-4 font-bold">Spoedcursus</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Lesduur", "60 minuten", "10 × 60 minuten", "Ongeveer 20 lessen"],
                ["Tempo", "Flexibel", "Op jouw tempo", "Intensief, korte tussenpozen"],
                ["Begeleiding", "Instructeur", "Vast aanspreekpunt", "Voorbereiding op CBR-examen"],
                ["Vervolg", "Aanvraag sturen", "Aanvraag sturen", "Aanvraag sturen"],
              ].map(([label, ...cells]) => (
                <tr key={label} className="border-b border-fog/30 last:border-0">
                  <th scope="row" className="px-5 py-4 font-bold">{label}</th>
                  {cells.map((cell) => <td key={cell} className="px-5 py-4 text-slate">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section title="Hoe gaat het verder na je aanvraag?">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-bold">Aanvraag versturen</h3>
            <p className="mt-1 text-slate">
              Kies een pakket en vul het formulier in. Je aanvraag komt rechtstreeks
              bij Stuurvast terecht.
            </p>
          </div>
          <div>
            <h3 className="font-bold">Na je aanvraag</h3>
            <p className="mt-1 text-slate">
              Je ontvangt een bevestiging per e-mail. Daarna nemen we contact
              met je op om je vragen, beschikbaarheid en startmoment te bespreken.
            </p>
          </div>
          <div>
            <h3 className="font-bold">Wat je niet betaalt</h3>
            <p className="mt-1 text-slate">
              Het officiële examengeld van het CBR en de aanvraag van je
              rijbewijs bij de gemeente vallen buiten deze richtprijzen, tenzij
              we dat samen anders afspreken.
            </p>
          </div>
        </div>
        <p className="mt-8 text-[14px] text-slate">
          Lees ook onze{" "}
          <a
            href="/algemene-voorwaarden"
            className="font-bold text-vivid-indigo underline"
          >
            algemene voorwaarden
          </a>
          .
        </p>
      </Section>
      <Section tone="gray" title="Na je aanvraag" intro="Zo verloopt het praktische vervolg nadat je een pakket hebt gekozen.">
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            ["1", "Gegevens invullen", "Controleer je naam, e-mailadres en telefoonnummer voordat je verdergaat."],
            ["2", "We nemen contact op", "We bespreken je ervaring, voorkeuren en de beschikbare momenten."],
            ["3", "Samen inplannen", "Na de bevestiging nemen we contact op om beschikbaarheid en startmoment te bespreken."],
          ].map(([number, title, text]) => (
            <li key={number} className="rounded-[15.2px] border border-fog/60 bg-pure-white p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pale-lilac font-bold text-vivid-indigo">{number}</span>
              <h3 className="mt-4 text-[19px] font-bold">{title}</h3>
              <p className="mt-2 text-slate">{text}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section title="Veelgestelde vragen over pakketten">
        <div className="max-w-3xl divide-y divide-fog/50 rounded-[15.2px] border border-fog/60 bg-pure-white px-5">
          {[
            ["Moet ik meteen een pakket kiezen?", "Nee. Je kunt starten met een losse les of eerst een aanvraag sturen als je wilt overleggen."],
            ["Zijn de prijzen definitief?", "De bedragen op deze pagina zijn richtprijzen voor de genoemde prestaties en zijn inclusief btw. Eventuele officiële CBR-kosten staan apart vermeld wanneer dat van toepassing is."],
            ["Kan ik een pakket voor een andere categorie gebruiken?", "De pakketten zijn niet automatisch voor elke categorie gelijk. Vermeld je gewenste rijbewijs in je aanvraag zodat we de juiste voorwaarden kunnen bevestigen."],
            ["Wat gebeurt er als ik meer lessen nodig heb?", "Dan bespreken we samen extra losse lessen. Het benodigde aantal verschilt per leerling en wordt tijdens de lessen geëvalueerd."],
          ].map(([question, answer]) => (
            <details key={question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold marker:hidden">{question}<span aria-hidden className="text-xl font-normal text-vivid-indigo transition-transform group-open:rotate-45">+</span></summary>
              <p className="mt-3 max-w-2xl pr-8 text-slate">{answer}</p>
            </details>
          ))}
        </div>
      </Section>
      <CtaBand
        title="Twijfel je welk pakket past?"
        text="Vertel ons je situatie, dan adviseren we je vrijblijvend."
      />
    </main>
  );
}

