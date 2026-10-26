import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/ui/CtaBand";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Maak kennis met Stuurvast Rijschool in Utrecht: onze aanpak, onze werkwijze en ons werkgebied.",
};

const principes = [
  {
    title: "Helder vooraf",
    text: "Je weet wat een traject kost en wat erbij hoort. Richtprijzen zijn altijd als richtprijs gemarkeerd.",
  },
  {
    title: "Fysiek les",
    text: "Praktijklessen geven we altijd samen met een instructeur, in het echte verkeer.",
  },
  {
    title: "Eigen tempo",
    text: "Het aantal lessen dat je nodig hebt verschilt per persoon. We bouwen het traject rond jou.",
  },
];

const traject = [
  ["Kennismaken", "We bespreken je rijbewijs, ervaring, planning en wat je al weet."],
  ["Oefenen", "Je krijgt duidelijke feedback tijdens de praktijklessen en weet waar je volgende focus ligt."],
  ["Opbouwen", "We herhalen wat nodig is en maken de stappen naar het examen concreet."],
  ["Afronden", "Wanneer je klaar bent, bereiden we samen de laatste praktische stappen voor."],
];

export default function OverOnsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Over ons"
        image={{
          src: "/images/practice.webp",
          alt: "Illustratief beeld van begeleiding tijdens een rijles",
        }}
        title="Een rijschool die je traject overzichtelijk maakt"
        intro="Stuurvast Rijschool helpt je in Utrecht stap voor stap naar je rijbewijs, met duidelijke afspraken en persoonlijke begeleiding."
      />
      <Section tone="gray" title="Onze aanpak">
        <div className="grid gap-4 md:grid-cols-3">
          {principes.map((p) => (
            <div
              key={p.title}
              className="rounded-[15.2px] border border-slate bg-pure-white p-[19px]"
            >
              <h3 className="text-[19px] font-bold leading-[1.27]">
                {p.title}
              </h3>
              <p className="mt-2 text-slate">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Van eerste gesprek tot examen" intro="Een rijopleiding wordt overzichtelijker wanneer je weet wat de volgende stap is.">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {traject.map(([title, text], index) => (
            <li key={title} className="rounded-[15.2px] border border-fog/60 bg-pure-white p-5">
              <span className="text-[13px] font-bold text-vivid-indigo">0{index + 1}</span>
              <h3 className="mt-3 text-[19px] font-bold">{title}</h3>
              <p className="mt-2 text-slate">{text}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section title="Waar we rijden">
        <p className="max-w-2xl text-slate">
          Ons werkgebied is {site.serviceArea}. Onze rijschool zit aan het{" "}
          {site.street} in {site.city}. Vraag ons gerust naar de mogelijkheden
          voor jouw woonplaats.
        </p>
      </Section>
      <Section tone="gray">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-vivid-indigo">Leren in Utrecht</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight">Oefenen met de situaties die je echt tegenkomt</h2>
            <p className="mt-3 text-slate">Van rustige woonwijken tot drukkere kruispunten: we bouwen je ervaring stap voor stap op binnen ons werkgebied.</p>
            <p className="mt-3 text-slate">Wil je weten of jouw woonplaats binnen de planning past? Stuur je postcode mee met je aanvraag.</p>
          </div>
          <div className="image-frame relative aspect-[4/3] overflow-hidden rounded-[15.2px]">
            <Image src="/images/about-city.webp" alt="Rustige Utrechtse straat met fietspad en kruispunt" fill sizes="(max-width: 767px) 100vw, 560px" className="object-cover" />
          </div>
        </div>
      </Section>
      <Section tone="gray" title="Wat je van Stuurvast mag verwachten">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Duidelijke feedback", "Je weet na elke les wat goed ging en waar je de volgende keer op let."],
            ["Afspraken op papier", "Prijzen, voorwaarden en vervolgstappen worden vooraf helder besproken."],
            ["Aandacht voor veiligheid", "We bouwen vaardigheden rustig op, met aandacht voor risico's en zelfstandigheid."],
            ["Een aanspreekpunt", "Bij vragen over planning, pakket of examen weet je waar je terechtkunt."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-[15.2px] border border-fog/60 bg-pure-white p-6">
              <h3 className="text-[19px] font-bold">{title}</h3>
              <p className="mt-2 text-slate">{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand />
    </main>
  );
}
