import { gql } from 'apollo-server-koa';

export const RootQueryType = gql`
  enum OauthEnum {
    google
  }
  type RootQuery {
    Post(id: String): Post
    Me: User
    Auth(type: OauthEnum): String
  }
`;
