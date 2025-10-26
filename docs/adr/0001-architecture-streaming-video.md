# ADR 0001 — Architecture de streaming vidéo et hotspots 3D

- **Statut** : Acceptée
- **Date** : 2024-04-08
- **Décideurs** : Tech Lead Front, Tech Lead Backend, Architecte Solution

## Contexte
L’expérience Sandbox nécessite l’affichage de flux vidéo quasi temps-réel superposés à une
scène 3D (React Three Fiber) agrémentée de hotspots interactifs. Les utilisateurs doivent
naviguer entre plusieurs caméras et déclencher des scénarios pédagogiques sans latence
perceptible depuis un navigateur standard.

## Décision
- Utiliser **WebRTC** pour le transport vidéo temps-réel, avec un proxy SFU (Janus) géré par
  l’équipe plateforme pour gérer la scalabilité et la sécurité réseau.
- Encapsuler les flux dans un **service backend NestJS** exposant une API GraphQL pour
  lister caméras, scénarios et métadonnées hotspots, et un canal WebSocket pour la signalisation.
- Côté front, normaliser l’affichage via un **compositeur React Three Fiber** générant une
  couche d’interaction (hotspots, overlays) synchronisée avec la timeline du flux vidéo.
- Instrumenter la solution avec des métriques QoS (latence, bitrate) envoyées vers Prometheus.

## Conséquences
- Implémentation d’un adaptateur SFU mutualisé côté infra, réutilisable pour les démonstrations
  futures.
- Nécessité d’un plan de tests réseau (débit, latence) et d’une stratégie de fallback vidéo HLS
  pour les environnements non compatibles WebRTC.
- Les user stories Sandbox incluent désormais des critères d’acceptation sur la synchronisation
  hotspots/flux et la télémétrie QoS.
