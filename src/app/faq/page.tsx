import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/ui/CtaBand";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "Veelgestelde vragen",
  description:
    "Antwoorden op de meest gestelde vragen over lessen, pakketten, theorie, aanvragen en examens bij Stuurvast Rijschool.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <main>
      <PageHeader
        eyebrow="FAQ"
        image={{
          src: "/images/faq.webp",
          alt: "Illustratief beeld van een rijlesgesprek met notities en verkeersmateriaal",
        }}
        title="Veelgestelde vragen"
        intro="Staat je vraag er niet bij? Stuur ons een bericht."
      />
      <Section tone="gray">
        <div className="max-w-3xl">
          <Accordion items={faq} />
        </div>
      </Section>
      <CtaBand
        title="Nog een vraag?"
        text="We beantwoorden je vraag graag persoonlijk."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
