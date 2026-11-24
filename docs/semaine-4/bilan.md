# Audit des tests

Le tableau de l'audit se trouve dans docs/semaine-4/audit-tests-candidatures-EF32-EF33.html

# TDD

Un test vu en échec avant l'implémentation puis en réussite:
- cherche l'expression saisie dans le titre sans distinguer la casse

Avis sur les tests proposés avant de donner notre accord:

Les tests étaient pertinents mais au niveau frontend, il nous a semblé y avoir un manque. 4 règles sur 6 n'étaient pas testées.

# Recherche

Cas essayés:
- cherche l'expression saisie dans le titre sans distinguer la casse
- recherche plusieurs mots comme une expression entière
- ignore une recherche vide
- retourne une liste vide sans correspondance
- combine la recherche avec la période
- conserve la visibilité publiée lors d'une recherche pour un étudiant

Résultat npm run check: Tous les tests passent

Problèmes restants: aucun

# IA Usage

Bachir: 34/200
Marcus: 24