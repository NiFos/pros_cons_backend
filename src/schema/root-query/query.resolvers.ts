import { getPost } from '../../models/post';
import { User } from '../../models/user';
import { oauth } from '../../utils/auth';

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
  Auth: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<string> => {
    const { type } = args;
    if (!type) return '';

    switch (type) {
      case 'google':
        return oauth.google.getUrl();

      default:
        return '';
    }
  },
};
