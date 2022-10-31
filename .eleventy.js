const path = require('path');
const dayjs = require('dayjs');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const Image = require('@11ty/eleventy-img');
const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language');
const emojiReadTime = require('@11tyrocks/eleventy-plugin-emoji-readtime');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginTOC = require('eleventy-plugin-toc');
const safeLinks = require('@sardine/eleventy-plugin-external-links');
const pluginEmbedTweet = require('./eleventy-plugin-embed-tweet');

module.exports = (config) => {
  config.setQuietMode(true);

  config.addPlugin(pluginEmbedTweet, {
    autoEmbed: true,
    useInlineStyles: false
  });
  config.addPlugin(eleventyNavigationPlugin);
  config.addPlugin(pluginRss);
  config.addPlugin(inclusiveLangPlugin);
  config.addPlugin(syntaxHighlight);
  config.addPlugin(pluginTOC, { ul: true });
  config.addPlugin(safeLinks);
  config.addPlugin(emojiReadTime, {
    wpm: 275,
    showEmoji: false,
    emoji: '🥤',
    label: 'min. read',
    bucketSize: 5
  });

  config.addPassthroughCopy('src/assets');
  config.addPassthroughCopy('images/uploads');

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

  config.addFilter('markdown', (value) => {
    return `<div class="md-block">${markdownLib.render(value)}</div>`;
  });

  config.addFilter('removeExtension', (value) => {
    return value.substr(0, value.lastIndexOf('.'));
  });

  config.addFilter('encodeUrl', (str) => {
    return encodeURI(str);
  });

  config.addFilter('toDate_MMMM_DD_YYYY', (date) => {
    return dayjs(date).format('MMMM DD, YYYY');
  });

  config.addFilter('toDate_YYYY_MM_DD_dashes', (date) => {
    return dayjs(date).format('YYYY-MM-DD');
  });

  config.addFilter('toDate_YYYY_MMM_DD', (dateObj) => {
    return dayjs(dateObj).format('YYYY MMM DD');
  });

  config.addFilter('getChildren', (entry, url) => {
    const isFound = entry.children.find((child) => child.url === url);
    return Boolean(isFound);
  });

  config.addCollection('posts', function (collection) {
    return collection.getFilteredByGlob('./src/posts/**/*.md');
  });

  config.addNunjucksAsyncShortcode(
    'image',
    async function (src, alt, sizes, classNames, loading, decoding) {
      let metadata = await Image(src, {
        widths: [300, 600],
        formats: ['avif', 'jpeg'],
        outputDir: './_site/img/'
      });

      let imageAttributes = {
        alt,
        sizes,
        loading,
        decoding,
        class: classNames
      };
      return Image.generateHTML(metadata, imageAttributes);
    }
  );

  return {
    dir: {
      input: 'src'
    }
  };
};
