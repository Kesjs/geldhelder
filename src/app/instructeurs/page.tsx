import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { instructors } from "@/data/instructors";

export const metadata: Metadata = {
  title: "Instructeurs",
  description:
    "Maak kennis met de instructeurs van Stuurvast Rijschool in Utrecht.",
};

export default function InstructeursPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Instructeurs"
        image={{
          src: "/images/instructors.webp",
          alt: "Illustratief beeld van instructeurs die een route bespreken bij een lesauto",
        }}
        title="De mensen naast je in de auto"
        intro="Je volgt de praktijklessen altijd samen met een instructeur."
      />
      <Section title="Wat je van een instructeur mag verwachten" intro="De profielen worden aangevuld zodra de informatie definitief is. De manier van begeleiden staat al wel vast.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Rustige uitleg", "We leggen uit wat er gebeurt, waarom het belangrijk is en hoe je het zelf kunt oefenen."],
            ["Concrete feedback", "Na een oefening krijg je één of twee duidelijke aandachtspunten voor de volgende stap."],
            ["Samen plannen", "Je bespreekt je doelen, beschikbaarheid en tempo zodat de opleiding bij je situatie past."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-[15.2px] border border-fog/60 bg-pure-white p-6">
              <h2 className="text-[20px] font-bold">{title}</h2>
              <p className="mt-2 text-slate">{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="gray">
        {instructors.length === 0 ? (
          <div className="max-w-xl rounded-[15.2px] border border-slate bg-pure-white p-6">
            <h2 className="text-[21px] font-bold">
              Profielen volgen binnenkort
            </h2>
            <p className="mt-2 text-slate">
              We werken aan de profielen van onze instructeurs. Wil je nu al
              weten wie je instructeur wordt? Stuur ons een bericht, dan
              vertellen we het je graag.
            </p>
            <ButtonLink href="/contact" className="mt-5">
              Neem contact op
            </ButtonLink>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {instructors.map((i) => (
              <article
                key={i.name}
                className="rounded-[15.2px] border border-slate bg-pure-white p-[19px]"
              >
                <h2 className="text-[19px] font-bold">{i.name}</h2>
                <p className="text-slate">{i.role}</p>
                {i.experience && (
                  <p className="mt-2 text-[14px]">{i.experience}</p>
                )}
                {i.languages && (
                  <p className="mt-1 text-[14px] text-slate">
                    Talen: {i.languages.join(", ")}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </Section>
      <Section>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="image-frame relative aspect-[4/3] overflow-hidden rounded-[15.2px] md:order-2">
            <Image src="/images/instructor-planning.webp" alt="Instructeur en leerling bespreken samen een route" fill sizes="(max-width: 767px) 100vw, 560px" className="object-cover" />
          </div>
          <div className="md:order-1">
            <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-vivid-indigo">Een goede match</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight">Vertel ons wat jou helpt om goed te leren</h2>
            <p className="mt-3 text-slate">Heb je behoefte aan extra uitleg, een rustig tempo of juist een strakke planning? Zet het in je aanvraag. Zo kunnen we vanaf het eerste gesprek beter rekening houden met jouw situatie.</p>
            <ButtonLink href="/reserveren" className="mt-5">Vertel ons je voorkeuren</ButtonLink>
          </div>
        </div>
      </Section>
      <Section title="Nog geen instructeur gekozen?" intro="Dat is geen probleem. Stuur je rijbewijs en je gewenste startmoment door; we zoeken samen de passende planning.">
        <ButtonLink href="/reserveren">Stuur je aanvraag</ButtonLink>
      </Section>
    </main>
  );
}
