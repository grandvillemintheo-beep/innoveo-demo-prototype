# ADR 0002 — Stratégie de persistance et gouvernance des données

- **Statut** : Acceptée
- **Date** : 2024-04-08
- **Décideurs** : Data Lead, Architecte Solution, Responsable Sécurité

## Contexte
La plateforme agrège des événements provenant de capteurs sécurité, des interactions
utilisateur et des recommandations IA. Nous devons concilier une consultation rapide depuis
le cockpit et la traçabilité nécessaire aux audits de conformité.

## Décision
- Conserver un **schéma relationnel PostgreSQL** pour l’application transactionnelle
  (contenus, comptes, scénarios Sandbox) géré via TypeORM.
- Aligner les événements haute fréquence (alertes, interactions hotspots) sur un **pipeline
  Kafka -> Data Lake (object storage)** avec compactage quotidien.
- Mettre en place une **classification des données** (Public / Interne / Sensible) stockée en
  métadonnées et contrôlée via les policies PostgreSQL RLS.
- Fournir des **vues matérialisées** pour le cockpit business afin de garantir des temps de
  réponse sous 500 ms sur les KPI clés.

## Conséquences
- Les user stories Back-office incluent des tâches de création de policies RLS et de tests
  d’autorisations.
- La roadmap Data prévoit l’industrialisation des pipelines Kafka et la synchronisation vers le
  Data Lake dès le Sprint 2.
- Les KPI d’adoption intègrent désormais un suivi de la fraîcheur des données (SLA de 5 minutes).
