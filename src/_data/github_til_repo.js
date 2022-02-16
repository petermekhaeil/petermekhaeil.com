const fetch = require('node-fetch');

module.exports = async function () {
  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.GITHUB_AUTH_TOKEN
    },
    body: JSON.stringify({
      query: `
        query RepoFiles($owner: String!, $name: String!) {
          repository(owner: $owner, name: $name) {
            object(expression: "HEAD:") {
              ... on Tree {
                entries {
                  name
                  type
                  object {
                    ... on Blob {
                      byteSize
                    }
                    ... on Tree {
                      entries {
                        name
                        type
                        object {
                          ... on Blob {
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
        }
          `,
      variables: {
        owner: 'petermekhaeil',
        name: 'til'
      }
    })
  })
    .then((res) => res.json())
    .then((res) => {
      const learningsDir = res.data.repository.object.entries.find(
        (entry) => entry.name === 'learnings' && entry.type === 'tree'
      );

      return learningsDir.object.entries.map((entry) => {
        const regexHeading = /^# (.*)/;
        const regexFirstParagraph = /\n(.+)\n\n/;

        const title = entry.object.text
          .match(regexHeading)[0]
          .replace('# ', '');

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
    });
};
