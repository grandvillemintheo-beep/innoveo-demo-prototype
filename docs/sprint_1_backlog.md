# Backlog détaillé — Sprint 1 (Fondations & Sécurité)

## Objectifs du sprint
- Finaliser les fondations techniques front/back pour lancer les user stories métier.
- Sécuriser le parcours d’authentification hybride et préparer l’intégration SOC.
- Appliquer les retours utilisateurs prioritaires issus des tests maquettes.

## User stories & tâches

### US01 — En tant que SOC Manager, je me connecte via SSO et MFA pour accéder au dashboard
- Implémenter le flux SAML via Passport (`backend/src/auth/saml`)
- Générer et vérifier le TOTP via `speakeasy` (`backend/src/auth/mfa`)
- Stocker le token dans le store front (`frontend/src/store/authStore.ts`)
- Critères : logs d’audit, couverture de tests >80 % sur le module auth

### US02 — En tant que SOC Manager, je filtre mes alertes critiques sur le dashboard
- Ajouter l’API de filtrage (`backend/src/content/alerts`)
- Intégrer le filtre de criticité + raccourci clavier (`frontend/src/pages/dashboard`)
- Mettre à jour le design system avec les nouvelles couleurs (`frontend/src/design-system`)
- Critères : respect contrastes WCAG AA, test clavier, analytics d’usage

### US03 — En tant que Directeur Business, je consulte les insights IA contextualisés
- Exposer la source et la fraîcheur des données (`backend/src/content/insights`)
- Afficher les métadonnées côté front (`frontend/src/pages/business/InsightsPanel.tsx`)
- Documenter la traçabilité dans le data catalog (`docs/adr/0002-strategie-donnees.md`)
- Critères : KPI fraîcheur <5 min, tests unitaires côté front

### US04 — En tant que Responsable Sécurité Locale, je personnalise mon cockpit en toute sécurité
- Implémenter la grille magnétique + points d’ancrage (`frontend/src/pages/local/CockpitLayout.tsx`)
- Enregistrer la configuration utilisateur (`backend/src/content/layouts`)
- Ajouter tests UX (glisser-déposer, rollback) dans la checklist QA (`docs/tests_utilisateurs_maquettes.md`)
- Critères : tests d’intégration front, audit RLS sur la table `user_layouts`

### US05 — En tant que Technicien Maintenance, je clôture une intervention sans QR code
- Ajouter le mode saisie manuelle (`frontend/src/pages/mobile/MaintenanceTask.tsx`)
- Permettre la validation côté API (`backend/src/content/work-orders`)
- Ajouter une métrique d’usage dans Mixpanel (`frontend/src/services/analytics.ts`)
- Critères : scénarios Cypress, instrumentation Mixpanel

## Capacités techniques & dettes
- Finaliser la mise en place d’OpenTelemetry côté backend (`backend/src/observability`)
- Industrialiser la collecte de logs front (console -> endpoint `log-intake`)
- Réduire le temps d’exécution des tests CI < 6 minutes (cible atteinte grâce aux scripts `test:ci`).

## Livrables
- ADR mis à jour (`docs/adr/*`).
- Rapport de tests utilisateurs consolidé (`docs/tests_utilisateurs_maquettes.md`).
- KPI de suivi validés (`docs/kpi_suivi.md`).
