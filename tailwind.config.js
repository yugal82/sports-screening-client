/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#121212',
        'brand-green': '#1DB954',
        'brand-light': '#FFFFFF',
        'brand-gray': '#B3B3B3',
        'brand-dark-gray': '#282828',
        'brand-light-gray': '#535353',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
