# Bilan

# Choix

- Candidature unique pour un étudiant à une offre mais il est autorisé pour cet étudiant de relancer une candidature après le retrait de la précédente
- Le message est facultatif et aucune règle métier n'est appliquée
- Il faut une confirmation avant de retirer une candidature
- L'étudiant candidate depuis la liste des offres
- Un filtrage par période est prévu dans la page des candidatures
- Si l'offre devient ASSIGNED ou ARCHIVED, un contrôle transactionnel est attendu

# Résultat

Tout fonctionne correctement.

# Modifications

- Backend :
  - nouveau modèle/application mapper et repository de candidatures ;
  - nouveau service et contrôleur/router des candidatures ;
  - extension des permissions étudiant et branchement dans
    `backend/src/app.ts` ;
  - validation du corps de candidature, contrôle offre `PUBLISHED`, propriété
    de la candidature et transition de retrait ;
  - mise à jour de `backend/API.md` et `backend/http/` ;
  - tests API ciblés et, si nécessaire, tests de contraintes/seed.
- Frontend :
  - modèle, guards, service et hook des candidatures ;
  - action de candidature dans le parcours des offres publiées (formulaire ou
    panneau cohérent avec l’UI actuelle) ;
  - page/section « Mes candidatures » avec statut, message et retrait ;
  - route/navigation réservée à l’étudiant et labels français ;
  - tests de service/page/navigation et états d’erreur.
- Données :
  - réutiliser les offres et candidatures de `backend/src/db/seed/` ainsi que
    les utilisateurs étudiants décrits dans `docs/seed.md` ;
  - ajouter une migration uniquement si une décision métier montre qu'une
    contrainte absente du schéma est nécessaire.

# Validation fonctionnelle

- Consultation des candidatures en temps qu'étudiant: fonctionnelle, aucune modification n'a été nécessaire
- Candidature via la liste des candidatures en temps qu'étudiant: fonctionnelle, aucune modification n'a été nécessaire
- Retrait d'une candidature en temps qu'étudiant: fonctionnelle, aucune modification n'a été nécessaire
- Candidature à la même offre suite au retrait: fonctionnelle, aucune modification n'a été nécessaire
- Utilisation du filtre des périodes sur la page des candidatures: fonctionnelle, aucune modification n'a été nécessaire

# Qualité

Dans nos vérifications, nous avons constaté une redondance au niveau des pages. Il y avait 2 select pour le filtre par période sur les 2 pages où il était utilisé. Nous avons fait refactorer ce select par l'IA.

# Tests et commandes

## Tests frontend
- Affichage les candidatures et leurs libellés
- Filtrage par période
- Retrait d'une candidature après confirmation

## Tests backend
- Liste uniquement les candidatures de l'étudiant connecté
- Filtrage des candidatures par période
- Refus de l'accès aux non-étudiants
- Création d'une candidature avec un message facultatif
- Refus d'une seconde candidature active pour la même offre
- Refus d'une candidature pour une offre non publiée
- Retrait d'une candidature en cours
- Refus du retrait d'une candidature appartenant à un autre étudiant
- Refus du retrait d'une candidature déjà traitée

## Commande utilisée

Dans ./frontend et ./backend: npm run test

# AI usage

Model: Fusion (Standard): GPT-5.6 Luna
Included credits: 19/200 