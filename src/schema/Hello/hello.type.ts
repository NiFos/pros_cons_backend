import { gql } from 'apollo-server-koa';

export const hello = gql`
  type Hello {
    message: String
  }
`;
