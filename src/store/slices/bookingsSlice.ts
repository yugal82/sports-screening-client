import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { bookingsAPI } from '../../apis/bookingsAPI';
import type { CreateBookingRequest, Booking, BookingState } from '../../utils/types';

const initialState: BookingState = {
    currentBooking: null,
    isLoading: false,
    error: null,
    success: null,
};

// Async thunk to create booking
export const createBooking = createAsyncThunk(
    'bookings/createBooking',
    async (bookingData: CreateBookingRequest, { rejectWithValue }) => {
        try {
            const response = await bookingsAPI.createBooking(bookingData);
            return response.booking;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to create booking');
        }
    }
);

// Bookings slice
const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        clearBookingError: (state) => {
            state.error = null;
        },
        clearBookingSuccess: (state) => {
            state.success = null;
        },
        clearCurrentBooking: (state) => {
            state.currentBooking = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBooking.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(createBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
                state.isLoading = false;
                state.currentBooking = action.payload;
                state.success = 'Booking created successfully!';
                state.error = null;
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.success = null;
            });
    },
});

export const { clearBookingError, clearBookingSuccess, clearCurrentBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer; 