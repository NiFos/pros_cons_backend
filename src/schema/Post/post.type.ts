import { gql } from 'apollo-server';

export const post = gql`
  type Post {
    id: String
    authorId: String
    title: String
    data: [Data]
  }
`;
