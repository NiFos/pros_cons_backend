import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { schema } from './schema/schema';
import { connect } from './models/db';
import { auth } from './utils/auth';
connect();

const port = process.env.PORT || 3000;

const server = new ApolloServer({
  schema: schema,
  context: async ({ req, res }) => {
    const [authorization, refreshToken] = auth.getTokens(req);
    const user = await auth.initializeUser(authorization, refreshToken, res);
    return {
      user,
      request: { req, res },
    };
  },
  cors: {
    origin: ['http:localhost:3000'],
    credentials: true,
  },
});

server.listen(port).then(({ url }) => {
  console.log(`Server started! URL: ${url}`);
});
