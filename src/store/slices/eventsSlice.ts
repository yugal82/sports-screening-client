import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getAllEvents } from '../../apis/eventsAPI';
import type { Event, EventsState } from '../../utils/types';

const initialState: EventsState = {
    events: [],
    isLoading: false,
    error: null,
};

// Async thunk to fetch events
export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async ({ query }: { query?: string } = {}, { rejectWithValue }) => {
        try {
            const response = await getAllEvents(query);
            return response.events;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch events');
        }
    }
);

// Events slice
const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        clearEventsError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
                state.isLoading = false;
                state.events = action.payload;
                state.error = null;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearEventsError } = eventsSlice.actions;
export default eventsSlice.reducer; 