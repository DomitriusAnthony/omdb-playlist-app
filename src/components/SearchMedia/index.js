import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import CurrentUser from "../CurrentUser";
import MediaCard from "../MediaCard";
import gql from "graphql-tag";

import PlaylistCard from "../PlaylistCard";

const SearchMediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;

  & form {
    display: flex;
    flex-direction: column;
  }

  & input {
    width: 200px;
    height: 20px;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 3px;
    font-size: 16px;
  }

  & button {
    width: 210px;
    padding: 5px;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 50px;
    cursor: pointer;
  }
`;

const GET_PLAYLIST = gql`
  query GetPlaylist {
    playlist @client {
      title
      poster
    }
  }
`;

const SearchMedia = () => {
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");
  const logout = () => {
    return localStorage.removeItem("Authorization");
  };
  return (
    <SearchMediaContainer>
      <form
        onSubmit={e => {
          e.preventDefault();
          return setSearch(value);
        }}
      >
        <input value={value} onChange={e => setValue(e.target.value)} />
        <button>Search</button>
      </form>
      {search && <MediaCard search={search} />}
      <Query query={GET_PLAYLIST}>
        {({ data, loading, error }) => {
          if (loading) return <h1>Loading...</h1>;
          if (error) return <h1>There was an error</h1>;
          const { playlist } = data;
          return (
            playlist.length > 0 &&
            playlist.map(media => <PlaylistCard media={media} />)
          );
        }}
      </Query>
      <CurrentUser>
        {({ data: { currentUser } }) => {
          return (
            <div>
              <p>Hello {currentUser.username}</p>
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </div>
          );
        }}
      </CurrentUser>
    </SearchMediaContainer>
  );
};

export default SearchMedia;
