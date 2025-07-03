import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { Button } from '../components/Button';

// Mock user data
const user = {
  name: 'Yugal K.',
  email: 'yugal@example.com',
  membership: 'Premium Member',
};

// Mock favorites (team logos from web)
const favorites = [
  { name: 'Real Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' },
  { name: 'FC Barcelona', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' },
  { name: 'Ferrari F1', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Scuderia_Ferrari_Logo.svg' },
  { name: 'FC Barcelona', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' },
  {
    name: 'India Cricket',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/41/Board_of_Control_for_Cricket_in_India_Logo.svg',
  },
  { name: 'England Cricket', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cb/England_cricket_team_logo.svg' },
  {
    name: 'Aston Martin F1',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/5d/Aston_Martin_Aramco_Cognizant_Formula_One_Team_Logo.svg',
  },
  { name: 'England Cricket', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cb/England_cricket_team_logo.svg' },
];

// Mock purchased events (subset of eventData from EventsPage)
const myEvents = [
  {
    title: 'Real Madrid vs Barcelona',
    venue: 'Electric Stadium',
    date: 'Sat, May 18 - 8:00 PM',
    price: 25.0,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80',
    purchased: true,
  },
  {
    title: 'Monaco Grand Prix',
    venue: 'Electric Stadium',
    date: 'Sun, Jun 2 - 2:00 PM',
    price: 75.0,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    purchased: true,
  },
  {
    title: 'India vs England',
    venue: 'Electric Stadium',
    date: 'Fri, Jul 12 - 10:30 AM',
    price: 30.0,
    image: 'https://images.unsplash.com/photo-1505843275257-8493c9b1b4c6?auto=format&fit=crop&w=600&q=80',
    purchased: true,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ProfilePage() {
  const [editEmail, setEditEmail] = useState(user.email);
  const [editPassword, setEditPassword] = useState('');
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');

  function handleEditProfile(e: React.FormEvent) {
    e.preventDefault();
    setEditError('');
    setEditSuccess('');
    if (!editEmail.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setEditError('Please enter a valid email address.');
      return;
    }
    if (editPassword && editPassword.length < 6) {
      setEditError('Password must be at least 6 characters.');
      return;
    }
    setEditSuccess('Profile updated!');
  }

  return (
    <div className="bg-[#121212] min-h-screen text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-1/4 w-full bg-[#181818] flex flex-col items-center justify-center py-12 px-6 border-r border-[#232323] min-h-[350px]">
        <div className="w-full flex flex-col items-center">
          <div className="text-4xl font-bold mb-2 text-white">{user.name}</div>
          <div className="text-lg text-[#B3B3B3] mb-1">
            <span className="text-white">{user.email.split('@')[0]}</span>@{user.email.split('@')[1]}
          </div>
          <div className="text-[#B3B3B3] mb-6">{user.membership}</div>
          <Button className="w-full mb-2 border-none">Edit Profile</Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-12 py-10">
        <Tab.Group>
          <Tab.List className="flex space-x-8 border-b border-[#232323] mb-8">
            {['Favorites', 'My Events', 'Edit Profile'].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    'px-6 py-2 text-lg font-semibold focus:outline-none',
                    selected
                      ? 'text-[#1DB954] border-b-2 border-[#1DB954]'
                      : 'text-[#B3B3B3] border-b-2 border-transparent hover:text-[#1DB954] transition-colors'
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {/* Favorites Tab */}
            <Tab.Panel>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {favorites.map((team, idx) => (
                  <div
                    key={team.name + idx}
                    className="bg-[#181818] rounded-xl flex flex-col items-center justify-center p-6 border border-[#1DB954] min-h-[160px]"
                  >
                    <img src={team.logo} alt={team.name} className="h-16 mb-4" />
                    <div className="text-lg font-semibold text-white text-center">{team.name}</div>
                  </div>
                ))}
              </div>
            </Tab.Panel>
            {/* My Events Tab */}
            <Tab.Panel>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {myEvents.map((event, idx) => (
                  <div
                    key={event.title + idx}
                    className="bg-[#181818] rounded-lg overflow-hidden shadow-[0_4px_24px_0_rgba(100,100,100,0.25)] hover:shadow-[0_8px_32px_0_rgba(100,255,100,0.10)] transition-shadow flex flex-col cursor-pointer border border-[#232323] relative"
                  >
                    <img src={event.image} alt={event.title} className="h-40 w-full object-cover" />
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-1 text-white">{event.title}</h3>
                        <div className="text-[#1DB954] text-sm mb-1 flex items-center">
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {event.venue}
                        </div>
                        <div className="text-[#B3B3B3] text-sm mb-2 flex items-center">
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {event.date}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[#1DB954] text-lg font-bold">${event.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <span className="absolute top-4 right-4 bg-[#1DB954] text-[#121212] text-xs font-bold px-3 py-1 rounded-full shadow">
                      Pass Purchased
                    </span>
                  </div>
                ))}
              </div>
            </Tab.Panel>
            {/* Edit Profile Tab */}
            <Tab.Panel>
              <form
                onSubmit={handleEditProfile}
                className="max-w-md mx-auto bg-[#181818] p-8 rounded-xl border border-[#232323] flex flex-col gap-6"
              >
                <div>
                  <label className="block text-[#B3B3B3] mb-2 text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full bg-transparent border border-[#535353] text-white py-3 px-4 rounded-md text-lg focus:outline-none focus:border-[#1DB954]"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#B3B3B3] mb-2 text-sm font-medium">Password</label>
                  <input
                    type="password"
                    className="w-full bg-transparent border border-[#535353] text-white py-3 px-4 rounded-md text-lg focus:outline-none focus:border-[#1DB954]"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    placeholder="New password (leave blank to keep current)"
                  />
                </div>
                {editError && <div className="text-red-500 text-sm">{editError}</div>}
                {editSuccess && <div className="text-[#1DB954] text-sm">{editSuccess}</div>}
                <Button
                  type="submit"
                  className="w-full border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-[#121212]"
                  variant="secondary"
                >
                  Save Changes
                </Button>
              </form>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </main>
    </div>
  );
}
