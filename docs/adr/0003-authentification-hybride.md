# ADR 0003 — Chaîne d’authentification hybride SSO + MFA

- **Statut** : Acceptée
- **Date** : 2024-04-08
- **Décideurs** : Tech Lead Backend, Responsable Sécurité, Product Owner

## Contexte
Les clients attendent une authentification fluide (SSO entreprise) tout en respectant les
exigences de sécurité renforcée pour l’accès au SOC et aux scénarios Sandbox. Le prototype doit
supporter un mode dégradé avec comptes locaux pour les démonstrations offline.

## Décision
- S’appuyer sur **SAML 2.0** pour l’authentification primaire via l’IdP du client, avec assertion
  signée et mapping des attributs vers les rôles internes.
- Exiger un **second facteur TOTP** géré par la plateforme (speakeasy + QR code) pour toutes les
  sessions ayant accès aux fonctionnalités sensibles.
- Conserver un **annuaire local** minimal pour les comptes de démonstration et les tests internes,
  avec politiques de rotation des secrets.
- Mutualiser la gestion de session via des **JWT signés** stockés côté client et rafraîchis toutes
  les 15 minutes.

## Conséquences
- Les user stories d’onboarding incluent la configuration IdP et le provisioning des rôles.
- Le store front-end déclenche systématiquement la vérification MFA après le mot de passe ;
  des tests unitaires devront couvrir ce scénario lors de l’implémentation UI.
- Des playbooks de secours (mode offline) sont documentés pour les démonstrations hors connexion.
