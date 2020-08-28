import { helloResolver } from './Hello/hello.resolvers';
import { RootQueryResolver } from './root-query/query.resolvers';
import { RootMutationResolver } from './root-mutation/mutation.resolvers';

export const resolvers = {
  Hello: helloResolver,
  RootQuery: RootQueryResolver,
  RootMutation: RootMutationResolver,
};
