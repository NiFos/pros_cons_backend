import { gql } from 'apollo-server';

export const dataItem = gql`
  type Data {
    type: Boolean
    title: String
  }
`;
