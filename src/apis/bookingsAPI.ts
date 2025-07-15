import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';
import type { CreateBookingRequest, CreateBookingResponse, ApiError } from '../utils/types';

// Create axios instance with base configuration
const apiClient = axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true, // Important for JWT cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// Bookings API functions
export const bookingsAPI = {
    // Create a new booking
    createBooking: async (bookingData: CreateBookingRequest): Promise<CreateBookingResponse> => {
        try {
            const response = await apiClient.post<CreateBookingResponse>('bookings/create', bookingData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorResponse = error.response?.data as ApiError;
                throw new Error(errorResponse?.message || 'Failed to create booking');
            }
            throw new Error('Failed to create booking');
        }
    },
};

export default bookingsAPI;
