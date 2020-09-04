import { Document, Schema, model } from 'mongoose';
import { Post } from './post';

const userCollection = 'Users';

interface IUser extends Document {
  id?: string;
  email: string;
}

const userSchema = new Schema({
  email: String,
});

export const User = model<IUser>('User', userSchema, userCollection);

export const getUser = async (id: string): Promise<any> => {
  const user = await User.findById(id);
  if (!user?._id) return null;
  return user;
};

export const getUserPosts = async (id: string): Promise<any> => {
  const posts = await Post.find({ authorId: id });
  if (!posts || posts.length <= 0) return null;
  return posts;
};
