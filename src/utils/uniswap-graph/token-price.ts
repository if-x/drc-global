import LRU from "lru-cache";
import {
  GetPairPrice,
  GetPairPriceVariables,
} from "../../../types/uniswap-graph/GetPairPrice";
import {
  getContractAddress,
  getPairAddress,
} from "../../data/dr/contract-by-network";
import { uniswapClient } from "../apollo/apollo-client";
import { GET_PAIR_PRICE } from "../apollo/queries/pair-price";
import { toNumber } from "../format-number";
import { getEthPrice } from "./eth-price";

const cache = new LRU<string, number>({
  max: 50000,
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
});

type PairName = "drc" | "wbtc" | "paxg" | "usdc";

// Mainnet only function
export const getTokenPrice = async (
  pairName: PairName,
  blockNumber?: number
) => {
  const cacheKey = blockNumber
    ? `${pairName}Price_${blockNumber}`
    : `${pairName}Price`;

  const cachedData: number | undefined = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const pairAddress = getPairAddress(pairName);
    const tokenAddress = getContractAddress(pairName, 1).toLowerCase();

    const { data } = await uniswapClient.query<
      GetPairPrice,
      GetPairPriceVariables
    >({
      query: GET_PAIR_PRICE,
      variables: {
        id: pairAddress,
        block: blockNumber ? { number: blockNumber } : null,
      },
    });

    const token0 = data.pair?.token0.id.toLowerCase();
    const price0 = toNumber(data.pair?.token0Price);
    const price1 = toNumber(data.pair?.token1Price);

    const priceInEth = tokenAddress === token0 ? price1 : price0;
    const ethPrice = await getEthPrice(blockNumber);

    if (priceInEth && ethPrice) {
      const price = priceInEth * ethPrice;
      cache.set(cacheKey, price, 1000 * 60);
      return price;
    }

    return null;
  } catch (err) {
    return null;
  }
};
