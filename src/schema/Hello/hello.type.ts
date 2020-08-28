import { gql } from 'apollo-server';

export const hello = gql`
  type Hello {
    message: String
  }
`;
