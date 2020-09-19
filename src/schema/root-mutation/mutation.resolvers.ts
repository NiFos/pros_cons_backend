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
    const { id, pros, title } = args;
    const post = await addToPost(id, pros, title);
    if (post) return post;
    return '';
  },
  RemovePostData: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<string> => {
    const { postId, dataTitle, pros } = args;
    if (!postId || !dataTitle) return '';
    const title = await removeFromPost(postId, dataTitle, pros);
    return title;
  },
  UpdatePostData: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<string> => {
    const { postId, dataTitle, pros, newDataTitle } = args;
    if (!postId || !dataTitle || !newDataTitle) return '';
    const title = await updateInPost(postId, dataTitle, pros, newDataTitle);
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
