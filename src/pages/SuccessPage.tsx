import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { QRCodeDisplay } from '../components/QRCodeDisplay';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import bookingsAPI from '../apis/bookingsAPI';

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId } = (location.state || {}) as { bookingId: string; event: any };
  console.log(bookingId);

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      navigate('/events');
      return;
    }
    // Update booking status to confirmed using bookingsAPI
    bookingsAPI
      .updateBookingStatus(bookingId, 'confirmed', 'succeeded')
      .then((data) => {
        setBooking(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to update booking status.');
        setLoading(false);
      });
  }, [bookingId, navigate]);

  if (!bookingId) return null;

  return (
    <div className="bg-[#121212] min-h-screen text-white">
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[80vh] py-12">
        <div className="w-full max-w-lg bg-[#181818] rounded-xl p-8 shadow-2xl border border-[#232323] flex flex-col items-center">
          <h1 className="text-3xl font-extrabold text-[#1DB954] mb-2 text-center">You're All Set for the Event!</h1>
          <p className="text-lg text-[#B3B3B3] mb-6 text-center">
            Get ready to experience the thrill. Your payment is confirmed and your pass is ready!
          </p>
          {loading ? (
            <div className="text-[#B3B3B3]">Loading your booking...</div>
          ) : error ? (
            <div className="text-red-400">{error}</div>
          ) : (
            <>
              <div className="mb-4">
                <QRCodeDisplay value={booking?.qrCodeData} size={240} />
              </div>
              <div className="mb-4 text-center">
                <div className="text-[#1DB954] font-bold text-lg">Booking ID: {bookingId}</div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  className="px-6 py-2 rounded-md text-sm font-medium bg-[#1DB954] text-[#121212] hover:bg-opacity-90 transition"
                  onClick={() => navigate('/profile')}
                >
                  Go to Profile
                </button>
                <button
                  className="px-6 py-2 rounded-md text-sm font-medium border border-[#535353] text-[#B3B3B3] hover:border-[#1DB954] hover:text-[#1DB954] transition"
                  onClick={() => navigate('/events')}
                >
                  Explore More Events
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
