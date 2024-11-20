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
<<<<<<< HEAD
        sans: ["'Source Sans 3', system-ui, sans-serif", ...defaultTheme.fontFamily.sans],
=======
        sans: ["Poppins, system-ui, sans-serif", ...defaultTheme.fontFamily.sans],
>>>>>>> effb9b390deba055d937c53a33f4257ad596c98b
      }
    },
  },
  plugins: [],
}

