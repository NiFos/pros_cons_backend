import { gql, makeExecutableSchema } from 'apollo-server';
import { RootQueryType } from './root-query/query.type';
import { RootMutationType } from './root-mutation/mutation.type';
import { resolvers } from './resolvers';
import { post } from './Post/post.type';
import { user } from './User/user.type';
import { dataItem } from './DataItem/data-item.type';

const schemaDefinition = gql`
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [
    schemaDefinition,
    RootQueryType,
    RootMutationType,
    post,
    dataItem,
    user,
  ],
  resolvers: resolvers,
});
