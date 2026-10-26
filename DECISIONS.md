# Décisions

- Néerlandais uniquement, devise euro, aucun avis ou résultat inventé.
- Direction Shortcut existante conservée, boutons et FAQ appuyés sur shadcn/ui et Radix.
- Resend pour les quatre confirmations/notifications. Upstash Redis pour limitation partagée et état durable du traitement.
- Prix de paiement lu côté serveur et enregistré dans les métadonnées signées de la session Stripe.
- Une erreur de notification de paiement laisse Stripe réessayer ; aucune confirmation complète n'est enregistrée avant succès des envois.
- Les offres par catégorie restent sur demande tant que les associations ne sont pas confirmées.
- Paiement live désactivé par défaut ; détails de l'entreprise et prix contractuels à valider.
- Next.js 16.4.0 et React 19 ; compilateur WASM sous Windows et Webpack pour la compatibilité de ce poste.
- Les validations natives de langue/juridique et le test réel des fournisseurs ne sont pas remplacés par les tests logiciels.
