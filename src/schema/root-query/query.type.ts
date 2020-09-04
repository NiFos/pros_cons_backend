import { gql } from 'apollo-server';

export const RootQueryType = gql`
  type RootQuery {
    Post(id: String): Post
    User(id: String): User
  }
`;
