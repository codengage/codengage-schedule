const { blackA, violet, mauve } = require('@radix-ui/colors');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
      'codengage-purple': '#712cf9',
      'light-dark': '#e2e8f0',
      'white': '#fff',
      ...blackA,
      ...violet,
      ...mauve,
    },
    keyframes: {
      overlayShow: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      contentShow: {
        from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
        to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
      },
    },
    animation: {
      overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    },
  },
  },
  
  darkMode: "class",
}