import LRU from "lru-cache";
import {
  GetTokenLiquidity,
  GetTokenLiquidityVariables,
} from "../../../types/uniswap-graph/GetTokenLiquidity";
import { uniswapClient } from "../apollo/apollo-client";
import { GET_TOKEN_LIQUIDITY } from "../apollo/queries/token-liquidity";
import { toNumber } from "../format-number";
import { getEthPrice } from "./eth-price";

const cache = new LRU<string, number>({
  max: 50000,
  maxAge: 1000 * 60 * 20, // 20 mins
});

export const getTokenLiquidity = async (address: string) => {
  const cacheKey = `tokenLiquidity_${address}`;
  const cachedData: number | undefined = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const ethPrice = await getEthPrice();

  if (!ethPrice) {
    return null;
  }

  try {
    const { data } = await uniswapClient.query<
      GetTokenLiquidity,
      GetTokenLiquidityVariables
    >({
      query: GET_TOKEN_LIQUIDITY,
      variables: { id: address.toLowerCase() },
    });

    const derivedETH = toNumber(data.token?.derivedETH);
    const totalLiquidity = toNumber(data.token?.totalLiquidity);

    const liquidity =
      derivedETH && totalLiquidity
        ? totalLiquidity * derivedETH * ethPrice
        : null;

    if (liquidity) {
      cache.set(cacheKey, liquidity);
    }

    return liquidity || null;
  } catch (err) {
    return null;
  }
};
