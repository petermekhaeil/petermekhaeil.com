const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = (config) => {
  config.addPlugin(eleventyNavigationPlugin);

  return {
    dir: {
      input: "src",
    },
  };
};
