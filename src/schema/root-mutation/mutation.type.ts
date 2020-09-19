import { gql } from 'apollo-server-koa';

export const RootMutationType = gql`
  type RootMutation {
    CreatePost(title: String): String
    UpdatePostTitle(id: String, title: String): String
    AddPostData(id: String, pros: Boolean, title: String): String
    RemovePostData(postId: String, dataTitle: String, pros: Boolean): String
    UpdatePostData(
      postId: String
      dataTitle: String
      pros: Boolean
      newDataTitle: String
    ): String
    DeletePost(id: String): String
  }
`;
