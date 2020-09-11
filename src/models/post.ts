import { Document, Schema, model } from 'mongoose';

export const postCollection = 'posts';

interface IData {
  pros: boolean;
  title: string;
}
export interface IPost extends Document {
  authorId: string;
  title: string;
  data: IData[];
  updateTitle: (title: string) => Promise<null>;
  add: (id: string, pros: boolean, title: string) => Promise<null>;
}

const dataSchema = new Schema({
  type: Boolean,
  title: String,
  _id: { id: false },
});
const postSchema = new Schema({
  authorId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  data: [dataSchema],
});

postSchema.statics.updateTitle = async (id: string, title: string) => {
  await Post.findByIdAndUpdate(id, { title });
};
postSchema.statics.add = async (id: string, pros: boolean, title: string) => {
  const data: IData = {
    pros,
    title,
  };
  const post = await Post.findById(id);
  if (!post || !post.id) return null;
  post.data.push(data);
  post.save();
};

export const Post = model<IPost>('Post', postSchema, postCollection);

export const getPost = async (id: string): Promise<any> => {
  const post = await Post.findById(id);
  if (!post) return null;
  return post;
};

export const createPost = async (title: string): Promise<{ id: string }> => {
  const post = new Post();
  post.title = title;
  const createdPost = await post.save();
  return {
    id: createdPost._id,
  };
};

export const updatePost = async (
  id: string,
  title: string
): Promise<boolean> => {
  const post = await Post.findById(id);
  if (!post || !post.id) return false;
  await post.updateTitle(title);
  return !!post._id;
};

export const addToPost = async (
  id: string,
  type: boolean,
  title: string
): Promise<string> => {
  const post = await Post.findById(id);
  if (!post || !post.id) return '';
  post.add(id, type, title);
  return post._id;
};

export const removeFromPost = async (
  postId: string,
  dataTitle: string
): Promise<string> => {
  if (!dataTitle || !postId) return '';
  const post = await Post.findById(postId);
  if (!post || !post.id) return '';
  const newData = [...post.data].filter((item) => item.title !== dataTitle);
  post.data = newData;
  await post.save();
  return dataTitle;
};

export const updateInPost = async (
  postId: string,
  dataTitle: string,
  newDataTitle: string
): Promise<string> => {
  if (!dataTitle || !postId || !newDataTitle) return '';

  const post = await Post.findById(postId);
  if (!post || !post.id) return '';

  const newData = [...post.data];
  const index = newData.findIndex((item) => item.title === dataTitle);
  if (index !== -1) return '';

  newData[index].title = newDataTitle;
  post.data = newData;
  await post.save();
  return dataTitle;
};

export const deletePost = async (id: string): Promise<string> => {
  const post = await Post.findByIdAndDelete(id);
  if (!post || !post.id) return '';
  return post.id;
};
