# Audit contenu, logique et vérifications

Date de l'audit : 9 octobre 2026

Référence fonctionnelle : `Vooruit-cahier-des-charges-complet (1).md`.

## Légende

- **Vérifié** : contrôlé dans le code ou par un test automatisé.
- **À confirmer** : le texte est présent et cohérent, mais sa vérité dépend d'une information métier, légale ou CBR.
- **Bloquant avant mise en ligne** : ne doit pas être présenté comme définitif.

## Identité et coordonnées

| Élément | État | Observation |
|---|---|---|
| Nom affiché | À confirmer | Le cahier indique « Vooruit Rijschool », tandis que le projet affiche « Stuurvast Rijschool ». Il faut choisir le nom officiel avant publication. |
| Adresse | À confirmer | `Stationsplein 12, 3511 ED Utrecht` vient du cahier, mais doit être confirmé par l'auto-école. |
| Téléphone | À confirmer | Le numéro du cahier est repris dans le projet. Il doit être vérifié avant activation des liens d'appel. |
| E-mail | À confirmer | Le projet utilise désormais `contact@rijrouteutrecht.nl`, à confirmer comme adresse officielle de réception. |
| KvK | Bloquant avant mise en ligne | `12345678` est une valeur de cadrage et ne doit pas rester si elle n'est pas le vrai numéro KvK. |
| Horaires | Bloquant avant mise en ligne | Aucun horaire n'est publié tant qu'ils ne sont pas confirmés. |

## Pages publiques

| Page | État de logique | État du contenu |
|---|---|---|
| Accueil | Vérifié pour le rendu, les liens et les images | À confirmer pour les promesses de service et les coordonnées. Les prix ne sont pas affichés sur l'accueil. |
| `/rijbewijzen` | Vérifié : 7 cartes et liens vers les détails | À confirmer : prix indicatifs, catégories réellement enseignées et zone desservie. |
| 7 pages de permis | Vérifié : données centralisées, parcours, FAQ et prix par catégorie | À confirmer avec le CBR/RDW : âges, sous-catégories, examens, déclaration de santé et conditions professionnelles. |
| `/pakketten` | Vérifié : 5 offres, affichage des conditions et orientation paiement/demande | Bloquant : les offres et associations par catégorie doivent être confirmées. Les montants sont des prix de cadrage. |
| `/theorie` | Vérifié : le texte distingue préparation et examen officiel | À confirmer : tout détail réglementaire doit rester aligné sur le CBR actuel. |
| `/over-ons` | Vérifié : contenu éditorial et liens | À confirmer : tout texte décrivant l'équipe, l'expérience ou la zone réelle. |
| `/instructeurs` | Vérifié : état temporaire sans faux profils | À compléter : vrais noms, photos, qualifications et disponibilités lorsque fournis. |
| `/contact` | Vérifié : formulaire, liens téléphone/e-mail et états d'erreur | À confirmer : coordonnées réelles et adresse de traitement des demandes. |
| `/faq` | Vérifié : accordéon, navigation clavier et données structurées FAQ | À relire : réponses néerlandaises et exactitude métier. |
| `/privacy` | Présente | Bloquant : validation juridique et ajout du vrai responsable de traitement, des outils utilisés et des durées de conservation. |
| `/algemene-voorwaarden` | Présente | Bloquant : validation juridique, identité de l'entreprise, modalités d'annulation et remboursement. |
| 404 | Vérifié : route dédiée présente | À relire en néerlandais. |

## Parcours commercial

| Élément | État |
|---|---|
| Validation client | Vérifié par le schéma Zod et les tests de formulaire. |
| Validation serveur | Vérifié : données invalides refusées par `/api/aanvraag` et `/api/checkout`. |
| Anti-spam | Vérifié dans le code : limitation de débit, honeypot et délai minimal. Le comportement réel dépend de la configuration du service de stockage. |
| Confirmation de demande | Partiellement vérifié : les e-mails sont prévus et testés avec des mocks. Il faut tester avec une vraie clé Resend et une vraie adresse. |
| Prix Stripe | Vérifié dans les tests : le prix vient du catalogue serveur, pas du navigateur. |
| Stripe réel | Non vérifié en production : les secrets, le mode test, les URLs et le compte Stripe restent à configurer. |
| Webhook | Vérifié par tests : signature, montant, idempotence et reprise après échec. Test réel Stripe encore nécessaire. |
| Supabase | Non connecté : le client et les variables sont préparés, mais aucune demande n'est encore enregistrée dans une vraie base. |

## Tests exécutés

- `npm run typecheck` : réussi.
- `npm run build` : réussi, routes générées.
- `npm test -- --run` : **16 tests réussis sur 16**.
- Test responsive Playwright déjà exécuté : réussi sur 320, 390, 768, 1024 et 1440 px.
- Tests visuels et E2E complets avec vrais services externes : pas encore une preuve de production.

## Décision avant publication

Le site est techniquement cohérent pour continuer le développement, mais il ne faut pas encore le présenter comme prêt à publier. Les validations prioritaires sont :

1. confirmer le nom officiel, les coordonnées et le KvK ;
2. confirmer chaque prix et l'offre applicable à chaque catégorie ;
3. faire relire le néerlandais ;
4. valider les pages légales ;
5. connecter Supabase et tester une vraie demande ;
6. configurer Stripe/Resend en mode test et réaliser une commande complète.

