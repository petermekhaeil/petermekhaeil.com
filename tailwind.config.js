/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'code::before': {
              content: 'none'
            },
            'code::after': {
              content: 'none'
            },
            'code:not(pre code)': {
              color: theme('colors.black'),
              backgroundColor: theme('colors.zinc.200'),
              padding: '0.125rem 0.25rem',
              fontSize: '.875em',
              borderRadius: '0.25rem',
              borderWidth: '2px',
              borderColor: theme('colors.zinc.300'),
              fontWeight: 400
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
              borderRadius: theme('spacing.1'),
              backgroundColor: '#0d1117'
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
            'code:not(pre code)': {
              color: theme('colors.zinc.300'),
              backgroundColor: theme('colors.zinc.700'),
              borderColor: theme('colors.zinc.600')
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
