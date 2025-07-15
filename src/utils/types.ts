// Auth Types
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

export interface LoginUserRequest {
    email: string;
    password: string;
}

export interface Booking {
    _id: string;
    userId: {
        _id: string;
        name: string;
        email: string;
    };
    eventId: {
        _id: string;
        sportsCategory: string;
        venue: string;
        price: number;
        date: string;
        time: string;
        availableSeats: number;
    };
    qrCodeData: string;
    quantity: number;
    price: number;
    __v: number;
}

export interface CreateBookingRequest {
    eventId: string;
    quantity: number;
    price: number;
}

export interface CreateBookingResponse {
    status: boolean;
    message: string;
    booking: Booking;
}

export interface User {
    name: string;
    email: string;
    favorites: {
        sports: string[];
        drivers: string[];
        teams: string[];
    };
    bookings: Booking[];
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
        bookings?: Booking[];
    };
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
        bookings: Booking[];
    };
}

export interface LogoutResponse {
    status: boolean;
    message: string;
}

export interface ValidateTokenResponse {
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
        bookings: Booking[];
    };
}

// Auth State Types
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    isInitialized: boolean;
}

// Event Types
export interface Event {
    _id: string;
    sportsCategory: string;
    venue: string;
    price: number;
    maxOccupancy: number;
    availableSeats: number;
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

export interface EventsResponse {
    status: boolean;
    message: string;
    length: number;
    events: Event[];
}

export interface ApiError {
    status: boolean;
    message: string;
}

// Events State Types
export interface EventsState {
    events: Event[];
    isLoading: boolean;
    error: string | null;
}

// Booking State Types
export interface BookingState {
    currentBooking: Booking | null;
    isLoading: boolean;
    error: string | null;
    success: string | null;
}
