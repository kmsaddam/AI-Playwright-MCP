# API Testing Documentation - RESTful Booker

## Overview

Comprehensive API test suite for the RESTful Booker service using Playwright's API testing capabilities. Tests cover all CRUD operations (Create, Read, Update, Delete) for hotel booking management.

**Base URL:** `https://restful-booker.herokuapp.com`

---

## API Endpoints

### 1. Create Booking (POST)

**Endpoint:** `POST /booking`

**Request Headers:**
```
Content-Type: application/json
Accept: application/json
```

**Request Body:**
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

**Expected Response (200):**
```json
{
  "bookingid": 1234,
  "booking": {
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
}
```

**Validation Points:**
- ✅ Status code: 200
- ✅ Response contains `bookingid`
- ✅ Response contains `booking` object with all fields
- ✅ Field types match (string, number, boolean, object)
- ✅ Date format validation (YYYY-MM-DD)

---

### 2. Get Booking (GET)

**Endpoint:** `GET /booking/{bookingid}`

**Response (200):**
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

**Validation Points:**
- ✅ Status code: 200
- ✅ All booking fields present and correct
- ✅ Data matches previously created booking

**Error Cases:**
- ❌ Non-existent booking: Returns 404

---

### 3. Update Booking (PUT)

**Endpoint:** `PUT /booking/{bookingid}`

**Request Headers:**
```
Content-Type: application/json
Accept: application/json
```

**Request Body:** (Same structure as POST)
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "totalprice": 600,
  "depositpaid": false,
  "bookingdates": {
    "checkin": "2026-05-01",
    "checkout": "2026-05-15"
  },
  "additionalneeds": "Breakfast and late checkout"
}
```

**Expected Response (200):**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "totalprice": 600,
  "depositpaid": false,
  "bookingdates": {
    "checkin": "2026-05-01",
    "checkout": "2026-05-15"
  },
  "additionalneeds": "Breakfast and late checkout"
}
```

**Validation Points:**
- ✅ Status code: 200
- ✅ Updated fields reflect changes
- ✅ Unchanged fields remain intact
- ✅ Response contains complete updated object

---

### 4. Delete Booking (DELETE)

**Endpoint:** `DELETE /booking/{bookingid}`

**Request Headers:**
```
Content-Type: application/json
```

**Expected Response:** 201 (No Content variant)

**Validation Points:**
- ✅ Status code: 201
- ✅ Subsequent GET returns 404
- ✅ Booking no longer retrievable

---

### 5. Get All Bookings (GET)

**Endpoint:** `GET /booking`

**Response (200):**
```json
[
  { "bookingid": 1 },
  { "bookingid": 2 },
  { "bookingid": 3 },
  ...
]
```

**Validation Points:**
- ✅ Status code: 200
- ✅ Response is an array
- ✅ Each element has `bookingid` property

---

## Test Cases Implemented

### ✅ Test 1: Create Booking
- Creates a new booking with valid data
- Validates response structure
- Verifies all fields are returned correctly
- Confirms bookingid is assigned

### ✅ Test 2: Get Booking
- Creates a booking
- Retrieves it by ID
- Validates data matches
- Confirms field integrity

### ✅ Test 3: Update Booking
- Creates a booking
- Updates multiple fields
- Validates changes persisted
- Confirms other fields unchanged

### ✅ Test 4: Delete Booking
- Creates a booking
- Deletes it
- Verifies 404 on subsequent GET
- Confirms resource removed

### ✅ Test 5: List Bookings
- Retrieves all bookings
- Validates array structure
- Confirms each has bookingid

### ✅ Test 6: Create Multiple Bookings
- Creates 3 bookings sequentially
- Validates each creation
- Confirms independent bookingids

### ✅ Test 7: Partial Update
- Creates booking with all fields
- Updates specific fields
- Validates updated fields
- Confirms unchanged fields preserved

### ✅ Test 8: Delete Verification
- Creates and deletes booking
- Verifies 404 response
- Confirms resource no longer exists

---

## Running the Tests

### Run All API Tests
```bash
npm test api-booking.spec.ts
```

### Run Specific Test
```bash
npx playwright test api-booking.spec.ts -g "POST"
```

### Run with UI Mode
```bash
npx playwright test api-booking.spec.ts --ui
```

### Run with Verbose Output
```bash
npx playwright test api-booking.spec.ts -v
```

### View Test Report
```bash
npx playwright show-report
```

---

## Request/Response Examples

### Example 1: Successful Booking Creation

**Request:**
```
POST /booking HTTP/1.1
Host: restful-booker.herokuapp.com
Content-Type: application/json
Accept: application/json

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

**Response:**
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "bookingid": 4521,
  "booking": {
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
}
```

---

### Example 2: Get Non-existent Booking

**Request:**
```
GET /booking/999999 HTTP/1.1
Host: restful-booker.herokuapp.com
```

**Response:**
```
HTTP/1.1 404 Not Found
Content-Type: text/html

(Empty or error message)
```

---

### Example 3: Update Booking

**Request:**
```
PUT /booking/4521 HTTP/1.1
Host: restful-booker.herokuapp.com
Content-Type: application/json
Accept: application/json

{
  "firstname": "John",
  "lastname": "Doe",
  "totalprice": 600,
  "depositpaid": false,
  "bookingdates": {
    "checkin": "2026-05-01",
    "checkout": "2026-05-15"
  },
  "additionalneeds": "Breakfast and spa access"
}
```

**Response:**
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Doe",
  "totalprice": 600,
  "depositpaid": false,
  "bookingdates": {
    "checkin": "2026-05-01",
    "checkout": "2026-05-15"
  },
  "additionalneeds": "Breakfast and spa access"
}
```

---

## API Test Utilities

### BookingAPI Helper Class

Located in: `tests/booking-api-helper.ts`

**Methods:**

```typescript
// Create a booking
await bookingAPI.createBooking(payload)

// Get a booking
await bookingAPI.getBooking(bookingId)

// Get all bookings
await bookingAPI.getAllBookings()

// Update a booking
await bookingAPI.updateBooking(bookingId, payload)

// Delete a booking
await bookingAPI.deleteBooking(bookingId)

// Create sample booking
BookingAPI.createSampleBooking(overrides)
```

**Example Usage:**
```typescript
import { BookingAPI } from '../booking-api-helper';

test('Create and verify booking', async ({ request }) => {
  const api = new BookingAPI(request);
  
  const payload = BookingAPI.createSampleBooking({
    firstname: 'Jane',
    totalprice: 750
  });
  
  const result = await api.createBooking(payload);
  expect(result.bookingid).toBeDefined();
});
```

---

## Test Assertions

### Field Type Validation
```typescript
expect(booking.firstname).toBe('John');        // String
expect(booking.totalprice).toBe(500);          // Number
expect(booking.depositpaid).toBe(true);        // Boolean
expect(booking.bookingdates).toBeDefined();    // Object
```

### Response Structure Validation
```typescript
expect(responseBody).toHaveProperty('bookingid');
expect(responseBody).toHaveProperty('booking');
expect(booking.bookingdates).toHaveProperty('checkin');
```

### Status Code Validation
```typescript
expect(response.status()).toBe(200);           // Success
expect(response.status()).toBe(201);           // Deleted
expect(response.status()).toBe(404);           // Not found
```

---

## Data Requirements

### Required Fields
- `firstname` (string): Guest first name
- `lastname` (string): Guest last name
- `totalprice` (number): Booking total price
- `depositpaid` (boolean): Deposit payment status
- `bookingdates` (object): Check-in and check-out dates

### Optional Fields
- `additionalneeds` (string): Special requests

### Date Format
- **Format:** `YYYY-MM-DD`
- **Example:** `2026-05-01`
- **Valid range:** Future dates recommended

---

## Error Handling

### Common HTTP Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | OK | Success |
| 201 | Created | Delete success |
| 400 | Bad Request | Invalid payload |
| 404 | Not Found | Booking doesn't exist |
| 500 | Server Error | Service issue |

### Test Error Recovery

The tests include error handling for:
- Missing required fields
- Invalid data types
- Non-existent resources
- Network timeouts

---

## Performance Considerations

### Response Times
- **POST (Create):** ~500-1000ms
- **GET (Retrieve):** ~100-300ms
- **PUT (Update):** ~500-1000ms
- **DELETE (Remove):** ~500-1000ms

### Best Practices
- Tests run independently
- No shared state between tests
- Automatic cleanup via bookingid tracking
- Parallel execution supported

---

## Continuous Integration

### Running in CI/CD Pipeline

```bash
# Install dependencies
npm install

# Run API tests
npm test api-booking.spec.ts

# Generate report
npx playwright show-report
```

### CI Configuration (GitHub Actions Example)
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

---

## Troubleshooting

### Issue: Tests timeout
**Solution:** Increase timeout in playwright.config.ts
```typescript
timeout: 30000
```

### Issue: 404 errors
**Solution:** Ensure bookingid is numeric and valid

### Issue: Connection refused
**Solution:** Check internet connection, verify API is accessible

### Issue: Assertion failures
**Solution:** Check test logs, verify response structure

---

## Key Features

✅ **Comprehensive Coverage** - All CRUD operations tested  
✅ **Type-Safe** - Full TypeScript support  
✅ **Reusable** - Helper class for common operations  
✅ **Independent** - Each test creates own data  
✅ **Self-Healing** - Handles API variations  
✅ **Well-Documented** - Extensive inline comments  
✅ **CI/CD Ready** - Easy pipeline integration  

---

## Summary

This API test suite provides production-ready tests for the RESTful Booker service with:

- ✅ 8 comprehensive test scenarios
- ✅ Full CRUD operation coverage
- ✅ Robust error handling
- ✅ Reusable utility classes
- ✅ Detailed documentation
- ✅ Ready for CI/CD integration

**Status:** ✅ Production Ready
