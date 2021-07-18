import LRU from "lru-cache";
import {
  GetPairDayDatas,
  GetPairDayDatasVariables,
} from "../../../types/uniswap-graph/GetPairDayDatas";
import {
  getContractAddress,
  getPairAddress,
} from "../../data/dr/contract-by-network";
import { uniswapClient } from "../apollo/apollo-client";
import { GET_PAIR_DAY_DATAS } from "../apollo/queries/pair-day-data";
import { toNumber } from "../format-number";
import { getUnixTimeNowInSec } from "../timestamp";

interface PriceStep {
  date: number;
  price: number | undefined;
}
const cache = new LRU<string, PriceStep[]>({
  max: 50000,
  maxAge: 1000 * 60 * 60 * 24,
});

type TokenName = "weth" | "wbtc" | "paxg" | "usdc" | "farm" | "mph";

// Mainnet only function
export const getTokenPriceTimeline = async (
  tokenName: TokenName,
  startTimestamp: number
) => {
  const cacheKey = `${tokenName}PriceTimeline`;

  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const pairAddress =
      tokenName === "weth" ? getPairAddress("usdc") : getPairAddress(tokenName);
    const tokenAddress = getContractAddress(tokenName, 1).toLowerCase();

    const timeNow = getUnixTimeNowInSec();
    const dayCount = Math.floor((timeNow - startTimestamp) / (24 * 60 * 60));

    const { data } = await uniswapClient.query<
      GetPairDayDatas,
      GetPairDayDatasVariables
    >({
      query: GET_PAIR_DAY_DATAS,
      variables: {
        dayCount,
        where: {
          pairAddress,
          date_gte: startTimestamp,
        },
      },
    });

    const tokenPairData = data?.pairDayDatas || [];
    const tokenPriceTimeline: PriceStep[] = tokenPairData.map((pair) => {
      const token0 = pair.token0.id.toLowerCase();
      const reserve0 = toNumber(pair.reserve0);
      const reserve1 = toNumber(pair.reserve1);

      const reserveOfToken = tokenAddress === token0 ? reserve0 : reserve1;
      const priceInUSD = reserveOfToken
        ? pair.reserveUSD / (reserveOfToken * 2)
        : undefined;

      return {
        date: pair.date,
        price: priceInUSD,
      };
    });

    return tokenPriceTimeline;
  } catch (err) {
    return null;
  }
};
