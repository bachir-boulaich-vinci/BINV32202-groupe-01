# Inventaire : 
voir fichier docs/semaine-3/inventaire-guides-senseurs.html

# Couverture des exigences :
voir fichier docs/semaine-3/matrice_tracabilite_EF32_EF33.html

# Modifications et vérifications : 
- expose le statut de l'étudiant propriétaire : 
Ce test vérifie que l'API retourne correctement les candidatures avec les statuts « Retenue » et « Non retenue » pour leurs étudiants respectifs.

Il échouerait si le backend retournait un statut incorrect, si la candidature attendue était absente de la réponse ou si la liste contenait des candidatures possédant un identifiant différent de celui attendu.

- crée sans message, puis rend la candidature au bon étudiant uniquement :
Ce test vérifie qu'un étudiant peut candidater sans fournir de message, que sa candidature est correctement créée avec le statut « En cours » et qu'elle apparaît ensuite dans sa propre liste de candidatures, sans être visible par un autre étudiant.

Il échouerait si le backend rendait le message obligatoire, attribuait un statut incorrect à la candidature, ne retournait pas la candidature à son propriétaire ou permettait à un autre étudiant de la consulter.

- retire une candidature en cours : 
Ce test vérifie qu'une candidature en cours peut être retirée, que son nouveau statut « Retirée » est bien enregistré et visible dans la liste des candidatures de l'étudiant et qu'une seconde tentative de retrait est refusée.

Il échouerait si le backend ne conservait pas le statut « Retirée » après le retrait, si la candidature disparaissait de la liste ou si le backend autorisait un deuxième retrait au lieu de retourner une erreur 409.

- npm run check : 
> check
> npm run lint && npm run typecheck && npm run test && npm run build


> lint
> npm run lint --workspaces


> lint
> oxlint --deny-warnings

Found 0 warnings and 0 errors.
Finished in 15ms on 64 files with 88 rules using 16 threads.

> lint
> oxlint --deny-warnings

Found 0 warnings and 0 errors.
Finished in 29ms on 53 files with 122 rules using 16 threads.

> typecheck
> npm run typecheck --workspaces


> typecheck
> tsc --noEmit


> typecheck
> tsc -b


> test
> npm run test --workspaces


> test
> vitest run


 RUN  v5.0.5 C:/3BIN/IA/Projet/project/BINV32202-groupe-01/backend



 ❯ tests/applications.test.ts [queued]
 ❯ tests/auth.test.ts [queued]
 ❯ tests/companies.test.ts [queued]
 ❯ tests/db/constraints.test.ts [queued]
 ✓ tests/nodeVersion.test.ts (11 tests) 15ms
 ✓ tests/permissions.test.ts (6 tests) 12ms


 ❯ tests/applications.test.ts [queued]
 ❯ tests/auth.test.ts [queued]
 ✓ tests/db/migrations.test.ts (3 tests) 24ms


 ❯ tests/applications.test.ts [queued]
 ✓ tests/db/constraints.test.ts (21 tests) 199ms
 ✓ tests/db/seed.test.ts (20 tests) 198ms






 ✓ tests/health.test.ts (2 tests) 77ms

 ✓ tests/companies.test.ts (12 tests) 226ms
 ✓ tests/applications.test.ts (13 tests) 264ms
 ✓ tests/offers.test.ts (19 tests) 290ms
 ✓ tests/auth.test.ts (22 tests) 339ms

 Test Files  10 passed (10)
      Tests  129 passed (129)
   Start at  15:58:59
   Duration  1.47s (import 40%, transform 31%, tests 25%, setup 3%, worker 2%)


> test
> vitest run


 RUN  v5.0.5 C:/3BIN/IA/Projet/project/BINV32202-groupe-01/frontend


 ❯ tests/App.test.tsx [queued]
 ❯ tests/ApplicationsPage.test.tsx [queued]
 ✓ tests/guards.test.ts (22 tests) 12ms

 ❯ tests/App.test.tsx 0/5

 ❯ tests/App.test.tsx 0/5
 ✓ tests/NavBar.test.tsx (4 tests) 375ms
 ✓ tests/HomePage.test.tsx (2 tests) 389ms
   ✓ HomePage (2)
     ✓ accueille l'utilisateur et rappelle son profil et ses entreprises 337ms
 ✓ tests/LoginPage.test.tsx (3 tests) 517ms
   ✓ LoginPage (3)
     ✓ regroupe les utilisateurs de démo par profil 420ms
 ✓ tests/ApplicationsPage.test.tsx (3 tests) 515ms
   ✓ ApplicationsPage (3)
     ✓ affiche les candidatures et leurs libellés 418ms
 ✓ tests/App.test.tsx (5 tests) 554ms
   ✓ App : session (5)
     ✓ affiche la connexion de démo sans session 418ms
 ✓ tests/OffersPage.test.tsx (6 tests) 668ms
   ✓ OffersPage (6)
     ✓ affiche les offres avec leurs libellés français 407ms
 ✓ tests/CompaniesPage.test.tsx (6 tests) 796ms
   ✓ CompaniesPage (6)
     ✓ transmet la recherche saisie à l'API 358ms

 Test Files  8 passed (8)
      Tests  51 passed (51)
   Start at  15:59:01
   Duration  4.75s (environment 65%, setup 14%, tests 12%, transform 8%, import 2%)


> build
> npm run build --workspaces


> build
> tsc -p tsconfig.build.json && node scripts/copyMigrations.js


> build
> tsc -b && vite build

vite v8.3.4 building client environment for production...
✓ 61 modules transformed.
computing gzip size...
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-FhMcEwCm.css    3.42 kB │ gzip:  1.09 kB
dist/assets/index-CmfxHDNN.js   276.03 kB │ gzip: 86.97 kB


# Audit des guides : 

Consignes et conventions du cours de web2:
1. Organisation du projet & Structure des fichiersArborescence globale du projet : Respecter la structure imposée comprenant un dossier principal BINV2150-A divisé en slides, exercices (contenant MiamMiam/backend et MiamMiam/frontend) et exercices-complementaires (EC01, EC02, etc.) [seance-01.pdf, page 21].   Structure interne du Frontend Vite/React :Modèles et interfaces TypeScript dans src/models/ (ex: recipe.ts, category.ts) [seance-10.pdf, page 2 ; seance-10.pdf, page 15].   Jeux de données fictifs/statiques dans src/data/ (ex: recipes.ts, categories.ts) [seance-10.pdf, page 2 ; seance-10.pdf, page 15].   Composants UI dans src/components/ (ex: RecipeCard.tsx, RecipeList.tsx) [seance-07.pdf, page 14 ; seance-10.pdf, page 2].   Convention un composant par fichier : Séparer chaque composant dans son propre fichier dès qu'il est réutilisable ou volumineux, nommé exactement d'après le composant (ex: RecipeCard.tsx) [seance-07.pdf, page 13 ; seance-07.pdf, page 14].   Emplacement des assets statiques :Dossier public/ : Reservé aux fichiers statiques devant garder leur nom exact (favicon, robots.txt), référencés par un chemin absolu depuis la racine (ex: /logo.png) [seance-09.pdf, page 3 ; seance-09.pdf, page 4].   Dossier src/assets/ : Reservé aux images/illustrations de l'UI importées directement dans le code TypeScript (import logo from "../assets/logo.png") [seance-09.pdf, page 3 ; seance-09.pdf, page 4 ; seance-09.pdf, page 19].   2. Conventions Backend & API RESTVerbes HTTP et routage :GET : Récupération de ressources (GET /recipes, GET /recipes/:id) [seance-02.pdf, page 3].   POST : Création d'une ressource (POST /recipes) [seance-02.pdf, page 3].   PUT : Remplacement complet d'une ressource (PUT /recipes/:id) [seance-02.pdf, page 3].   PATCH : Modification partielle d'une ressource (PATCH /recipes/:id) [seance-02.pdf, page 3 ; seance-02.pdf, page 18].   DELETE : Suppression d'une ressource (DELETE /recipes/:id) [seance-02.pdf, page 3].   Usage des paramètres :Path parameters (:id) : Exclusivement destinés à l'identification d'une ressource spécifique [seance-02.pdf, page 4].   Query parameters (?key=value) : Réservés aux filtres, tri, pagination ou options facultatives [seance-02.pdf, page 4].   Corps des requêtes et réponses :Format d'échange standard : JSON [seance-02.pdf, page 5 ; seance-02.pdf, page 7].   En-tête obligatoire pour les requêtes avec corps (POST, PUT, PATCH) : Content-Type: application/json [seance-02.pdf, page 5 ; seance-02.pdf, page 8].   Pas de body autorisé sur les requêtes GET et DELETE [seance-02.pdf, page 5].   200 OK : Contient la ressource ou la liste demandée [seance-02.pdf, page 6 ; seance-02.pdf, page 7].   201 Created : Pas de body obligatoire ou renvoie la ressource créée avec son id [seance-02.pdf, page 6 ; seance-02.pdf, page 7].   204 No Content : Aucun corps de réponse pour les opérations réussies de modification ou suppression (PUT, PATCH, DELETE) [seance-02.pdf, page 6 ; seance-02.pdf, page 7].   Codes de statut HTTP applicables :200 OK : Succès avec contenu [seance-02.pdf, page 6].   201 Created : Ressource créée [seance-02.pdf, page 6].   204 No Content : Succès sans corps de réponse [seance-02.pdf, page 6].   400 Bad Request : Erreur client / données ou ID invalides [seance-02.pdf, page 6 ; seance-02.pdf, page 18].   401 Unauthorized : Utilisateur non authentifié ou token invalide/absent [seance-02.pdf, page 6 ; seance-02.pdf, page 18 ; seance-03.pdf, page 12].   403 Forbidden : Non autorisé / droits insuffisants [seance-02.pdf, page 6 ; seance-02.pdf, page 18 ; seance-03.pdf, page 12 ; seance-03.pdf, page 13].   404 Not Found : Ressource non trouvée [seance-02.pdf, page 6 ; seance-02.pdf, page 18 ; seance-03.pdf, page 13].   409 Conflict : Conflit d'état ou doublon [seance-02.pdf, page 6 ; seance-04.pdf, page 13].   500 Internal Server Error : Erreur interne serveur [seance-02.pdf, page 6].   3. Documentation d'APIL'API backend doit être documentée selon au moins l'une des 3 approches :Commentaires JSDoc : Placés au-dessus de chaque route (@route, @summary, @param, @returns) [seance-02.pdf, page 11 ; seance-02.pdf, page 12 ; seance-02.pdf, page 18].   Document Markdown : Fichier API.md ou README.md décrivant tous les endpoints, leurs paramètres et réponses HTTP [seance-02.pdf, page 13 ; seance-02.pdf, page 14 ; seance-02.pdf, page 17].   OpenAPI / Swagger : Fichier openapi.yaml (OpenAPI 3.0.0) [seance-02.pdf, page 15 ; seance-02.pdf, page 17].   4. Sécurité, JWT et Mots de passeVariables d'environnement : Stockage des secrets dans un fichier d'environnement (ex: env/dev.env) et lecture via process.env.JWT_SECRET [seance-03.pdf, page 9].   Longueur de la clé secrète JWT : Doit comporter au minimum 32 caractères [seance-03.pdf, page 9].   Confidentialité Git : Les fichiers .env et les secrets doivent figurer dans .gitignore et ne jamais être commités [seance-03.pdf, page 9].   Gestion du JWT : Génération avec jsonwebtoken (jwt.sign()), algorithme HS256, durée d'expiration (expiresIn: "1d") et transmission via le header Authorization [seance-02.pdf, page 12 ; seance-03.pdf, page 10 ; seance-03.pdf, page 15].   Middleware d'authentification : Validation via un middleware Express (AuthService.authorize) injectant le payload dans req.user [seance-03.pdf, page 8 ; seance-03.pdf, page 11 ; seance-03.pdf, page 12].   Interdiction du stock en clair : Les mots de passe ne doivent jamais être enregistrés en clair dans la BDD [seance-04.pdf, page 2].   Hachage avec bcrypt : Utilisation obligatoire de bcrypt avec un salt (ex: 10 rounds) [seance-04.pdf, page 6 ; seance-04.pdf, page 7].   Usage asynchrone obligatoire : Interdiction des méthodes synchrones (bcrypt.hashSync()). Utiliser les versions asynchrones (await bcrypt.hash() et await bcrypt.compare()) [seance-04.pdf, page 8 ; seance-04.pdf, page 11 ; seance-04.pdf, page 12 ; seance-04.pdf, page 13 ; seance-04.pdf, page 14].   5. Programmation Fonctionnelle & TypeScriptImmuabilité : Privilégier const par rapport à let, utiliser des fonctions pures [seance-01.pdf, page 7].   Sécurisation du typage TypeScript :Optional Chaining (?.) : Accès sécurisé aux propriétés optionnelles [seance-01.pdf, page 8].   Nullish Coalescing (??) : Valeurs par défaut uniquement sur null ou undefined [seance-01.pdf, page 9].   Non-null Assertion (!) : À réserver aux cas strictement vérifiés [seance-01.pdf, page 10 ; seance-01.pdf, page 11].   Type Guard (obj is Interface) : Validation de structure à l'exécution [seance-01.pdf, page 17 ; seance-01.pdf, page 18 ; seance-01.pdf, page 19].   Destructuring & Spread Operator : Préférer la déstructuration pour extraire des variables et le spread (...) pour copier/fusionner objets et tableaux [seance-01.pdf, page 12 ; seance-01.pdf, page 13 ; seance-01.pdf, page 14 ; seance-01.pdf, page 15 ; seance-01.pdf, page 16].   6. HTML & DOM (Frontend sans framework)Chargement des scripts JS : Placer <script> en fin de <body> ou dans le <head> avec l'attribut defer [seance-05.pdf, page 6].   Protection anti-XSS : Ne pas injecter de contenu utilisateur non nettoyé via innerHTML ; utiliser obligatoirement textContent [seance-05.pdf, page 10 ; seance-05.pdf, page 15].   Événements DOM :Utiliser event.preventDefault() pour bloquer les comportements par défaut (rechargement de formulaire, clics sur lien) [seance-06.pdf, page 6 ; seance-06.pdf, page 7].   Appliquer la délégation d'événements (event delegation) pour écouter sur l'élément parent [seance-06.pdf, page 9 ; seance-06.pdf, page 13].   7. Conventions React & JSXSyntaxe et règles des composantsNommage : Le nom d'un composant React doit impérativement débuter par une majuscule [seance-07.pdf, page 9].   Règles JSX :Utiliser className au lieu de class et htmlFor au lieu de for [seance-07.pdf, page 8].   Auto-fermeture obligatoire des balises orphelines (<img />, <input />) [seance-07.pdf, page 8].   Renvoyer un élément racine unique (envelopper dans un <div> ou <>...</>) [seance-07.pdf, page 8].   Props et compositionImmuabilité des Props : Les props sont en lecture seule et ne doivent jamais être mutées par le composant enfant [seance-08.pdf, page 11].   Typage des Props : Typer les props avec une interface nommée selon le motif NomDuComposantProps [seance-08.pdf, page 6].   Destructuring : Déstructurer les props dans la signature du composant avec des valeurs par défaut pour les props optionnelles (?) [seance-08.pdf, page 7 ; seance-08.pdf, page 8].   Prop children : Utiliser children (typée ReactNode importée de "react") pour bâtir des composants d'enrobage ou de mise en page [seance-08.pdf, page 12 ; seance-08.pdf, page 13].   Collections et la prop keyTransformations via .map() : Utiliser .map() pour transformer un tableau de données en éléments JSX [seance-10.pdf, page 7].   Prop key obligatoire :Chaque élément issu d'un .map() doit posséder une prop key unique et stable [seance-10.pdf, page 8 ; seance-10.pdf, page 9].   Utiliser l'ID unique venant des données (recipe.id) [seance-10.pdf, page 9].   Éviter l'utilisation de l'index du tableau (index) [seance-10.pdf, page 9].   La key doit se situer directement sur l'élément/composant le plus externe retourné par la fonction passée au .map() [seance-10.pdf, page 11].   Listes vides : Prévoir une clause de garde (guard clause) avec retour anticipé si le tableau est vide [seance-10.pdf, page 13].   8. Style et Material UI (MUI)Approche CSS :Éviter les feuilles CSS globales non isolées pour styliser les composants [seance-09.pdf, page 5].   Privilégier les CSS Modules (*.module.css) [seance-09.pdf, page 6].   Limiter style={{ ... }} aux styles calculés dynamiquement [seance-09.pdf, page 7].   Règles MUI :Encadrer l'application par un ThemeProvider (avec un thème créé via createTheme) et ajouter le composant <CssBaseline/> [seance-09.pdf, page 10 ; seance-09.pdf, page 19].   Utiliser la prop sx à la place de style sur les composants MUI [seance-09.pdf, page 11].   Utiliser les composants UI adéquats : Typography (avec variant et component), Card, Stack, Container et Grid (avec réactivité size={{ xs: 12, sm: 6, md: 4 }}) [seance-09.pdf, page 12 ; seance-09.pdf, page 13 ; seance-09.pdf, page 15 ; seance-09.pdf, page 16].   Appliquer l'option readOnly sur les composants <Rating> utilisés à des fins d'affichage uniquement [seance-09.pdf, page 14 ; seance-09.pdf, page 19].   9. Gestion de l'état avec useState & Hooks (Séances 11 à 14)Règles des Hooks et principes de renduDéclenchement des rendus : Une simple variable modifiée ne met pas à jour l'UI ; useState mémorise la donnée et informe React qu'il doit réexécuter le composant (rendu) [seance-11.pdf, page 2 ; seance-11.pdf, page 3 ; seance-11.pdf, page 4].   Règles d'appel des Hooks :Les hooks s'appellent exclusivement au premier niveau du composant (jamais dans un if, une boucle ou une fonction imbriquée) [seance-11.pdf, page 6].   Ils s'appellent uniquement dans un composant fonctionnel React ou un custom hook [seance-11.pdf, page 6].   Isolation de l'état : L'état est local à chaque instance d'un composant [seance-11.pdf, page 7].   Typage de useState : Spécifier le type générique si la valeur initiale ne permet pas l'inférence (ex: useState<Recipe undefined |>(undefined) ou useState<number[]>([])) [seance-11.pdf, page 8].   Mises à jour & Valeurs dérivéesL'état est fixe pendant le rendu : L'appel du setter ne modifie pas la variable immédiatement dans le rendu en cours ; la valeur mise à jour sera disponible au rendu suivant [seance-11.pdf, page 9].   Mise à jour fonctionnelle : Si la nouvelle valeur dépend de la précédente, passer une fonction au setter : setCount((prev) => prev + 1) [seance-11.pdf, page 10].   Interdiction du stockage redondant : Ne jamais mettre dans un état useState une donnée qui peut être directement calculée (valeur dérivée) pendant le rendu à partir des props ou d'autres états [seance-11.pdf, page 11 ; seance-14.pdf, page 12].   Événements React & FormulairesÉvénements JSX : Utiliser la camelCase (onClick, onChange, onSubmit) et transmettre la fonction handler sans l'exécuter direct (onClick={handleClick} et NON onClick={handleClick()}) [seance-12.pdf, page 2 ; seance-12.pdf, page 3].   Typage des événements : Importer ChangeEvent<HTMLInputElement>, SubmitEvent<HTMLFormElement>, MouseEvent<HTMLButtonElement> depuis "react" [seance-12.pdf, page 4].   Champs contrôlés : L'état React constitue l'unique source de vérité (value={state} + onChange={(e) => setState(e.target.value)}) [seance-12.pdf, page 5 ; seance-12.pdf, page 6].   <input type="checkbox"> s'appuie sur checked={state} et e.target.checked [seance-12.pdf, page 7].   <input type="number"> renvoie une string dans e.target.value ; convertir avec Number() à la soumission [seance-12.pdf, page 7 ; seance-12.pdf, page 9].   Soumission de formulaire : Attacher onSubmit={handleSubmit} au <form> et appeler event.preventDefault() [seance-12.pdf, page 8].   Formulaire multi-champs : Regrouper les valeurs dans un état objet et mettre à jour via un handler unique exploitant [name]: value et le spread operator [seance-12.pdf, page 9 ; seance-12.pdf, page 10].   UX des erreurs : N'afficher les messages d'erreur sous les champs qu'après une première tentative de soumission à l'aide d'un état booléen submitted [seance-12.pdf, page 12 ; seance-12.pdf, page 14].   Immuabilité des collections & État partagéImmuabilité stricte : Ne jamais muter l'état. React compare l'ancienne et la nouvelle référence via Object.is [seance-13.pdf, page 4].   Ne pas utiliser push(), splice(), sort(), etc. [seance-13.pdf, page 8].   Utiliser [...arr, item] pour l'ajout, arr.filter(...) pour la suppression et arr.map(...) pour la modification [seance-13.pdf, page 5 ; seance-13.pdf, page 6 ; seance-13.pdf, page 7].   Identifiants temporaires : Générer des clés/identifiants temporaires avec Math.max(...) + 1, Date.now(), ou crypto.randomUUID() [seance-13.pdf, page 9].   Remonter l'état (Lifting State Up) : Lorsqu'une donnée est partagée par plusieurs composants, la positionner dans leur plus proche parent commun [seance-14.pdf, page 3 ; seance-14.pdf, page 4 ; seance-14.pdf, page 15].   Communication Enfant -> Parent : Passer des callbacks sous forme de props (onDelete: (id: number) => void, onAdd: (recipe: NewRecipe) => void) pour que l'enfant déclenche des actions sur l'état du parent [seance-14.pdf, page 6 ; seance-14.pdf, page 7 ; seance-14.pdf, page 9].   

Pour plus d'informations:
voir fichier docs/semaine-3/matrice_tracabilite_attentes_convention_web2.html

# Crédits IA : 
- Marcus : 13 crédits utilisés
- Bachir : 24/200