# Routes

- `/` : accueil.
- `/rijbewijzen` : catalogue.
- `/rijbewijzen/am`, `/a`, `/b`, `/be`, `/c`, `/d`, `/t` sous `/rijbewijzen` : pages détaillées.
- `/pakketten` : cinq offres.
- `/bestellen/[slug]` : récapitulatif et formulaire avant Stripe.
- `/reserveren` : demande, avec présélection facultative de catégorie et forfait.
- `/theorie`, `/over-ons`, `/instructeurs`, `/contact`, `/faq` : information et contact.
- `/privacy`, `/algemene-voorwaarden` : textes provisoires à valider.
- `/betaling/succes`, `/betaling/annule`, `/betaling/fout` : résultat du paiement.
- Route inconnue : 404.
- `/sitemap.xml`, `/robots.txt`, `/icon.svg` : découverte et identité provisoire.
- POST `/api/aanvraag`, `/api/checkout`, `/api/stripe/webhook` : serveur.

Les pages de commande et de paiement ne sont pas indexables. Les query strings ne transportent pas les coordonnées du visiteur.
