# Plan EF-32 / EF-33 — candidatures étudiantes

## Problème et approche

Le schéma SQLite contient déjà `applications` avec les statuts `IN_PROGRESS`,
`SELECTED`, `REJECTED` et `WITHDRAWN`, et le seed fournit des exemples dans ces
quatre états. Il faut exposer ce modèle à l'étudiant de façon sécurisée et
cohérente avec l'architecture existante (route/controller, service, repository,
modèles/mappers, puis services/hooks/pages React).

La feature sera structurée en trois étapes :

1. **Candidater à une offre publiée** : depuis le catalogue étudiant, saisir un
   message facultatif et créer une candidature.
2. **Consulter ses candidatures** : charger uniquement les candidatures de
   l'étudiant connecté et traduire les statuts métier en libellés français.
3. **Retirer une candidature** : permettre le retrait uniquement lorsque le
   statut est encore `IN_PROGRESS`, avec mise à jour explicite vers
   `WITHDRAWN`.

## Fichiers et composants concernés

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

## Vérifications et tests envisagés

- Backend : 401 sans session, 403 pour les non-étudiants, 400 pour les corps
  invalides, 404 pour une offre/candidature inexistante, refus d'une offre non
  publiée, création avec/sans message, isolation par étudiant, retrait
  autorisé seulement en `IN_PROGRESS`, refus après sélection/refus/retrait.
- Frontend : affichage du formulaire uniquement à l'étudiant, soumission et
  rafraîchissement, liste des quatre statuts avec libellés « En cours »,
  « Retenue », « Non retenue », « Retirée », retrait avec confirmation/état
  d'erreur, session expirée.
- Validation finale : `npm run lint`, `npm run typecheck`, tests backend et
  frontend ciblés, puis `npm run build` (et `npm run check` si les tests ciblés
  sont concluants).

## Décisions fournies pour l'implémentation

- Une seule candidature active par étudiant et offre ; une nouvelle candidature
  est autorisée après un retrait.
- Le message est facultatif, sans limite métier supplémentaire ; les espaces
  superflus peuvent être normalisés à l'entrée.
- Le retrait demande une confirmation explicite.
- Le point d'entrée est un formulaire intégré à la ligne de l'offre.
- « Mes candidatures » propose un filtre par période.
- La création vérifie l'état de l'offre dans la même opération transactionnelle :
  une offre devenue `ASSIGNED` ou `ARCHIVED` est refusée.
