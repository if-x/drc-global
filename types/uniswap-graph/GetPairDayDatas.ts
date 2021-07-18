/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PairDayData_filter } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetPairDayDatas
// ====================================================

export interface GetPairDayDatas_pairDayDatas_token0 {
  id: string;
}

export interface GetPairDayDatas_pairDayDatas_token1 {
  id: string;
}

export interface GetPairDayDatas_pairDayDatas {
  id: string;
  token0: GetPairDayDatas_pairDayDatas_token0;
  token1: GetPairDayDatas_pairDayDatas_token1;
  date: number;
  reserve0: any;
  reserve1: any;
  reserveUSD: any;
}

export interface GetPairDayDatas {
  pairDayDatas: GetPairDayDatas_pairDayDatas[];
}

export interface GetPairDayDatasVariables {
  dayCount?: number | null;
  where?: PairDayData_filter | null;
}
