# End-to-End Browser Test Documentation

## Overview
This project implements a **Page Object Model (POM)** pattern for automated end-to-end browser testing using Playwright. The tests validate nopCommerce demo store functionality.

## Project Structure

```
tests/
├── pages/
│   ├── HomePage.ts           # Home page and navigation POM
│   └── SearchResultsPage.ts  # Search results page POM
└── search-computer.spec.ts   # Test specifications
```

## Page Object Model (POM) Classes

### HomePage
**Location:** `tests/pages/HomePage.ts`

The HomePage class encapsulates interactions with the home page and navigation:

**Properties:**
- `searchBox`: Input field for search terms
- `searchButton`: Search button
- `computersMenu`: Computers category button

**Methods:**
- `goto()`: Navigates to https://demo.nopcommerce.com/ with network idle wait
- `searchFor(term: string)`: Fills search box and clicks search button
- `navigateToComputers()`: Directly navigates to /computers category
- `navigateToDesktops()`: Directly navigates to /desktops category

### SearchResultsPage
**Location:** `tests/pages/SearchResultsPage.ts`

The SearchResultsPage class handles search result verification and product listing:

**Properties:**
- `productTitles`: Locator for all product titles on the page

**Methods:**
- `verifyProductExists(productName: string)`: Asserts that a product exists in the list
- `getProductList()`: Returns an array of all product titles (trimmed)

## Test Scenarios

### Test 1: Search for Computer
**File:** `tests/search-computer.spec.ts`

**Test Case:** `Search for Computer and verify Lenovo IdeaCentre in search results`

**Steps:**
1. Navigate to https://demo.nopcommerce.com/
2. Search for 'Computer'
3. Verify that search results contain computers

**Expected Result:** ✅ Test passes when search results display relevant computer products

### Test 2: Verify Lenovo IdeaCentre in Desktops Category
**File:** `tests/search-computer.spec.ts`

**Test Case:** `Navigate to Desktops category and verify Lenovo IdeaCentre exists`

**Steps:**
1. Navigate directly to https://demo.nopcommerce.com/desktops
2. Retrieve product list
3. Verify that "Lenovo IdeaCentre" is in the product list

**Expected Result:** ✅ Test passes when "Lenovo IdeaCentre" is found in the Desktops category

## Configuration

**File:** `playwright.config.ts`

Key settings:
- **Test Directory:** `./tests`
- **Browser:** Chromium (Desktop Chrome)
- **Reporter:** HTML report
- **Parallel Execution:** Enabled
- **Trace:** Captured on first retry

## Running the Tests

### Prerequisites
```bash
npm install
```

### Execute All Tests
```bash
npm test
```

### Execute Specific Test File
```bash
npx playwright test search-computer.spec.ts
```

### Execute Specific Test
```bash
npx playwright test search-computer.spec.ts -g "Lenovo IdeaCentre"
```

### View Test Results
```bash
npx playwright show-report
```

### Run Tests with UI Mode (Interactive)
```bash
npx playwright test --ui
```

### Run Tests with Headed Browser (See Actions)
```bash
npx playwright test --headed
```

## Test Results Location

- **HTML Report:** `playwright-report/`
- **Test Results:** `test-results/`
- **Screenshots/Traces:** `test-results/` (on failure)

## POM Pattern Benefits

✅ **Maintainability:** Locators centralized in page classes
✅ **Reusability:** Common actions available across multiple tests  
✅ **Scalability:** Easy to add new pages and tests
✅ **Readability:** Test code focuses on business logic, not implementation
✅ **Resilience:** Changes to UI only require POM updates

## Best Practices Implemented

1. **Explicit Waits:** Using `waitForLoadState('networkidle')`
2. **Readable Selectors:** Semantic locators (getByRole, getByLabel)
3. **Trimmed Assertions:** Handles whitespace in text content
4. **Modular Structure:** Clear separation of concerns
5. **Clear Naming:** Descriptive method and test names

## Future Enhancements

- Add more page objects (Product Page, Cart, Checkout)
- Implement data-driven tests with CSV/JSON fixtures
- Add accessibility testing assertions
- Integrate with CI/CD pipeline
- Add visual regression testing
- Implement API mocking for performance testing

## Troubleshooting

### Tests fail due to network timeouts
- Increase `waitForLoadState` timeout or network conditions
- Check internet connectivity

### Locators not found
- Use `playwright codegen` to inspect and update selectors
- Verify elements exist in browser DevTools

### Test runs locally but fails in CI
- Check for environment-specific issues
- Ensure dependencies are installed in CI
- Review Playwright browser cache settings

## References

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
