import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import "./index.css";
import App from "./App";

import resolvers from "./apollo/resolvers";

const httpLink = new HttpLink({
  uri: "http://localhost:4000"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("Authorization");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  resolvers,
  link: authLink.concat(httpLink)
});

// This is where you can setup your initial state.
cache.writeData({
  data: {
    playlist: []
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
