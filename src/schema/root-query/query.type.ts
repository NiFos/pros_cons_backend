import { gql } from 'apollo-server';

export const RootQueryType = gql`
  enum OauthEnum {
    google
  }
  type RootQuery {
    Post(id: String): Post
    User(id: String): User
    Auth(type: OauthEnum): String
  }
`;
