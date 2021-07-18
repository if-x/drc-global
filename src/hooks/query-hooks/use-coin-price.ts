import {
  HashedSimplePriceResult,
  CoinId,
} from "../../../types/api-results/simple-price";
import { DrCoinId } from "../../../types/dr-vault";
import { getSimplePriceQueryUrl } from "../../utils/coingecko-endpoints";
import { mapCoinPrice } from "../../utils/data-mappings/map-coin-price";
import { useAxios } from "./use-axios";

interface UseCoinPriceInput {
  id: DrCoinId;
}

export const useCoinPrice = ({ id }: UseCoinPriceInput) => {
  const url = getSimplePriceQueryUrl({
    ids: [id],
  });

  const { data, error, loading } = useAxios<HashedSimplePriceResult>(url, {
    refetchInterval: 1000 * 60 * 5,
  });

  const mappedData = mapCoinPrice(data);

  return {
    data: mappedData ? mappedData[id] : undefined,
    error,
    loading,
    initialLoading: loading && !data,
  };
};

interface UseCoinsPricesInput {
  ids: CoinId[];
}

export const useCoinsPrices = ({ ids }: UseCoinsPricesInput) => {
  const url = getSimplePriceQueryUrl({
    ids,
  });

  const { data, error, loading } = useAxios<HashedSimplePriceResult>(url, {
    refetchInterval: 1000 * 60 * 5,
  });

  return {
    data: mapCoinPrice(data),
    error,
    loading,
  };
};
