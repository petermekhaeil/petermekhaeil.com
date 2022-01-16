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
      query GetGitHubPinnedRepos($user: String!) {
            user(login: $user) {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    name
                    description
                    url
                    stargazerCount
                    repositoryTopics(first:100) {
                      edges {
                        node {
                          topic {
                            name
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
        user: 'petermekhaeil'
      }
    })
  })
    .then((res) => res.json())
    .then((res) => res.data.user.pinnedItems.nodes);
};
