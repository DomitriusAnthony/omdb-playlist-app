import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Main from "../components/Main";
import SearchMedia from "../components/SearchMedia";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      token
      username
      id
    }
  }
`;
export default class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            {/* <Query query={CURRENT_USER}>
              {({ data, error, loading }) => {
                if (loading) return <h1>Loading...</h1>;
                if (error) return <h1>Error</h1>;

                console.log(data);

                return <p>Is there a user?</p>;
              }}
            </Query> */}
            <Route
              exact
              path="/"
              render={() => <Main DefaultComponent={SearchMedia} />}
            />
            <Route
              path="/register"
              render={() => <Main DefaultComponent={RegistrationForm} />}
            />
            <Route
              path="/login"
              render={() => <Main DefaultComponent={LoginForm} />}
            />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}
