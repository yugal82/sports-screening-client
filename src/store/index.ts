import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import eventsReducer from './slices/eventsSlice';
import bookingsReducer from './slices/bookingsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        events: eventsReducer,
        bookings: bookingsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['auth/loginSuccess', 'auth/registerSuccess'],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 