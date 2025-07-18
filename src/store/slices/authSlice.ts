import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../../apis/authAPI';
import type {
    RegisterUserRequest,
    LoginUserRequest,
    User,
    AuthState
} from '../../utils/types';

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isInitialized: false,
};

// Async thunks
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: RegisterUserRequest, { rejectWithValue }) => {
        try {
            const response = await authAPI.registerUser(userData);
            // Transform the response to ensure all arrays are defined
            const user: User = {
                userId: response.user._id,
                name: response.user.name,
                email: response.user.email,
                favorites: {
                    sports: response.user.favorites.sports || [],
                    drivers: response.user.favorites.drivers || [],
                    teams: response.user.favorites.teams || [],
                },
                bookings: response.user.bookings || [],
            };
            return user;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
        }
    }
);

export const loginUser = createAsyncThunk<User, LoginUserRequest, { rejectValue: string }>(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authAPI.loginUser(credentials);
            // Transform the response to match our User interface
            const user: User = {
                userId: response.user._id,
                name: response.user.name,
                email: response.user.email,
                favorites: {
                    sports: response.user.favorites.sports,
                    drivers: response.user.favorites.drivers,
                    teams: response.user.favorites.teams,
                },
                bookings: response.user.bookings || [],
            };
            return user;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await authAPI.logoutUser();
            return true;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Logout failed');
        }
    }
);

export const validateAuth = createAsyncThunk(
    'auth/validateAuth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authAPI.validateToken();
            // Transform the response to match our User interface
            const user: User = {
                userId: response.user._id,
                name: response.user.name,
                email: response.user.email,
                favorites: {
                    sports: response.user.favorites.sports,
                    drivers: response.user.favorites.drivers,
                    teams: response.user.favorites.teams,
                },
                bookings: response.user.bookings || [],
            };
            return user;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Token validation failed');
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
        addBooking: (state, action: PayloadAction<any>) => {
            if (state.user) {
                state.user.bookings.push(action.payload);
            }
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
            })
            // Logout user
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Validate auth
            .addCase(validateAuth.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(validateAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
                state.isInitialized = true;
            })
            .addCase(validateAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
                state.isInitialized = true;
            });
    },
});

export const { logout, clearError, setUser, addBooking } = authSlice.actions;
export default authSlice.reducer; 