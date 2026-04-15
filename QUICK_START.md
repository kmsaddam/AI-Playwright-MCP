# Quick Start Guide - POM E2E Tests

## 30-Second Overview

This project contains **Page Object Model (POM)** pattern tests for nopCommerce demo store using Playwright. Two tests verify product search and category navigation.

---

## Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Run Tests
```bash
npm test
```

### 3️⃣ View Results
```bash
npx playwright show-report
```

---

## Test Scenarios

### Test 1: Search for "Computer"
- Navigate to home page
- Search for "Computer"
- Verify product appears in results
- ✅ Verifies: "Build your own computer"

### Test 2: Verify Lenovo IdeaCentre in Desktops
- Navigate to Desktops category
- Get all products
- Verify "Lenovo IdeaCentre" exists
- ✅ Confirms: Product found in category

---

## File Structure

```
tests/
├── pages/
│   ├── HomePage.ts           ← Home page POM
│   └── SearchResultsPage.ts  ← Results page POM
└── search-computer.spec.ts   ← Test scenarios
```

---

## Page Objects

### HomePage
```typescript
new HomePage(page)
  .goto()                    // Go to home
  .searchFor('Computer')     // Search for term
  .navigateToDesktops()      // Go to /desktops
```

### SearchResultsPage
```typescript
new SearchResultsPage(page)
  .verifyProductExists('Lenovo IdeaCentre')  // Assert product
  .getProductList()                          // Get all products
```

---

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests |
| `npx playwright test --headed` | See browser in action |
| `npx playwright test --ui` | Interactive debug mode |
| `npx playwright show-report` | View HTML results |
| `npx playwright test -g "Lenovo"` | Run specific test |

---

## Test Results

✅ **Test 1:** Search for Computer  
✅ **Test 2:** Verify Lenovo IdeaCentre  

Both tests validate key functionality of the nopCommerce demo store.

---

## Documentation Files

- **TEST_DOCUMENTATION.md** - Detailed test guide
- **POM_IMPLEMENTATION.md** - Architecture explanation
- **VALIDATION_REPORT.md** - Full validation results

---

## Next Steps

1. ✅ Run `npm test` to execute
2. ✅ Review results in HTML report
3. ✅ Add more page objects for other sections
4. ✅ Integrate with CI/CD pipeline

---

**Ready to test?** Run `npm test` now! 🚀
