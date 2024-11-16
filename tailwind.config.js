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
        'software-orange-hover': '#e39205',
        'steadfast': '#404040',
        'green-check': '#33b333',
        "comment-highlight": "rgb(87 83 78)",
        "general-highlight": "rgb(64 64 64)",
        "general-selected": "rgb(82 82 91)",
        "red-violet": "#c71585",
        "cherry-red": "#E53935",
        "pale-gray": "#E0E0E0",
      },
      gridTemplateColumns: {
        "main-page": "clamp(12rem, 20%, 15rem) 1fr"
      },
      animation: {
        'wiggle': 'wiggle 0.25s ease-in-out',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(5px)' },
          '50%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
            
          },
          '100%': {
            opacity: '1',
            
          }
        },
        fadeOut: {
          '0%': {
            opacity: '1',
            
          },
          '100%': {
            opacity: '0',
            
          }
        }
      },
    },
  },
}