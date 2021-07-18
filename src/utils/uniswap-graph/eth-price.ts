import LRU from "lru-cache";
import {
  GetEthPrice,
  GetEthPriceVariables,
} from "../../../types/uniswap-graph/GetEthPrice";
import { uniswapClient } from "../apollo/apollo-client";
import { GET_ETH_PRICE } from "../apollo/queries/eth-price";
import { toNumber } from "../format-number";

const cache = new LRU<string, number>({
  max: 50000,
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
});

export const getEthPrice = async (blockNumber?: number) => {
  const cacheKey = blockNumber ? `ethPrice_${blockNumber}` : "ethPrice";
  const cachedData: number | undefined = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const { data } = await uniswapClient.query<
      GetEthPrice,
      GetEthPriceVariables
    >({
      query: GET_ETH_PRICE,
      variables: { block: blockNumber ? { number: blockNumber } : null },
    });

    const ethPrice = toNumber(data.bundle?.ethPrice);

    if (ethPrice) {
      const maxAge = !blockNumber ? 1000 * 60 : undefined;
      cache.set(cacheKey, ethPrice, maxAge);
    }

    return ethPrice || null;
  } catch (err) {
    return null;
  }
};
