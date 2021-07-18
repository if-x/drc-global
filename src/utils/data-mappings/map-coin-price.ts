import { toNumber } from "../format-number";
import {
  HashedSimplePriceResult,
  HashedSimplePriceMapped,
} from "../../../types/api-results/simple-price";

export const mapCoinPrice = (
  input: HashedSimplePriceResult | null | undefined
): HashedSimplePriceMapped | undefined => {
  if (!input) {
    return undefined;
  }

  return Object.keys(input).reduce((result: HashedSimplePriceMapped, key) => {
    const prices = input[key];
    if (!result[key] && prices) {
      result[key] = {
        usd: toNumber(prices.usd),
        eth: toNumber(prices.eth),
        lastUpdatedAt: prices.last_updated_at
          ? new Date(prices.last_updated_at)
          : undefined,
      };
    }

    return result;
  }, {});
};
