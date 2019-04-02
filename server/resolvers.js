module.exports = {
  Query: {
    showOrMovieData: async (_, { title }, { dataSources }) => {
      return dataSources.omdbAPI.getMediaDetails(title);
    }
  }
};
