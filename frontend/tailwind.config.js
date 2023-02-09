/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-brown": "#E9E1DD",

        "background-brown-1": "#F8F6F4",
        "background-brown-2": "#F5F4F2",
        "background-brown-3": "#EDEAE7",

        "heading-1": "#363433",

        "text-1": "#8D8B89",
        "text-2": "#5F5E5C",
        "text-3": "#484543",

        "watermelon-1": "#EFE4E2",
        "watermelon-2": "#AF4E49",

        "asparagus-1": "#E4E6E5",
        "asparagus-2": "#4D5E50",
        "asparagus-3": "#5D7B7C",

        "cafe-1": "#ECE9E6",
        "cafe-2": "#3A3937",
      },

      fontFamily: {
        sans: ["Noto Sans TC", "sans-serif"],
      },
    },
    screens: {
      xl: "1700px",
      lg: "1200px",
      md: "1060px",
      sm: "768px",
      ss: "620px",
      xs: "480px",
    },
  },
  plugins: [],
};
