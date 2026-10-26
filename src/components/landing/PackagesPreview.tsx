import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ButtonLink } from "@/components/ui/Button";

export function PackagesPreview() {
  return (
    <section className="bg-frost-gray py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1280px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-vivid-indigo">
            Een traject dat bij je past
          </p>
          <h2 className="mt-4 max-w-xl text-[32px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
            Leren op jouw tempo.
          </h2>
        </div>
        <div>
          <p className="max-w-lg text-[16px] leading-relaxed text-slate">
            Begin je net, wil je verder oefenen of zoek je een intensiever
            traject? Bekijk de lesmogelijkheden en wat er bij ieder pakket
            hoort.
          </p>
          <ButtonLink href="/pakketten" variant="ghost" className="mt-6">
            Bekijk de lesmogelijkheden
            <ArrowRightIcon aria-hidden className="ml-2" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
