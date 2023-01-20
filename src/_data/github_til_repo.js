const EleventyFetch = require('@11ty/eleventy-fetch');

const fetchTil = () => {
  return EleventyFetch(
    `https://raw.githubusercontent.com/petermekhaeil/til/master/feed.json`,
    {
      duration: '1d',
      type: 'text'
    }
  );
};

module.exports = async function () {
  const response = await fetchTil();
  let til;

  try {
    til = JSON.parse(response);
  } catch (e) {
    console.error(e);
  }

  return til;
};
