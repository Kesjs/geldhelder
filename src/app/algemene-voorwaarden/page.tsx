import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/Prose";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description: "De algemene voorwaarden van Stuurvast Rijschool.",
};

export default function VoorwaardenPage() {
  return (
    <LegalPage title="Algemene voorwaarden" updated="oktober 2026">
      <h2>Wie zijn wij?</h2>
      <p>
        {site.name}, {site.address}, e-mail {site.email}.
      </p>
      <h2>Aanbod en prijzen</h2>
      <p>
        De prijzen van onze pakketten zijn in euro en inclusief btw. Prijzen per
        rijbewijs op de site zijn richtprijzen en geen aanbod. Het uiteindelijke
        bedrag hangt af van je niveau en het aantal lessen.
      </p>
      <h2>Wat je koopt</h2>
      <p>
        Je koopt rijlessen en bijbehorende diensten. Stuurvast verkoopt geen
        rijbewijs en kan het slagen voor een examen niet garanderen. Examens en
        de uitgifte van het rijbewijs lopen via het CBR en de gemeente.
      </p>
      <h2>Aanvraag en planning</h2>
      <p>
        Een aanvraag via de website is geen definitieve reservering. Na ontvangst
        van je formulier nemen wij contact met je op om de lessen, planning en
        betalingsafspraken te bevestigen.
      </p>
      <h2>Annuleren en restitutie</h2>
      <p>
        Annuleren en herroepen is mogelijk volgens de wet. Lessen die al zijn
        gevolgd, worden in rekening gebracht. Neem voor een annulering contact
        met ons op via {site.email}.
      </p>
      <h2>Aansprakelijkheid</h2>
      <p>
        Stuurvast is niet aansprakelijk voor schade die voortvloeit uit
        omstandigheden buiten onze invloed, behalve voor zover de wet dit
        toelaat.
      </p>
      <h2>Klachten</h2>
      <p>
        Heb je een klacht? Mail ons met je naam, datum en een korte
        omschrijving. We bevestigen je bericht en reageren zo snel mogelijk.
      </p>
      <h2>Planning en uitvoering</h2>
      <p>
        Lessen worden in overleg gepland. We kunnen een les verplaatsen wanneer
        dat tijdig wordt afgesproken of wanneer veiligheid, ziekte of overmacht
        dat nodig maakt. De instructeur bepaalt altijd of een les veilig kan
        doorgaan. Het CBR bepaalt zelfstandig de regels voor theorie- en
        praktijkexamens.
      </p>
      <h2>Toepasselijk recht</h2>
      <p>
        Op deze voorwaarden is Nederlands recht van toepassing. Deze tekst is
        een algemene publicatie en moet vóór livegang worden gecontroleerd met
        de definitieve bedrijfsgegevens en actuele Nederlandse
        consumentenregels.
      </p>
    </LegalPage>
  );
}
