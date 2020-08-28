import { gql, makeExecutableSchema } from 'apollo-server';
import { RootQueryType } from './root-query/query.type';
import { RootMutationType } from './root-mutation/mutation.type';
import { hello } from './Hello/hello.type';
import { resolvers } from './resolvers';

const schemaDefinition = gql`
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [schemaDefinition, RootQueryType, RootMutationType, hello],
  resolvers: resolvers,
});
