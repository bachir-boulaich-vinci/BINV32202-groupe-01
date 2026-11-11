# Architecture frontend

Le frontend est une application React/Vite située dans `frontend/`. Les
fichiers sont organisés par responsabilité :

```text
frontend/
├── public/          # Fichiers statiques conservant leur nom exact
└── src/
    ├── assets/      # Images importées par le code TypeScript
    ├── components/  # Composants réutilisables, un composant par fichier
    ├── data/        # Données fictives ou statiques
    ├── models/      # Interfaces et types du domaine
    ├── hooks/       # Hooks React et logique d'état réutilisable
    ├── pages/       # Écrans associés aux routes
    ├── services/    # Appels et validation des réponses API
    └── utils/       # Fonctions et gardes partagées
```

## Règles d'emplacement

- `public/` est réservé aux fichiers qui doivent garder leur nom (par exemple
  `favicon.svg` ou `robots.txt`) et sont référencés avec un chemin absolu comme
  `/favicon.svg`.
- Les images utilisées par l'interface sont placées dans `src/assets/` puis
  importées dans le code (`import logo from "../assets/logo.png"`).
- Les modèles et interfaces TypeScript vont dans `src/models/`.
- Les données fictives ou statiques vont dans `src/data/`.
- Un composant réutilisable ou volumineux possède son propre fichier, nommé
  comme le composant (`RecipeCard.tsx`).

Les pages orchestrent les hooks et les composants. Les services restent
responsables des appels HTTP et de la validation des données externes.
