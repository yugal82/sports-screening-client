import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { MapPin, Calendar, DollarSign } from 'lucide-react';
import { useState } from 'react';

// Dummy event data (in real app, fetch by ID)
const EVENT_DATA = {
  image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80',
  name: 'Real Madrid vs Barcelona',
  venue: 'Green Sports Bar',
  date: 'July 11, 2024',
  time: '3:00 PM',
  price: 25.0,
};

export function EventDetailsPage() {
  // const { id } = useParams(); // For real app, use this to fetch event
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="bg-[#121212] min-h-screen w-full" style={{ height: '100vh', overflow: 'hidden' }}>
      <Header />
      <div className="flex w-full h-[calc(100vh-80px)] max-h-[calc(100vh-80px)]">
        {/* Left: Image */}
        <div className="flex-1 flex items-center justify-center bg-[#121212]">
          <img
            src={EVENT_DATA.image}
            alt={EVENT_DATA.name}
            className="object-cover rounded-2xl max-h-[80vh] w-full max-w-2xl"
            style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.5)' }}
          />
        </div>
        {/* Right: Details */}
        <div className="flex-1 flex flex-col justify-center px-12 py-8 max-w-xl">
          <h1 className="text-4xl font-bold text-white mb-6">{EVENT_DATA.name}</h1>
          <div className="flex items-center text-[#1DB954] mb-4 text-lg font-medium">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="text-[#1DB954]">{EVENT_DATA.venue}</span>
          </div>
          <div className="flex items-center text-white mb-4 text-lg">
            <Calendar className="w-5 h-5 mr-2 text-[#1DB954]" />
            <span>
              {EVENT_DATA.date}, {EVENT_DATA.time}
            </span>
          </div>
          <div className="flex items-center text-white mb-8 text-lg">
            <DollarSign className="w-5 h-5 mr-2 text-[#1DB954]" />
            <span className="text-[#1DB954] font-bold text-xl">${EVENT_DATA.price.toFixed(2)}</span>
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
          <button className="w-full py-4 rounded-md text-lg font-bold bg-[#1DB954] text-[#121212] hover:bg-opacity-90 transition">
            Purchase Pass
          </button>
        </div>
      </div>
    </div>
  );
}
