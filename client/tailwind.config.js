/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgPrimary: {
          DEFAULT: 'hsla(0, 0%, 100%, 1)',
          dark: 'hsla(0, 0%, 8%, 1)',
        },
        textPrimary: {
          DEFAULT: 'hsla(0, 0%, 0%, 1)',
          dark: 'hsla(0, 0%, 100%, 1)',
        },
        accentDark: 'hsla(170, 60%, 39%, 1)',
        accentBase: 'hsla(188, 42%, 15%, 1)',
        accentBorder: {
          DEFAULT: 'hsla(170, 40%, 95%, 1)',
          dark: 'hsla(170, 0%, 15%, 1)',
        },
        // accentOrange: 'hsla(26, 61%, 49%, 1)',
        // accentLight: 'hsla(39, 28%, 76%, 1)',
      },
    },
  },
  plugins: [],
};
