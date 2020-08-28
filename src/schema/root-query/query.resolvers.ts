export const RootQueryResolver = {
  Hello: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<string> => {
    return 'Hello world';
  },
};
