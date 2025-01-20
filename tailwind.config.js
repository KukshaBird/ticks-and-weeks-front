/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,tsx,ts}'],
  theme: {
    extend: {
      dropShadow: {
        green: '0 2px 3px rgb(105, 255, 102)',
      },
    },
  },
  plugins: [],
};
