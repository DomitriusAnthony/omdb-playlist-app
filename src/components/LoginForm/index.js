import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";
import { CURRENT_USER } from "../CurrentUser";

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

const LoginForm = props => {
  const [loginValues, setLoginValues] = React.useState({
    username: "",
    password: ""
  });
  const saveToken = token => {
    localStorage.setItem("Authorization", token);
  };
  return (
    <Mutation mutation={LOGIN} refetchQueries={({ data }) => { saveToken(data.login.token); return [{ query: CURRENT_USER }]}} >
      {login => {
        return (
          <form
            onSubmit={e => {
              e.preventDefault();              
              login({
                variables: {
                  username: loginValues.username,
                  password: loginValues.password
                }
              })
            }}
          >
            <input
              onChange={e =>
                setLoginValues({ ...loginValues, username: e.target.value })
              }
            />
            <input
              onChange={e =>
                setLoginValues({ ...loginValues, password: e.target.value })
              }
            />
            <button>Login</button>
          </form>
        );
      }}
    </Mutation>
  );
};

export default withRouter(LoginForm);
