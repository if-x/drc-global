import Web3 from "web3";
import { AssetKey } from "../../../../types/dr-vault";
import { getTokenPriceTimeline } from "../../uniswap-graph/token-price-timeline";
import { getTokenStoredTimeline } from "./token-stored-timeline";

interface VaultPerformanceTimelineInput {
  web3: Web3;
  contractAddress: string;
}

export interface TokenValueTimeStep {
  date: number;
  tvl: number;
  price: number;
}

export const getVaultPerformanceTimeline = async ({
  web3,
  contractAddress,
}: VaultPerformanceTimelineInput) => {
  const tokensStoredTimeline = await getTokenStoredTimeline({
    web3,
    contractAddress,
  });

  if (tokensStoredTimeline && tokensStoredTimeline.length > 0) {
    const startTimestamp = tokensStoredTimeline[0].timestamp;
    const tokens = tokensStoredTimeline.reduce(
      (allTokens: AssetKey[], timePoint) => {
        for (const token of timePoint.tokens) {
          if (!allTokens.includes(token)) {
            allTokens = [...allTokens, token];
          }
        }
        return allTokens;
      },
      []
    );

    let maxLength = tokensStoredTimeline.length;

    const tokenPriceLookup: Record<
      string,
      Record<string, number | undefined> | undefined
    > = {};
    for (const token of tokens) {
      const dailyPriceTimeline = await getTokenPriceTimeline(
        token,
        startTimestamp
      );

      if (dailyPriceTimeline?.length) {
        maxLength = Math.min(maxLength, dailyPriceTimeline.length);
      }

      const hashedPrice = dailyPriceTimeline?.reduce(
        (hashed: Record<string, number | undefined>, cur) => {
          hashed[cur.date] = cur.price;
          return hashed;
        },
        {}
      );
      tokenPriceLookup[token] = hashedPrice;
    }

    let step0Price = 0;

    const tokenUsdValueTimeline: TokenValueTimeStep[] = tokensStoredTimeline
      .map((step, index) => {
        const tvl = step.tokens.reduce((total: number, token, index) => {
          const tokenPrice = tokenPriceLookup[token]?.[step.timestamp] || 0;
          const tokenAmount = step.tokensStored[index];
          total += tokenPrice * tokenAmount;
          return total;
        }, 0);
        const price = step.totalSupply ? tvl / step.totalSupply : 0;
        if (index === 0) {
          step0Price = price;
        }
        const percentage =
          index === 0 || step0Price === 0 ? 1 : price / step0Price;
        return {
          date: step.timestamp * 1000,
          tvl,
          price,
          percentage,
        };
      })
      .slice(0, maxLength);

    return tokenUsdValueTimeline;
  }
};
