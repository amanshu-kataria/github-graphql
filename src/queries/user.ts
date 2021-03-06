import gql from 'graphql-tag';

export function userProfile() {
  return gql`
    query($userName: String!) {
      user(login: $userName) {
        bio
        createdAt
        email
        followers(first: 20, after: null) {
          ...Followers
        }
        following(first: 20, after: null) {
          ...Following
        }
        repositories(first: 20, after: null, ownerAffiliations: OWNER) {
          ...Repositories
        }
        starredRepositories(first: 20, after: null) {
          ...StarredRepositories
        }
      }
    }
    ${user.fragments.starredRepositories}
    ${user.fragments.repositories}
    ${user.fragments.followers}
    ${user.fragments.following}
  `;
}

export const user = {
  fragments: {
    repositories: gql`
      fragment Repositories on RepositoryConnection {
        totalCount
        edges {
          cursor
          node {
            createdAt
            description
            id
            isFork
            isPrivate
            name
            url
            stargazers {
              totalCount
            }
            primaryLanguage {
              color
              name
            }
            watchers {
              totalCount
            }
          }
        }
      }
    `,
    starredRepositories: gql`
      fragment StarredRepositories on StarredRepositoryConnection {
        edges {
          node {
            description
            name
            url
          }
          cursor
        }
        totalCount
      }
    `,
    followers: gql`
      fragment Followers on FollowerConnection {
        edges {
          cursor
          node {
            avatarUrl(size: 10)
            bio
            name
            url
          }
        }
        totalCount
      }
    `,
    following: gql`
      fragment Following on FollowingConnection {
        edges {
          cursor
          node {
            avatarUrl(size: 10)
            bio
            name
            url
          }
        }
        totalCount
      }
    `
  }
};
