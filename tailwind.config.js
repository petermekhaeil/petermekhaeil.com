module.exports = {
  purge: {
    content: ["./src/**/*.njk", "./src/**/*.md", "./*.js"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.900"),
            a: {
              color: theme("colors.blue.600"),
              "&:hover": {
                color: theme("colors.blue.600"),
                textDecoration: "none",
              },
              textDecoration: "none",
            },
          },
        },

        dark: {
          css: {
            color: theme("colors.gray.200"),
            a: {
              color: theme("colors.yellow.400"),
              "&:hover": {
                color: theme("colors.yellow.400"),
                textDecoration: "none",
              },
            },
            h1: {
              color: theme("colors.blue.300"),
            },
            h2: {
              color: theme("colors.blue.300"),
            },
            h3: {
              color: theme("colors.blue.300"),
            },
            h4: {
              color: theme("colors.blue.300"),
            },
            h5: {
              color: theme("colors.blue.300"),
            },
            h6: {
              color: theme("colors.blue.300"),
            },
            strong: {
              color: theme("colors.blue.300"),
            },
            blockquote: {
              color: theme("colors.blue.300"),
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["responsive", "dark"],
  },
  plugins: [require("@tailwindcss/typography")],
};
