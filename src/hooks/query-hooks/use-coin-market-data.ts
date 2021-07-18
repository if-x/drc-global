import { CoinMarketDataResult } from "../../../types/api-results/coin-market-data";
import { MarketDays } from "../../../types/coin-market-data";
import { getCoinMarketDataQueryUrl } from "../../utils/coingecko-endpoints";
import { mapCoinMarketData } from "../../utils/data-mappings/map-coin-market-data";
import { useAxios } from "./use-axios";

interface UseCoinMarketDataInput {
  id: string;
  days: MarketDays;
}

export const useCoinMarketData = ({ id, days }: UseCoinMarketDataInput) => {
  const { data, error, loading, timestamp } = useAxios<CoinMarketDataResult>(
    getCoinMarketDataQueryUrl({ id, days }),
    { refetchInterval: 1000 * 60 * 5 }
  );

  return {
    data: mapCoinMarketData(data),
    error,
    loading,
    timestamp,
  };
};
