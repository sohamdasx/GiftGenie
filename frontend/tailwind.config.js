/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // fontFamily: {
      //   hero: ["Poppins"],
      // },
      colors: {
        pink: "#CA8E83",
        tan: "#f1e7df",
        copper: "#A75F37",
      },
    },
  },
  plugins: [],
};
