import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { InfoSection } from '../components/InfoSection';
import { Footer } from '../components/Footer';
import { PlayCircle } from 'lucide-react';

export function HomePage() {
  return (
    <div className="bg-[#121212]">
      <Header />
      <main>
        <Hero />
        <Features />
        <InfoSection
          title="Find Your Perfect Venue for Live Sports Events in Seconds"
          description="Easily search for your favorite sports events by city or venue name. Discover the excitement of live matches and secure your seats with just a few clicks."
          imageSide="right"
          primaryActionText="Discover"
          secondaryActionText="Learn More"
        />
        <InfoSection
          icon={PlayCircle}
          title="Exciting Live Events Await You!"
          description="Discover thrilling live screenings of your favorite sports. Check out the latest events, secure your seats, and enjoy the action with friends!"
          imageSide="left"
          primaryActionText="Reserve"
          secondaryActionText="Learn More"
        />
      </main>
      <Footer />
    </div>
  );
}
