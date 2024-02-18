const resolvers = {
  queries: {
    verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
      return token;
    },
  },
};

export default resolvers;
