import { ArrowRight } from 'lucide-react';
import Feature1 from '../assets/feature-1.webp';
import Feature2 from '../assets/feature-2.webp';
import Feature3 from '../assets/feature-3.webp';

const features = [
  {
    title: 'Catch Every Moment of the Game With Us',
    description: 'Discover thrilling live screenings of soccer, cricket, and F1 events.',
    linkText: 'Browse',
    imgSrc: Feature1,
  },
  {
    title: 'Join the Action: Soccer Events Near You',
    description: 'Find your local venue and enjoy the soccer experience live.',
    linkText: 'View',
    imgSrc: Feature2,
  },
  {
    title: 'Experience the Thrill of Cricket Live Screenings',
    description: 'Catch every ball and cheer for your team in real time.',
    linkText: 'Watch',
    imgSrc: Feature3,
  },
];

export function Features() {
  return (
    <div className="py-24 bg-[#121212] sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Explore Exciting Live Matches at Your Favorite Venues
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature?.title} className="flex flex-col items-start text-white">
              <div className="w-full h-56 bg-[#282828] rounded-lg flex items-center justify-center mb-6">
                <img src={feature?.imgSrc} alt="" />
              </div>
              <h3 className="text-xl font-bold ">{feature?.title}</h3>
              <p className="mt-2 text-base text-[#B3B3B3]">{feature?.description}</p>
              <a href="#" className="mt-4 inline-flex items-center font-semibold text-[#1DB954]">
                {feature.linkText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
