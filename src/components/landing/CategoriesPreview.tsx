import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ButtonLink } from "@/components/ui/Button";

export function CategoriesPreview() {
  return (
    <section className="bg-pure-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-vivid-indigo">
            Jouw mogelijkheden
          </p>
          <h2 className="mt-4 text-[32px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
            Welke kant wil jij op?
          </h2>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-slate">
            Een rijbewijs opent nieuwe mogelijkheden. Voor je dagelijkse ritten,
            je werk of een volgende stap: ontdek welke opleiding bij jouw
            plannen past.
          </p>
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-slate">
            Op onze rijbewijzenpagina vind je alle categorieën, met uitleg over
            de voertuigen, voorwaarden en het verloop van de opleiding.
          </p>
          <ButtonLink
            href="/rijbewijzen"
            variant="ghost"
            className="group mt-7 border-vivid-indigo/30 hover:border-vivid-indigo hover:bg-pale-lilac/45"
            aria-label="Bekijk alle rijbewijscategorieën"
          >
            Bekijk alle rijbewijzen
            <ArrowRightIcon aria-hidden className="ml-2 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
          </ButtonLink>
        </div>
        <Link
          href="/rijbewijzen"
          aria-label="Ontdek alle rijbewijzen"
          className="discovery-images grid grid-cols-2 items-start gap-4 rounded-[15.2px]"
        >
          <div className="image-frame relative aspect-[3/4] overflow-hidden rounded-[15.2px] bg-frost-gray">
            <Image
              src="/images/scooter.webp"
              alt="Illustratief beeld van een scooter langs een Nederlandse gracht"
              fill
              sizes="(max-width:1023px) 45vw, 25vw"
              className="object-cover object-[55%_center]"
            />
          </div>
          <div className="image-frame relative mt-10 aspect-[3/4] overflow-hidden rounded-[15.2px] bg-frost-gray">
            <Image
              src="/images/motor.webp"
              alt="Illustratief beeld van een motor op een oefenterrein"
              fill
              sizes="(max-width:1023px) 45vw, 25vw"
              className="object-cover object-[35%_center]"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
