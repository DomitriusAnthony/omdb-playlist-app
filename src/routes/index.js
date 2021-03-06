import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CurrentUser from "../components/CurrentUser";
import Main from "../components/Main";
import SearchMedia from "../components/SearchMedia";
import NoAuthHome from "../components/NoAuthHome";

export default class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <CurrentUser>
              {({ data: { currentUser } }) => {
                console.log("Current User: ", currentUser)
                return (
                  <Fragment>
                    {currentUser && (
                      <Route
                        exact
                        path="/"
                        render={() => <Main DefaultComponent={SearchMedia} />}
                      />
                    )}

                    {!currentUser && (
                      <Route
                        exact
                        path="/"
                        render={() => <Main DefaultComponent={NoAuthHome} />}
                      />
                    )}
                  </Fragment>
                );
              }}
            </CurrentUser>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}
