import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';
import type {
    RegisterUserRequest,
    LoginUserRequest,
    RegisterUserResponse,
    LoginUserResponse,
    LogoutResponse,
    ValidateTokenResponse,
} from '../utils/types';

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

    // Validate JWT token
    validateToken: async (): Promise<ValidateTokenResponse> => {
        try {
            const response = await apiClient.get<ValidateTokenResponse>('users/me');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Token validation failed');
            }
            throw new Error('Token validation failed');
        }
    },
};

export default authAPI;
