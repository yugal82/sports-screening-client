import { Button } from './Button';
import HeroBackground from '../assets/hero_background.webp';

export function Hero() {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat text-white relative"
      style={{ backgroundImage: `url(${HeroBackground})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            Catch the Action <span className="text-brand-green">Live</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-gray">
            Watch live sports events including football, cricket, Formula 1 and more with Electric Stadium.
          </p>
          <div className="mt-8 flex space-x-4">
            <Button variant="primary">Explore Events</Button>
            <Button variant="secondary">For Venue Owners</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
