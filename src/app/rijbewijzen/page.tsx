import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { CategoryCard } from "@/components/category/CategoryCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { licenseCategories } from "@/data/license-categories";
import { priceDisclaimer } from "@/data/site";

export const metadata: Metadata = {
  title: "Rijbewijzen",
  description:
    "Bekijk alle rijbewijscategorieën bij Stuurvast Rijschool: AM, A, B, BE, C, D en T, met richtprijzen.",
};

export default function RijbewijzenPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Rijbewijzen"
        image={{
          src: "/images/categories.webp",
          alt: "Verschillende voertuigen op een rustig oefenterrein voor rijopleidingen",
        }}
        title="Kies het rijbewijs dat bij je past"
        intro="Zeven categorieën, één duidelijk overzicht. Klik op een categorie voor voertuigen, voorwaarden en het verloop van de opleiding."
      />
      <Section tone="gray">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {licenseCategories.map((c) => (
            <CategoryCard key={c.slug} cat={c} />
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-[14px] text-slate">
          {priceDisclaimer}
        </p>
      </Section>
      <CtaBand />
    </main>
  );
}
