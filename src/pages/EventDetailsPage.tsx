import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MapPin, Calendar, DollarSign, Clock, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { QRCodeDisplay } from '../components/QRCodeDisplay';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  createBooking,
  clearBookingError,
  clearBookingSuccess,
  clearCurrentBooking,
} from '../store/slices/bookingsSlice';
import { addBooking } from '../store/slices/authSlice';
import type { Event } from '../utils/types';
import EventMap from '../components/EventMap';
import FallbackImage from '../assets/feature-2.webp';
import checkoutAPI from '../apis/checkoutAPI';

// Helper function to get event title based on sports category
const getEventTitle = (event: Event): string => {
  switch (event.sportsCategory) {
    case 'football':
      return event.football ? `${event.football.homeTeam} vs ${event.football.awayTeam}` : 'Football Match';
    case 'cricket':
      return event.cricket ? `${event.cricket.homeTeam} vs ${event.cricket.awayTeam}` : 'Cricket Match';
    case 'f1':
      return event.f1 ? `${event.f1.driver} - ${event.f1.team}` : 'F1 Race';
    default:
      return `${event.sportsCategory.charAt(0).toUpperCase() + event.sportsCategory.slice(1)} Event`;
  }
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Helper function to slugify
const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');

export function EventDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.events);
  const { currentBooking, isLoading, error, success } = useAppSelector((state) => state.bookings);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showQR, setShowQR] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (events.length > 0 && slug) {
      // Find event by slug
      const event = events.find((event) => {
        const eventTitle = getEventTitle(event);
        const eventSlug = slugify(eventTitle);
        return eventSlug === slug;
      });

      if (event) {
        setSelectedEvent(event);
      } else {
        // Event not found, redirect to events page
        navigate('/events');
      }
    }
  }, [events, slug, navigate]);

  // Clear booking state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearCurrentBooking());
      dispatch(clearBookingError());
      dispatch(clearBookingSuccess());
    };
  }, [dispatch]);

  // Show QR code when booking is successful
  useEffect(() => {
    if (currentBooking && success) {
      setShowQR(true);
      // Add the booking to the user's bookings
      dispatch(addBooking(currentBooking));
    }
  }, [currentBooking, success, dispatch]);

  useEffect(() => {
    if (location.state && location.state.showQR) {
      setShowQR(true);
    }
  }, [location.state]);

  const handlePurchase = async () => {
    if (!selectedEvent || !user) return;
    try {
      // 1. Create a booking (pending, not confirmed)
      const bookingRes = await dispatch(
        createBooking({
          eventId: selectedEvent._id,
          quantity: quantity,
          price: selectedEvent.price * quantity,
        })
      ).unwrap();
      const bookingId = bookingRes._id;
      // 2. Create payment intent
      const paymentIntentRes = await checkoutAPI.createPaymentIntent({
        amount: selectedEvent.price * quantity,
        currency: 'inr',
        bookingId,
        eventId: selectedEvent._id,
        userId: user.userId,
      });
      // Navigate to checkout page with event details and clientSecret
      navigate('/checkout', {
        state: {
          event: {
            ...selectedEvent,
            title: getEventTitle(selectedEvent),
          },
          quantity,
          clientSecret: paymentIntentRes.data.clientSecret,
        },
      });
    } catch (error: any) {
      // setPaymentError(error.message || 'Failed to initiate payment'); // This line is removed
    } finally {
      // setPaymentProcessing(false); // This line is removed
    }
  };

  if (!selectedEvent) {
    return (
      <div className="bg-[#121212] min-h-screen text-white">
        <Header />
        <main className="container mx-auto px-8 py-12 min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1DB954] mx-auto mb-4"></div>
            <p className="text-[#B3B3B3]">Loading event details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#121212] min-h-screen text-white">
      <Header />
      <main className="flex flex-col lg:flex-row min-h-screen">
        {/* Left: Image and Map */}
        <div className="lg:flex-1 flex flex-col items-center justify-center bg-[#121212] p-8">
          <img
            src={selectedEvent.image}
            alt={getEventTitle(selectedEvent)}
            className="object-cover rounded-2xl w-full max-w-2xl"
            style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.5)' }}
            onError={(e) => {
              // Fallback image if the event image fails to load
              (e.target as HTMLImageElement).src = FallbackImage;
            }}
          />
          {/* Map */}
          {selectedEvent.coordinates && (
            <EventMap coordinates={selectedEvent.coordinates} venue={selectedEvent.venue} />
          )}
        </div>
        {/* Right: Details */}
        <div className="lg:flex-1 flex flex-col justify-center p-8 max-w-xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">{getEventTitle(selectedEvent)}</h1>

          {/* Venue */}
          <div className="flex items-center text-[#1DB954] mb-2 text-lg font-medium">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="text-[#1DB954]">{selectedEvent.venue}</span>
          </div>

          {/* Date and Time in same row */}
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="flex items-center text-white text-lg">
              <Calendar className="w-5 h-5 mr-2 text-[#1DB954]" />
              <span>{formatDate(selectedEvent.date)}</span>
            </div>
            <div className="flex items-center text-white text-lg">
              <Clock className="w-5 h-5 mr-2 text-[#1DB954]" />
              <span>
                {selectedEvent.time} ({selectedEvent.timeZone})
              </span>
            </div>
          </div>

          {/* Max Occupancy and Available Seats in same row */}
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="flex items-center text-white text-lg">
              <Users className="w-5 h-5 mr-2 text-[#1DB954]" />
              <span>Max: {selectedEvent.maxOccupancy}</span>
            </div>
            <div className="flex items-center text-white text-lg">
              <Users className="w-5 h-5 mr-2 text-[#1DB954]" />
              <span>Available: {selectedEvent.availableSeats}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center text-white mb-4 text-lg">
            <DollarSign className="w-5 h-5 mr-2 text-[#1DB954]" />
            <span className="text-[#1DB954] font-bold text-xl">₹{selectedEvent.price.toFixed(2)}</span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-4 bg-green-900/20 border border-green-500/50 rounded-lg">
              <p className="text-green-400 text-sm">{success}</p>
            </div>
          )}

          {/* Quantity and Purchase button in same row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-transparent border border-[#535353] text-white py-3 px-4 rounded-md text-lg outline-none focus:border-[#1DB954]"
                disabled={isLoading}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
                  <option className="text-[#1DB954] bg-[#121212]" key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>

            <button
              className={`w-full py-3 rounded-md text-lg font-bold transition ${
                isLoading
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-[#1DB954] text-[#121212] hover:bg-opacity-90'
              }`}
              onClick={handlePurchase}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : `Purchase Now`}
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {/* QR Code Dialog */}
      <Dialog open={showQR} onClose={() => setShowQR(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <Dialog.Panel className="bg-[#121212] rounded-xl p-8 shadow-2xl flex flex-col items-center max-w-md">
            <Dialog.Title className="text-2xl font-bold text-[#1DB954] mb-4 text-center">
              Booking Successful!
            </Dialog.Title>
            <p className="text-[#B3B3B3] text-center mb-6">
              Your event pass has been created. Show this QR code at the venue.
            </p>
            {currentBooking && <QRCodeDisplay value={currentBooking.qrCodeData} size={240} />}
            <div className="mt-6 text-center">
              <p className="text-[#B3B3B3] text-sm mb-2">Booking ID: {currentBooking?._id}</p>
              <p className="text-[#B3B3B3] text-sm">
                Quantity: {currentBooking?.quantity} | Total: ₹{currentBooking?.price}
              </p>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                className="px-6 py-2 rounded-md text-sm font-medium bg-[#1DB954] text-[#121212] hover:bg-opacity-90 transition"
                onClick={() => navigate('/profile')}
              >
                View in Profile
              </button>
              <button
                className="px-6 py-2 rounded-md text-sm font-medium border border-[#535353] text-[#B3B3B3] hover:border-[#1DB954] hover:text-[#1DB954] transition"
                onClick={() => setShowQR(false)}
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
