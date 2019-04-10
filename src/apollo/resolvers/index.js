import gql from "graphql-tag";

let id = 0;

export default {
  Mutation: {
    addToPlaylist: (_, { media }, { cache }) => {
      const query = gql`
        query GetPlaylists {
          playlist @client {
            id
          }
        }
      `;

      const prevState = cache.readQuery({ query });

      const newMedia = {
        ...media,
        __typename: "Media",
        id: id++
      };

      const data = {
        playlist: prevState.playlist.concat(newMedia)
      };

      cache.writeData({ data });
    }
  }
};
