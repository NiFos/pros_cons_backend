import { gql } from 'apollo-server-koa';

export const RootMutationType = gql`
  type RootMutation {
    CreatePost(title: String): String
    UpdatePostTitle(id: String, title: String): String
    AddPostData(postId: String, pros: Boolean, title: String): String
    RemovePostData(postId: String, dataId: String): String
    UpdatePostData(postId: String, dataId: String, newDataTitle: String): String
    DeletePost(id: String): String
  }
`;
