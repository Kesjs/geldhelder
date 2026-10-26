import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

export function TheoryBlock() {
  return (
    <section className="bg-pure-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.12em] text-vivid-indigo">
            Theorie en praktijk
          </p>
          <h2 className="max-w-lg text-[32px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
            Goed voorbereid begint vóór je instapt.
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-slate">
            Verkeersregels begrijpen helpt je onderweg. Ontdek hoe de theorie,
            je praktijklessen en de officiële CBR-examens samenhangen.
          </p>
          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-slate">
            De voorbereiding vervangt het officiële examen niet. Welke
            ondersteuning beschikbaar is, bespreken we met je.
          </p>
          <ButtonLink href="/theorie" variant="ghost" className="mt-7">
            Ontdek theorie en CBR
          </ButtonLink>
        </div>
        <div className="image-frame relative aspect-[4/3] overflow-hidden rounded-[15.2px] bg-frost-gray">
          <Image
            src="/images/theory.webp"
            alt="Illustratief beeld van een tablet, notities en verkeersborden ter voorbereiding op de theorie"
            fill
            sizes="(max-width:1023px) 100vw, 55vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
