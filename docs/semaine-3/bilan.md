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
voir fichier docs/semaine-3/matrice_tracabilite_attentes_convention_web2.html

# Crédits IA : 
- Marcus : 13 crédits utilisés
- Bachir : 