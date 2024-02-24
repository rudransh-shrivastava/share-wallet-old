/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accentDark: 'hsla(170, 41%, 39%, 1)',
        accentBase: 'hsla(188, 42%, 15%, 1)',
        accentBorder: 'hsla(170, 40%, 95%, 1)',
        accentOrange: 'hsla(26, 61%, 49%, 1)',
        accentLight: 'hsla(39, 28%, 76%, 1)',
      },
    },
  },
  plugins: [],
};
