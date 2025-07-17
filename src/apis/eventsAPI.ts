import axios from 'axios';

// Base URL for the API
import { BASE_API_URL } from '../utils/constants';
import type { EventsResponse, ApiError } from '../utils/types';

/**
 * Get all events from the server
 * @returns Promise<EventsResponse> - The events data
 */
export const getAllEvents = async (query?: string): Promise<EventsResponse> => {
    try {
        const url = query ? `${BASE_API_URL}events${query.startsWith('?') ? query : '?' + query}` : `${BASE_API_URL}events`;
        const response = await axios.get<EventsResponse>(url, {
            withCredentials: true, // Include cookies for authentication
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorResponse = error.response?.data as ApiError;
            throw new Error(errorResponse?.message || 'Failed to fetch events');
        }
        throw new Error('Failed to fetch events');
    }
};
