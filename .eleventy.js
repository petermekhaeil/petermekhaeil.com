const path = require('path');
const { DateTime } = require('luxon');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const Image = require('@11ty/eleventy-img');
const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language');
const emojiReadTime = require('@11tyrocks/eleventy-plugin-emoji-readtime');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginTOC = require('eleventy-plugin-toc');
const safeLinks = require('@sardine/eleventy-plugin-external-links');
const pluginTailwindCSS = require('eleventy-plugin-tailwindcss');

module.exports = (config) => {
  config.addPlugin(eleventyNavigationPlugin);
  config.addPlugin(pluginRss);
  config.addPlugin(inclusiveLangPlugin);
  config.addPlugin(syntaxHighlight);
  config.addPlugin(pluginTOC, { ul: true });
  config.addPlugin(safeLinks);
  config.addPlugin(emojiReadTime, {
    wpm: 275,
    showEmoji: true,
    emoji: '🥤',
    label: 'min. read',
    bucketSize: 5
  });
  config.addPlugin(pluginTailwindCSS);

  config.addPassthroughCopy('src/assets');
  config.addPassthroughCopy({ 'public/admin': 'admin' });

  const markdownIt = require('markdown-it');
  const markdownItAttrs = require('markdown-it-attrs');
  const markdownAnchor = require('markdown-it-anchor');

  const markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  })
    .use(markdownItAttrs)
    .use(markdownAnchor);

  config.setLibrary('md', markdownLib);

  config.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy'
    );
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  config.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  config.addCollection('posts', function (collection) {
    return collection.getFilteredByGlob('./src/posts/**/*.md');
  });

  // works also with addLiquidShortcode or addJavaScriptFunction
  config.addNunjucksAsyncShortcode(
    'Image',
    async function (src, alt, outputFormat = 'jpeg') {
      if (alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on myImage from: ${src}`);
      }

      const isFullUrl = (url) => {
        try {
          return !!new URL(url);
        } catch {
          return false;
        }
      };

      const fullSrc = isFullUrl(src) ? src : path.join(__dirname, src);

      // returns Promise
      let stats = await Image(fullSrc, {
        widths: [null],
        formats: ['jpeg', 'webp'],
        urlPath: './images/',
        outputDir: './_site/images/'
      });

      let lowestSrc = stats[outputFormat][0];
      let sizes = '100vw'; // Make sure you customize this!

      return `
    <picture>
    ${Object.values(stats)
      .map((imageFormat) => {
        return `  <source
                  type="image/${imageFormat[0].format}"
                  srcset="${imageFormat
                    .map((entry) => `${entry.url} ${entry.width}w`)
                    .join(', ')}"
                  sizes="${sizes}">`;
      })
      .join('\n')}
      <img
        class="rounded-lg mx-auto"
        src="${lowestSrc.url}"
        width="${lowestSrc.width}"
        height="${lowestSrc.height}"
        alt="${alt}">
    </picture>
      `;
    }
  );

  return {
    dir: {
      input: 'src'
    }
  };
};
