module.exports = {
  purge: {
    content: ['./src/**/*.njk', './src/**/*.md', './*.js']
  },
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'code::before': {
              content: ''
            },
            'code::after': {
              content: ''
            },
            code: {
              backgroundColor: theme('colors.gray.200'),
              borderRadius: theme('spacing.1'),
              fontWeight: theme('fontWeight.medium'),
              padding: theme('spacing.1')
            },
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.blue.700'),
              '&:hover': {
                color: theme('colors.blue.700'),
                textDecoration: 'none'
              },
              textDecoration: 'none'
            },
            pre: {
              borderRadius: theme('spacing.1')
            },
            small: {
              color: theme('colors.gray.800')
            }
          }
        },

        dark: {
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
    typography: ['responsive', 'dark']
  },
  plugins: [require('@tailwindcss/typography')]
};
