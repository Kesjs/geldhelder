import { ButtonLink } from "./Button";

export function CtaBand({
  title = "Klaar om te starten?",
  text = "Kies een pakket of stuur een aanvraag. We reageren zo snel mogelijk.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section data-i18n-scope className="on-dark bg-midnight-ink py-16 text-pure-white">
      <div className="mx-auto max-w-[1200px] px-4 text-center">
        <h2 className="text-[28px] font-bold leading-[1.2]">{title}</h2>
        <p className="mx-auto mt-2 max-w-lg text-soft-violet">{text}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/pakketten">Pakketten bekijken</ButtonLink>
          <ButtonLink href="/reserveren" variant="ghost-dark">
            Aanvraag sturen
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
