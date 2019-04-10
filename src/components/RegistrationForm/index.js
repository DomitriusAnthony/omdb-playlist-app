import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

const REGISTER = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      id
      email
    }
  }
`;

const RegistrationForm = props => {
  const [userFields, setUserFields] = React.useState({
    username: "",
    email: "",
    password: ""
  });
  return (
    <Mutation mutation={REGISTER} onCompleted={() => props.history.push("/")}>
      {register => {
        return (
          <form
            onSubmit={e => {
              e.preventDefault();
              return register({
                variables: {
                  username: userFields.username,
                  email: userFields.email,
                  password: userFields.password
                }
              });
            }}
          >
            <input
              onChange={e =>
                setUserFields({ ...userFields, username: e.target.value })
              }
              placeholder="Username"
            />
            <input
              onChange={e =>
                setUserFields({ ...userFields, email: e.target.value })
              }
              placeholder="email"
            />
            <input
              onChange={e =>
                setUserFields({ ...userFields, password: e.target.value })
              }
              placeholder="password"
            />
            <button>Finish</button>
          </form>
        );
      }}
    </Mutation>
  );
};

export default withRouter(RegistrationForm);
