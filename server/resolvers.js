module.exports = {
  Query: {
    mediaData: async (_, { title }, { dataSources }) => {
      return dataSources.omdbAPI.getMediaDetails(title);
    }
  }
};
