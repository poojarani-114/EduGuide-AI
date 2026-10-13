/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B132B',
          blue: '#1C2541',
          teal: '#3A506B',
          cyan: '#5BC0BE',
          light: '#F8F9FA'
        }
      }
    },
  },
  plugins: [],
}
