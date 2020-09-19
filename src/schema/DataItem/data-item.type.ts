import { gql } from 'apollo-server-koa';

export const dataItem = gql`
  type Data {
    id: String
    pros: Boolean
    title: String
  }
`;
