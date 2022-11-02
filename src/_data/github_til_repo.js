const EleventyFetch = require('@11ty/eleventy-fetch');

const fetchGitHub = ({ body }) => {
  return EleventyFetch(`https://api.github.com/graphql?_query=${body}`, {
    duration: '1d',
    type: 'json',
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_AUTH_TOKEN}`,
        'content-type': 'application/json'
      },
      method: 'POST',
      body
    }
  });
};

const getRepoFiles = async ({ name, owner, directory }) => {
  const { data } = await fetchGitHub({
    body: JSON.stringify({
      query: `query RepoFiles($name: String!, $owner: String!) {
        repository(owner: $owner, name: $name) {
          object(expression: "HEAD:") {
            id
            ... on Tree {
              id
              entries {
                name
                type
                object {
                  ... on Tree {
                    id
                    entries {
                      name
                      type
                      object {
                        ... on Blob {
                          id
                          text
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`,
      variables: {
        name,
        owner
      }
    })
  });

  const repoDirectory = data.repository.object.entries.find(
    (entry) => entry.name === directory && entry.type === 'tree'
  );

  const entries = repoDirectory.object.entries;

  return entries;
};

const getCommittedDate = async ({ name, owner, path }) => {
  const { data } = await fetchGitHub({
    body: JSON.stringify({
      query: `query CommittedDate($name: String!, $owner: String!, $path: String!) {
        repository(owner: $owner, name: $name) {
          ref(qualifiedName: "refs/heads/master") {
            target {
              ... on Commit {
                history(first: 1, path: $path) {
                  edges {
                    node {
                      committedDate
                    }
                  }
                }
              }
            }
          }
        }
      }`,
      variables: {
        name,
        owner,
        path
      }
    })
  });

  return data.repository.ref.target.history.edges[0].node.committedDate;
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
      // Remove first line (which is the top heading)
      text: entry.object.text.replace(/^.*\n/, '')
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
