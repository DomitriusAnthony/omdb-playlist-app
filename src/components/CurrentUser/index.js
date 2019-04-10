import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      username
      id
    }
  }
`;

const CurrentUser = props => (
  <Query query={CURRENT_USER}>
    {payload => {
      return props.children({ data: { ...payload.data } });
    }}
  </Query>
);
export default CurrentUser;
