export const helloResolver = {
  message: async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<string> => {
    console.log('Hello print');

    return 'hello';
  },
};
