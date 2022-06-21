const netlifyGraph = require('../functions/netlifyGraph');

const getRepoFiles = async ({ name, owner, directory }) => {
  const { data } = await netlifyGraph.fetchRepoFiles(
    { name, owner, directory },
    { accessToken: process.env.ONEGRAPH_AUTHLIFY_TOKEN }
  );

  const repoDirectory = data.gitHub.repository.object.entries.find(
    (entry) => entry.name === directory && entry.type === 'tree'
  );

  return repoDirectory.object.entries;
};

const getCommittedDate = async ({ name, owner, path }) => {
  const { data } = await netlifyGraph.fetchCommittedDate(
    { name, owner, path },
    { accessToken: process.env.ONEGRAPH_AUTHLIFY_TOKEN }
  );

  return data.gitHub.repository.ref.target.history.edges[0].node.committedDate;
};

const formatEntry = (entry) => {
  const regexHeading = /^# (.*)/;

  // The first line in the markdown is the title
  const title = entry.object.text.match(regexHeading)[0].replace('# ', '');

  return {
    ...entry,
    title,
    object: {
      ...entry.object,
      // Lower the heading level (h1 -> h2)
      text: entry.object.text.replace('# ', '## ')
    }
  };
};

module.exports = async function () {
  const repoOptions = {
    name: 'til',
    owner: 'petermekhaeil',
    directory: 'learnings'
  };

  const repoFiles = await getRepoFiles(repoOptions);

  const entries = repoFiles.map(formatEntry);

  const entriesWithCommittedDate = await Promise.all(
    entries.map(async (entry) => {
      const committedDate = await getCommittedDate({
        name: repoOptions.name,
        owner: repoOptions.owner,
        path: `${repoOptions.directory}/${entry.name}`
      });

      return {
        ...entry,
        date: committedDate
      };
    })
  );

  const sortedEntries = entriesWithCommittedDate.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return sortedEntries;
};
