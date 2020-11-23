const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const CleanCSS = require("clean-css");

module.exports = (config) => {
  config.addPlugin(eleventyNavigationPlugin);
  config.addPlugin(pluginRss);

  config.addPassthroughCopy("src/assets");

  config.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  const markdownIt = require("markdown-it");
  const markdownItAttrs = require("markdown-it-attrs");

  const markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAttrs);

  config.setLibrary("md", markdownLib);

  config.addFilter("emojiReadTime", (content) => {
    const { wpm, showEmoji, emoji, label, bucketSize } = {
      wpm: 275,
      showEmoji: true,
      emoji: "🥤",
      label: "min. read",
      bucketSize: 5,
    };

    const minutes = Math.ceil(content.trim().split(/\s+/).length / wpm);
    const buckets = Math.round(minutes / bucketSize) || 1;

    const displayLabel = `${minutes} ${label}`;

    if (showEmoji) {
      return `${new Array(buckets || 1).fill(emoji).join("")}  ${displayLabel}`;
    }

    return displayLabel;
  });

  config.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  config.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  config.addCollection("posts", function (collection) {
    return collection.getFilteredByGlob("./src/posts/**/*.md");
  });

  // works also with addLiquidShortcode or addJavaScriptFunction
  config.addNunjucksAsyncShortcode("Image", async function (src, alt) {
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
      widths: [320, 640, 960, 1200, 1800, 2400],
      formats: ["jpeg", "webp"],
      urlPath: "./images/",
      outputDir: "./_site/images/",
    });

    let lowestSrc = stats["jpeg"][0];

    const srcset = Object.keys(stats).reduce(
      (acc, format) => ({
        ...acc,
        [format]: stats[format].reduce(
          (_acc, curr) => `${_acc} ${curr.srcset} ,`,
          ""
        ),
      }),
      {}
    );

    const source = `<source type="image/webp" srcset="${srcset["webp"]}" >`;

    const img = `<img
      class="rounded-lg w-full"
      alt="${alt}"
      src="${lowestSrc.url}"
      sizes='(min-width: 1024px) 1024px, 100vw'
      srcset="${srcset["jpeg"]}"
      width="${lowestSrc.width}"
      height="${lowestSrc.height}">`;

    return `<picture> ${source} ${img} </picture>`;
  });

  return {
    dir: {
      input: "src",
    },
  };
};
