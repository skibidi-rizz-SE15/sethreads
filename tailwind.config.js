/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eerie-black': '#1D1D1D',
        'software-orange': '#f4a320',
        'software-orange-hover': '#f4a320',
        "comment-highlight": "rgb(87 83 78)",
        "general-highlight": "rgb(64 64 64)",
        "general-selected": "rgb(82 82 91)",
      },
      gridTemplateColumns: {
        "main-page": "clamp(10rem, 20%, 15rem) 1fr"
      },
    },
  },
}