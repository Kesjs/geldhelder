import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { RequestForm } from "@/components/forms/RequestForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Stuurvast Rijschool in Utrecht: telefoon, e-mail, adres of het contactformulier.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        image={{
          src: "/images/contact.webp",
          alt: "Illustratief beeld van een telefoon, notitieboek en autosleutels op een bureau",
        }}
        title="Neem contact met ons op"
        intro="Bel, mail of stuur een bericht. We reageren zo snel mogelijk."
      />
      <section className="bg-frost-gray py-12">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-4 lg:grid-cols-[360px_1fr]">
          <div className="h-fit space-y-5 rounded-[15.2px] border border-slate bg-pure-white p-6">
            <div>
              <h2 className="font-bold">Telefoon</h2>
              <a href={site.phoneHref} className="text-vivid-indigo underline">
                {site.phone}
              </a>
            </div>
            <div>
              <h2 className="font-bold">E-mail</h2>
              <a href={site.emailHref} className="text-vivid-indigo underline">
                {site.email}
              </a>
            </div>
            <div>
              <h2 className="font-bold">Adres</h2>
              <address className="not-italic text-slate">
                {site.street}
                <br />
                {site.postalCode} {site.city}
              </address>
            </div>
            <div>
              <h2 className="font-bold">Werkgebied</h2>
              <p className="text-slate">{site.serviceArea}</p>
            </div>
            {site.hours.length > 0 && (
              <div>
                <h2 className="font-bold">Openingstijden</h2>
                <dl className="text-slate">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4">
                      <dt>{h.days}</dt>
                      <dd>{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            <p className="border-t border-fog/50 pt-4 text-[13px] text-slate">
              KvK {site.kvk}
            </p>
          </div>
          <div className="rounded-[15.2px] border border-slate bg-pure-white p-6">
            <h2 className="mb-5 text-[21px] font-bold">Stuur een bericht</h2>
            <RequestForm variant="contact" />
          </div>
        </div>
      </section>
    </main>
  );
}
