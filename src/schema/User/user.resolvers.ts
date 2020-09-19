import { getUserPosts } from '../../models/user';

export const userResolvers = {
  posts: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<any> => {
    const { id } = context.user;
    if (!id) return null;
    const posts = await getUserPosts(id);
    if (!posts || posts.length <= 0) return null;
    return posts;
  },
};
