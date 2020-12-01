const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

const prodPlugins = [
  require('autoprefixer'),
  cssnano({ preset: 'default' }),
  purgecss({
    content: ['./src/**/*.njk', './src/**/*.md', './*.js'],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    safelist: ['rounded-lg', 'w-full']
  })
];

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    ...(process.env.NODE_ENV === 'production' ? prodPlugins : [])
  ]
};
