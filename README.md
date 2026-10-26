# Stuurvast Rijschool

Site public (Next.js 16, React 19, App Router, Tailwind v4, shadcn/ui et Radix) pour une auto-école à Utrecht, en néerlandais.

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis remplir Stripe (mode test) et Resend
npm run dev
```

Sans clés, les pages sont consultables ; les formulaires et le paiement affichent une erreur explicite lorsque le service manque. Aucun succès d'envoi fictif n'est affiché aux visiteurs.

```powershell
Copy-Item .env.example .env.local
npm run typecheck
npm test
npm run test:e2e
npm run build
```

Les tests navigateur utilisent Microsoft Edge sur le port 3187, exclusivement réservé à Vooruit pendant les tests. Le serveur de prévisualisation peut utiliser `npm run dev -- --port 3187`.

Pour tester le build de production après `npm run build` : `$env:E2E_PRODUCTION = '1'; npm run test:e2e`. Sans ce réglage, les tests lancent le serveur de développement.

Sur Windows, `scripts/next-runtime.mjs` charge le compilateur WASM fourni par Next.js pour éviter le module natif bloqué par la politique de contrôle d'application. Next et le paquet WASM sont épinglés à la même version ; les variables internes utilisées par Next doivent être revérifiées lors de leur mise à jour. Sur les autres systèmes, le compilateur normal est utilisé. Inter est servi localement par `@fontsource/inter`.

## Où modifier quoi

- `src/data/site.ts` : coordonnées, zone desservie, horaires (vide tant que non fournis)
- `src/data/packages.ts` : offres, prix en centimes, `payable: true|false` (payer en ligne ou demande)
- `src/data/license-categories.ts` : les 7 catégories et leurs pages détaillées
- `src/data/faq.ts`, `src/data/instructors.ts` : FAQ et instructeurs (liste vide = état temporaire)

## Stripe

Le prix est toujours lu côté serveur (`/api/checkout`). Ajouter dans le dashboard Stripe un webhook vers
`/api/stripe/webhook` (événements `checkout.session.completed` et `checkout.session.async_payment_succeeded`),
puis configurer son secret dans `STRIPE_WEBHOOK_SECRET`. Les moyens de paiement disponibles sont gérés dans Stripe, dont iDEAL si activé pour le compte.

Configurer également Resend (domaine d'expédition vérifié) et une base Upstash Redis (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`). Redis porte la limitation anti-spam partagée, le verrou de traitement des paiements et les marqueurs persistants d'e-mails envoyés. Une notification échouée renvoie 503 au webhook pour permettre une nouvelle tentative Stripe. Les marqueurs ne contiennent pas les coordonnées du client.

Les clés de paiement réelles sont refusées tant que `STRIPE_LIVE_ENABLED`, `BUSINESS_DETAILS_VERIFIED` et `PACKAGE_PRICES_VERIFIED` ne sont pas tous à `true`. Les données structurées locales attendent `BUSINESS_DETAILS_VERIFIED=true`.

Les associations forfait/catégorie sont contrôlées par `categorySlugs` dans `src/data/packages.ts`. Aucune association non confirmée ne déclenche d'offre chiffrée sur une page de catégorie ; le visiteur peut envoyer une demande.

## À faire avant la mise en ligne

- Relecture des textes néerlandais par un locuteur natif
- Validation juridique de `/privacy` et `/algemene-voorwaarden`
- Vérifier les conditions d'accès par permis (âges, etc.) auprès du CBR/RDW
- Logo final (bloc dans `Navbar.tsx`), domaine, Stripe en production, commande test complète
- Configurer Upstash Redis pour les formulaires en production et les webhooks Stripe
- Confirmer les catégories couvertes par chaque forfait et remplir `categorySlugs`
- Faire un vrai test Stripe test + réception des quatre e-mails ; les tests automatisés simulent les fournisseurs

Voir `DELIVERY.md` pour les limites de validation et les éléments restant à fournir.

## Design

Système Shortcut (indigo #494bcb / midnight #08093f), tokens dans `src/app/globals.css`. Police Inter
(substitut de Satoshi). Pas d'ombres, bordures 1px, radius 7.6 / 15.2 / 35.8px.
