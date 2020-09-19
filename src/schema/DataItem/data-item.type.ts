import { gql } from 'apollo-server-koa';

export const dataItem = gql`
  type Data {
    pros: Boolean
    title: String
  }
`;
