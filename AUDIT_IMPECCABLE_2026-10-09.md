# Audit Impeccable — Stuurvast Rijschool

Date : 9 octobre 2026  
Surface : application web complète, serveur local `http://localhost:3187`

## Résultat exécuté

- Détecteur Impeccable sur `src/app` et `src/components` : `[]`, aucun anti-pattern déterministe remonté.
- `npm run typecheck` : réussi.
- `npm test -- --run` : 13 tests réussis.
- Routes publiques vérifiées : `/`, `/rijbewijzen`, `/rijbewijzen/b`, `/pakketten`, `/theorie`, `/over-ons`, `/instructeurs`, `/contact`, `/faq`, `/privacy`, `/algemene-voorwaarden`, `/reserveren` : toutes en HTTP 200.

## Score technique

| Dimension | Score | Lecture |
|---|---:|---|
| Accessibilité | 3/4 | Labels, focus visible, landmarks et réduction du mouvement présents ; une vérification navigateur clavier complète reste à faire. |
| Performance | 3/4 | Images servies avec `next/image`, hero préchargé, animations légères ; le traducteur client ajoute une observation DOM globale. |
| Theming | 3/4 | Tokens centraux cohérents ; quelques couleurs d'état restent écrites en dur dans les composants. |
| Responsive | 3/4 | Breakpoints mobile/tablette/desktop présents et menu mobile accessible ; capture visuelle réelle sur plusieurs appareils encore à effectuer. |
| Intégrité | 4/4 | Détecteur sans résultat et système visuel cohérent avec l'auto-école. |
| **Total** | **16/20** | **Bon, avec une passe de finition recommandée.** |

## Points à traiter

### P1 — Traduction éditoriale complète

La mécanique du sélecteur fonctionne globalement côté client, mais les longs paragraphes qui ne figurent pas encore dans le dictionnaire restent en néerlandais. Il faut compléter les traductions éditoriales page par page avant de présenter le multilingue comme intégral.

### P2 — Audit visuel mobile

Les images locales existent et répondent correctement, mais leur cadrage doit être revu sur les petits écrans : les blocs portrait de la section catégories et les cartes FAQ/contact doivent conserver un sujet lisible sans écraser le texte.

### P2 — Système de couleur

La palette est cohérente. Les valeurs d'hover écrites en dur doivent être regroupées dans les tokens si elles sont conservées après la passe Impeccable.

### P3 — Finition typographique et icônes

Inter fonctionne et reste lisible. Une passe `typeset` peut améliorer les contrastes de tailles et les retours à la ligne ; les icônes Radix doivent rester réservées aux actions et ne pas remplacer des illustrations utiles.

## Ordre recommandé des prochaines commandes

1. `adapt` — vérifier le cadrage et l'espacement sur mobile.
2. `typeset` — calibrer la hiérarchie et les retours à la ligne.
3. `layout` — corriger les rythmes de sections et les cartes.
4. `animate` — garder uniquement les mouvements qui expliquent une transition.
5. `polish` — passe finale après les corrections.

## Limite de preuve

Le serveur et le code ont été vérifiés dans cette session. La capture navigateur multi-viewport n'a pas pu être produite par l'outil de contrôle disponible ; le score responsive doit donc être confirmé par une passe visuelle mobile, tablette et desktop.
