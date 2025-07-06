import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';

// Types for registration
export interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
    favorites: {
        sports?: string[];
        drivers?: string[];
        teams?: string[];
    };
}

export interface RegisterUserResponse {
    status: boolean;
    message: string;
    user: {
        name: string;
        email: string;
        favorites: {
            sports?: string[];
            drivers?: string[];
            teams?: string[];
        };
    };
}

// Types for login
export interface LoginUserRequest {
    email: string;
    password: string;
}

export interface LoginUserResponse {
    status: boolean;
    message: string;
    user: {
        name: string;
        email: string;
        favorites: {
            sports: string[];
            drivers: string[];
            teams: string[];
        };
    };
}

// Types for logout
export interface LogoutResponse {
    status: boolean;
    message: string;
}

// Create axios instance with base configuration
const apiClient = axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true, // Important for JWT cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// Auth API functions
export const authAPI = {
    // Register a new user
    registerUser: async (userData: RegisterUserRequest): Promise<RegisterUserResponse> => {
        try {
            const response = await apiClient.post<RegisterUserResponse>('users/register', userData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Registration failed');
            }
            throw new Error('Registration failed');
        }
    },

    // Login user
    loginUser: async (credentials: LoginUserRequest): Promise<LoginUserResponse> => {
        try {
            const response = await apiClient.post<LoginUserResponse>('users/login', credentials);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Login failed');
            }
            throw new Error('Login failed');
        }
    },

    // Logout user
    logoutUser: async (): Promise<LogoutResponse> => {
        try {
            const response = await apiClient.get<LogoutResponse>('users/logout');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Logout failed');
            }
            throw new Error('Logout failed');
        }
    },
};

export default authAPI;
