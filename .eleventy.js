const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = (config) => {
  config.addPlugin(eleventyNavigationPlugin);
  config.addPlugin(pluginRss);

  // Get the first `n` elements of a collection.
  config.addFilter("head", (array = [], n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  config.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
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

  config.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function (item) {
      if ("tags" in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function (item) {
          switch (item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "post":
            case "posts":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });

  return {
    dir: {
      input: "src",
    },
  };
};
