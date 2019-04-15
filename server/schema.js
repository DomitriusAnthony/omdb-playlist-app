const { gql } = require("apollo-server");


const typeDefs = gql`
  type Query {
    currentUser: User!
    showOrMovieData(title: String): Media
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User!
    login(username: String!, password: String!): LoginResponse!
    signout: SuccessMessage
    updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  }

  type SuccessMessage {
    message: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    playlist: [Media!]!
  }

  input UserUpdateInput {
    username: String
    email: String
    password: String
    playlist: MediaUpdateManyInput
  }

  input UserWhereUniqueInput {
    id: ID
    username: String
    email: String
  }

  input MediaUpdateManyInput {
    create: [MediaCreateInput!]
    delete: [MediaWhereUniqueInput!]
  }

  input MediaWhereUniqueInput {
    id: ID
  }

  input MediaCreateInput {
    id: ID
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
    source: String
    value: String
    metascore: String
    imdbRating: String
    imdbVotes: String
    imdbID: String
    totalSeasons: String
    response: String
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
    metascore: String
    source: String
    value: String
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
