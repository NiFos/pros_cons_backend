export const RootMutationResolver = {
  Hello: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<string> => {
    return 'Hello';
  },
};
