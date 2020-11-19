module.exports = {
  purge: {
    enabled: true,
    mode: "all",
    content: ["./src/**/*.njk", "./src/**/*.md"],
    options: {
      safelist: ["rounded-lg", "w-full"],
    },
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
