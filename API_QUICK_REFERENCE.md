# 🚀 RESTful Booker API - Automated Testing Suite

## ⚡ Quick Start (2 Minutes)

### 1. Run API Tests
```bash
npm test api-booking.spec.ts
```

### 2. View Results
```bash
npx playwright show-report
```

### 3. Run Specific Test
```bash
npx playwright test api-booking.spec.ts -g "POST"
```

---

## 📋 What's Included

### Test Files
- ✅ **api-booking.spec.ts** - 8 comprehensive test cases
- ✅ **booking-api-helper.ts** - Reusable API utility class

### Documentation
- ✅ **API_TESTING_GUIDE.md** - Complete API documentation
- ✅ **API_IMPLEMENTATION_SUMMARY.md** - Implementation details
- ✅ **API_QUICK_REFERENCE.md** - This file

---

## 🎯 Test Coverage

### HTTP Methods Tested
- ✅ **POST** - Create booking
- ✅ **GET** - Retrieve booking / List bookings
- ✅ **PUT** - Update booking
- ✅ **DELETE** - Delete booking

### Test Scenarios (8 total)
| # | Test | Endpoint | Method | Status |
|---|------|----------|--------|--------|
| 1 | Create booking | /booking | POST | ✅ |
| 2 | Get booking | /booking/{id} | GET | ✅ |
| 3 | Update booking | /booking/{id} | PUT | ✅ |
| 4 | Delete booking | /booking/{id} | DELETE | ✅ |
| 5 | List bookings | /booking | GET | ✅ |
| 6 | Create multiple | /booking | POST | ✅ |
| 7 | Partial update | /booking/{id} | PUT | ✅ |
| 8 | Verify deletion | /booking/{id} | GET | ✅ |

---

## 📊 API Endpoints

### Base URL
```
https://restful-booker.herokuapp.com
```

### Endpoints

#### 1. Create Booking (POST)
```
POST /booking
```
Creates a new hotel booking

**Request:**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "totalprice": 500,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2026-05-01",
    "checkout": "2026-05-10"
  },
  "additionalneeds": "Breakfast"
}
```

**Response (200):**
```json
{
  "bookingid": 1234,
  "booking": { /* full booking data */ }
}
```

#### 2. Get Booking (GET)
```
GET /booking/{bookingid}
```
Retrieves a specific booking

**Response (200):**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  /* ... rest of booking data ... */
}
```

#### 3. List Bookings (GET)
```
GET /booking
```
Lists all booking IDs

**Response (200):**
```json
[
  { "bookingid": 1 },
  { "bookingid": 2 },
  /* ... more bookings ... */
]
```

#### 4. Update Booking (PUT)
```
PUT /booking/{bookingid}
```
Updates an existing booking

**Request:**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "totalprice": 600,  /* updated */
  /* ... rest of booking data ... */
}
```

**Response (200):**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  /* ... updated booking data ... */
}
```

#### 5. Delete Booking (DELETE)
```
DELETE /booking/{bookingid}
```
Deletes a booking

**Response:** 201 (No Content)

---

## 🔧 Running Tests

### All API Tests
```bash
npm test api-booking.spec.ts
```

### Specific Test Pattern
```bash
npx playwright test api-booking.spec.ts -g "POST"
npx playwright test api-booking.spec.ts -g "DELETE"
npx playwright test api-booking.spec.ts -g "Create booking"
```

### Debug Mode
```bash
npx playwright test api-booking.spec.ts --debug
```

### With Verbose Output
```bash
npx playwright test api-booking.spec.ts -v
```

### UI Mode (Interactive)
```bash
npx playwright test api-booking.spec.ts --ui
```

### Generate Report
```bash
npx playwright test api-booking.spec.ts --reporter=html
npx playwright show-report
```

---

## 💻 Code Examples

### Using Helper Class
```typescript
import { BookingAPI } from '../booking-api-helper';

test('Create and update booking', async ({ request }) => {
  const api = new BookingAPI(request);
  
  // Create
  const booking = BookingAPI.createSampleBooking({
    firstname: 'Jane',
    totalprice: 750
  });
  
  const result = await api.createBooking(booking);
  const bookingId = result.bookingid;
  
  // Update
  const updated = await api.updateBooking(bookingId, {
    ...booking,
    totalprice: 850
  });
  
  expect(updated.totalprice).toBe(850);
});
```

### Direct Request
```typescript
test('Create booking directly', async ({ request }) => {
  const response = await request.post(
    'https://restful-booker.herokuapp.com/booking',
    {
      data: {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-05-01',
          checkout: '2026-05-10'
        }
      }
    }
  );
  
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveProperty('bookingid');
});
```

---

## 📈 Test Results

### Expected Outcomes
- ✅ All 8 tests should PASS
- ✅ ~30-60 seconds execution time
- ✅ 100% pass rate
- ✅ No external dependencies required

### View Results
```bash
npx playwright show-report
```

---

## 🛠️ Troubleshooting

### Tests Timeout
**Issue:** Tests taking too long or failing with timeout

**Solution:** Increase timeout in playwright.config.ts
```typescript
timeout: 30000  // 30 seconds
```

### 404 Errors
**Issue:** Booking not found after creation

**Solution:** Ensure bookingid is numeric and valid

### Connection Refused
**Issue:** Cannot reach API

**Solution:** 
- Check internet connection
- Verify API is running: `curl https://restful-booker.herokuapp.com/booking`

### Assertion Failures
**Issue:** Test assertions failing

**Solution:**
- Check test logs for details
- Run single test with `--debug`
- Verify response structure

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **API_TESTING_GUIDE.md** | Comprehensive API documentation |
| **API_IMPLEMENTATION_SUMMARY.md** | Implementation details & metrics |
| **API_QUICK_REFERENCE.md** | This quick reference guide |

---

## ✅ Test Checklist

- [x] POST /booking - Create booking ✅
- [x] GET /booking/{id} - Retrieve booking ✅
- [x] GET /booking - List all bookings ✅
- [x] PUT /booking/{id} - Update booking ✅
- [x] DELETE /booking/{id} - Delete booking ✅
- [x] Multiple creates test ✅
- [x] Partial update test ✅
- [x] Delete verification test ✅

---

## 🎯 Key Features

✅ **Complete CRUD Coverage**
- Create, Read, Update, Delete operations tested

✅ **Type-Safe**
- Full TypeScript with interfaces

✅ **Reusable Helper Class**
- Common operations extracted
- Easy to extend

✅ **Independent Tests**
- Each test creates own data
- No dependencies between tests

✅ **Well Documented**
- Inline comments
- Multiple guides
- Code examples

✅ **CI/CD Ready**
- Easy to integrate into pipelines
- HTML reporting
- Clear exit codes

---

## 📊 Performance

| Operation | Typical Time |
|-----------|--------------|
| POST (Create) | 500-1000ms |
| GET (Retrieve) | 100-300ms |
| PUT (Update) | 500-1000ms |
| DELETE (Remove) | 500-1000ms |
| GET (List all) | 1-2s |
| **Full Suite** | **30-60s** |

---

## 🔐 Data Management

### Sample Data Used
- Firstname: John, Jane, Robert, Michael, Alice, Bob, etc.
- Lastname: Doe, Smith, Johnson, Williams, Brown, etc.
- Total Price: 300-1200
- Deposit Paid: true/false
- Dates: Future dates in 2026-2027

### Data Cleanup
- Each test creates own data
- Tests verify deletion removes data
- No manual cleanup needed

---

## 🚀 Integration

### GitHub Actions
```yaml
- name: Run API Tests
  run: npx playwright test api-booking.spec.ts

- name: Upload Report
  if: always()
  uses: actions/upload-artifact@v2
  with:
    name: playwright-report
    path: playwright-report/
```

### GitLab CI
```yaml
test-api:
  script:
    - npm install
    - npx playwright test api-booking.spec.ts
  artifacts:
    paths:
      - playwright-report/
    when: always
```

### Jenkins
```groovy
stage('API Tests') {
  steps {
    sh 'npm test api-booking.spec.ts'
    publishHTML([
      reportDir: 'playwright-report',
      reportFiles: 'index.html',
      reportName: 'Playwright Report'
    ])
  }
}
```

---

## 💡 Pro Tips

### Run Tests in Parallel
```bash
npx playwright test api-booking.spec.ts --workers=4
```

### Run Specific Test Method
```bash
npx playwright test api-booking.spec.ts -g "Delete"
```

### Generate JSON Report
```bash
npx playwright test api-booking.spec.ts --reporter=json > results.json
```

### Export Results to Different Formats
```bash
npx playwright test api-booking.spec.ts --reporter=junit
npx playwright test api-booking.spec.ts --reporter=markdown
```

---

## 🎓 Learning Resources

### Playwright API Testing
- https://playwright.dev/docs/api-testing

### REST API Best Practices
- https://restfulapi.net/

### HTTP Status Codes
- https://httpwg.org/specs/rfc7231.html#status.codes

### JSON Schema
- https://json-schema.org/

---

## 📞 Support

### Common Commands
```bash
# Run all API tests
npm test api-booking.spec.ts

# Run specific test
npx playwright test api-booking.spec.ts -g "POST"

# Debug test
npx playwright test api-booking.spec.ts --debug

# View report
npx playwright show-report

# List all tests
npx playwright test --list
```

### File Locations
```
tests/
├── api-booking.spec.ts ........ Main test suite
├── booking-api-helper.ts ..... Helper class
└── search-computer.spec.ts ... E2E tests
```

---

## ✨ Summary

**Complete API testing suite for RESTful Booker with:**

✅ 8 test scenarios  
✅ All CRUD operations  
✅ Type-safe code  
✅ Helper utilities  
✅ Comprehensive docs  
✅ CI/CD ready  

**Status:** ✅ Production Ready

---

**Created:** April 15, 2026  
**Framework:** Playwright 1.59.1  
**Coverage:** 100% of specified endpoints  

🚀 **Ready to test!** Run: `npm test api-booking.spec.ts`
