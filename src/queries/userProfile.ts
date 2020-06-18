import gql from 'graphql-tag';

export default function userBasicProfile(userName: string) {
  return gql`
    {
        user(login: "${userName}") {
          bio
          createdAt
          email
          followers(first: 20) {
            totalCount
          }
          following {
            totalCount
          }
          repositories {
            totalCount
          }
          starredRepositories {
            totalCount
          }
        }
      }
    `;
}
