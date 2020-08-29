import { gql } from 'apollo-server';

export const RootMutationType = gql`
  type RootMutation {
    Post: String
  }
`;
