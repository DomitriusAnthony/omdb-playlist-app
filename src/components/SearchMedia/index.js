import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";

const GET_MEDIA_DETAILS = gql`
  query GetMediaDetails($title: String) {
    showOrMovieData(title: $title) {
      title
      plot
      poster
    }
  }
`;

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
  }
`;

const SearchMediaContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  text-align: center;

  & h1 {
    font-size: 50px;
    margin-bottom: 10px;
  }

  & p {
    font-size: 20px;
  }

  & img {
    border: 1px solid black;
    box-shadow: 5px 6px 20px 4px black;
    margin-bottom: 20px;
  }
`;

const SearchMedia = () => {
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");
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
      {search && (
        <Query query={GET_MEDIA_DETAILS} variables={{ title: search }}>
          {({ data, loading, error }) => {
            if (loading) return <h1>Loading...</h1>;
            if (error) return <h1>{search} does not exist. Try again :)</h1>;
            const { showOrMovieData } = data;
            const { title, poster, plot } = showOrMovieData;
            return (
              <SearchMediaContent>
                <h1>{title}</h1>
                <img src={poster} alt="Media poster" />
                <p>{plot}</p>
              </SearchMediaContent>
            );
          }}
        </Query>
      )}
    </SearchMediaContainer>
  );
};

export default SearchMedia;
