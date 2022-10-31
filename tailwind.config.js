module.exports = {
  content: ['./src/**/*.njk', './src/**/*.md'],
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
              color: theme('colors.white'),
              borderRadius: theme('spacing.1'),
              fontWeight: theme('fontWeight.medium'),
              padding: 0
            },
            'code:not([class^="language-"])': {
              color: theme('colors.black'),
              backgroundColor: theme('colors.zinc.300')
            },
            color: theme('colors.zinc.800'),
            a: {
              color: theme('colors.black'),
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.black'),
                textDecoration: 'none'
              }
            },
            pre: {
              borderRadius: theme('spacing.1')
            },
            small: {
              color: theme('colors.zinc.800')
            }
          }
        },

        dark: {
          css: {
            color: theme('colors.zinc.400'),
            a: {
              color: theme('colors.white'),
              '&:hover': {
                color: theme('colors.black')
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
              color: theme('colors.orange.300')
            },
            'code:not([class^="language-"])': {
              color: theme('colors.zinc.300'),
              backgroundColor: theme('colors.zinc.700')
            },
            'code[class^="language-"]': {
              padding: 0
            },
            pre: {
              backgroundColor: '#011627' // night-owl theme
            },
            small: {
              color: theme('colors.zinc.500')
            }
          }
        }
      })
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
