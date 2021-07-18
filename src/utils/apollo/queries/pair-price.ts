import { gql } from "@apollo/client";

export const GET_PAIR_PRICE = gql`
  query GetPairPrice($id: ID!, $block: Block_height) {
    pair(id: $id, block: $block) {
      token0 {
        id
      }
      token1 {
        id
      }
      token0Price
      token1Price
    }
  }
`;
