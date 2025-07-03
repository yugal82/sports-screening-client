import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const sportsCategories = [
  { label: 'Football', value: 'football' },
  { label: 'Cricket', value: 'cricket' },
  { label: 'F1', value: 'f1' },
];

const timeZones = ['UTC', 'GMT', 'IST', 'EST', 'PST', 'CST', 'MST', 'BST', 'CET', 'EET', 'JST', 'AEST'];

export function CreateEventPage() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const sportsCategory = watch('sportsCategory');

  const onSubmit = (data: any) => {
    // For now, just log the data
    console.log(data);
    alert('Event created! (Check console for data)');
    reset();
    setPhotoPreview(null);
  };

  return (
    <div className="bg-[#121212]">
      <Header />
      <main className="flex flex-col w-full min-h-screen">
        <div className="flex flex-col items-center justify-center w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#1DB954]">Create New Event</h2>
            {/* Sports Category (full row) */}
            <div className="mb-6 col-span-full">
              <label className="block mb-2 font-semibold">
                Sports Category<span className="text-[#1DB954]">*</span>
              </label>
              <select
                {...register('sportsCategory', { required: 'Sports category is required' })}
                className="w-full bg-transparent border border-[#535353] text-white py-3 px-4 rounded-md text-lg focus:outline-none focus:border-[#1DB954]"
              >
                <option className="text-white bg-[#121212]" value="">
                  Select category
                </option>
                {sportsCategories.map((cat) => (
                  <option className="text-white bg-[#121212]" key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.sportsCategory && (
                <p className="text-red-500 text-sm mt-1">{errors.sportsCategory.message as string}</p>
              )}
            </div>
            {/* Conditional fields */}
            {sportsCategory === 'football' && (
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">
                    Home Team<span className="text-[#1DB954]">*</span>
                  </label>
                  <input
                    {...register('football.homeTeam', { required: 'Home team is required' })}
                    className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none py-2 px-1"
                    placeholder="Home Team"
                  />
                  {(errors.football as any)?.homeTeam?.message && (
                    <p className="text-red-500 text-sm mt-1">{(errors.football as any)?.homeTeam?.message as string}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">
                    Away Team<span className="text-[#1DB954]">*</span>
                  </label>
                  <input
                    {...register('football.awayTeam', { required: 'Away team is required' })}
                    className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none py-2 px-1"
                    placeholder="Away Team"
                  />
                  {(errors.football as any)?.awayTeam?.message && (
                    <p className="text-red-500 text-sm mt-1">{(errors.football as any)?.awayTeam?.message as string}</p>
                  )}
                </div>
              </div>
            )}
            {sportsCategory === 'cricket' && (
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">
                    Home Team<span className="text-[#1DB954]">*</span>
                  </label>
                  <input
                    {...register('cricket.homeTeam', { required: 'Home team is required' })}
                    className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none py-2 px-1"
                    placeholder="Home Team"
                  />
                  {(errors.cricket as any)?.homeTeam?.message && (
                    <p className="text-red-500 text-sm mt-1">{(errors.cricket as any)?.homeTeam?.message as string}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">
                    Away Team<span className="text-[#1DB954]">*</span>
                  </label>
                  <input
                    {...register('cricket.awayTeam', { required: 'Away team is required' })}
                    className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none py-2 px-1"
                    placeholder="Away Team"
                  />
                  {(errors.cricket as any)?.awayTeam?.message && (
                    <p className="text-red-500 text-sm mt-1">{(errors.cricket as any)?.awayTeam?.message as string}</p>
                  )}
                </div>
              </div>
            )}
            {sportsCategory === 'f1' && (
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">
                    Grand Prix<span className="text-[#1DB954]">*</span>
                  </label>
                  <input
                    {...register('f1.grandPrix', { required: 'Grand Prix is required' })}
                    className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none py-2 px-1"
                    placeholder="Grand Prix"
                  />
                  {(errors.f1 as any)?.grandPrix?.message && (
                    <p className="text-red-500 text-sm mt-1">{(errors.f1 as any)?.grandPrix?.message as string}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">
                    Circuit<span className="text-[#1DB954]">*</span>
                  </label>
                  <input
                    {...register('f1.circuit', { required: 'Circuit is required' })}
                    className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none py-2 px-1"
                    placeholder="Circuit"
                  />
                  {(errors.f1 as any)?.circuit?.message && (
                    <p className="text-red-500 text-sm mt-1">{(errors.f1 as any)?.circuit?.message as string}</p>
                  )}
                </div>
              </div>
            )}
            {/* Venue, Price, Max Occupancy (same row) */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 font-semibold">
                  Venue<span className="text-[#1DB954]">*</span>
                </label>
                <input
                  {...register('venue', { required: 'Venue is required' })}
                  className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none py-2 px-1"
                  placeholder="Venue"
                />
                {errors.venue && <p className="text-red-500 text-sm mt-1">{errors.venue.message as string}</p>}
              </div>
              <div>
                <label className="block mb-2 font-semibold">
                  Price (USD)<span className="text-[#1DB954]">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', { required: 'Price is required', min: 0 })}
                  className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none py-2 px-1"
                  placeholder="Price"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message as string}</p>}
              </div>
              <div>
                <label className="block mb-2 font-semibold">
                  Max Occupancy<span className="text-[#1DB954]">*</span>
                </label>
                <input
                  type="number"
                  {...register('maxOccupancy', { required: 'Max occupancy is required', min: 1 })}
                  className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none py-2 px-1"
                  placeholder="Max Occupancy"
                />
                {errors.maxOccupancy && (
                  <p className="text-red-500 text-sm mt-1">{errors.maxOccupancy.message as string}</p>
                )}
              </div>
            </div>
            {/* Date, Time, Timezone (same row) */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 font-semibold">
                  Date<span className="text-[#1DB954]">*</span>
                </label>
                <input
                  type="date"
                  {...register('date', { required: 'Date is required' })}
                  className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none py-2 px-1"
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message as string}</p>}
              </div>
              <div>
                <label className="block mb-2 font-semibold">
                  Time<span className="text-[#1DB954]">*</span>
                </label>
                <input
                  type="time"
                  {...register('time', { required: 'Time is required' })}
                  className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none py-2 px-1"
                />
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message as string}</p>}
              </div>
              <div>
                <label className="block mb-2 font-semibold">
                  Time Zone<span className="text-[#1DB954]">*</span>
                </label>
                <select
                  {...register('timeZone', { required: 'Time zone is required' })}
                  className="w-full bg-transparent border border-[#535353] text-white py-3 px-4 rounded-md text-lg focus:outline-none focus:border-[#1DB954]"
                >
                  <option className="text-white bg-[#121212]" value="">
                    Select time zone
                  </option>
                  {timeZones.map((tz) => (
                    <option className="text-white bg-[#121212]" key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
                {errors.timeZone && <p className="text-red-500 text-sm mt-1">{errors.timeZone.message as string}</p>}
              </div>
            </div>
            {/* Photo Upload (full row) */}
            <div className="mb-8 col-span-full">
              <label className="block mb-2 font-semibold">
                Event Photo<span className="text-[#1DB954]">*</span>
              </label>
              <Controller
                control={control}
                name="photo"
                rules={{ required: 'Event photo is required' }}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
                        reader.readAsDataURL(file);
                      } else {
                        setPhotoPreview(null);
                      }
                    }}
                    className="w-full bg-transparent border border-[#535353] text-white py-2 px-4 rounded-md text-lg focus:outline-none focus:border-[#1DB954]"
                  />
                )}
              />
              {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message as string}</p>}
              {photoPreview && <img src={photoPreview} alt="Preview" className="mt-4 rounded-lg max-h-40 mx-auto" />}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2 px-4 rounded-md text-lg font-bold bg-[#1DB954] text-[#121212] hover:bg-opacity-50 transition cursor-pointer"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
