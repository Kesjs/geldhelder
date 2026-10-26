import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";

export function ContactQuick() {
  return (
    <section className="bg-pure-white py-16">
      <div className="mx-auto max-w-[1200px] px-4 text-center">
        <h2 className="text-2xl font-bold">Vragen? Neem contact op</h2>
        <p className="mt-2 text-slate">
          {site.address} · <a href={site.phoneHref}>{site.phone}</a> ·{" "}
          <a href={site.emailHref}>{site.email}</a>
        </p>
        <ButtonLink href="/contact" className="mt-6">
          Stuur een aanvraag
        </ButtonLink>
      </div>
    </section>
  );
}
