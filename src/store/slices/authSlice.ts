import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../../apis/authAPI';
import type { RegisterUserRequest } from '../../apis/authAPI';

// Types
export interface User {
    name: string;
    email: string;
    favorites: {
        sports: string[];
        drivers: string[];
        teams: string[];
    };
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

// Async thunks
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: RegisterUserRequest, { rejectWithValue }) => {
        try {
            const response = await authAPI.registerUser(userData);
            // Transform the response to ensure all arrays are defined
            const user: User = {
                name: response.user.name,
                email: response.user.email,
                favorites: {
                    sports: response.user.favorites.sports || [],
                    drivers: response.user.favorites.drivers || [],
                    teams: response.user.favorites.teams || [],
                },
            };
            return user;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
        }
    }
);

export const loginUser = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            // TODO: Implement login API call
            // const response = await authAPI.loginUser(credentials);
            // return response.user;
            throw new Error('Login API not implemented yet');
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
        }
    }
);

// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Register user
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Login user
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer; 