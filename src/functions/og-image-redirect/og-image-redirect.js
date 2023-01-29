const fetch = require('node-fetch');

exports.handler = async function (event) {
  const title = event.queryStringParameters.title;
  const subTitle = event.queryStringParameters.subTitle;

  const url = process.env.OG_IMAGE_URL;

  function fetchImage(url) {
    return fetch(url)
      .then((response) => response.buffer())
      .then((buffer) => {
        const b64 = buffer.toString('base64');
        return b64;
      });
  }

  try {
    const content = await fetchImage(
      `${url}?title=${title}&subTitle=${subTitle}`
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'image/png' },
      body: content,
      isBase64Encoded: true
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
