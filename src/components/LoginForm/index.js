import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

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

const CURRENT_USER = gql`
  query {
    currentUser {
      username
      id
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
    <Mutation
      mutation={LOGIN}
      onCompleted={data => {
        saveToken(data.login.token);
        return props.history.push("/");
      }}
    >
      {login => {
        return (
          <form
            onSubmit={e => {
              e.preventDefault();
              return login({
                variables: {
                  username: loginValues.username,
                  password: loginValues.password
                }
              });
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
