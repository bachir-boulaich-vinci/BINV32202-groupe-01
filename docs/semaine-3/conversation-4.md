
Fichier
# prompt
Je souhaite créer une matrice de tracabilité pour vérifier quels cas de tests sont couverts, partiellement couverts ou absent de ce projet pour ces deux exigences : | EF-32 | L'étudiant candidate à une offre publiée, avec un message facultatif. Il peut retirer sa candidature tant qu'elle n'a pas été traitée. |
| EF-33 | L'étudiant voit ses candidatures et leur statut : « En cours », « Retenue », « Non retenue » ou « Retirée ». |. 

Dans un premier temps, il faut découper ces exigences en cas précis, avec le résultat attendu : cas normaux, refus et limites.  Explore les tests existants, notamment les tests d’API s’il y en a. Pour chaque cas, relève le fichier, le nom du test et les assertions qui vérifient le résultat attendu. Un cas est couvert seulement si les assertions portent effectivement sur son résultat attendu. Un test qui appelle une route et reçoit une réponse ne suffit pas nécessairement. Notez aussi les comportements testés qui ne correspondent pas à EF-32 ou EF-33, sans les rattacher à une exigence au hasard. Pour chaque cas, indique : si un test existe, et son emplacement le cas échéant, assertions utiles, couverture ( couvert, partiel, absent )

Ensuite, repère les cas absents ou partiellement couverts. Choisis les manques les plus importants. Privilégie les
vérifications possibles au niveau de l’API et du backend. Il n’est pas demandé de créer des
tests end-to-end ni de refaire toute la suite. Si un cas ne peut pas être vérifié avec les tests
disponibles, signale cette limite et indique comment la vérifier, le cas échéant.

Génère moi cette matrice sous forme de fichier HTML.
…

# réponse
Réfléchi pendant 9m 22s
J’ai terminé l’analyse du projet et généré la matrice de traçabilité au format HTML.

Matrice de traçabilité EF-32 et EF-33

Fichier HTML interactif · Recherche et filtres intégrés

Télécharger la matrice HTML

Résultats de l'analyse
12
Couverts

9
Partiels

23
Absents

Au total, 44 cas ont été examinés, dont 25 pour EF-32 et 19 pour EF-33.

Le fichier contient, pour chaque cas, le résultat attendu, l’existence ou non d’un test, son emplacement, son nom, les assertions pertinentes et la justification du niveau de couverture.

J’ai également identifié les tests manquants prioritaires, notamment la création sans message, la persistance du retrait, la consultation des quatre statuts et les contrôles d’accès.

Les tests qui concernent d’autres exigences sont présentés séparément pour éviter toute attribution incorrecte.

Précision : il s’agit d’une analyse des assertions existantes. L’exécution des tests n’a pas pu être validée dans cet environnement en raison de dépendances natives incompatibles avec Linux.

Tu peux ouvrir le fichier HTML directement dans ton navigateur, sans installation supplémentaire.


matrice_tracabilite_EF32_EF33.html
HTML
