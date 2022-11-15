import { gql } from '@apollo/client';

const GET_CHARACTER = gql`
  query getCharacter($name: String) {
    characters(filter: { name: $name }) {
      info {
        count
        pages
        prev
        next
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
      }
    }
  }
`;

export default GET_CHARACTER;
