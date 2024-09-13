/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      // transparent: "transparent",
      // current: "currentColor",
      white: "#eff6ee",
      red: {
        100: "#DD0426",
        200: "#F02D3A",
      },
      blue: "#273043",
      bluegray: "#9197AE",
      silver: "#C0C0C0"
    },
  },
  plugins: [],
};
