import { expect, test, type Page } from "@playwright/test";

const expectedPublishedOfferTitles = [
  "Assistant conversationnel interne",
  "Tableau de bord de qualité des données",
  "Application React de gestion de flotte",
  "API REST de facturation",
];

const loginAsInesHaddad = async (page: Page) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Inès Haddad", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Bonjour Inès", exact: true })).toBeVisible();
};

const offerRows = (page: Page) => page.locator("tbody tr");

test("Scénario 1 : recherche un texte dans le titre sans distinguer la casse", async ({ page }) => {
  await loginAsInesHaddad(page);
  await page.getByRole("link", { name: "Offres", exact: true }).click();

  const rows = offerRows(page);
  await expect(rows).toHaveCount(expectedPublishedOfferTitles.length);
  await expect(page.getByText(`${expectedPublishedOfferTitles.length} offres`, { exact: true }))
    .toBeVisible();

  await page.getByRole("searchbox", { name: "Rechercher par titre" }).fill("react");

  await expect(rows).toHaveCount(1);
  await expect(rows).toContainText("Application React de gestion de flotte");
  await expect(page.getByText("1 offre", { exact: true })).toBeVisible();
  await expect(rows).not.toContainText("Assistant conversationnel interne");
  await expect(rows).not.toContainText("Tableau de bord de qualité des données");
  await expect(rows).not.toContainText("API REST de facturation");
});

test("Scénario 2 : conserve toutes les offres quand la recherche contient uniquement des espaces", async ({
  page,
}) => {
  await loginAsInesHaddad(page);
  await page.getByRole("link", { name: "Offres", exact: true }).click();

  const rows = offerRows(page);
  await expect(rows).toHaveCount(expectedPublishedOfferTitles.length);
  await page.getByRole("searchbox", { name: "Rechercher par titre" }).fill("     ");

  await expect(rows).toHaveCount(expectedPublishedOfferTitles.length);
  await expect(page.getByText(`${expectedPublishedOfferTitles.length} offres`, { exact: true }))
    .toBeVisible();
  for (const title of expectedPublishedOfferTitles) {
    await expect(rows.filter({ hasText: title })).toHaveCount(1);
  }
});
