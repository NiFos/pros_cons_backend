import { getPost } from '../../models/post';

export const RootQueryResolver = {
  Post: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<any> => {
    const { id } = args;
    const post = getPost(id);
    return post;
  },
};
