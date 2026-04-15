import { APIRequestContext } from '@playwright/test';

export interface BookingPayload {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: string;
}

export interface BookingResponse {
  bookingid: number;
  booking: BookingPayload;
}

export class BookingAPI {
  private baseUrl: string;
  private request: APIRequestContext;

  constructor(request: APIRequestContext, baseUrl: string = 'https://restful-booker.herokuapp.com') {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  /**
   * Create a new booking
   */
  async createBooking(payload: BookingPayload): Promise<BookingResponse> {
    const response = await this.request.post(`${this.baseUrl}/booking`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok()) {
      throw new Error(`Failed to create booking. Status: ${response.status()}`);
    }

    return await response.json();
  }

  /**
   * Get booking by ID
   */
  async getBooking(bookingId: number): Promise<BookingPayload | null> {
    const response = await this.request.get(`${this.baseUrl}/booking/${bookingId}`);

    if (response.status() === 404) {
      return null;
    }

    if (!response.ok()) {
      throw new Error(`Failed to get booking. Status: ${response.status()}`);
    }

    return await response.json();
  }

  /**
   * Get all bookings
   */
  async getAllBookings(): Promise<Array<{ bookingid: number }>> {
    const response = await this.request.get(`${this.baseUrl}/booking`);

    if (!response.ok()) {
      throw new Error(`Failed to get bookings. Status: ${response.status()}`);
    }

    return await response.json();
  }

  /**
   * Update an existing booking
   */
  async updateBooking(bookingId: number, payload: BookingPayload): Promise<BookingPayload> {
    const response = await this.request.put(`${this.baseUrl}/booking/${bookingId}`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok()) {
      throw new Error(`Failed to update booking. Status: ${response.status()}`);
    }

    return await response.json();
  }

  /**
   * Delete a booking
   */
  async deleteBooking(bookingId: number): Promise<void> {
    const response = await this.request.delete(`${this.baseUrl}/booking/${bookingId}`, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok()) {
      throw new Error(`Failed to delete booking. Status: ${response.status()}`);
    }
  }

  /**
   * Create a sample booking for testing
   */
  static createSampleBooking(overrides?: Partial<BookingPayload>): BookingPayload {
    const now = new Date();
    const checkIn = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    const checkOut = new Date(checkIn.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days later

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    return {
      firstname: 'Test',
      lastname: 'User',
      totalprice: 500,
      depositpaid: true,
      bookingdates: {
        checkin: formatDate(checkIn),
        checkout: formatDate(checkOut)
      },
      additionalneeds: 'Breakfast',
      ...overrides
    };
  }
}
