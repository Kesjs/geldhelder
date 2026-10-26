import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { RequestForm } from "@/components/forms/RequestForm";
import { getCategory } from "@/data/license-categories";
import { getPackage } from "@/data/packages";

export const metadata: Metadata = {
  title: "Aanvraag sturen",
  description:
    "Stuur een aanvraag voor rijlessen bij Stuurvast Rijschool. We nemen zo snel mogelijk contact met je op.",
};

export default async function ReserverenPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string; pakket?: string }>;
}) {
  const sp = await searchParams;
  const cat = sp.categorie
    ? getCategory(sp.categorie.toLowerCase())
    : undefined;
  const pkg = sp.pakket ? getPackage(sp.pakket) : undefined;

  return (
    <main>
      <PageHeader
        eyebrow="Aanvraag"
        image={{
          src: "/images/contact.webp",
          alt: "Sleutels en notitieboek voor het plannen van rijlessen",
        }}
        title="Vertel ons wat je zoekt"
        intro="Dit is een aanvraag, geen bevestigde reservering. We nemen contact met je op om het vervolg af te spreken."
      />
      <section className="bg-frost-gray py-12 md:py-16">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <aside className="rounded-[15.2px] border border-fog/60 bg-pure-white p-6 lg:sticky lg:top-24">
            <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-vivid-indigo">Zo werkt het</p>
            <h2 className="mt-3 text-[24px] font-bold leading-tight">Van aanvraag naar eerste les</h2>
            <ol className="mt-6 space-y-5 text-[15px] text-slate">
              <li className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pale-lilac font-bold text-vivid-indigo">1</span><span>Vertel kort wat je nodig hebt en wanneer je wilt starten.</span></li>
              <li className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pale-lilac font-bold text-vivid-indigo">2</span><span>We beantwoorden je aanvraag en stemmen beschikbaarheid af.</span></li>
              <li className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pale-lilac font-bold text-vivid-indigo">3</span><span>Na akkoord plannen we je lessen samen in.</span></li>
            </ol>
          </aside>
          <div className="rounded-[15.2px] border border-fog/60 bg-pure-white p-6 md:p-8">
            <RequestForm
              variant="reservering"
              defaultCategory={cat?.code ?? ""}
              defaultPackage={pkg?.name ?? ""}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
