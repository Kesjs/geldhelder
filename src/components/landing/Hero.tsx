import Image from "next/image";
import { ArrowRightIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="bg-pure-white">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 pb-12 pt-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-16">
        <div>
          <p className="mb-5 text-[13px] font-bold uppercase tracking-[0.12em] text-vivid-indigo">
            Stuurvast Rijschool / Utrecht
          </p>
          <h1 className="max-w-xl text-[44px] font-bold leading-[1.04] tracking-[-0.045em] sm:text-[60px] xl:text-[72px]">
            Jouw rijbewijs begint hier.
          </h1>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-slate">
            Van je eerste rijles tot je praktijkexamen. Ontdek de mogelijkheden
            en kies een traject dat bij je past.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/reserveren">
              Start met een aanvraag{" "}
              <ArrowRightIcon aria-hidden className="ml-2" />
            </ButtonLink>
            <ButtonLink href="/rijbewijzen" variant="ghost">
              Ontdek de rijbewijzen
            </ButtonLink>
          </div>
          <div className="mt-8 flex items-start gap-2.5 text-[14px] text-slate">
            <CheckCircledIcon
              aria-hidden
              className="mt-0.5 h-4 w-4 shrink-0 text-vivid-indigo"
            />
            <p>
              Praktijklessen met een instructeur.
              <br />
              Een helder overzicht van je mogelijkheden.
            </p>
          </div>
        </div>
        <div className="hero-media image-frame relative aspect-[5/4] overflow-hidden rounded-[15.2px] bg-frost-gray lg:aspect-[6/5]">
          <Image
            src="/images/hero.webp"
            alt="Illustratief beeld van een lesauto langs een Nederlandse gracht"
            fill
            preload
            sizes="(max-width: 1023px) 100vw, 55vw"
            className="object-cover object-[65%_center]"
          />
        </div>
      </div>
      <div className="border-y border-fog/25 bg-frost-gray">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-3 px-5 py-5 text-[14px] sm:grid-cols-3 sm:px-8">
          <p>
            <span className="font-bold text-midnight-ink">7 categorieën</span>
            <span className="ml-2 text-slate">Van scooter tot tractor</span>
          </p>
          <p>
            <span className="font-bold text-midnight-ink">
              Persoonlijke begeleiding
            </span>
            <span className="ml-2 text-slate">Stap voor stap</span>
          </p>
          <p>
            <span className="font-bold text-midnight-ink">
              Jouw volgende stap
            </span>
            <span className="ml-2 text-slate">Een eenvoudige aanvraag</span>
          </p>
        </div>
      </div>
    </section>
  );
}
