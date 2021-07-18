import { gql } from "@apollo/client";

//11922973
export const GET_PAIR_DAY_DATAS = gql`
  query GetPairDayDatas($dayCount: Int, $where: PairDayData_filter) {
    pairDayDatas(
      first: $dayCount
      orderBy: date
      orderDirection: asc
      where: $where
    ) {
      id
      token0 {
        id
      }
      token1 {
        id
      }
      date
      reserve0
      reserve1
      reserveUSD
    }
  }
`;
