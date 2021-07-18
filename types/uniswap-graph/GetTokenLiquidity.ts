/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTokenLiquidity
// ====================================================

export interface GetTokenLiquidity_token {
  id: string;
  derivedETH: any | null;
  totalLiquidity: any;
}

export interface GetTokenLiquidity {
  token: GetTokenLiquidity_token | null;
}

export interface GetTokenLiquidityVariables {
  id: string;
}
