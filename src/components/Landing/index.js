import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import RegistrationForm from "../RegistrationForm";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        username
        id
      }
    }
  }
`;

const Landing = () => {
  return <RegistrationForm />;
};

export default Landing;
