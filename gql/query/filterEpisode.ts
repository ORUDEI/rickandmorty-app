import { gql } from '@apollo/client';

const GET_EPISODE = gql`
  query getEpisode($name: String) {
    episodes(filter: { name: $name }) {
      info {
        count
        pages
        prev
        next
      }
      results {
        id
        name
        air_date
        episode
        characters {
          id
          name
          image
        }
      }
    }
  }
`;

export default GET_EPISODE;
