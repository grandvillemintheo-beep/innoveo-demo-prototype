# KPI de suivi projet et produit

| Domaine | KPI | Définition | Cible Sprint 1 | Source |
|---------|-----|------------|----------------|--------|
| Delivery | Vélocité | Nombre de points livrés vs engagés | 85 % | Jira Board |
| Delivery | Lead time | Temps entre « In progress » et « Done » | < 5 jours | Jira + Tempo |
| Qualité | Couverture de tests back | % lignes couvertes module auth | > 80 % | Jest coverage |
| Qualité | Couverture de tests front | % statements sur parcours auth | > 70 % | Vitest coverage |
| Qualité | Taux de réussite pipeline | % jobs CI verts sur 7 jours | 100 % | GitHub Actions |
| Produit | Adoption Sandbox | Sessions uniques Sandbox / semaine | 50 | Mixpanel |
| Produit | Satisfaction tests utilisateurs | Score SUS moyen | > 80 | Tests utilisateurs | 
| Produit | Fraîcheur des insights | Temps moyen de rafraîchissement | < 5 min | Data pipeline |
| Support | MTTR incident | Temps de résolution des incidents P1 | < 4 h | PagerDuty |

## Méthodologie
- Les KPI Delivery et Qualité sont suivis hebdomadairement pendant le stand-up élargi.
- Les KPI Produit sont analysés en revue de sprint pour valider l’adéquation aux besoins client.
- Un tableau de bord Looker Studio agrégera les données (Jira, GitHub, Mixpanel) avec une mise à
  jour quotidienne automatisée.
- Les écarts >10 % par rapport aux cibles déclenchent un plan d’action présenté en comité projet.
