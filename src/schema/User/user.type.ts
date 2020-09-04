import { gql } from 'apollo-server';

export const user = gql`
  type User {
    email: String
    posts: [Post]
  }
`;
