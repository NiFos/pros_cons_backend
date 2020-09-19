import { RootQueryResolver } from './root-query/query.resolvers';
import { RootMutationResolver } from './root-mutation/mutation.resolvers';
import { userResolvers } from './User/user.resolvers';

export const resolvers = {
  RootQuery: RootQueryResolver,
  RootMutation: RootMutationResolver,
  User: userResolvers,
};
