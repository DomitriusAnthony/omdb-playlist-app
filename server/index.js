require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const OmdbAPI = require("./datasources/omdb");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    omdbAPI: new OmdbAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
