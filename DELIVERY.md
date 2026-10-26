# Livraison Stuurvast — 9 octobre 2026

## Éléments présents

Catalogue de sept catégories et pages détaillées, cinq offres, demande, contact, théorie, à propos, instructeurs en attente de profils, neuf questions FAQ, textes légaux provisoires, 404, récapitulatif, pages de paiement et trois endpoints serveur.

## Refonte visuelle de l'accueil

Hero avec grande image, cinq visuels d'ambiance locaux en WebP et sept sections : introduction, découverte des permis, déroulement, théorie, possibilités de formation, confiance et contact. L'accueil oriente vers les pages dédiées sans prix, liste exhaustive des permis ou lien d'achat direct. Le catalogue conserve les sept catégories, descriptions et tarifs. Catalogue, théorie et À propos disposent aussi d'une ouverture illustrée. Les images générées sont des illustrations, pas la flotte ni l'équipe réelle ; prompts et provenance dans `public/images/PROVENANCE.md`.

Liens du header visibles directement sur ordinateur et tablette, menu mobile accessible au clavier ; FAQ ajoutée. Captures desktop/mobile vérifiées dans `artifacts/`.

## À fournir ou valider avant publication commerciale

- Logo final, domaine, adresse, téléphone, e-mail, KvK et zone desservie.
- Catégories couvertes par chaque forfait et prix contractuels ; `categorySlugs` reste vide en attendant confirmation.
- Relecture néerlandaise par un locuteur natif ; validation juridique néerlandaise des textes, annulations et remboursements.
- Compte Stripe test, webhook signé, Resend avec expéditeur vérifié, Upstash Redis. Configurer les secrets directement dans `.env.local` ou l'hébergeur, jamais dans le chat.
- Paiement test complet, paiement différé, annulation, réception réelle des e-mails, événement rejoué et notification échouée suivie d'une nouvelle tentative.
- Hébergement et domaine, sauvegarde/versionnement, activation live seulement après validation.

## Contenus réglementaires

AM : correction de l'exigence de déclaration de santé ; B : âge des leçons, examen et conduite accompagnée ; T : âge des examens. Références consultées :

- https://www.rijksoverheid.nl/vraag-en-antwoord/rijbewijs/wanneer-gezondheidsverklaring-of-medische-keuring-rijbewijs
- https://www.rijksoverheid.nl/vraag-en-antwoord/rijbewijs/wanneer-mag-ik-rijles-nemen-en-rijexamen-doen-voor-mijn-autorijbewijs
- https://www.rijksoverheid.nl/vraag-en-antwoord/rijbewijs/rijbewijs-tractor-of-trekker

Ces corrections ne constituent pas une validation exhaustive de toutes les conditions A, BE, C et D. Les prix de marché proviennent du cahier des charges, pas d'une étude de marché actualisée.

## Vérification

- Build de production réussi : 32 pages générées avec Next.js 16.4.0.
- TypeScript : aucun diagnostic.
- 16 tests serveur/e-mails réussis : prix serveur, consentements, erreurs, signatures, paiement différé, retries, concurrence et idempotence.
- Après la refonte visuelle initiale : build de production et TypeScript réussis ; 9 scénarios navigateur réussis dans un même passage. Après l'allègement de l'accueil : nouveau build et TypeScript réussis, 3 scénarios ciblés réussis (responsive, images/navigation/absence de montants ou de liens d'achat, accessibilité). Captures ordinateur/mobile vérifiées ; contrôle navigateur séparé confirmant les sept catégories et tarifs sur le catalogue.
- 21 routes publiques/commande/résultat contrôlées, plus la 404.
- Absence de débordement horizontal sur 6 pages à 320, 390, 768, 1024 et 1440 px.
- Contrôle Axe WCAG A/AA sur accueil, FAQ, demande et commande : aucune violation détectée. Cela ne remplace pas un audit manuel exhaustif.
- npm audit et npm audit --omit=dev : aucune vulnérabilité signalée.
- Les API du build sans Redis répondent 503, sans simuler un succès. Les tests serveur isolés couvrent les validations et envois avec services simulés.

Les tests de paiement et d'e-mails simulent Stripe, Redis et Resend. Ils ne confirment pas l'état d'un compte externe ou la réception d'un vrai e-mail. Les tests navigateur simulent uniquement les réponses d'envoi dans le scénario d'état visuel ; les routes serveur sont testées séparément.

La première tentative navigateur utilisait un port déjà occupé par Braviko ; ses résultats sont exclus. Les vérifications Vooruit utilisent exclusivement le port 3187.

La compilation à froid en mode développement WebAssembly dépassait le délai initial des tests ; le délai a été ajusté et les validations finales ont été réalisées sur le build de production.
