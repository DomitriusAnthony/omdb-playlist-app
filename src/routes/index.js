import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from "../components/Main";
import SearchMedia from "../components/SearchMedia";

/*

I'm using the render prop method to feed a component into the "Main" component. This allows to have a single space to load any new view.

- Create a new route that looks like: <Route path="/whatever" render(() => <Main DefaultComponent={YourComponentNameHere} />) />
- Whatever is fed to the DefaultComponent prop will display in Main at whichever route you choose.

*/

export default class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Main DefaultComponent={SearchMedia} />}
            />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}
