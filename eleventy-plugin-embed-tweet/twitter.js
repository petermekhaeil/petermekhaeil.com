require('dotenv').config();
const request = require('request-promise');
const { promises: fs } = require('fs');
const syncFs = require('fs');

module.exports = {
  getTweet,
  getStyles,
  autoEmbedTweets
};

async function getTweet(tweetId, options) {
  // if we using cache and not cache busting, check there first
  if (options.cacheDirectory && !process.env.CACHE_BUST) {
    let cachedTweets = await getCachedTweets(options);
    let cachedTweet = cachedTweets[tweetId];

    // if we have a cached tweet, use that
    if (cachedTweet) {
      return formatTweet(cachedTweet, options);
    }
    // else continue on
  }

  // if we have env variables, go get tweet
  if (hasAuth()) {
    let liveTweet = await fetchTweet(tweetId);

    let tweetViewModel = processTweet(liveTweet);

    tweetViewModel.html = renderTweet(tweetViewModel);

    // cache tweet
    if (options.cacheDirectory) {
      await addTweetToCache(tweetViewModel, options);
    }

    // build
    return formatTweet(tweetViewModel, options);
  } else {
    console.warn(
      'Remember to add your twitter credentials as environment variables'
    );
    console.warn(
      'Read More at https://github.com/KyleMit/eleventy-plugin-embed-tweet#setting-env-variables'
    );
    // else continue on
  }

  // finally fallback to client-side injection
  var htmlTweet =
    `<blockquote class="twitter-tweet"><a href="https://twitter.com/user/status/${tweetId}"></a></blockquote>` +
    `<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`;

  return htmlTweet;
}

/* Twitter API Call */
function hasAuth() {
  return (
    process.env.TWITTER_TOKEN &&
    process.env.TWITTER_TOKEN_SECRET &&
    process.env.TWITTER_CONSUMER_KEY &&
    process.env.TWITTER_CONSUMER_SECRET
  );
}

function getAuth() {
  let oAuth = {
    token: process.env.TWITTER_TOKEN,
    token_secret: process.env.TWITTER_TOKEN_SECRET,
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET
  };
  return oAuth;
}

async function fetchTweet(tweetId) {
  // fetch tweet
  let apiURI = `https://api.twitter.com/2/tweets/${tweetId}`;

  const params = [
    'expansions=author_id,attachments.media_keys',
    'media.fields=duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width,alt_text,variants',
    'user.fields=created_at,name,profile_image_url'
  ].join('&');

  let auth = getAuth();

  try {
    let response = await request.get(`${apiURI}?${params}`, { oauth: auth });
    let tweet = JSON.parse(response);

    return tweet;
  } catch (error) {
    // unhappy path - continue to other fallbacks
    console.log(error);
    return {};
  }
}

/* transform tweets */
function processTweet(tweet) {
  // The below converts the tweet from twitter v2 API to support this plugin.
  tweet = {
    ...tweet,
    id_str: tweet.data.id,
    entities: {
      media: []
    },
    full_text: tweet.data.text,
    created_at: tweet.includes.users[0].created_at,
    user: {
      name: tweet.includes.users[0].name,
      screen_name: tweet.includes.users[0].username,
      profile_image_url_https: tweet.includes.users[0].profile_image_url
    }
  };

  // parse complicated stuff
  let images = getTweetImages(tweet);
  let created_at = getTweetDates(tweet);
  let htmlText = getTweetTextHtml(tweet);

  // destructure only properties we care about
  let { id_str, favorite_count } = tweet;
  let { name, screen_name, profile_image_url_https } = tweet.user;
  let user = { name, screen_name, profile_image_url_https };

  // build tweet with properties we want
  let tweetViewModel = {
    id_str,
    htmlText,
    images,
    favorite_count,
    created_at,
    user
  };

  return tweetViewModel;
}

function getTweetImages(tweet) {
  let images = [];
  for (media of tweet.entities.media || []) {
    images.push(media.media_url_https);
  }
  return images;
}

function getTweetDates(tweet) {
  let moment = require('moment');

  // parse
  let dateMoment = moment(tweet.created_at); //, "ddd MMM D hh:mm:ss Z YYYY");

  // format
  let display = dateMoment.format('hh:mm A · MMM D, YYYY');
  let meta = dateMoment.utc().format('MMM D, YYYY hh:mm:ss (z)');

  return { display, meta };
}

function getTweetTextHtml(tweet) {
  let replacements = [];

  // hashtags
  for (hashtag of tweet.entities.hashtags || []) {
    let oldText = getOldText(tweet.full_text, hashtag.indices);
    let newText = `<a href="https://twitter.com/hashtag/${oldText.substr(
      1
    )}">${oldText}</a>`;
    replacements.push({ oldText, newText });
  }

  // users
  for (user of tweet.entities.user_mentions || []) {
    let oldText = getOldText(tweet.full_text, user.indices);
    let newText = `<a href="https://twitter.com/${oldText.substr(
      1
    )}">${oldText}</a>`;
    replacements.push({ oldText, newText });
  }

  // urls
  for (url of tweet.entities.urls || []) {
    let oldText = getOldText(tweet.full_text, url.indices);
    let newText = `<a href="${url.expanded_url}">${url.expanded_url.replace(
      /https?:\/\//,
      ''
    )}</a>`;
    replacements.push({ oldText, newText });
  }

  // media
  for (media of tweet.entities.media || []) {
    let oldText = getOldText(tweet.full_text, media.indices);
    let newText = ``; // get rid of img url in tweet text
    replacements.push({ oldText, newText });
  }

  let htmlText = tweet.full_text;

  for (mediaKey of tweet.data.attachments.media_keys) {
    const media = tweet.includes.media.find(
      (mediaDetails) => mediaDetails.media_key === mediaKey
    );

    const { variants, type, preview_image_url, url } = media;

    const sources = variants
      .map(
        (variant) =>
          `<source src='${variant.url}' type='${variant.content_type}'/>`
      )
      .join('');

    if (type === 'video') {
      htmlText += `<video controls poster='${preview_image_url}'>${sources}</video>`;
    } else {
      htmlText += `<img src='${url}' />`;
    }
  }

  // make updates at the end
  for (rep of replacements) {
    htmlText = htmlText.replace(rep.oldText, rep.newText);
  }

  // preserve line breaks to survive minification
  htmlText = htmlText.replace(/(?:\r\n|\r|\n)/g, '<br/>');

  return htmlText;
}

function getOldText(text, indices) {
  let startPos = indices[0];
  let endPos = indices[1];
  let len = endPos - startPos;

  let oldText = text.substr(startPos, len);

  return oldText;
}

/* render tweets */
function renderTweet(tweet) {
  // get module directory
  let path = require('path');
  let moduleDir = path.parse(__filename).dir;

  // configure nunjucks
  let nunjucks = require('nunjucks');
  nunjucks.configure(moduleDir, { autoescape: true });

  // render with nunjucks
  let htmlTweet = nunjucks.render('tweet.njk', tweet);

  // minify before returning
  // important when injected into markdown to prevent injection of `<p>` tags due to whitespace
  let htmlMin = minifyHtml(htmlTweet);

  return htmlMin;
}

async function formatTweet(tweet, options) {
  // add css if requested
  if (options.useInlineStyles) {
    let styles = await getStyles();
    let stylesHtml = `<style type='text/css'>${styles}</style>`;
    let stylesMin = minifyHtml(stylesHtml);

    return stylesMin + tweet.html;
  }

  return tweet.html;
}

function minifyHtml(htmlSource) {
  var minify = require('html-minifier').minify;
  var result = minify(htmlSource, {
    minifyCSS: true,
    collapseWhitespace: true
  });

  return result;
}

/* caching / file access */
async function getCachedTweets(options) {
  let cachePath = getCachedTweetPath(options);

  try {
    let file = await fs.readFile(cachePath, 'utf8');
    cachedTweets = JSON.parse(file) || {};

    return cachedTweets;
  } catch (error) {
    // otherwise, empty array is fine
    console.log(error);
    return {};
  }
}

async function addTweetToCache(tweet, options) {
  try {
    // get cache
    let cachedTweets = await getCachedTweets(options);

    // add new tweet
    cachedTweets[tweet.id_str] = tweet;

    // build new cache string
    let tweetsJSON = JSON.stringify(cachedTweets, 2, 2);

    let cachePath = getCachedTweetPath(options);
    let cacheDir = require('path').dirname(cachePath);

    // makre sure directory exists
    await fs.mkdir(cacheDir, { recursive: true });

    syncFs.writeFileSync(cachePath, tweetsJSON);

    console.log(`Writing ${cachePath}`);
  } catch (error) {
    console.log(error);
  }
}

function getCachedTweetPath(options) {
  let path = require('path');

  // get directory for main thread
  let appPath = require.main.filename; // C:\user\github\app\node_modules\@11ty\eleventy\cmd.js
  let pos = appPath.indexOf('node_modules');
  let appRoot = appPath.substr(0, pos); // C:\user\github\app\

  // build cache file path
  let cachePath = path.join(appRoot, options.cacheDirectory, 'tweets.json');

  return cachePath;
}

async function getStyles() {
  // get module directory
  let path = require('path');
  let moduleDir = path.parse(__filename).dir;
  let stylePath = path.join(moduleDir, '/tweet.css');

  let styles = await fs.readFile(stylePath, 'utf8');

  return styles;
}

// Auto embed tweets
const asyncReplace = require('string-replace-async');

async function autoEmbedTweets(content, outputPath, options) {
  // https://regexr.com/5c39d
  let findTweets =
    /<p>(<a href=")?(https:\/\/twitter.com\/[^/]+\/status\/([0-9]+))(">\2<\/a>)?<\/p>/g;
  return await asyncReplace(content, findTweets, async (match, p1, p2, p3) => {
    return await getTweet(p3, options);
  });
}
