import { gql } from 'apollo-server-koa';

export const RootMutationType = gql`
  type RootMutation {
    CreatePost(title: String): String
    UpdatePostTitle(title: String): String
    AddPostData(id: String, type: Boolean, title: String): String
    RemovePostData(postId: String, dataTitle: String): String
    UpdatePostData(
      postId: String
      dataTitle: String
      newDataTitle: String
    ): String
    DeletePost(id: String): String
  }
`;
