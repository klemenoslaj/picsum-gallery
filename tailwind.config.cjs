/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      lineHeight: {
        0: "0",
      },
    },
  },
  plugins: [],
};
