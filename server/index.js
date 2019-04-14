require("dotenv").config();
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { prisma } = require("./prisma/generated/prisma-client");

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET);
    }
    return null;
  } catch (err) {
    return null;
  }
};

const OmdbAPI = require("./datasources/omdb");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    omdbAPI: new OmdbAPI()
  }),
  context: async ({ req }) => {
    const tokenWithBearer = (await req.headers.authorization) || "";
    const token = tokenWithBearer.split(" ")[1];
    const user = getUser(token);

    return {
      user,
      prisma // the generated prisma client if you are using it
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
