# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Personnes qui recherchent une auto-école à Utrecht et veulent comprendre les catégories de permis, les parcours de leçons et les prochaines étapes avant de contacter l'école.

## Product Purpose

Stuurvast Rijschool présente les formations de conduite, explique le parcours vers le permis et permet d'envoyer une demande personnalisée. Le site doit rendre le premier contact simple et rassurant ; une demande n'est pas une réservation confirmée.

## Positioning

Un parcours clair, avec des informations concrètes sur les catégories, les forfaits et la préparation, puis un contact humain pour confirmer la disponibilité et la planification.

## Operating Context

Le site est utilisé principalement sur mobile et desktop. Le visiteur consulte une catégorie ou un forfait, remplit le formulaire de demande et reçoit une confirmation par e-mail. L'équipe reprend ensuite la demande directement.

## Capabilities and Constraints

- Routes publiques pour l'accueil, les permis, les forfaits, la théorie, l'équipe, le contact, la FAQ et les pages légales.
- Formulaire de demande avec catégorie, forfait, coordonnées, message et consentement.
- Les demandes sont envoyées par e-mail ; aucun paiement en ligne n'est proposé dans le parcours actuel.
- Le site propose un sélecteur persistant en néerlandais, anglais, français, espagnol et italien.
- Le site doit rester responsive, utilisable au clavier et respecter `prefers-reduced-motion`.
- Les données d'entreprise, les images, les profils, les avis et les résultats ne doivent pas être inventés.

## Brand Commitments

- Nom affiché : Stuurvast Rijschool.
- Domaine : rijrouteutrecht.nl.
- Identité : logo Stuurvast avec symbole de route en forme de S, accent indigo `#494bcb` et midnight `#08093f`.
- Ton : clair, sobre, humain et rassurant.

## Evidence on Hand

- Logo : `public/brand/stuurvast-logo-mark.png`.
- Images locales et provenance : `public/images/PROVENANCE.md`.
- Coordonnées centralisées : `src/data/site.ts`.
- Pages et parcours implémentés dans `src/app` et `src/components`.
- Les profils d'instructeurs et certaines données commerciales détaillées peuvent rester en attente d'informations définitives.

## Product Principles

1. Expliquer le parcours avant de demander une action.
2. Donner des informations vérifiables et signaler les prix comme indicatifs quand nécessaire.
3. Garder le contact humain au centre de la demande.
4. Rendre chaque action claire au clavier, au toucher et sur petit écran.
5. Ne jamais remplacer une information manquante par une preuve inventée.

## Accessibility & Inclusion

Le site doit fonctionner sur mobile, tablette et desktop, avec navigation clavier, focus visible, contrastes lisibles, champs correctement étiquetés, messages d'erreur compréhensibles et réduction des animations lorsque l'utilisateur le demande.
