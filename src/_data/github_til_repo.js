const netlifyGraph = require('../functions/netlifyGraph');

module.exports = async function () {
  const { data } = await netlifyGraph.fetchRepoFiles(
    {
      name: 'til',
      owner: 'petermekhaeil'
    },
    { accessToken: process.env.ONEGRAPH_AUTHLIFY_TOKEN }
  );

  const learningsDir = data.gitHub.repository.object.entries.find(
    (entry) => entry.name === 'learnings' && entry.type === 'tree'
  );

  return learningsDir.object.entries.map((entry) => {
    const regexHeading = /^# (.*)/;
    const regexFirstParagraph = /\n(.+)\n\n/;

    const title = entry.object.text.match(regexHeading)[0].replace('# ', '');

    const firstParagraph = entry.object.text.match(regexFirstParagraph)[0];

    return {
      ...entry,
      title,
      object: {
        ...entry.object,
        // Hacky and I love it
        text: entry.object.text.replace('# ', '## '),
        description: firstParagraph
      }
    };
  });
};
