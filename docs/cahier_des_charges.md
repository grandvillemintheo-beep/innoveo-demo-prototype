# Cahier des charges – INNOVEO Demo

## 1. Contexte et objectifs
- **Projet** : INNOVEO Demo, démonstrateur de la plate-forme INNOVEO (CCTV Cloud & IoT Platform Service).
- **Objectif principal** : proposer une expérience interactive permettant de découvrir les capacités d’INNOVEO via trois parcours (Sandbox, Expérience guidée, Chatbot FAQ) et de valoriser les Smart Apps, services et cas d’usage du catalogue ANAVEO.
- **Cibles** : prospects, clients existants, partenaires technologiques et équipes internes commerciales/avant-vente.

## 2. Périmètre fonctionnel
### 2.1 Page d’introduction
- Présenter les trois modes d’exploration.
- Afficher le positionnement et les bénéfices clés (Cloud souverain, cybersécurité, agents IA, Smart Apps, expérience utilisateur avancée).

### 2.2 Mode Sandbox
- Sélection d’un secteur type (Retail, Industrie, Logistique, Services, etc.).
- Affichage d’un plan 3D simplifié du site (vues statiques ou interactives selon faisabilité) avec mise en avant des équipements et flux vidéos.
- Possibilité de zoom sur des Smart Apps et de lancer des démonstrations vidéo courtes.
- Scripts de scénarios mettant en scène des Smart Apps clés (sécurité, business, end-user).

### 2.3 Mode Expérience guidée
- Questionnaire de découverte pour définir les besoins et critères (problématiques, enjeux, persona utilisateur).
- Recommandation automatique de Smart Apps, services managés et abonnements adaptés.
- Génération d’un résumé exportable (PDF ou e-mail) des recommandations.

### 2.4 Mode Chatbot/FAQ
- Chatbot spécialisé sur INNOVEO (base de connaissances statique pour la première version).
- Capacités : répondre aux questions fréquentes, orienter vers la Sandbox ou l’expérience guidée.
- Historique de conversation dans la session courante.

### 2.5 Tableau de bord récapitulatif
- Tableau de bord consolidant les informations explorées dans les différents modes.
- Visualisation des KPI clefs (sécurité, performance opérationnelle, ROI estimé).

### 2.6 Administration et gestion de contenu
- Back-office simple permettant de gérer :
  - Fiches Smart Apps (nom, description, bénéfices, vidéos, documents).
  - Secteurs et scénarios 3D/vidéos.
  - FAQ et scripts du chatbot.

## 3. Exigences non fonctionnelles
- **Sécurité** : Authentification MFA pour le back-office, gestion des rôles (admin, éditeur, lecteur). Respect des bonnes pratiques OWASP.
- **Performance** : temps de chargement inférieur à 3 s sur connexion standard, streaming vidéo optimisé.
- **Accessibilité** : conformité WCAG 2.1 AA, support multi-device (desktop, tablette, mobile).
- **Scalabilité** : architecture modulaire permettant l’ajout de nouveaux cas d’usage.
- **Traçabilité** : journalisation des interactions utilisateur (opt-in) pour analyse (Big Data).
- **Localisation** : interface en français et anglais.

## 4. Livrables attendus
- Application web responsive.
- Back-office d’administration des contenus.
- Base de données initiale (catalogue Smart Apps, FAQ, scénarios).
- Documentation technique (architecture, déploiement, API).
- Guides utilisateurs (front-office et back-office).
- Scripts de tests automatisés + rapport de couverture.

## 5. Contraintes et dépendances
- Compatibilité avec les environnements clients (navigateurs modernes, réseaux d’entreprise).
- Intégration avec services vidéo existants (flux RTSP/RTMP, API de streaming INNOVEO).
- Intégration future possible avec systèmes CRM/ERP via External Event API.

## 6. Planning macro (prévisionnel)
- Phase de cadrage (2 semaines) : ateliers métier, story mapping, conception UX.
- Phase de design et prototypage (3 semaines) : maquettes UI, validation parcours.
- Phase de développement itératif (10 semaines) : sprints de 2 semaines.
- Phase de tests et stabilisation (3 semaines).
- Phase de déploiement et formation (2 semaines).

## 7. Critères d’acceptation globaux
- Validation fonctionnelle par les équipes commerciales et marketing.
- Respect des exigences non fonctionnelles.
- Couverture de tests automatisés > 80 % pour les composants critiques.
- Démonstration live auprès d’un panel de clients pilotes.
