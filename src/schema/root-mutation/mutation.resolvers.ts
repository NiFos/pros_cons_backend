import {
  updatePost,
  createPost,
  addToPost,
  deletePost,
  updateInPost,
  removeFromPost,
} from '../../models/post';

export const RootMutationResolver = {
  UpdatePostTitle: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<string> => {
    const { id, title } = args;
    if (!id || !title) return '';

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
    const { id } = context.user;
    if (!title || !id) return '';

    const post = await createPost(title, id);
    if (post.id) return post.id;
    return '';
  },
  AddPostData: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<string> => {
    const { postId, pros, title } = args;
    const post = await addToPost(postId, pros, title);
    if (post) return post;
    return '';
  },
  RemovePostData: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<string> => {
    const { postId, dataId } = args;
    if (!postId || !dataId) return '';
    const title = await removeFromPost(postId, dataId);
    return title;
  },
  UpdatePostData: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<string> => {
    const { postId, dataId, newDataTitle } = args;
    if (!postId || !dataId || !newDataTitle) return '';
    const title = await updateInPost(postId, dataId, newDataTitle);
    if (!title) return '';
    return title;
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
