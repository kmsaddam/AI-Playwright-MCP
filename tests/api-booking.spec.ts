import { test, expect } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

test.describe('RESTful Booker API - CRUD Operations', () => {
  let bookingId: number;

  test('POST /booking - Create a new booking', async ({ request }) => {
    const bookingPayload = {
      firstname: 'John',
      lastname: 'Doe',
      totalprice: 500,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-05-01',
        checkout: '2026-05-10'
      },
      additionalneeds: 'Breakfast'
    };

    const response = await request.post(`${BASE_URL}/booking`, {
      data: bookingPayload,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('POST Response Status:', response.status());
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('POST Response Body:', JSON.stringify(responseBody, null, 2));

    // Validate response structure
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody).toHaveProperty('booking');
    
    bookingId = responseBody.bookingid;
    const createdBooking = responseBody.booking;

    // Validate booking details
    expect(createdBooking.firstname).toBe('John');
    expect(createdBooking.lastname).toBe('Doe');
    expect(createdBooking.totalprice).toBe(500);
    expect(createdBooking.depositpaid).toBe(true);
    expect(createdBooking.bookingdates.checkin).toBe('2026-05-01');
    expect(createdBooking.bookingdates.checkout).toBe('2026-05-10');
    expect(createdBooking.additionalneeds).toBe('Breakfast');

    console.log(`✅ POST Test Passed: Booking created with ID: ${bookingId}`);
  });

  test('GET /booking/{id} - Retrieve created booking', async ({ request }) => {
    // First create a booking
    const bookingPayload = {
      firstname: 'Jane',
      lastname: 'Smith',
      totalprice: 750,
      depositpaid: false,
      bookingdates: {
        checkin: '2026-06-01',
        checkout: '2026-06-15'
      }
    };

    const createResponse = await request.post(`${BASE_URL}/booking`, {
      data: bookingPayload,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(createResponse.status()).toBe(200);
    const createdData = await createResponse.json();
    const newBookingId = createdData.bookingid;

    // Now retrieve it
    const getResponse = await request.get(`${BASE_URL}/booking/${newBookingId}`);
    console.log('GET Response Status:', getResponse.status());
    expect(getResponse.status()).toBe(200);

    const booking = await getResponse.json();
    console.log('GET Response Body:', JSON.stringify(booking, null, 2));

    // Validate retrieved booking matches created data
    expect(booking.firstname).toBe('Jane');
    expect(booking.lastname).toBe('Smith');
    expect(booking.totalprice).toBe(750);
    expect(booking.depositpaid).toBe(false);

    console.log(`✅ GET Test Passed: Booking ${newBookingId} retrieved successfully`);
  });

  test('PUT /booking/{id} - Update existing booking', async ({ request }) => {
    // Create a booking first
    const initialPayload = {
      firstname: 'Robert',
      lastname: 'Johnson',
      totalprice: 300,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-07-01',
        checkout: '2026-07-05'
      },
      additionalneeds: 'Non-smoking room'
    };

    const createResponse = await request.post(`${BASE_URL}/booking`, {
      data: initialPayload,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(createResponse.status()).toBe(200);
    const createdData = await createResponse.json();
    const bookingIdToUpdate = createdData.bookingid;
    console.log(`Created booking ${bookingIdToUpdate} for update test`);

    // Update the booking
    const updatePayload = {
      firstname: 'Robert',
      lastname: 'Johnson',
      totalprice: 450,
      depositpaid: false,
      bookingdates: {
        checkin: '2026-07-01',
        checkout: '2026-07-10'
      },
      additionalneeds: 'Non-smoking room with sea view'
    };

    const updateResponse = await request.put(`${BASE_URL}/booking/${bookingIdToUpdate}`, {
      data: updatePayload,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('PUT Response Status:', updateResponse.status());
    expect(updateResponse.status()).toBe(200);

    const updatedBooking = await updateResponse.json();
    console.log('PUT Response Body:', JSON.stringify(updatedBooking, null, 2));

    // Validate updates
    expect(updatedBooking.totalprice).toBe(450);
    expect(updatedBooking.depositpaid).toBe(false);
    expect(updatedBooking.bookingdates.checkout).toBe('2026-07-10');
    expect(updatedBooking.additionalneeds).toBe('Non-smoking room with sea view');

    console.log(`✅ PUT Test Passed: Booking ${bookingIdToUpdate} updated successfully`);
  });

  test('DELETE /booking/{id} - Delete a booking', async ({ request }) => {
    // Create a booking first
    const bookingPayload = {
      firstname: 'Michael',
      lastname: 'Williams',
      totalprice: 600,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-08-01',
        checkout: '2026-08-07'
      }
    };

    const createResponse = await request.post(`${BASE_URL}/booking`, {
      data: bookingPayload,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(createResponse.status()).toBe(200);
    const createdData = await createResponse.json();
    const bookingIdToDelete = createdData.bookingid;
    console.log(`Created booking ${bookingIdToDelete} for deletion test`);

    // Delete the booking
    const deleteResponse = await request.delete(`${BASE_URL}/booking/${bookingIdToDelete}`, {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('DELETE Response Status:', deleteResponse.status());
    expect(deleteResponse.status()).toBe(201);

    // Try to retrieve deleted booking - should get 404
    const getResponse = await request.get(`${BASE_URL}/booking/${bookingIdToDelete}`);
    console.log('GET deleted booking status:', getResponse.status());
    expect(getResponse.status()).toBe(404);

    console.log(`✅ DELETE Test Passed: Booking ${bookingIdToDelete} deleted successfully`);
  });

  test('GET /booking - List all bookings', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking`);
    
    console.log('GET /booking Response Status:', response.status());
    expect(response.status()).toBe(200);

    const bookings = await response.json();
    console.log(`Found ${bookings.length} total bookings`);
    
    // Validate response is an array
    expect(Array.isArray(bookings)).toBe(true);
    
    // Validate structure of first booking (if exists)
    if (bookings.length > 0) {
      expect(bookings[0]).toHaveProperty('bookingid');
      console.log(`✅ GET /booking Test Passed: Listed ${bookings.length} bookings`);
    }
  });

  test('POST /booking - Create multiple bookings', async ({ request }) => {
    const bookings = [
      {
        firstname: 'Alice',
        lastname: 'Brown',
        totalprice: 400,
        depositpaid: true,
        bookingdates: { checkin: '2026-11-01', checkout: '2026-11-05' }
      },
      {
        firstname: 'Bob',
        lastname: 'Green',
        totalprice: 550,
        depositpaid: false,
        bookingdates: { checkin: '2026-12-01', checkout: '2026-12-07' }
      },
      {
        firstname: 'Charlie',
        lastname: 'White',
        totalprice: 650,
        depositpaid: true,
        bookingdates: { checkin: '2027-01-01', checkout: '2027-01-10' }
      }
    ];

    const createdIds = [];

    for (const booking of bookings) {
      const response = await request.post(`${BASE_URL}/booking`, {
        data: booking,
        headers: { 'Content-Type': 'application/json' }
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      createdIds.push(data.bookingid);
      console.log(`Created booking: ${data.bookingid}`);
    }

    expect(createdIds.length).toBe(3);
    console.log(`✅ POST Multiple Test Passed: Created ${createdIds.length} bookings`);
  });

  test('PUT /booking/{id} - Update partial fields', async ({ request }) => {
    // Create a booking
    const initialPayload = {
      firstname: 'Diana',
      lastname: 'Prince',
      totalprice: 900,
      depositpaid: true,
      bookingdates: { checkin: '2026-04-01', checkout: '2026-04-10' },
      additionalneeds: 'Parking'
    };

    const createResponse = await request.post(`${BASE_URL}/booking`, {
      data: initialPayload,
      headers: { 'Content-Type': 'application/json' }
    });

    const createdData = await createResponse.json();
    const bookingId = createdData.bookingid;

    // Update specific fields
    const updatePayload = {
      firstname: 'Diana',
      lastname: 'Prince',
      totalprice: 1200,
      depositpaid: false,
      bookingdates: { checkin: '2026-04-01', checkout: '2026-04-15' },
      additionalneeds: 'Parking and breakfast'
    };

    const updateResponse = await request.put(`${BASE_URL}/booking/${bookingId}`, {
      data: updatePayload,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(updateResponse.status()).toBe(200);
    const updated = await updateResponse.json();

    expect(updated.totalprice).toBe(1200);
    expect(updated.depositpaid).toBe(false);
    expect(updated.bookingdates.checkout).toBe('2026-04-15');
    expect(updated.additionalneeds).toBe('Parking and breakfast');

    console.log(`✅ PUT Partial Update Test Passed: Booking ${bookingId} updated`);
  });

  test('DELETE /booking/{id} - Verify 404 for deleted resource', async ({ request }) => {
    // Create a booking
    const bookingPayload = {
      firstname: 'Eve',
      lastname: 'Taylor',
      totalprice: 400,
      depositpaid: true,
      bookingdates: { checkin: '2026-03-01', checkout: '2026-03-05' }
    };

    const createResponse = await request.post(`${BASE_URL}/booking`, {
      data: bookingPayload,
      headers: { 'Content-Type': 'application/json' }
    });

    const createdData = await createResponse.json();
    const bookingId = createdData.bookingid;

    // Delete it
    const deleteResponse = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
      headers: { 'Content-Type': 'application/json' }
    });

    expect(deleteResponse.status()).toBe(201);

    // Verify it's gone
    const getResponse = await request.get(`${BASE_URL}/booking/${bookingId}`);
    expect(getResponse.status()).toBe(404);

    console.log(`✅ DELETE Verify 404 Test Passed: Booking ${bookingId} no longer exists`);
  });
});
