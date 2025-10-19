/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#042743',
        'dark-green': '#063729',
        'dark-brown': '#392626',
        'dark-purple': '#421a42',
      }
    },
  },
  plugins: [],
}
