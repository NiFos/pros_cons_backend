import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { schema } from './schema/schema';
import { connect } from './models/db';
connect();

const port = process.env.PORT || 3000;

const server = new ApolloServer({
  schema: schema,
  context: async ({ req, res }) => {
    const authorization = req.headers.authorization || '';
    const refreshToken = req.headers.refreshToken || '';
    // Unit user
    return {
      // TODO: context && initialize User,
      context: { req, res },
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
