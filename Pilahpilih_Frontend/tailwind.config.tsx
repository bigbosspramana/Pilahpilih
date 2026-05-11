/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#386641',
        'secondary-green': '#A7C957',
        'bg-light': '#F2F2F2',
      }
    },
  },
  plugins: [],
}