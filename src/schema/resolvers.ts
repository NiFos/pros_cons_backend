import { RootQueryResolver } from './root-query/query.resolvers';
import { RootMutationResolver } from './root-mutation/mutation.resolvers';

export const resolvers = {
  RootQuery: RootQueryResolver,
  RootMutation: RootMutationResolver,
};
