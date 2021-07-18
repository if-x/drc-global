import {
  CoinMarketDataMapped,
  CoinMarketDataResult,
} from "../../../types/api-results/coin-market-data";

const hashData = (input: [number, number][]): Record<string, number> => {
  return input.reduce((acc: Record<string, number>, cur) => {
    if (!acc[cur[0]]) {
      acc[cur[0]] = cur[1];
    }

    return acc;
  }, {});
};

export const mapCoinMarketData = (
  data?: CoinMarketDataResult
): CoinMarketDataMapped | undefined => {
  if (!data || !data.prices || !data.market_caps || !data.total_volumes) {
    return undefined;
  }

  const hashedPrices = hashData(data.prices);
  const hashedMarketCap = hashData(data.market_caps);
  const hashedVolume = hashData(data.total_volumes);

  return Object.keys(hashedPrices).map((date) => ({
    date: parseInt(date),
    price: hashedPrices[date],
    marketCap: hashedMarketCap[date],
    totalVolume: hashedVolume[date],
  }));
};
