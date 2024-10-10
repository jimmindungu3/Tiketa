/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#F5F5F5",
        red: {
          100: "#DD0426",
          200: "#F02D3A",
        },
        blue: "#273043",
        bluegray: "#9197AE",
        silver: "#C0C0C0",
        safaricomgreen: '#3aa335',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 1s steps(1) 3', // Blinks once every second for 4 seconds
      },
    },
  },
  plugins: [],
};
