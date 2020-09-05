import { gql } from 'apollo-server-koa';

export const dataItem = gql`
  type Data {
    type: Boolean
    title: String
  }
`;
