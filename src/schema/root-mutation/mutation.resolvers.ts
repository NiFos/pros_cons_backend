import {
  updatePost,
  createPost,
  addToPost,
  deletePost,
} from '../../models/post';

export const RootMutationResolver = {
  UpdatePostTitle: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<string> => {
    const { id, title } = args;
    const post = await updatePost(id, title);
    if (post) return id;
    return '';
  },
  CreatePost: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<string> => {
    const { title } = args;
    const post = await createPost(title);
    if (post.id) return post.id;
    return '';
  },
  AddPostData: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<string> => {
    const { id, type, title } = args;
    const post = await addToPost(id, type, title);
    if (post) return post;
    return '';
  },
  DeletePost: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<string> => {
    const { id } = args;
    const post = await deletePost(id);
    if (post) return post;
    return '';
  },
};
