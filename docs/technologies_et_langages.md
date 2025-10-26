# Technologies et langages recommandés

## 1. Architecture globale
- **Front-end** : application web SPA (Single Page Application) hébergée dans le cloud souverain INNOVEO, consommant des API et services temps réel.
- **Back-end** : microservices orientés domaine (contenus, recommandations, chatbot, analytics) orchestrés via un bus d’évènements.
- **Data & IA** : pipeline de données pour la personnalisation, l’analytique et l’entraînement des modèles d’agents IA.
- **Infrastructure** : déploiement sur Kubernetes hybride (cloud + edge) avec CI/CD GitOps.

## 2. Couche présentation (Front-end)
- **Framework** : React 18 + TypeScript pour la robustesse et l’écosystème.
- **Gestion d’état** : Redux Toolkit + RTK Query (ou React Query) pour la cohérence des données.
- **UI Design System** : Chakra UI ou Material UI pour accélérer la conception responsive et accessibilité.
- **3D/visualisation** : Three.js + React Three Fiber pour les plans 3D interactifs.
- **Internationalisation** : i18next.
- **Tests** : Jest + React Testing Library + Playwright pour tests E2E.

## 3. Couche back-end
- **Langage principal** : Node.js (TypeScript) pour homogénéité front/back, microservices rapides.
- **Framework API** : NestJS (structure modulaire, support GraphQL & REST).
- **Base de données** : PostgreSQL pour données relationnelles (contenus, utilisateurs) + Redis pour cache/session.
- **Recherche plein texte** : Elasticsearch ou OpenSearch pour FAQ et Smart Apps.
- **Streaming vidéo** : intégration avec serveurs INNOVEO (RTSP/RTMP) via WebRTC proxy (Janus ou mediasoup) pour la diffusion web.
- **Chatbot** : moteur de règles + LLM via API interne (agents IA) avec fallback vers base de connaissances.
- **Recommandation** : moteur basé sur règles (MVP) évoluant vers moteur hybride (ML) utilisant pipelines Big Data.
- **Tests** : Jest + Supertest (API), Pact (contract testing).

## 4. Data, IA et analytics
- **Collecte** : Kafka pour ingestion d’évènements (interactions utilisateur, logs).
- **Traitements** : Spark/Databricks ou Flink pour traitements batch et streaming.
- **Stockage** : Data Lakehouse (Delta Lake) sur stockage objet souverain.
- **Visualisation** : Metabase/Apache Superset pour dashboards internes.
- **ML Ops** : MLflow pour le suivi des modèles (agents IA, recommandations), intégration CI/CD.

## 5. DevOps et Sécurité
- **Gestion de code** : GitHub/GitLab, trunk-based avec feature branches.
- **CI/CD** : GitHub Actions ou GitLab CI, pipeline multi-étapes (lint, tests, build, scan sécurité, déploiement).
- **Infrastructure as Code** : Terraform + Helm charts pour Kubernetes.
- **Observabilité** : Prometheus + Grafana, ELK stack pour logs, OpenTelemetry.
- **Sécurité** : Vault pour secrets, SSO + MFA via Keycloak, scans SAST/DAST (SonarQube, OWASP ZAP). Conformité RGPD.

## 6. Outillage projet
- **Gestion de projet** : Jira/Linear, roadmaps alignées avec OKR.
- **Documentation** : Confluence ou Docusaurus versionné.
- **Design collaboratif** : Figma pour maquettes UI/UX.
- **Communication** : Teams/Slack + Miro pour ateliers.
