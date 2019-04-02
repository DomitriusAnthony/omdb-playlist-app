import React from 'react'
import styled from 'styled-components';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const Card = styled.div`
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

const CardImage = styled.div``
const CardContent = styled.div``

const GET_MEDIA_DETAILS = gql`
  query GetMediaDetails($title: String) {
    showOrMovieData(title: $title) {
      title
      plot
      poster
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
        const { title, poster, plot, imdbRating } = showOrMovieData;
        return (
                <Card>
                    <CardImage>
                        <img src={poster} alt="Media poster" />
                    </CardImage>
                    <CardContent>
                        <h1>{title}</h1>
                        <p>IMDB: {imdbRating}</p>
                        <p>{plot}</p>
                        <Mutation mutation={ADD_TO_PLAYLIST} variables={showOrMovieData}>
                            {addToPlaylist => {
                                return (
                                    <button onClick={addToPlaylist}>Add</button>
                                )
                            }}
                        </Mutation>
                        
                    </CardContent>                    
                </Card>
            );
        }}
    </Query>
  )
}

export default MediaCard;
