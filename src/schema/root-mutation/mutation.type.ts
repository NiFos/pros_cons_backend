import { gql } from 'apollo-server';

export const RootMutationType = gql`
  type RootMutation {
    Hello: String
  }
`;
