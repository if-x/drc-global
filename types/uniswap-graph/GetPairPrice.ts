/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Block_height } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetPairPrice
// ====================================================

export interface GetPairPrice_pair_token0 {
  id: string;
}

export interface GetPairPrice_pair_token1 {
  id: string;
}

export interface GetPairPrice_pair {
  token0: GetPairPrice_pair_token0;
  token1: GetPairPrice_pair_token1;
  token0Price: any;
  token1Price: any;
}

export interface GetPairPrice {
  pair: GetPairPrice_pair | null;
}

export interface GetPairPriceVariables {
  id: string;
  block?: Block_height | null;
}
