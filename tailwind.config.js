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
        sans: ["'Source Sans 3', system-ui, sans-serif", ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}

