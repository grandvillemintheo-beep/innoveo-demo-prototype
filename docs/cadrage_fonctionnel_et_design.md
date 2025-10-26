# Cadrage fonctionnel et design – INNOVEO Demo

## 1. Objectifs du cadrage
- Donner une vision consolidée du périmètre MVP à développer pour la démo INNOVEO.
- Traduire les besoins métiers collectés auprès des parties prenantes en fonctionnalités actionnables.
- Aligner architecture fonctionnelle, technique et expérience utilisateur pour sécuriser les prochaines itérations de développement.

## 2. Parties prenantes et ateliers menés
| Groupe | Participants clés | Enjeux principaux | Livrables atelier |
| --- | --- | --- | --- |
| Sécurité (Smart Security Apps) | Responsable sûreté multi-sites, Opérateur SOC, Responsable cybersécurité | Supervision temps réel, centralisation des alertes, conformité | Backlog des scénarios d'alerte, matrice de criticité |
| Business (Smart Business Apps) | Directeur retail, Responsable opérations, Data analyste | Pilotage des KPIs de fréquentation et ventes, optimisation des ressources | Jeux de KPIs prioritaires, besoins de corrélation vidéo / data |
| End-User (Advanced End-User Apps) | Directeur d'agence, Manager site, Technicien maintenance | Autonomie locale, maintenance prédictive, personnalisation des dashboards | Parcours utilisateur détaillé, besoins offline & mobilité |

## 3. Personas cibles
1. **Sophie – Responsable Sécurité Groupe**
   - Objectifs : superviser l'ensemble des sites, détecter les incidents, garantir la conformité.
   - Douleurs : multiplicité d'outils, délai de réaction, manque de traçabilité.
   - KPI : temps moyen de détection (MTTD), temps de traitement (MTTR), taux d'alerte résolue.

2. **Karim – Directeur Opérations Retail**
   - Objectifs : optimiser l'expérience client, corréler trafic / ventes, piloter les campagnes.
   - Douleurs : absence de vision consolidée, données dispersées, manque de prévisionnel.
   - KPI : taux de conversion, panier moyen, temps d'attente, satisfaction client.

3. **Emma – Responsable de Site**
   - Objectifs : piloter localement la sécurité et l'activité, personnaliser ses dashboards.
   - Douleurs : dépendance au siège, difficulté à partager des informations contextuelles.
   - KPI : disponibilité des équipements, incidents ouverts/fermés, efficacité opérationnelle.

4. **Luis – Technicien Maintenance**
   - Objectifs : anticiper les pannes, intervenir efficacement, remonter les preuves d'action.
   - Douleurs : interventions réactives, manque de priorisation, absence d'historique consolidé.
   - KPI : taux de disponibilité, nombre d'incidents critiques évités, temps d'intervention.

## 4. Parcours utilisateurs clés (customer journeys)
### 4.1 Surveiller et traiter un incident de sécurité (Sophie)
1. Consultation du tableau de bord SOC consolidé.
2. Réception d'une alerte critique (détection IA) avec vidéo live et historique récent.
3. Analyse via lecture différée, déclenchement d'un scénario d'escalade (contact site + forces externes).
4. Clôture de l'incident avec rapport, horodatage et preuves vidéo.

### 4.2 Piloter l'activité business multi-sites (Karim)
1. Accès au dashboard Smart Business filtré par région / segment.
2. Analyse des KPIs (trafic, ventes, taux de conversion) et comparaison aux objectifs.
3. Exploration des corrélations (météo, événements, promotion en cours).
4. Création d'une action (ex. renfort personnel) et suivi via notifications.

### 4.3 Gestion locale personnalisée (Emma)
1. Connexion à MyANAVEO avec profil manager site.
2. Personnalisation du tableau de bord (widgets sécurité, business, maintenance).
3. Consultation des alertes ouvertes et planification des interventions.
4. Partage des insights avec le siège via exports et annotations.

### 4.4 Maintenance prédictive (Luis)
1. Réception d'une alerte de santé équipement (edge device, caméra) via mobile.
2. Visualisation de l'historique des incidents associés et des recommandations IA.
3. Planification de l'intervention et checklist guidée.
4. Validation post-intervention avec prise de photos / vidéos et clôture automatique dans le système.

## 5. Définition du périmètre MVP
| Domaine | Fonctionnalités MVP | Critères de succès |
| --- | --- | --- |
| Smart Security Apps | Dashboard SOC live + relecture, gestion des alertes critiques, escalade multi-canal, historique incidents | MTTD < 2 min, 95% alertes critiques avec preuve vidéo |
| Smart Business Apps | Dashboard KPIs multi-sites, corrélation trafic/vente, actions planifiées | Adoption par ≥80% des directeurs régionaux, satisfaction > 4/5 |
| Advanced End-User Apps | Personnalisation widgets, gestion utilisateurs multi-profil, notifications ciblées | Temps de configuration < 10 min, 90% des managers actifs mensuels |
| Maintenance & santé | Monitoring edge/caméras, alertes prédictives, journal d'intervention | Réduction 20% pannes critiques, 100% interventions tracées |

## 6. Story mapping et backlog priorisé
### 6.1 Epics et capabilities
1. **Surveillance centralisée**
   - Capabilities : agrégation flux vidéo, IA détection, orchestrations alertes.
2. **Pilotage business**
   - Capabilities : ingestion données retail, moteur analytics, dashboards comparatifs.
3. **Expérience utilisateur personnalisée**
   - Capabilities : configuration widgets, gestion profils, notifications intelligentes.
4. **Maintenance proactive**
   - Capabilities : monitoring IoT, moteur prédictif, gestion interventions.
5. **Fondations platform**
   - Capabilities : identité & SSO, sécurité, observabilité, API partenaires.

### 6.2 User stories MVP (top 10)
| ID | En tant que | Je veux | Afin de | Priorité |
| --- | --- | --- | --- | --- |
| US-SEC-01 | Responsable SOC | visualiser en temps réel les alertes critiques avec leur flux vidéo | réagir immédiatement | Must |
| US-SEC-02 | Responsable SOC | déclencher un scénario d'escalade préconfiguré | coordonner les équipes | Must |
| US-BIZ-01 | Directeur Ops | comparer les KPIs entre sites | identifier les sites en sous-performance | Must |
| US-BIZ-02 | Directeur Ops | créer une action corrective et suivre son statut | piloter les plans d'actions | Should |
| US-END-01 | Manager site | personnaliser mon dashboard avec des widgets | suivre mes priorités locales | Must |
| US-END-02 | Manager site | recevoir des notifications ciblées | être alerté en mobilité | Should |
| US-MNT-01 | Technicien | consulter l'état de santé des équipements | anticiper les pannes | Must |
| US-MNT-02 | Technicien | valider une intervention via checklist mobile | tracer mes actions | Should |
| US-PLT-01 | Admin | gérer les rôles utilisateurs avec MFA | sécuriser les accès | Must |
| US-PLT-02 | Partenaire IA | pousser des événements via External Event API | enrichir les scénarios | Could |

### 6.3 Roadmap MVP (3 sprints initiaux)
- **Sprint 1 – Fondations & SOC** : Authentification SSO/MFA, modèle de données alertes, dashboard SOC live minimal.
- **Sprint 2 – Business & Personnalisation** : Pipelines KPIs, widgets configurables, notifications basiques.
- **Sprint 3 – Maintenance & intégrations** : Monitoring edge, workflows d'intervention, ouverture External Event API.

## 7. Architecture cible (niveau C4)
### 7.1 Contexte (niveau 1)
- **Utilisateurs** : responsables sécurité, directeurs opérations, managers de site, techniciens, partenaires.
- **Système INNOVEO Demo** : plateforme cloud hybride fournissant dashboards, API, traitement vidéo/IA.
- **Systèmes externes** : ERP/CRM client, services météo/promotion, annuaires d'identité (Azure AD), partenaires IA.

### 7.2 Containers (niveau 2)
- **Front-end Web (React + TypeScript)** : interface MyANAVEO / INNOVEO Experience, widgets dynamiques, support desktop/tablette.
- **Mobile Companion (React Native)** : notifications push, consultation rapide, interventions maintenance.
- **API Gateway & BFF (NestJS)** : orchestrations, agrégation des données, adaptation par persona.
- **Microservices métier (Node.js / Python)** :
  - Service Sécurité : gestion alertes, orchestration SOC, intégration streaming.
  - Service Business Analytics : ingestion data, calcul KPIs, restitution.
  - Service Maintenance : monitoring IoT, moteur prédictif (Python), workflows interventions.
- **Data Platform** : Lakehouse (Delta Lake), streaming (Kafka), entrepôt analytique (Snowflake ou BigQuery selon contexte).
- **AI Services** : modèles de vision (Edge + Cloud), moteur IA agents, orchestration.
- **Edge Gateway** : collecte flux vidéo, pré-traitements, chiffrement.
- **Identity & Security** : Keycloak / Azure AD B2C, MFA, gestion secrets.
- **Observability Stack** : Prometheus, Grafana, ELK, SIEM.

### 7.3 Composants (niveau 3 – focus MVP)
- **Dashboard Composer** : moteur de configuration de widgets (React + GraphQL).
- **Alert Manager** : pipeline géré par Kafka Streams, stockage dans TimescaleDB, API REST.
- **Video Proxy** : WebRTC / HLS via service streaming dédié, CDN sécurisé.
- **KPI Engine** : jobs Spark/Databricks, agrégations temps réel, cache Redis pour temps réel.
- **Maintenance Orchestrator** : microservice Python (FastAPI) gérant règles de maintenance, connecteur IoT Hub.
- **Notification Service** : service event-driven (SNS/SQS ou Azure Service Bus) multi-canaux (email, push, SMS).

### 7.4 Sécurité & conformité
- Chiffrement end-to-end (TLS 1.3, SRTP pour flux vidéo).
- MFA obligatoire, SSO fédéré.
- Journaux immuables (WORM) pour preuves légales.
- RBAC par persona, audits trimestriels.

## 8. Modèle de données métier (vue logique)
- **Alert** `(id, type, criticité, statut, timestamp, site_id, media_refs, actions)`
- **Site** `(id, nom, localisation, segment, manager_id)`
- **KPIRecord** `(site_id, période, indicateur, valeur, source, confiance)`
- **MaintenanceEvent** `(id, équipement_id, type, prévision, statut, technicien_id)`
- **UserProfile** `(user_id, persona, rôles, préférences_dashboard)`
- **ActionPlan** `(id, owner_id, objectif, date_due, statut, résultats)`

## 9. Expérience utilisateur (UX/UI)
### 9.1 Principes directeurs
- Hiérarchie visuelle claire (couleurs métiers : sécurité = bleu nuit, business = vert, maintenance = orange).
- Dashboards modulaires avec système de grilles 12 colonnes, widgets redimensionnables.
- Mode sombre par défaut pour usage SOC, mode clair optionnel.
- Accessibilité : contraste AA, navigation clavier, support lecteur d'écran.

### 9.2 Écrans MVP
1. **Dashboard SOC**
   - Header : statut global (sites, alertes ouvertes).
   - Section principale : mosaïque flux live + timeline alertes.
   - Panneau latéral : détails alerte, actions rapides (escalade, assignation).

2. **Cockpit Business**
   - Sélecteur multi-sites, filtres temporels.
   - Widgets KPI (cartes, graphes comparatifs), module insights IA.
   - Section actions : tâches en cours, recommandations.

3. **Espace Manager Local**
   - Configuration widgets par glisser-déposer.
   - Liste des alertes & interventions, filtres personnalisés.
   - Module partage (export PDF/CSV, commentaires).

4. **Application Mobile Maintenance**
   - Notifications push, liste interventions.
   - Détails intervention (checklist, pièces jointes, bouton "Terminer").
   - Scan QR code équipement pour accès rapide aux historiques.

### 9.3 Design system
- Typographie : Inter (web), SF Pro (mobile).
- Composants : boutons primary/secondary, badges criticité, charts (ECharts).
- Iconographie spécifique sécurité/business/maintenance (set personnalisé).

## 10. Validation et prochaines étapes
1. Tester les maquettes haute fidélité auprès de 5 utilisateurs par persona (20 tests).
2. Finaliser les AAD (Architecture Decision Records) pour chaque brique critique (streaming, data, sécurité).
3. Préparer la backlog détaillée Sprint 1 (tâches techniques, critères d'acceptation).
4. Définir les KPIs de suivi projet (burndown, vélocité, adoption early users).
5. Mettre en place un rituel de revue de design bi-hebdomadaire (vision produit + tech).

---
Ce cadrage fonctionnel et design constitue la base de référence pour lancer la phase de construction des fondations techniques décrite dans le plan d'action.
