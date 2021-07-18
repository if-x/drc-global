import { gql } from "@apollo/client";

export const GET_TOKEN_LIQUIDITY = gql`
  query GetTokenLiquidity($id: ID!) {
    token(id: $id) {
      id
      derivedETH
      totalLiquidity
    }
  }
`;
