import jwt from 'jsonwebtoken';
import { createToken, userHasToken } from '../models/token';
import { User } from '../models/user';
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '10m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || '1h';
const SECRET = process.env.SECRET || 'SECRET_STRING';

export const auth = {
  async createTokens(id: any) {
    const token = jwt.sign({ id }, SECRET, { expiresIn: TOKEN_EXPIRATION });
    const refreshToken = jwt.sign({ id }, SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });
    await createToken(id, refreshToken);
    return [token, refreshToken];
  },
  setTokens(res: any, [token, refreshToken]: string[]) {
    res.append('authorization', token);
    res.append('refreshToken', refreshToken);
    res.append('Access-Control-Expose-Headers', [
      'authorization',
      'refreshToken',
    ]);
  },
  getTokens: (req: any) => [
    req.headers.token || '',
    req.headers.refreshToken || '',
  ],
  async refreshTokens(res: any, refreshToken: string): Promise<any> {
    try {
      const tokenPayload: any = jwt.verify(refreshToken, SECRET);
      if (!tokenPayload.id) return false;
      const hasToken = userHasToken(tokenPayload.id);
      if (!hasToken) return false;

      const user = await User.findById(tokenPayload.id);
      if (!user) return false;

      const [newToken, newRefreshToken] = await auth.createTokens(user._id);

      auth.setTokens(res, [newToken, newRefreshToken]);
      return {
        id: user._id,
      };
    } catch (error) {
      return false;
    }
  },
  async initializeUser(token: string, refreshToken: string, res: any) {
    if (!token || !refreshToken) return false;

    let response = null;
    jwt.verify(token, SECRET, async (err, info: any) => {
      if (err) {
        response = await auth.refreshTokens(res, refreshToken);
      } else {
        response = {
          id: info.id,
        };
      }
    });
    return response;
  },
  async login(id: string, res: any) {
    const [token, refreshToken] = await auth.createTokens(id);
    auth.setTokens(res, [token, refreshToken]);
  },
};
