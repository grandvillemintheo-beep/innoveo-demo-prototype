# Synthèse des tests utilisateurs sur les maquettes haute fidélité

Les maquettes Figma ont été testées entre le 2 et le 5 avril 2024 auprès de vingt personnes
réparties sur les quatre personas cibles. Chaque session (45 minutes) a été enregistrée et
les verbatims anonymisés sont disponibles sur le drive projet.

## Participants
- **SOC Manager (5)** : profils issus de centres de supervision multi-sites.
- **Directeur Business (5)** : utilisateurs des rapports ROI et recommandations smart apps.
- **Responsable Sécurité Locale (5)** : utilisateurs du cockpit de site et du module incidents.
- **Technicien Maintenance (5)** : utilisateurs de l’application mobile terrain.

## Principaux enseignements
1. **Lisibilité du dashboard SOC** : la juxtaposition timeline/flux vidéo est bien comprise,
   mais 3 participants souhaitent un filtre de sévérité accessible au clavier.
2. **Cockpit Business** : la section « Insights IA » est jugée utile, à condition d’ajouter la
   source des données et la date de mise à jour ; action intégrée au backlog Sprint 1.
3. **Configuration du manager local** : la personnalisation par glisser-déposer fonctionne,
   mais 4 tests réclament un verrouillage de la grille pour éviter les placements libres.
4. **Application mobile maintenance** : la checklist est adoptée, mais l’étape de scan QR code
   doit être facultative lorsque l’équipement n’est pas tagué (ticket ouvert dans Sprint 1).
5. **Accessibilité** : contraste des badges d’alerte jugé trop faible par 6 participants ; un
   ajustement dans le design system est planifié avant développement UI.

## Actions décidées
- Ajout d’un filtre de criticité et d’un raccourci clavier pour le dashboard SOC.
- Mention explicite de la source et de la fraîcheur des données dans le widget Insights IA.
- Grille magnétique et points d’ancrage pour la personnalisation locale.
- Mode « saisie manuelle » de l’identifiant équipement dans le flux mobile.
- Mise à jour des tokens de couleur (WCAG AA) dans le design system.

Ces décisions ont été intégrées aux user stories correspondantes du backlog Sprint 1 et aux
critères d’acceptation détaillés.
