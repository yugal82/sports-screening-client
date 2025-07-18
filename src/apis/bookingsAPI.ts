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
    // Update booking status
    updateBookingStatus: async (bookingId: string, status: string, paymentStatus: string): Promise<any> => {
        try {
            const response = await apiClient.put<any>(`bookings/${bookingId}`, { status, paymentStatus });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorResponse = error.response?.data as ApiError;
                throw new Error(errorResponse?.message || 'Failed to update booking status');
            }
            throw new Error('Failed to update booking status');
        }
    },
    // Cancel booking
    cancelBooking: async (bookingId: string): Promise<any> => {
        try {
            const response = await apiClient.delete<any>(`bookings/${bookingId}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorResponse = error.response?.data as ApiError;
                throw new Error(errorResponse?.message || 'Failed to cancel booking');
            }
            throw new Error('Failed to cancel booking');
        }
    },
};

export default bookingsAPI;
