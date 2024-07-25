const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
        "./**/*.{js,ts,jsx,tsx}"
    ],
    darkMode: "media",
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss'),nextui()],
};