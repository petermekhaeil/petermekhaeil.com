module.exports = {
  purge: {
    mode: "all",
    content: ["./src/**/*.njk", "./src/**/*.md"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
