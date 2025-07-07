export function LoadingSpinner() {
  return (
    <div className="bg-[#121212] min-h-screen text-white flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1DB954] mb-4"></div>
        <div className="text-lg text-[#B3B3B3]">Loading...</div>
      </div>
    </div>
  );
}
