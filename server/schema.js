const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    currentUser: User!
    showOrMovieData(title: String): Media
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User!
    login(username: String!, password: String!): LoginResponse!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    playlist: [Media!]!
  }

  type Ratings {
    source: String
    value: String
  }

  type Media {
    title: String
    year: String
    rated: String
    released: String
    runtime: String
    genre: String
    director: String
    writer: String
    actors: String
    plot: String
    language: String
    country: String
    awards: String
    poster: String
    ratings: Ratings
    metascore: String
    imdbRating: String
    imdbVotes: String
    imdbID: String
    totalSeasons: String
    response: String
  }

  type LoginResponse {
    token: String
    user: User
  }
`;

module.exports = typeDefs;
