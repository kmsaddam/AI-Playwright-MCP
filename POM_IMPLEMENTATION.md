# Page Object Model (POM) Implementation Guide

## What is Page Object Model?

The **Page Object Model (POM)** is a design pattern used in test automation where:
- **Each web page** is represented as a **class**
- **Page elements** are stored as **class properties**
- **User interactions** are implemented as **class methods**

This pattern promotes **maintainability**, **reusability**, and **scalability** in test automation.

---

## Project Implementation

### 1. HomePage.ts - Home Page Object

```typescript
export class HomePage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly computersMenu: Locator;
```

**Encapsulated Elements:**
- Search functionality
- Navigation to categories
- Site header interactions

**Key Methods:**
- `goto()` - Navigates to the home page
- `searchFor(term)` - Performs product search
- `navigateToComputers()` - Goes to computer category
- `navigateToDesktops()` - Goes to desktops subcategory

**Locator Strategies:**
- `page.locator('input[id="small-searchterms"]')` - CSS selector
- `page.getByRole('button', { name: 'Computers' })` - Semantic locator (accessible)

### 2. SearchResultsPage.ts - Search Results Page Object

```typescript
export class SearchResultsPage {
  readonly page: Page;
  readonly productTitles: Locator;
```

**Encapsulated Elements:**
- Product listings
- Product titles/names
- Product information

**Key Methods:**
- `verifyProductExists(productName)` - Asserts product presence
- `getProductList()` - Returns all product names

**Assertion Pattern:**
```typescript
const titles = await this.productTitles.allTextContents();
const trimmedTitles = titles.map(title => title.trim());
const productExists = trimmedTitles.some(title => title.includes(productName));
expect(productExists).toBeTruthy();
```

### 3. Test Specifications

**Test 1: Search Functionality**
```typescript
test('Search for Computer and verify Lenovo IdeaCentre in search results', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);

  await homePage.goto();
  await homePage.searchFor('Computer');
  await searchResultsPage.verifyProductExists('Build your own computer');
});
```

**Test 2: Category Navigation**
```typescript
test('Navigate to Desktops category and verify Lenovo IdeaCentre exists', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);

  await homePage.navigateToDesktops();
  const products = await searchResultsPage.getProductList();
  await searchResultsPage.verifyProductExists('Lenovo IdeaCentre');
});
```

---

## POM Architecture Benefits

| Benefit | Explanation |
|---------|-------------|
| **Maintainability** | UI changes → Update locators only in POM classes |
| **Reusability** | Page methods used across multiple tests |
| **Readability** | Test code reads like business scenarios |
| **Scalability** | Add new pages/elements without changing tests |
| **Reduced Duplication** | Common actions centralized in POMs |
| **Easy Debugging** | Failures isolated to specific page actions |

---

## Locator Strategies Used

### 1. CSS Selectors
```typescript
page.locator('input[id="small-searchterms"]')
page.locator('.product-title')
page.locator('button[type="submit"][class*="search-box-button"]')
```
✅ Efficient, specific, direct DOM access

### 2. Semantic/Accessible Locators
```typescript
page.getByRole('button', { name: 'Computers' })
```
✅ Resilient to UI changes, tests accessibility

### 3. Attribute Selectors
```typescript
page.locator('button[type="submit"]')
```
✅ Targets specific attributes

---

## Test Execution Flow

### Test 1: Search Flow
```
┌─ Navigate to Home ─────────────────────────┐
│  https://demo.nopcommerce.com/             │
└─────────────────┬──────────────────────────┘
                  │
┌─ Fill Search Box ──────────────────────────┐
│  Enter "Computer"                          │
└─────────────────┬──────────────────────────┘
                  │
┌─ Click Search Button ──────────────────────┐
│  Navigate to search results page           │
└─────────────────┬──────────────────────────┘
                  │
┌─ Verify Product ───────────────────────────┐
│  Assert "Build your own computer" exists   │
│  ✅ PASS if found, ❌ FAIL if not found    │
└────────────────────────────────────────────┘
```

### Test 2: Category Navigation Flow
```
┌─ Navigate to Desktops ──────────────────────┐
│  https://demo.nopcommerce.com/desktops     │
└──────────────┬──────────────────────────────┘
               │
┌─ Get Product List ───────────────────────────┐
│  Retrieve all product titles                 │
│  - Build your own computer                   │
│  - Digital Storm VANQUISH                    │
│  - Lenovo IdeaCentre                         │
└──────────────┬──────────────────────────────┘
               │
┌─ Verify Lenovo IdeaCentre ──────────────────┐
│  Assert "Lenovo IdeaCentre" in product list │
│  ✅ PASS if found, ❌ FAIL if not found      │
└──────────────────────────────────────────────┘
```

---

## Running Tests

### Execute all tests:
```bash
npm test
```

### Execute with UI mode (interactive debugging):
```bash
npx playwright test --ui
```

### Execute with headed browser (see actions):
```bash
npx playwright test --headed
```

### Execute specific test:
```bash
npx playwright test -g "Lenovo IdeaCentre"
```

### View detailed HTML report:
```bash
npx playwright show-report
```

---

## Implementation Highlights

### ✅ Wait Strategies
```typescript
await this.page.waitForLoadState('networkidle');
```
- Ensures page fully loads before assertions
- Prevents flaky tests due to timing issues

### ✅ Text Content Handling
```typescript
const trimmedTitles = titles.map(title => title.trim());
```
- Handles whitespace in product names
- Ensures accurate matching

### ✅ Semantic Selectors
```typescript
page.getByRole('button', { name: 'Computers' })
```
- Accessible, resilient to UI changes
- Reflects how real users interact with page

### ✅ Proper Exports
```typescript
export class HomePage { }
```
- Clean module interface
- Easy to import and use in tests

---

## Extending the POM

### Example: Add Product Details Page
```typescript
export class ProductDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('h1.product-name');
    this.price = page.locator('.price');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async getPrice() {
    return await this.price.textContent();
  }
}
```

### Example: Use in Test
```typescript
test('Add product to cart', async ({ page }) => {
  const productPage = new ProductDetailsPage(page);
  
  await page.goto('https://demo.nopcommerce.com/build-your-own-computer');
  await productPage.addToCart();
  // Assert item was added
});
```

---

## Best Practices Applied

✅ **Single Responsibility** - Each class handles one page  
✅ **Readable Naming** - Method names describe actions  
✅ **Consistent Patterns** - Similar methods across POMs  
✅ **DRY Principle** - No code duplication  
✅ **Type Safety** - Full TypeScript support  
✅ **Assertion Isolation** - Assertions in POM methods  
✅ **Explicit Waits** - Never use sleep/arbitrary delays  

---

## Troubleshooting Guide

### Problem: "Locator not found"
**Solution:** Use `npx playwright codegen https://demo.nopcommerce.com` to inspect the page and update selectors

### Problem: "Test times out"
**Solution:** Extend timeout in playwright.config.ts or use explicit waits

### Problem: "Text doesn't match exactly"
**Solution:** Trim whitespace: `title.trim()` and use `.includes()` instead of exact match

### Problem: "Tests work locally but fail in CI"
**Solution:** Ensure all dependencies installed, check network connectivity, review CI logs

---

## Summary

The Page Object Model implementation in this project provides:

1. ✅ **Maintainable** test code that's easy to update
2. ✅ **Reusable** page objects across multiple tests
3. ✅ **Scalable** architecture for growing test suites
4. ✅ **Readable** tests that mirror business workflows
5. ✅ **Robust** locators using best practices

The tests successfully validate the nopCommerce demo store's search and category navigation functionality, specifically confirming the presence of "Lenovo IdeaCentre" in desktop computer listings.
