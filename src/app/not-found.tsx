import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="dot-grid">
      <div className="mx-auto max-w-[1200px] px-4 py-24 text-center">
        <p className="font-bold text-vivid-indigo">404</p>
        <h1 className="mt-2 text-[46px] font-bold leading-[1.1]">
          Deze pagina bestaat niet
        </h1>
        <p className="mx-auto mt-3 max-w-md text-slate">
          De pagina is verplaatst of het adres klopt niet. Ga terug naar de
          homepage of bekijk onze rijbewijzen.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <ButtonLink href="/">Naar home</ButtonLink>
          <ButtonLink href="/rijbewijzen" variant="ghost">
            Rijbewijzen
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
