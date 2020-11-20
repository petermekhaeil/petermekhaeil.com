module.exports = {
  purge: {
    content: ["./src/**/*.njk", "./src/**/*.md", "./*.js"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
