import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

const steps = [
  {
    title: "Vertel ons je plannen",
    body: "Kies een rijbewijs en stuur een aanvraag. We bespreken samen je ervaring en je volgende stap.",
  },
  {
    title: "Volg je lessen",
    body: "Praktijklessen bij een instructeur, fysiek, op jouw tempo.",
  },
  {
    title: "Doe examen bij het CBR",
    body: "Wij bereiden je voor; het examen zelf loopt via het CBR.",
  },
];

export function ProcessSteps() {
  return (
    <section className="bg-frost-gray py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="image-frame relative aspect-[4/5] overflow-hidden rounded-[15.2px] bg-pale-lilac sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            src="/images/practice.webp"
            alt="Illustratief beeld van handen aan het stuur tijdens een rijles"
            fill
            sizes="(max-width:1023px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="max-w-lg text-[32px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
            Leren rijden. Stap voor stap, op jouw tempo.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate">
            Je hoeft niet alles al te kunnen. Een helder traject begint met
            weten waar je staat en waar je naartoe wilt.
          </p>
          <ol className="mt-8 space-y-6">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-vivid-indigo/30 text-[14px] font-bold text-vivid-indigo">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold">{step.title}</h3>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-slate">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <ButtonLink href="/over-ons" variant="ghost" className="mt-8">
            Meer over onze aanpak
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
