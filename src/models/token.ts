import { Document, Schema, model } from 'mongoose';

const tokenCollection = 'Tokens';

export interface IToken extends Document {
  userId: string;
  refreshToken: string;
}

const tokenSchema = new Schema({
  userId: {
    required: true,
    type: String,
  },
  refreshToken: {
    required: true,
    type: String,
  },
});

export const Token = model<IToken>('Token', tokenSchema, tokenCollection);

export const userHasToken = async (id: string): Promise<boolean> => {
  const token = await Token.find({ id });
  return !!token;
};

export const createToken = async (
  id: string,
  newToken: string
): Promise<boolean> => {
  let userToken = await Token.findOne({ id });
  if (userToken && userToken.id) {
    userToken.userId = id;
    userToken.refreshToken = newToken;
    userToken.save();
  } else {
    userToken = new Token();
    userToken.userId = id;
    userToken.refreshToken = newToken;
  }
  return true;
};

export const deleteUserToken = async (id: string): Promise<boolean> => {
  await Token.findOneAndDelete({ id });
  return true;
};
