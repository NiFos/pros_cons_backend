import { gql } from 'apollo-server';

export const RootQueryType = gql`
  type RootQuery {
    Post: Post
  }
`;
