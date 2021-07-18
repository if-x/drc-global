import { gql } from "@apollo/client";

export const GET_ETH_PRICE = gql`
  query GetEthPrice($block: Block_height) {
    bundle(id: "1", block: $block) {
      ethPrice
    }
  }
`;
