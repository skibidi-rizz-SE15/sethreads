/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eerie-black': '#1D1D1D',
        "comment-highlight": "rgb(31 41 55)",
        "general-highlight": "rgb(64 64 64)",
      },
      gridTemplateColumns: {
        "main-page": "clamp(10rem, 20%, 15rem) 1fr"
      },
    },
  },
  plugins: [],
}