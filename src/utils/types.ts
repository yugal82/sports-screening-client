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
    userId: string;
    eventId: {
        _id: string;
        sportsCategory: string;
        venue: string;
        date: string;
        time: string;
        price: number;
        image: string;
    };
    quantity: number;
    price: number;
    qrCodeData: string;
    createdAt: string;
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
