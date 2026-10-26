# Architecture

Next.js App Router. Les contenus publics sont rendus côté serveur ; formulaires, navigation mobile et accordéons sont des composants clients isolés.

- `src/data/` : catégories, prix en centimes, forfaits, coordonnées, FAQ et profils.
- `/api/aanvraag` : validation Zod, honeypot, limitation partagée, envoi interne puis confirmation visiteur.
- `/api/checkout` : identifiant d'offre contrôlé, prix serveur, acceptation des conditions, clé d'idempotence, Stripe Checkout.
- `/api/stripe/webhook` : corps brut signé, état réellement payé, montant/devise contrôlés, verrou Redis et confirmations persistantes.
- Resend : échappement HTML, clés d'idempotence par message, aucune donnée personnelle dans les journaux.
- Upstash Redis : compteurs temporaires, verrous de 60 secondes, marqueurs de traitement conservés. Prévoir la politique de conservation opérationnelle avant production.

Pas d'admin, de comptes clients ou de calendrier en première version. Le site ne conserve aucune donnée bancaire. La source de vérité financière reste Stripe.

Les e-mails ne sont pas garantis livrés par une simple acceptation de Resend : vérifier leur réception réelle dans le test final. Resend conserve ses clés d'idempotence 24 heures ; les marqueurs Redis évitent les nouvelles tentatives après livraison connue, au-delà de cette durée.

Sources : https://docs.stripe.com/webhooks ; https://resend.com/docs/dashboard/emails/idempotency-keys ; https://ui.shadcn.com/docs/installation/manual.
