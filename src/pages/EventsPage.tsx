import { Tab } from '@headlessui/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const eventData = [
  {
    title: 'Real Madrid vs Barcelona',
    venue: 'Sports Lounge',
    date: 'May 20, 2024',
    time: '7:00 PM',
    price: 25.0,
    category: 'Football',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Monaco Grand Prix',
    venue: 'Race On Pub',
    date: 'May 18, 2024',
    time: '2:00 PM',
    price: 50.0,
    category: 'F1',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Australia vs England',
    venue: 'The Oval',
    date: 'May 22, 2024',
    time: '10:00 AM',
    price: 20.0,
    category: 'Cricket',
    image: 'https://images.unsplash.com/photo-1505843275257-8493c9b1b4c6?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Manchester City vs Liverpool',
    venue: 'The Sports Hub',
    date: 'May 24, 2024',
    time: '6:30 PM',
    price: 22.5,
    category: 'Football',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Italian Grand Prix',
    venue: 'Grandstand Grill',
    date: 'May 23, 2024',
    time: '1:00 PM',
    price: 29.0,
    category: 'F1',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'India vs South Africa',
    venue: 'Eden Gardens',
    date: 'May 28, 2024',
    time: '3:00 PM',
    price: 18.0,
    category: 'Cricket',
    image: 'https://images.unsplash.com/photo-1505843275257-8493c9b1b4c6?auto=format&fit=crop&w=600&q=80',
  },
];

const categories = ['All', 'Football', 'F1', 'Cricket'];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function EventsPage() {
  return (
    <div className="bg-[#121212] min-h-screen text-white">
      <Header />
      <main className="container mx-auto px-8 py-12 min-h-[80vh]">
        <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
        <Tab.Group>
          <Tab.List className="flex space-x-4 mb-8 border-b border-[#333]">
            {categories.map((cat) => (
              <Tab
                key={cat}
                className={({ selected }) =>
                  classNames(
                    'px-6 py-2 rounded-t text-lg font-semibold focus:outline-none',
                    selected
                      ? 'border-b-4 border-brand-green text-brand-green bg-transparent shadow-none'
                      : 'border-b-4 border-transparent text-white hover:text-brand-green bg-transparent transition-colors'
                  )
                }
              >
                {cat}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {categories.map((cat) => {
              const filtered = cat === 'All' ? eventData : eventData.filter((e) => e.category === cat);
              return (
                <Tab.Panel key={cat}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((event) => (
                      <div
                        key={event.title + event.date}
                        className="bg-brand-dark-gray rounded-lg overflow-hidden shadow-[0_4px_24px_0_rgba(100,100,100,0.25)] hover:shadow-[0_8px_32px_0_rgba(100,255,100,0.10)] transition-shadow flex flex-col cursor-pointer border border-[#232323]"
                      >
                        <img src={event.image} alt={event.title} className="h-40 w-full object-cover" />
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-xl font-bold mb-1 text-white">{event.title}</h3>
                            <div className="text-brand-gray text-sm mb-1">{event.venue}</div>
                            <div className="text-brand-gray text-sm mb-2">
                              {event.date} &nbsp; - &nbsp; {event.time}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-brand-green text-lg font-bold">${event.price.toFixed(2)}</span>
                            <span className="text-brand-gray text-xl">&gt;</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Tab.Panel>
              );
            })}
          </Tab.Panels>
        </Tab.Group>
      </main>
      <Footer />
    </div>
  );
}
