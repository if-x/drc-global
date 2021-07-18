import { CoinDetailsResult } from "../../../types/api-results/coin-details";
import { getCoinDetailQueryUrl } from "../../utils/coingecko-endpoints";
import { mapCoinDetails } from "../../utils/data-mappings/map-coin-details";
import { useAxios } from "./use-axios";

interface UseCoinDetailsInput {
  id: string;
}

export const useCoinDetails = ({ id }: UseCoinDetailsInput) => {
  const { data, error, loading, timestamp } = useAxios<CoinDetailsResult>(
    getCoinDetailQueryUrl({ id }),
    { refetchInterval: 1000 * 60 * 5 }
  );

  return {
    data: mapCoinDetails(data),
    error,
    loading,
    timestamp,
  };
};
