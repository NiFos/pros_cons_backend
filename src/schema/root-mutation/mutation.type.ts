import { gql } from 'apollo-server-koa';

export const RootMutationType = gql`
  type RootMutation {
    CreatePost(title: String): String
    UpdatePostTitle(title: String): String
    AddPostData(id: String, type: Boolean, title: String): String
    RemovePostData(dataId: String): String
    UpdatePostData(dataId: String, type: Boolean): String
    DeletePost(id: String): String
  }
`;
