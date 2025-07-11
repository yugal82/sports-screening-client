import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { MapPin, Calendar, DollarSign, Clock, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { QRCodeDisplay } from '../components/QRCodeDisplay';
import { useAppSelector } from '../store/hooks';
import type { Event } from '../apis/eventsAPI';

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
  const { events } = useAppSelector((state) => state.events);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showQR, setShowQR] = useState(false);

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
      </div>
    );
  }

  const qrPayload = JSON.stringify({
    eventId: selectedEvent._id,
    eventName: getEventTitle(selectedEvent),
    date: formatDate(selectedEvent.date),
    time: selectedEvent.time,
    quantity,
  });

  return (
    <div className="bg-[#121212] min-h-screen w-full" style={{ height: '100vh', overflow: 'hidden' }}>
      <Header />
      <div className="flex w-full h-[calc(100vh-80px)] max-h-[calc(100vh-80px)]">
        {/* Left: Image */}
        <div className="flex-1 flex items-center justify-center bg-[#121212]">
          <img
            src={selectedEvent.image}
            alt={getEventTitle(selectedEvent)}
            className="object-cover rounded-2xl max-h-[80vh] w-full max-w-2xl"
            style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.5)' }}
            onError={(e) => {
              // Fallback image if the event image fails to load
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80';
            }}
          />
        </div>
        {/* Right: Details */}
        <div className="flex-1 flex flex-col justify-center px-12 py-8 max-w-xl">
          <h1 className="text-4xl font-bold text-white mb-6">{getEventTitle(selectedEvent)}</h1>

          {/* Venue */}
          <div className="flex items-center text-[#1DB954] mb-4 text-lg font-medium">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="text-[#1DB954]">{selectedEvent.venue}</span>
          </div>

          {/* Date and Time */}
          <div className="flex items-center text-white mb-4 text-lg">
            <Calendar className="w-5 h-5 mr-2 text-[#1DB954]" />
            <span>{formatDate(selectedEvent.date)}</span>
          </div>
          <div className="flex items-center text-white mb-4 text-lg">
            <Clock className="w-5 h-5 mr-2 text-[#1DB954]" />
            <span>
              {selectedEvent.time} ({selectedEvent.timeZone})
            </span>
          </div>

          {/* Max Occupancy */}
          <div className="flex items-center text-white mb-6 text-lg">
            <Users className="w-5 h-5 mr-2 text-[#1DB954]" />
            <span>Max Occupancy: {selectedEvent.maxOccupancy} people</span>
          </div>

          {/* Price */}
          <div className="flex items-center text-white mb-8 text-lg">
            <DollarSign className="w-5 h-5 mr-2 text-[#1DB954]" />
            <span className="text-[#1DB954] font-bold text-xl">₹{selectedEvent.price.toFixed(2)}</span>
          </div>

          <div className="mb-8">
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-transparent border border-[#535353] text-white py-3 px-4 rounded-md text-lg outline-none focus:border-[#1DB954]"
            >
              <option className="text-[#1DB954] bg-[#121212]" value="Quantity">
                Quantity
              </option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
                <option className="text-[#1DB954] bg-[#121212]" key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>
          <button
            className="w-full py-4 rounded-md text-lg font-bold bg-[#1DB954] text-[#121212] hover:bg-opacity-90 transition"
            onClick={() => setShowQR(true)}
          >
            Purchase Pass
          </button>
        </div>
      </div>
      {/* QR Code Dialog */}
      <Dialog open={showQR} onClose={() => setShowQR(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <Dialog.Panel className="bg-[#121212] rounded-xl p-8 shadow-2xl flex flex-col items-center">
            <Dialog.Title className="text-2xl font-bold text-[#1DB954] mb-4">Your Event Pass QR Code</Dialog.Title>
            <QRCodeDisplay value={qrPayload} size={240} />
            <button
              className="mt-8 px-8 py-3 rounded-md text-lg font-bold bg-[#1DB954] text-[#121212] hover:bg-opacity-90 transition"
              onClick={() => setShowQR(false)}
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
