import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getAllEvents, type Event, type EventsResponse } from '../../apis/eventsAPI';

// Types
export interface EventsState {
    events: Event[];
    isLoading: boolean;
    error: string | null;
    isInitialized: boolean;
}

const initialState: EventsState = {
    events: [],
    isLoading: false,
    error: null,
    isInitialized: false,
};

// Async thunks
export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (_, { rejectWithValue }) => {
        try {
            const response: EventsResponse = await getAllEvents();
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
        setEvents: (state, action: PayloadAction<Event[]>) => {
            state.events = action.payload;
        },
        addEvent: (state, action: PayloadAction<Event>) => {
            state.events.push(action.payload);
        },
        updateEvent: (state, action: PayloadAction<Event>) => {
            const index = state.events.findIndex(event => event._id === action.payload._id);
            if (index !== -1) {
                state.events[index] = action.payload;
            }
        },
        removeEvent: (state, action: PayloadAction<string>) => {
            state.events = state.events.filter(event => event._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        // Fetch events
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.events = action.payload;
                state.error = null;
                state.isInitialized = true;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isInitialized = true;
            });
    },
});

export const {
    clearEventsError,
    setEvents,
    addEvent,
    updateEvent,
    removeEvent
} = eventsSlice.actions;

export default eventsSlice.reducer; 