import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { IndicativeBadge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/ui/CtaBand";
import { PackageCard } from "@/components/category/PackageCard";
import { getCategory, licenseCategories } from "@/data/license-categories";
import { getPackage } from "@/data/packages";
import { priceDisclaimer } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return licenseCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return {
    title: `Rijbewijs ${cat.code}: ${cat.vehicleType}`,
    description: `${cat.summary} Richtprijs ${cat.priceLabel}.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const pkgs = cat.packageSlugs
    .map(getPackage)
    .filter(
      (p): p is NonNullable<typeof p> =>
        !!p && !!p.categorySlugs?.includes(cat.slug),
    );

  return (
    <main>
      <PageHeader
        eyebrow={`Rijbewijs ${cat.code}`}
        image={{
          src:
            cat.slug === "am"
              ? "/images/scooter.webp"
              : cat.slug === "a"
                ? "/images/motor.webp"
                : "/images/hero.webp",
          alt: `Illustratief beeld passend bij rijbewijs ${cat.code}`,
        }}
        title={cat.vehicleType}
        intro={cat.summary}
      >
        <ButtonLink href={`/reserveren?categorie=${cat.slug}`}>
          Aanvraag sturen
        </ButtonLink>
        <ButtonLink href="/pakketten" variant="ghost">
          Pakketten bekijken
        </ButtonLink>
      </PageHeader>

      <Section tone="gray">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-10">
            <div>
              <h2 className="text-[21px] font-bold">
                Welke voertuigen vallen hieronder?
              </h2>
              <ul className="mt-3 space-y-1">
                {cat.vehicles.map((v) => (
                  <li key={v} className="flex gap-2">
                    <span aria-hidden className="text-vivid-indigo">
                      ✓
                    </span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>

            {cat.subcategories.length > 0 && (
              <div>
                <h2 className="text-[21px] font-bold">Subcategorieën</h2>
                <div className="mt-3 flex flex-wrap gap-3">
                  {cat.subcategories.map((s) => (
                    <div
                      key={s.code}
                      className="rounded-[7.6px] border border-slate bg-pure-white px-4 py-3"
                    >
                      <p className="font-bold text-vivid-indigo">{s.code}</p>
                      <p className="text-[14px] text-slate">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-[21px] font-bold">Voorwaarden</h2>
              <ul className="mt-3 space-y-1 text-slate">
                {cat.requirements.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span aria-hidden>•</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[21px] font-bold">
                Zo verloopt de opleiding
              </h2>
              <ol className="mt-4 space-y-4">
                {cat.steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[35.8px] bg-pale-lilac font-bold text-vivid-indigo">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-bold">{s.title}</p>
                      <p className="text-slate">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-[14px] text-slate">
                De theorie bereidt je voor, maar vervangt het officiële
                CBR-examen niet.{" "}
                <a
                  href="/theorie"
                  className="font-bold text-vivid-indigo underline"
                >
                  Lees meer over theorie en CBR
                </a>
                .
              </p>
            </div>
          </div>

          <aside className="h-fit rounded-[15.2px] border border-slate bg-pure-white p-[19px] lg:sticky lg:top-20">
            <IndicativeBadge />
            <p className="mt-3 text-[34px] font-bold leading-none">
              {cat.priceLabel}
            </p>
            <p className="mt-1 text-[14px] text-slate">{cat.priceBasis}</p>
            <p className="mt-4 text-[13px] text-slate">{priceDisclaimer}</p>
            <ButtonLink
              href={`/reserveren?categorie=${cat.slug}`}
              className="mt-5 w-full"
            >
              Aanvraag sturen
            </ButtonLink>
          </aside>
        </div>
      </Section>

      {cat.priceRows && (
        <Section
          title="Prijsoverzicht"
          intro="Richtprijzen voor rijbewijs T. Het uiteindelijke bedrag hangt af van je niveau en het aantal lessen."
        >
          <div className="overflow-x-auto rounded-[15.2px] border border-slate">
            <table className="w-full min-w-[420px] text-left">
              <caption className="sr-only">
                Richtprijzen rijbewijs {cat.code}
              </caption>
              <tbody className="divide-y divide-fog/50">
                {cat.priceRows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="px-[19px] py-3 font-medium">
                      {r.label}
                    </th>
                    <td className="px-[19px] py-3 text-right font-bold">
                      {r.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      <Section
        tone={cat.priceRows ? "gray" : "white"}
        title="Pakketten en opties"
        intro="Vraag welke lessen en opties beschikbaar zijn voor dit rijbewijs. We bespreken het traject en de kosten met je."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pkgs.map((p) => (
            <PackageCard key={p.slug} pkg={p} />
          ))}
        </div>
        {pkgs.length === 0 && (
          <ButtonLink href={`/reserveren?categorie=${cat.slug}`}>
            Vraag naar de mogelijkheden
          </ButtonLink>
        )}
      </Section>

      <Section
        tone={cat.priceRows ? "white" : "gray"}
        title="Veelgestelde vragen"
      >
        <div className="max-w-3xl">
          <Accordion items={cat.faq} />
        </div>
      </Section>
      <CtaBand />
    </main>
  );
}
