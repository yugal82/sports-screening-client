import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { Chrome, Facebook } from 'lucide-react';
import RegisterImage from '../assets/register_image.webp';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

const SPORT_OPTIONS = [
  { label: 'Football', value: 'football' },
  { label: 'F1', value: 'f1' },
  { label: 'Cricket', value: 'cricket' },
];

const TEAMS = {
  football: [
    { name: 'Real Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' },
    { name: 'Barcelona', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' },
    {
      name: 'Manchester United',
      logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
    },
    { name: 'Liverpool', logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' },
  ],
  f1: [
    { name: 'Ferrari', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Scuderia_Ferrari_Logo.svg' },
    { name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Mercedes-Benz_in_Motorsport_logo.svg' },
    { name: 'Red Bull', logo: 'https://upload.wikimedia.org/wikipedia/en/0/01/Red_Bull_Racing_logo.svg' },
    { name: 'McLaren', logo: 'https://upload.wikimedia.org/wikipedia/en/8/8f/McLaren_Racing_logo.svg' },
  ],
  cricket: [
    { name: 'India', logo: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg' },
    { name: 'Australia', logo: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg' },
    { name: 'England', logo: 'https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg' },
    { name: 'South Africa', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg' },
  ],
};

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInputs>();
  const password = watch('password');

  // Dialog state
  const [showSportDialog, setShowSportDialog] = useState(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [teamDialogIndex, setTeamDialogIndex] = useState(0);
  const [showTeamDialog, setShowTeamDialog] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<{ [sport: string]: string[] }>({});

  // Open sport dialog on submit
  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    setShowSportDialog(true);
  };

  // Handle sport selection next
  const handleSportDialogNext = () => {
    setShowSportDialog(false);
    if (selectedSports.length > 0) {
      setTeamDialogIndex(0);
      setShowTeamDialog(true);
    } else {
      // No sport selected, finish
      setShowTeamDialog(false);
      setSelectedTeams({});
      console.log('No sport selected');
    }
  };

  // Handle team dialog next
  const handleTeamDialogNext = () => {
    if (teamDialogIndex < selectedSports.length - 1) {
      setTeamDialogIndex(teamDialogIndex + 1);
    } else {
      setShowTeamDialog(false);
      // Log the selections
      console.log('Selected sports:', selectedSports);
      console.log('Selected teams:', selectedTeams);
    }
  };

  // Toggle sport selection
  const toggleSport = (sport: string) => {
    setSelectedSports((prev) => (prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]));
  };

  // Toggle team selection
  const toggleTeam = (sport: string, team: string) => {
    setSelectedTeams((prev) => {
      const current = prev[sport] || [];
      return {
        ...prev,
        [sport]: current.includes(team) ? current.filter((t) => t !== team) : [...current, team],
      };
    });
  };

  // Current sport for team dialog
  const currentSport = selectedSports[teamDialogIndex];

  return (
    <div className="bg-[#121212]">
      <Header />
      <main className="text-white flex items-center justify-center py-16">
        <div className="container mx-auto flex rounded-lg overflow-hidden max-w-5xl">
          {/* Image Section */}
          <div className="hidden md:block md:w-1/2">
            <img src={RegisterImage} alt="F1 Driver" className="object-cover h-full w-full" />
          </div>
          {/* Form Section */}
          <div className="w-full md:w-1/2 bg-[#282828] p-12 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-8 text-center">Join us now</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none p-1 transition-colors"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none p-1 transition-colors"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none p-1 transition-colors"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                  className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none p-1 transition-colors"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message as string}</p>
                )}
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Sign Up
              </Button>
            </form>

            <div className="flex items-center justify-center py-4">
              <span className="bg-[#282828] px-2 text-[#B3B3B3]">Or continue with</span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Chrome className="w-10" />
              <Facebook className="w-10" />
            </div>

            <p className="mt-8 text-center text-[#B3B3B3]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#1DB954] font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />

      {/* Sport Selection Dialog */}
      <Dialog open={showSportDialog} onClose={() => setShowSportDialog(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <Dialog.Panel className="bg-[#282828] rounded-lg p-8 w-full max-w-md mx-auto shadow-xl">
            <Dialog.Title className="text-2xl font-bold mb-4 text-[#1DB954]">Love a particular sport?</Dialog.Title>
            <div className="flex flex-col gap-4 mb-6">
              {SPORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleSport(opt.value)}
                  className={`flex items-center px-4 py-3 rounded-lg border-2 transition-colors text-lg font-semibold ${
                    selectedSports.includes(opt.value)
                      ? 'border-[#1DB954] bg-[#121212] text-[#1DB954]'
                      : 'border-[#535353] bg-transparent text-white hover:border-[#1DB954]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setShowSportDialog(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSportDialogNext}>
                Next
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Team Selection Dialogs */}
      <Dialog open={showTeamDialog} onClose={() => setShowTeamDialog(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <Dialog.Panel className="bg-[#282828] rounded-lg p-8 w-full max-w-md mx-auto shadow-xl">
            {currentSport && (
              <>
                <Dialog.Title className="text-2xl font-bold mb-4 text-[#1DB954]">
                  Select your favorite {SPORT_OPTIONS.find((s) => s.value === currentSport)?.label} teams
                </Dialog.Title>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {TEAMS[currentSport as keyof typeof TEAMS].map((team) => (
                    <button
                      key={team.name}
                      type="button"
                      onClick={() => toggleTeam(currentSport, team.name)}
                      className={`flex flex-col items-center px-2 py-3 rounded-lg border-2 transition-colors text-base font-semibold ${
                        selectedTeams[currentSport]?.includes(team.name)
                          ? 'border-[#1DB954] bg-[#121212] text-[#1DB954]'
                          : 'border-[#535353] bg-transparent text-white hover:border-[#1DB954]'
                      }`}
                    >
                      <img src={team.logo} alt={team.name} className="h-10 w-10 mb-2 object-contain" />
                      {team.name}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => setShowTeamDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleTeamDialogNext}>
                    {teamDialogIndex < selectedSports.length - 1 ? 'Next' : 'Finish'}
                  </Button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
