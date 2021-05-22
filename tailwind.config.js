module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.400'),
            a: {
              color: theme('colors.yellow.400'),
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.yellow.300'),
                textDecoration: 'underline'
              }
            },
            h1: {
              color: theme('colors.white')
            },
            h2: {
              color: theme('colors.white')
            },
            h3: {
              color: theme('colors.white')
            },
            h4: {
              color: theme('colors.white')
            },
            h5: {
              color: theme('colors.white')
            },
            h6: {
              color: theme('colors.white')
            },
            strong: {
              color: theme('colors.white')
            },
            blockquote: {
              color: theme('colors.blue.300')
            },
            'code:not(.language-js):not(.language-html):not(.language-jsx)': {
              color: theme('colors.gray.300'),
              backgroundColor: theme('colors.gray.700')
            },
            pre: {
              backgroundColor: '#011627' // night-owl theme
            },
            small: {
              color: theme('colors.gray.500')
            }
          }
        }
      })
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
};
