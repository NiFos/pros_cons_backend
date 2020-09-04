import { getPost } from '../../models/post';
import { User } from '../../models/user';

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
  User: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<any> => {
    const { id } = args;
    const user = await User.findById(id);
    if (!user?._id) return null;
    return user;
  },
};
