const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ["Outfit, system-ui, sans-serif", ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}

