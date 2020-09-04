import { gql } from 'apollo-server';

export const RootMutationType = gql`
  type RootMutation {
    Post: String
    CreatePost(title: String): String
    UpdatePostTitle(title: String): String
    AddPostData(id: String, type: Boolean, title: String): String
    DeletePost(id: String): String
  }
`;
