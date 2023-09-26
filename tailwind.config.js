/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'dark': {
        100: '#4A4E5C',
        200: '#3C424E',
        300: '#323642',
        400: '#2A2E3A',
        500: '#282A36',
        600: '#222632',
        700: '#1B202A',
        800: '#161A22',
        900: '#10141A',
      },
      'light-dark': '#313341',
      'white': '#fff', 
    },
    extend: {},
  },
  plugins: [],
  darkMode: "class",
}