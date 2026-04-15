import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { SearchResultsPage } from './pages/SearchResultsPage';

test('Search for Computer and verify Lenovo IdeaCentre in search results', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);

  await homePage.goto();
  await homePage.searchFor('Computer');
  await searchResultsPage.verifyProductExists('Build your own computer');
});

test('Navigate to Desktops category and verify Lenovo IdeaCentre exists', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);

  await homePage.navigateToDesktops();
  const products = await searchResultsPage.getProductList();
  console.log('Products found:', products);
  await searchResultsPage.verifyProductExists('Lenovo IdeaCentre');
});
