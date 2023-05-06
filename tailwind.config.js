/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        "red-main": "#e50914",
        "red-main-hover": "#e50914c3",
        "steel-blue": "#54b9c5",
        "light-gray": "#e5e5e5",
        "dark-gray": "#b3b3b3",
        "misty-gray": "#e5e5e58c",
        "dim-gray": "#6d6d6e6d",
        "dim-gray-hover": "#6d6d6e44",
        "white-hover": "#ffffffcf"
      },
      screens: {
        "xs": "460px"
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
  ],
}