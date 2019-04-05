import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

const SearchMediaCard = styled.div`
  display: flex;
  width: 500px;
  text-align: center;
  box-shadow: 5px 6px 20px 4px black;

  & h1 {
    font-size: 40px;
    margin-bottom: 10px;
  }

  & p {
    font-size: 15px;
  }

  & img {
    width: 100%;
    height: 100%;
  }

  & button {
    margin-left: 20px;
  }
`;

const SearchMediaCardImage = styled.div`
  width: 50%;
  border-right: 1px solid black;
`;

const SearchMediaCardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50%;
  padding: 5px;
`;

const GET_MEDIA_DETAILS = gql`
  query GetMediaDetails($title: String) {
    showOrMovieData(title: $title) {
      title
      plot
      poster
      imdbRating
      totalSeasons
    }
  }
`;

const ADD_TO_PLAYLIST = gql`
    mutation AddToPlaylist($media: Media) {
        addToPlaylist(media: $media) @client {
            id
        }
    }
`

const MediaCard = ({ search }) => {
  return (
    <Query query={GET_MEDIA_DETAILS} variables={{ title: search }}>
      {({ data, loading, error }) => {
        if (loading) return <h1>Loading...</h1>;
        if (error) return <h1>{search} does not exist. Try again :)</h1>;
        const { showOrMovieData } = data;
        const {
          title,
          poster,
          plot,
          imdbRating,
          totalSeasons
        } = showOrMovieData;
        return (
          <SearchMediaCard>
            <SearchMediaCardImage>
              <img src={poster} alt="Media poster" />
            </SearchMediaCardImage>
            <SearchMediaCardContent>
              <h1>{title}</h1>
              <p>IMDB: {imdbRating}</p>
              <p>Seasons: {totalSeasons}</p>
              <p>{plot}</p>
              <Mutation mutation={ADD_TO_PLAYLIST} variables={{media: showOrMovieData}}>
                {addToPlaylist => <button onClick={addToPlaylist}>Add</button>}
              </Mutation>
            </SearchMediaCardContent>
          </SearchMediaCard>
        );
      }}
    </Query>
  );
};

export default MediaCard;
