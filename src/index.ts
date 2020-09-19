import 'dotenv/config';
import { ApolloServer } from 'apollo-server-koa';
import koa from 'koa';
import cors from '@koa/cors';
import { schema } from './schema/schema';
import { connect } from './models/db';
import { auth } from './utils/auth';
import { authRouter } from './routes/authRoutes';
connect();

const port = process.env.PORT || 3000;
const app = new koa();

const server = new ApolloServer({
  schema: schema,
  context: async ({ ctx }) => {
    const [authorization, refreshToken] = auth.getTokens(ctx);
    const user = await auth.initializeUser(authorization, refreshToken, ctx);

    return {
      user,
      ctx,
    };
  },
});

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

server.applyMiddleware({ app, cors: corsOptions });
app.use(async (ctx, next) => {
  await next();
});
app.use(authRouter.routes()).use(authRouter.allowedMethods());

app.listen({ port }, () => console.log('Server started!'));
