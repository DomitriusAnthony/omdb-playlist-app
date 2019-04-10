import React from 'react'
import styled from 'styled-components';

const Card = styled.div`
    width: 200px;
    height: 200px;
`;

const CardImage = styled.div`
    width: 50%;
`;

const CardContent = styled.div`
    width: 50%;
`

const PlaylistCard = ({ media }) => {
    const { title, poster } = media;
    return (
        <Card>
            <CardImage>
                <img src={poster} alt="Playlist media" />
            </CardImage>
            <CardContent>
                <h1>{title}</h1>
            </CardContent>  
        </Card>
    )
};

export default PlaylistCard;