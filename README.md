# INNOVEO Demo Prototype

Ce dépôt contient l’application de démonstration **INNOVEO Demo** construite en mono-repo, ainsi que la documentation de cadrage.

## Structure du mono-repo

- `frontend/` : application React (Vite + TypeScript) avec design system, routing et internationalisation.
- `backend/` : API NestJS connectée à PostgreSQL, modules d’authentification (SSO/MFA) et de gestion de contenus.
- `infra/` : manifestes Kubernetes (base + overlays), scripts utilitaires et documentation CI/CD.
- `.github/workflows/ci.yml` : pipeline CI/CD pour builder, tester, packager et déployer l’environnement de développement.
- `docs/` : livrables de cadrage (cahier des charges, plan d’action, cadrage fonctionnel).

## Prérequis

- Node.js 18+
- Docker + Docker Compose (pour la base de données PostgreSQL)

## Démarrage rapide

### 1. Installer les dépendances

```bash
npm run install:all
```

### 2. Lancer l’infrastructure locale (PostgreSQL)

```bash
docker compose -f docker-compose.dev.yml up -d
```

### 3. Démarrer les applications Frontend et Backend

```bash
npm run dev
```

Le script `npm run dev` lance le backend NestJS (`npm --prefix backend run start:dev`) et le frontend Vite (`npm --prefix frontend run dev -- --host 0.0.0.0 --port 4173`) en parallèle. Utilisez `Ctrl+C` pour arrêter proprement les deux processus.

### 4. Arrêter l’infrastructure locale

```bash
docker compose -f docker-compose.dev.yml down
```

### Commandes individuelles

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

### Infrastructure locale (Kubernetes)

```bash
kubectl apply -k infra/k8s/overlays/dev
```

## Documents
- [Cahier des charges](docs/cahier_des_charges.md)
- [Technologies et langages recommandés](docs/technologies_et_langages.md)
- [Plan d’action de développement](docs/plan_action.md)
- [Cadrage fonctionnel et design](docs/cadrage_fonctionnel_et_design.md)

Ces documents serviront de base au cadrage et à la mise en œuvre du projet.
