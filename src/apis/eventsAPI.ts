import axios from 'axios';

// Base URL for the API
import { BASE_API_URL } from '../utils/constants';

// Event interface based on the server response
export interface Event {
    _id: string;
    sportsCategory: string;
    venue: string;
    price: number;
    maxOccupancy: number;
    image: string;
    date: string;
    time: string;
    timeZone: string;
    football?: {
        homeTeam: string;
        awayTeam: string;
    };
    cricket?: {
        homeTeam: string;
        awayTeam: string;
    };
    f1?: {
        driver: string;
        team: string;
    };
}

// API response interface
export interface EventsResponse {
    status: boolean;
    message: string;
    length: number;
    events: Event[];
}

// Error response interface
export interface ApiError {
    status: boolean;
    message: string;
}

/**
 * Get all events from the server
 * @returns Promise<EventsResponse> - The events data
 */
export const getAllEvents = async (): Promise<EventsResponse> => {
    try {
        const response = await axios.get<EventsResponse>(`${BASE_API_URL}events`, {
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
