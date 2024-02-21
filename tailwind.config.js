/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: 'rgba(58,140,126,1)',
        base: 'rgba(22,50,54,255)',
        orange: 'rgba(201, 115, 48, 255)',
        white: 'rgba(212, 200, 178, 255)',
      },
    },
  },
  plugins: [],
};
