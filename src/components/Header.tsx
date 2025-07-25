import { Popover, Transition } from '@headlessui/react';
import {
  ChevronDown,
  MapPin,
  Search,
  Users,
  BarChart,
  Settings,
  LifeBuoy,
  FileText,
  Briefcase,
  Rss,
  Info,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logoutUser } from '../store/slices/authSlice';

const megaMenuSections = [
  {
    title: 'Explore Sports Events',
    items: [
      { name: 'Soccer Matches', description: 'Catch the latest soccer games near you.', icon: Search },
      { name: 'Cricket Matches', description: 'Join us for thrilling cricket action.', icon: BarChart },
      { name: 'F1 Racing', description: 'Experience the adrenaline of F1 races.', icon: MapPin },
      { name: 'Upcoming Events', description: "Check out what's happening this week.", icon: Users },
    ],
  },
  {
    title: 'More Pages',
    items: [
      { name: 'User Profile', description: 'Manage your bookings and preferences.', icon: Settings },
      { name: 'Help Center', description: 'Find answers to your questions.', icon: LifeBuoy },
      { name: 'Feedback', description: 'Share your thoughts with us.', icon: Info },
      { name: 'Terms of Service', description: 'Read our terms and conditions.', icon: FileText },
    ],
  },
  {
    title: 'Additional Links',
    items: [
      { name: 'Privacy Policy', description: 'Learn how we protect your data.', icon: FileText },
      { name: 'Careers', description: 'Join our passionate team.', icon: Briefcase },
      { name: 'Blog', description: 'Stay updated with our latest news.', icon: Rss },
      { name: 'Support', description: "We're here to help you.", icon: LifeBuoy },
    ],
  },
];

function MoreInfoPopover() {
  return (
    <Popover className="relative">
      {({ open, close }) => {
        useEffect(() => {
          const handleScroll = () => {
            if (open) {
              close();
            }
          };

          window.addEventListener('scroll', handleScroll, true);

          return () => {
            window.removeEventListener('scroll', handleScroll, true);
          };
        }, [open, close]);

        return (
          <>
            <Popover.Button className="flex items-center text-brand-light hover:text-brand-green transition-colors focus:outline-none">
              <span>More Info</span>
              <ChevronDown className={`ml-2 h-5 w-5 transition-transform ${open ? 'transform rotate-180' : ''}`} />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="fixed bg-[#121212] left-0 z-10 mt-5 w-full px-4 sm:px-0">
                <div className="overflow-hidden rounded-b-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="bg-brand-dark-gray p-7">
                    <div className="container mx-auto">
                      <div className="relative grid gap-8 lg:grid-cols-4">
                        {megaMenuSections.map((section) => (
                          <div key={section.title}>
                            <h3 className="text-sm font-semibold text-brand-green tracking-wider uppercase">
                              {section.title}
                            </h3>
                            <div className="mt-4 space-y-4">
                              {section.items.map((item) => (
                                <a
                                  key={item.name}
                                  href="#"
                                  className="group flex items-start p-2 -m-2 rounded-lg hover:bg-brand-light-gray transition ease-in-out duration-150"
                                >
                                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-brand-green text-white sm:h-12 sm:w-12">
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-white">{item.name}</p>
                                    <p className="mt-1 text-sm text-brand-gray">{item.description}</p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        );
      }}
    </Popover>
  );
}

export function Header() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, isLoading } = useAppSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      console.log('Logout successful');
      setIsMobileMenuOpen(false); // Close mobile menu after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Close mobile menu when clicking outside or on navigation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const mobileMenu = document.querySelector('.mobile-menu');
      const hamburgerButton = document.querySelector('.hamburger-button');

      // Only close if clicking outside both the menu and the button
      if (mobileMenu && hamburgerButton && !mobileMenu.contains(target) && !hamburgerButton.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      // Add a small delay to prevent immediate closing
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [window.location.pathname]);

  return (
    <header className="bg-[#121212] text-white backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-brand-green">
              Electric Stadium
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-brand-light hover:text-brand-green transition-colors">
              Home Page
            </Link>
            <Link to="/events" className="text-brand-light hover:text-brand-green transition-colors">
              Events List
            </Link>
            <Link to="/contact" className="text-brand-light hover:text-brand-green transition-colors">
              Contact Us
            </Link>

            <MoreInfoPopover />
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-transparent border border-brand-light rounded-md hover:bg-brand-light hover:text-brand-dark transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>{user?.name || 'Profile'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-brand-dark bg-brand-green border border-brand-green rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/join"
                  className="px-4 py-2 text-sm font-medium text-white bg-transparent border border-brand-light rounded-md hover:bg-brand-light hover:text-brand-dark transition-colors"
                >
                  Join
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-brand-dark bg-brand-green border border-brand-green rounded-md hover:opacity-90 transition-opacity"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden relative z-10">
            <button
              className="hamburger-button p-2 rounded-md text-brand-light hover:text-brand-green hover:bg-brand-light-gray transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              aria-label="Toggle mobile menu"
              type="button"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <Transition
          show={isMobileMenuOpen}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-2"
        >
          <div className="lg:hidden mobile-menu absolute top-full left-0 right-0 z-50">
            <div className="bg-[#181818] border-t border-[#232323] py-6 px-4 rounded-b-lg shadow-lg">
              {/* Mobile Navigation Links */}
              <nav className="space-y-4 mb-6">
                <Link
                  to="/"
                  className="block text-brand-light hover:text-brand-green transition-colors py-2 border-b border-[#232323]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home Page
                </Link>
                <Link
                  to="/events"
                  className="block text-brand-light hover:text-brand-green transition-colors py-2 border-b border-[#232323]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Events List
                </Link>
                <Link
                  to="/contact"
                  className="block text-brand-light hover:text-brand-green transition-colors py-2 border-b border-[#232323]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </nav>

              {/* Mobile Auth Section */}
              <div className="space-y-3 pt-4 border-t border-[#232323]">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 w-full px-4 py-3 text-sm font-medium text-white bg-transparent border border-brand-light rounded-md hover:bg-brand-light hover:text-brand-dark transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>{user?.name || 'Profile'}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="flex items-center space-x-2 w-full px-4 py-3 text-sm font-medium text-brand-dark bg-brand-green border border-brand-green rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/join"
                      className="block w-full px-4 py-3 text-sm font-medium text-white bg-transparent border border-brand-light rounded-md hover:bg-brand-light hover:text-brand-dark transition-colors text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Join
                    </Link>
                    <Link
                      to="/login"
                      className="block w-full px-4 py-3 text-sm font-medium text-brand-dark bg-brand-green border border-brand-green rounded-md hover:opacity-90 transition-opacity text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </header>
  );
}
