import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import FallbackImage from '../assets/feature-2.webp';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || process.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const appearance = {
  theme: 'stripe',
  variables: {
    colorText: '#1DB954',
    colorBackground: '#121212',
  },
};

function CheckoutForm({ event, quantity }: { event: any; quantity: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError(null);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: 'if_required',
      });
      if (error) {
        setError(error.message || 'Payment failed');
        return;
      }
      if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')) {
        navigate(`/events/${event.slug}`, { state: { showQR: true } });
      } else {
        setError('Payment was not successful.');
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="w-full bg-[#181818] rounded-xl p-8 shadow-2xl border border-[#232323]">
      <div className="flex gap-4">
        {/* Event Card */}
        <div className="flex items-center gap-4 bg-[#232323] rounded-lg p-4">
          <img
            src={event.image}
            alt={event.title}
            className="w-20 h-20 object-cover rounded-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FallbackImage;
            }}
          />
          <div className="flex-1">
            <div className="text-lg font-bold text-white mb-1">{event.title}</div>
            <div className="text-[#1DB954] text-sm mb-1">{event.venue}</div>
            <div className="text-[#B3B3B3] text-xs mb-1">
              {event.date} | {event.time} ({event.timeZone})
            </div>
            <div className="text-[#1DB954] font-bold text-base">
              ₹{event.price.toFixed(2)} x {quantity} = ₹{(event.price * quantity).toFixed(2)}
            </div>
          </div>
        </div>

        <div className="w-full text-white">
          <h2 className="text-2xl font-bold text-[#1DB954] mb-6">Complete Your Payment</h2>
          {/* Stripe PaymentElement */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <PaymentElement className="text-white" options={{ layout: 'tabs' }} />
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full py-3 rounded-md text-lg font-bold bg-[#1DB954] text-[#121212] hover:bg-opacity-90 transition"
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Pay & Confirm'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, quantity, clientSecret } = (location.state || {}) as {
    event: any;
    quantity: number;
    clientSecret: string;
  };

  useEffect(() => {
    if (!event || !clientSecret) {
      navigate('/events');
    }
  }, [event, clientSecret, navigate]);

  if (!event || !clientSecret) return null;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <div className="bg-[#121212] text-white">
        <Header />
        <main className="flex flex-col items-center justify-center p-8">
          <CheckoutForm event={event} quantity={quantity} />
        </main>
        <Footer />
      </div>
    </Elements>
  );
}
