import { Link } from 'react-router-dom';
import type { Event } from '../utils/types';
import { MapPin, Clock, DollarSign } from 'lucide-react';

interface EventCardProps {
  event: Event;
  slugify: (str: string) => string;
  getEventTitle: (event: Event) => string;
  formatDate: (dateString: string) => string;
}

export function EventCard({ event, slugify, getEventTitle, formatDate }: EventCardProps) {
  return (
    <Link
      to={`/events/${slugify(getEventTitle(event))}`}
      className="bg-[#282828] rounded-lg overflow-hidden shadow-[0_4px_24px_0_rgba(100,100,100,0.25)] hover:shadow-[0_8px_32px_0_rgba(100,255,100,0.10)] transition-shadow flex flex-col cursor-pointer border border-[#232323] no-underline"
      style={{ color: 'inherit' }}
    >
      <img
        src={event.image}
        alt={getEventTitle(event)}
        className="h-40 w-full object-cover"
        onError={(e) => {
          // Fallback image if the event image fails to load
          (e.target as HTMLImageElement).src =
            'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80';
        }}
      />
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-3 text-white">{getEventTitle(event)}</h3>

          {/* Location */}
          <div className="flex items-center text-[#B3B3B3] text-sm mb-2">
            <MapPin className="w-4 h-4 mr-2 text-[#1DB954]" />
            <span>{event?.venue}</span>
          </div>

          {/* Date and Time */}
          <div className="flex items-center text-[#B3B3B3] text-sm mb-3">
            <Clock className="w-4 h-4 mr-2 text-[#1DB954]" />
            <span>
              {formatDate(event?.date)} &nbsp; - &nbsp; {event?.time}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-[#1DB954]" />
            <span className="text-[#1DB954] text-lg font-bold">₹{event?.price?.toFixed(2)}</span>
          </div>
          <span className="text-[#B3B3B3] text-xl">&gt;</span>
        </div>
      </div>
    </Link>
  );
}
