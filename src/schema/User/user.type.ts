import { gql } from 'apollo-server-koa';

export const user = gql`
  type User {
    email: String
    posts: [Post]
  }
`;
