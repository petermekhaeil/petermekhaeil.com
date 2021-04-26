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
            color: theme('colors.gray.900'),
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
              color: theme('colors.blue.300')
            },
            h2: {
              color: theme('colors.white')
            },
            h3: {
              color: theme('colors.blue.300')
            },
            h4: {
              color: theme('colors.blue.300')
            },
            h5: {
              color: theme('colors.blue.300')
            },
            h6: {
              color: theme('colors.blue.300')
            },
            strong: {
              color: theme('colors.blue.300')
            },
            blockquote: {
              color: theme('colors.blue.300')
            },
            'code:not(.language-js):not(.language-html)': {
              color: theme('colors.gray.300'),
              backgroundColor: theme('colors.gray.700')
            },
            pre: {
              backgroundColor: '#011627' // night-owl theme
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
