import { Tab } from '@headlessui/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FilterSidebar } from '../components/FilterSidebar';
import type { FilterValues } from '../components/FilterSidebar';
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchEvents } from '../store/slices/eventsSlice';
import { EventCard } from '../components/EventCard';
import type { Event } from '../utils/types';

const categories = ['All', 'Football', 'F1', 'Cricket'];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Helper function to get event title based on sports category
const getEventTitle = (event: Event): string => {
  switch (event.sportsCategory) {
    case 'football':
      return event.football ? `${event.football.homeTeam} vs ${event.football.awayTeam}` : 'Football Match';
    case 'cricket':
      return event.cricket ? `${event.cricket.homeTeam} vs ${event.cricket.awayTeam}` : 'Cricket Match';
    case 'f1':
      return event.f1 ? `${event.f1.driver} - ${event.f1.team}` : 'F1 Race';
    default:
      return `${event.sportsCategory.charAt(0).toUpperCase() + event.sportsCategory.slice(1)} Event`;
  }
};

// Helper function to get category display name
const getCategoryDisplayName = (sportsCategory: string): string => {
  switch (sportsCategory) {
    case 'football':
      return 'Football';
    case 'cricket':
      return 'Cricket';
    case 'f1':
      return 'F1';
    default:
      return sportsCategory.charAt(0).toUpperCase() + sportsCategory.slice(1);
  }
};

export function EventsPage() {
  const dispatch = useAppDispatch();
  const { events, isLoading, error } = useAppSelector((state) => state.events);
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function parseFiltersFromQuery(search: string): FilterValues {
    const params = new URLSearchParams(search);
    return {
      minPrice: Number(params.get('minPrice')) || 0,
      maxPrice: Number(params.get('maxPrice')) || 1000,
      startDate: params.get('startDate') ? new Date(params.get('startDate')!) : null,
      endDate: params.get('endDate') ? new Date(params.get('endDate')!) : null,
      date: params.get('date') ? new Date(params.get('date')!) : null,
      sortBy: (params.get('sortBy') as 'price' | 'date') || 'date',
    };
  }

  function filtersToQuery(filters: FilterValues): string {
    const params = new URLSearchParams();
    params.set('minPrice', String(filters.minPrice));
    params.set('maxPrice', String(filters.maxPrice));
    if (filters.startDate) params.set('startDate', filters.startDate.toISOString());
    if (filters.endDate) params.set('endDate', filters.endDate.toISOString());
    if (filters.date) params.set('date', filters.date.toISOString());
    params.set('sortBy', filters.sortBy);
    return params.toString();
  }

  const [filters, setFilters] = useState<FilterValues>(() => parseFiltersFromQuery(location.search));

  // Update filters when URL changes (for browser navigation)
  useEffect(() => {
    setFilters(parseFiltersFromQuery(location.search));
  }, [location.search]);

  // Fetch events when filters change (from Apply/Reset only)
  useEffect(() => {
    const query = filtersToQuery(filters);
    dispatch(fetchEvents(query ? { query: `?${query}` } : {}));
  }, [dispatch, filters]);

  // Auto-close sidebar on scroll
  useEffect(() => {
    if (!sidebarOpen) return;
    const handleScroll = () => setSidebarOpen(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sidebarOpen]);

  // Only update filters and URL on Apply
  const handleApply = (newFilters: FilterValues) => {
    const query = filtersToQuery(newFilters);
    navigate({ search: `?${query}` });
    setFilters(newFilters);
    setSidebarOpen(false);
  };

  // Reset filters to default
  const handleReset = () => {
    const defaultFilters: FilterValues = {
      minPrice: 0,
      maxPrice: 1000,
      startDate: null,
      endDate: null,
      date: null,
      sortBy: 'date',
    };
    navigate({ search: '' });
    setFilters(defaultFilters);
    setSidebarOpen(false);
  };

  // Floating Filters button
  const FiltersButton = (
    <button
      className="fixed left-4 bottom-8 z-40 bg-[#1DB954] text-[#121212] px-6 py-3 rounded-full font-bold shadow-lg hover:bg-[#17a74a] transition lg:left-8 lg:bottom-8"
      onClick={() => setSidebarOpen(true)}
      aria-label="Open filters sidebar"
    >
      Filters
    </button>
  );

  if (isLoading) {
    return (
      <div className="bg-[#121212] min-h-screen text-white overflow-x-hidden">
        <Header />
        {FiltersButton}
        <FilterSidebar
          values={filters}
          open={sidebarOpen}
          onApply={handleApply}
          onReset={handleReset}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="container mx-auto px-4 py-12 min-h-[80vh] flex flex-col lg:flex-row gap-6 relative">
          <div className="text-center w-full flex items-center justify-center">
            <div>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1DB954] mx-auto mb-4"></div>
              <p className="text-[#B3B3B3]">Loading events...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#121212] min-h-screen text-white overflow-x-hidden">
        <Header />
        {FiltersButton}
        <FilterSidebar
          values={filters}
          open={sidebarOpen}
          onApply={handleApply}
          onReset={handleReset}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="container mx-auto px-4 py-12 min-h-[80vh] flex flex-col lg:flex-row gap-6 relative">
          <div className="text-center w-full flex items-center justify-center">
            <div>
              <p className="text-red-500 mb-4">Error: {error}</p>
              <button
                onClick={() => dispatch(fetchEvents({}))}
                className="bg-[#1DB954] text-[#121212] px-6 py-2 rounded-md hover:bg-opacity-90 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#121212] min-h-screen text-white overflow-x-hidden">
      <Header />
      {FiltersButton}
      <FilterSidebar
        values={filters}
        open={sidebarOpen}
        onApply={handleApply}
        onReset={handleReset}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="container mx-auto px-4 py-12 min-h-[80vh] flex flex-col lg:flex-row gap-6 relative">
        {/* Events List */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
          <Tab.Group>
            <Tab.List className="flex space-x-4 mb-8 border-b border-[#333] text-base">
              {categories.map((cat) => (
                <Tab
                  key={cat}
                  className={({ selected }) =>
                    classNames(
                      'px-4 py-2 rounded-t text-base font-semibold focus:outline-none',
                      selected
                        ? 'border-b-4 border-[#1DB954] text-[#1DB954] bg-transparent shadow-none'
                        : 'border-b-4 border-transparent text-white hover:text-[#1DB954] bg-transparent transition-colors'
                    )
                  }
                >
                  {cat}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              {categories.map((cat) => {
                const filtered =
                  cat === 'All' ? events : events.filter((e) => getCategoryDisplayName(e.sportsCategory) === cat);
                return (
                  <Tab.Panel key={cat}>
                    {filtered.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-[#B3B3B3] text-base">No events found for {cat}</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filtered.map((event) => (
                          <EventCard
                            key={event._id}
                            event={event}
                            slugify={slugify}
                            getEventTitle={getEventTitle}
                            formatDate={formatDate}
                          />
                        ))}
                      </div>
                    )}
                  </Tab.Panel>
                );
              })}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
      <Footer />
    </div>
  );
}
