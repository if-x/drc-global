/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Block_height } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetEthPrice
// ====================================================

export interface GetEthPrice_bundle {
  ethPrice: any;
}

export interface GetEthPrice {
  bundle: GetEthPrice_bundle | null;
}

export interface GetEthPriceVariables {
  block?: Block_height | null;
}
