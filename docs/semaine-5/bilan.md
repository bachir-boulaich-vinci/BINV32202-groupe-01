# Scénarios : 
e2e/recherche-offres/scenarios.md

# Playwright Test : 
e2e/recherche-offres/recherche-offres.spec.ts
e2e/example.spec.ts

## Assertions principales :

### Scénario 1

- await expect(rows).toContainText("Application React de gestion de flotte");
- await expect(page.getByText("1 offre", { exact: true })).toBeVisible();

### Scénario 2

- for (const title of expectedPublishedOfferTitles) {
    await expect(rows.filter({ hasText: title })).toHaveCount(1);
  }

(Ce sont les assertions qui déterminent directement le cas testé)

## Résultat du npx playwright test

Les deux npx playwright test fonctionnent excepté pour webkit qui ne fonctionne jamais en raison de la stratégie de sécurité Windows.

## Résultat du npm run check

Fonctionnel

# Vérification

On a enlevé la ligne suivante:
 OR o.title LIKE @pattern ESCAPE '\\' COLLATE NOCASE 
dans le fichier offers.repository.ts
Cette ligne était responsable de l'insensibilité à la casse. Les tests du scénario 1 ont échoué suite au retrait de cette ligne. La restauration de la ligne a permis de faire réussir à nouveau les tests.