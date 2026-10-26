# Stuurvast — système visuel

Site d'auto-école néerlandais : clair, sobre, rassurant, mobile-first. Conserver les tokens Shortcut ; l'accueil privilégie désormais des scènes de conduite et une hiérarchie éditoriale plus marquée.

- Accent d'action : indigo `#494bcb` ; texte sombre `#08093f`.
- Fond blanc et sections gris léger `#f6f6fa`.
- Inter, suivi des lettres `-0.02em`.
- Rayons 7.6 / 15.2 / 35.8 px ; bordures fines ; aucune ombre.
- Boutons et FAQ : composants officiels shadcn/ui adaptés, primitives Radix, icônes Radix.
- Focus clavier visible, contenu accessible, respect de `prefers-reduced-motion`.
- Pas d'avis, de profils, de chiffres de réussite ou d'historique inventés.

Accueil : hero texte/image, section illustrée invitant à découvrir les permis, parcours de formation illustré, théorie illustrée, invitation à découvrir les possibilités de formation, confiance et contact. Aucun prix, liste exhaustive de catégories ou lien d'achat direct sur l'accueil. Catégories, descriptions et tarifs restent sur les pages dédiées. Images également présentes en ouverture du catalogue, de la théorie et de la page À propos.

Cinq visuels d'ambiance générés avec ImageGen, compressés en WebP et servis localement par Next Image. Ils ne représentent pas la flotte ou l'équipe réelle. Provenance et prompts : `public/images/PROVENANCE.md`. Hero préchargé ; images des sections chargées à la demande. Navigation complète affichée directement sur ordinateur et tablette ; menu déroulant sur mobile, avec FAQ et demande.

Réglages retenus : variance 4, mouvement 2, densité 4. Le contraste clair/sombre existant pour les sections de confiance et le footer est conservé conformément à la direction déjà choisie.
