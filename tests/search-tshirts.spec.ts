import { test, expect } from '@playwright/test';

test('Search for T-shirts and verify result', async ({ page }) => {
  // 1. Navigate to the website
  await page.goto('https://www.automationpractice.pl/index.php');

  // 2. Search for 'T-shirts'
  await page.fill('input[name="search_query"]', 'T-shirts');
  await page.press('input[name="search_query"]', 'Enter');

  // 3. Verify the product in the list
  await expect(page.locator('.product_list .product-name')).toContainText('Faded Short Sleeve T-shirts');
});
