import router from 'koa-router';
import { Context } from 'koa';
import { oauth, auth, loginUser } from '../utils/auth';

const authRouter = new router();
const { PRODUCTION_AUTH_REDIRECT } = process.env;

authRouter.get('/auth/google', async (ctx: Context) => {
  const { code } = ctx.request.query;
  if (!code) return (ctx.body = 'Something went wrong! Please try again!');
  ctx.body = 'Loading...';
  const user = await oauth.google.getUserInfo(code);
  const userId = await loginUser(user.data.email);

  const [authorization, refreshToken] = await auth.createTokens(userId);
  const url = `${PRODUCTION_AUTH_REDIRECT}/auth?authorization=${authorization}&refreshToken=${refreshToken}`;
  return ctx.redirect(url);
});
export { authRouter };
