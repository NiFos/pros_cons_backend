import jwt from 'jsonwebtoken';
import { createToken, userHasToken } from '../models/token';
import { User } from '../models/user';
import { google } from 'googleapis';
import Koa from 'koa';

const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '10m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || '1h';
const SECRET = process.env.SECRET || 'SECRET_STRING';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'CLIENT_ID';
const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET || 'CLIENT_SECRET';
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL || 'REDIRECT_URL';

export const auth = {
  async createTokens(id: any) {
    const token = jwt.sign({ id }, SECRET, { expiresIn: TOKEN_EXPIRATION });
    const refreshToken = jwt.sign({ id }, SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });

    await createToken(id, refreshToken);
    return [token, refreshToken];
  },
  setTokens(ctx: any, [token, refreshToken]: string[]) {
    ctx.response.set('authorization', token);
    ctx.response.set('refreshToken', refreshToken);
    ctx.response.set('Access-Control-Expose-Headers', [
      'authorization',
      'refreshToken',
    ]);
  },
  getTokens: (context: any) => [
    context.request.header.authorization || '',
    context.request.header.refreshtoken || '',
  ],
  async refreshTokens(ctx: Koa.Context, refreshToken: string): Promise<any> {
    try {
      const tokenPayload: any = jwt.verify(refreshToken, SECRET);
      if (!tokenPayload.id) return false;
      const hasToken = userHasToken(tokenPayload.id);
      if (!hasToken) return false;
      const exist = await User.exists({ _id: tokenPayload.id });
      if (!exist) return false;

      const [newToken, newRefreshToken] = await auth.createTokens(
        tokenPayload.id
      );
      auth.setTokens(ctx, [newToken, newRefreshToken]);
      return {
        id: tokenPayload.id,
      };
    } catch (error) {
      return false;
    }
  },
  async initializeUser(token: string, refreshToken: string, ctx: any) {
    if (!token || !refreshToken || token === 'null' || refreshToken === 'null')
      return false;

    let response = null;
    let verifyToken;
    try {
      verifyToken = jwt.verify(token, SECRET, (err, info: any) => {
        if (err) return null;
        if (info) return info.id;
      });
    } catch (error) {
      verifyToken = null;
    }

    if (verifyToken) {
      response = {
        id: verifyToken,
      };
    } else {
      response = await auth.refreshTokens(ctx, refreshToken);
    }

    /* jwt.verify(token, SECRET, async (err, info: any) => {
      if (err) {
        response = await auth.refreshTokens(ctx, refreshToken);
        ctx.set('a11', 'a22');
      } else {
        response = {
          id: info.id,
        };
      }
    }); */
    return response;
  },
  async login(id: string, ctx: any) {
    const [token, refreshToken] = await auth.createTokens(id);
    auth.setTokens(ctx, [token, refreshToken]);
  },
};

const createConnectionGoogle = () =>
  new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URL
  );
const oauth2 = google.oauth2('v2');

export const loginUser = async (email: string) => {
  const exist = await User.findOne({ email: email.toLowerCase() });
  if (exist) {
    return exist._id;
  } else {
    const newUser = new User();
    newUser.email = email;
    await newUser.save();
    return newUser._id;
  }
};

export const oauth = {
  google: {
    getUrl() {
      const scope = 'https://www.googleapis.com/auth/userinfo.email';
      const auth = createConnectionGoogle();
      const url = auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope,
      });

      return url;
    },

    async getUserInfo(token: any): Promise<any> {
      const auth = createConnectionGoogle();
      const data = await auth.getToken(token);

      auth.setCredentials(data.tokens);
      return await oauth2.userinfo.get({ auth });
    },
  },
};
