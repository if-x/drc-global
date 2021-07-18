import Web3 from "web3";
import { CoinMarketDataResult } from "../../../../types/api-results/coin-market-data";
import { COIN_ID } from "../../../constants/coin-id";
import { getCoinMarketDataQueryUrl } from "../../coingecko-endpoints";
import { axiosFetch } from "../../data-fetch/axios-fetch";
import { mapCoinMarketData } from "../../data-mappings/map-coin-market-data";
import { dataWeb3 } from "../data-web3";
import { getVaultHistoricalHoldings } from "./drc-vault-historical-holdings";

interface PerformanceTimelineInput {
  web3?: Web3;
  contractAddress: string;
}

export interface TokenValueTimeStep {
  date: number;
  tvl: number;
  price: number;
}

export const getDrcVaultPerformanceTimeline = async ({
  web3,
  contractAddress,
}: PerformanceTimelineInput) => {
  const web3ToUse = web3 || dataWeb3;
  const historicalHoldings = await getVaultHistoricalHoldings({
    web3: web3ToUse,
    contractAddress,
  });

  if (!historicalHoldings || historicalHoldings.length === 0) {
    return null;
  }

  const startTime = historicalHoldings[0].timestamp;

  const days = (Date.now() / 1000 - startTime) / (60 * 60 * 24);
  const priceTimeLineData = await axiosFetch<CoinMarketDataResult>(
    getCoinMarketDataQueryUrl({ id: COIN_ID, days })
  );
  const mappedTimeline = mapCoinMarketData(priceTimeLineData.data);

  if (!mappedTimeline) {
    return null;
  }

  const reversedHoldings = historicalHoldings.reverse();

  const timelineData: TokenValueTimeStep[] = mappedTimeline.map((step) => {
    const holding = reversedHoldings.find(
      (h) => h.timestamp <= step.date / 1000
    );
    return {
      date: step.date,
      tvl: (holding?.holding || 0) * step.price,
      price: step.price,
    };
  });

  return timelineData;
};
