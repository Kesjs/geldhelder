import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/Prose";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: "Hoe Stuurvast Rijschool omgaat met je persoonsgegevens.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacybeleid" updated="oktober 2026">
      <p>
        Dit privacybeleid legt uit hoe {site.name} omgaat met persoonsgegevens
          wanneer je de website bezoekt of een aanvraag verstuurt. Verantwoordelijke:
          {site.name}, {site.address}, {site.email}.
      </p>
      <h2>Welke gegevens verwerken we?</h2>
      <ul>
        <li>
          Naam, e-mailadres en telefoonnummer die je invult in een formulier.
        </li>
        <li>De inhoud van je bericht en je gekozen rijbewijs of pakket.</li>
        <li>
          Technische gegevens die nodig zijn om de website veilig te laten
          werken, zoals serverlogs.
        </li>
      </ul>
      <h2>Waarvoor gebruiken we ze?</h2>
      <p>
        We gebruiken deze gegevens om je aanvraag af te handelen, contact met je
        op te nemen, fraude en misbruik te voorkomen en onze wettelijke
        verplichtingen na te komen. We gebruiken
        je gegevens niet voor een ander doel zonder dat daar een passende
        grondslag voor is.
      </p>
      <h2>Grondslag</h2>
      <p>
        De verwerking is nodig om je aanvraag of overeenkomst uit te voeren, om
        aan wettelijke verplichtingen te voldoen of op basis van ons
        gerechtvaardigd belang bij een veilige en goed werkende website. Waar
        toestemming nodig is, vragen we die afzonderlijk.
      </p>
      <h2>Met wie delen we ze?</h2>
      <p>
        Alleen met partijen die we nodig hebben: Resend of een vergelijkbare
        e-maildienst voor berichten en onze hosting- en
        opslagleveranciers. Deze partijen verwerken gegevens alleen voor de
        afgesproken dienst. We verkopen je gegevens niet.
      </p>
      <h2>Hoe lang bewaren we ze?</h2>
      <p>
        Niet langer dan nodig voor het doel en zolang de wet dat vereist.
        Gegevens voor de financiële administratie bewaren we zolang de fiscale
        bewaarplicht geldt. Aanvragen zonder overeenkomst worden verwijderd
        zodra ze niet meer nodig zijn voor opvolging of bewijs.
      </p>
      <h2>Je rechten</h2>
      <p>
        Je kunt je gegevens inzien, laten verbeteren of laten verwijderen, de
        verwerking laten beperken en bezwaar maken. Mail ons op{" "}
        <a href={site.emailHref} className="text-vivid-indigo underline">
          {site.email}
        </a>
        . Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.
      </p>
      <h2>Cookies</h2>
      <p>
        De website gebruikt functionele technieken die nodig zijn voor de
        werking van formulieren en beveiliging. Tracking- en advertentiecookies
        worden niet geplaatst zonder de vereiste toestemming.
      </p>
      <h2>Wijzigingen en vragen</h2>
      <p>
        We kunnen dit beleid aanpassen wanneer onze werkwijze of de wet
        verandert. De datum bovenaan laat zien wanneer de tekst voor het laatst
        is bijgewerkt. Voor vragen kun je contact opnemen via {site.email}.
      </p>
    </LegalPage>
  );
}
