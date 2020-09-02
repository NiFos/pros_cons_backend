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

const postSchema = new Schema({
  authorId: {
    type: String,
    required: true,
  },
  pros: {
    type: [String],
  },
});

postSchema.statics.updateTitle = async (id: string, title: string) => {
  await Post.findByIdAndUpdate(id, { title });
};
postSchema.statics.add = async (id: string, pros: boolean, title: string) => {
  const data: IData = {
    pros,
    title,
  };

  await Post.findByIdAndUpdate(id, {
    $push: {
      data,
    },
  });
};

export const Post = model<IPost>('Post', postSchema, postCollection);

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
  return !!post?._id;
};

export const addToPost = async (
  id: string,
  type: boolean,
  title: string
): Promise<string> => {
  const post = await Post.findById(id);
  if (!post || !post.id) return '';
  post.add(id, type, title);
  return post?._id;
};

export const deletePost = async (id: string): Promise<string> => {
  const post = await Post.findByIdAndDelete(id);
  return post?.id;
};
