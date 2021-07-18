import {
  CoinDetailsMapped,
  CoinDetailsResult,
} from "../../../types/api-results/coin-details";
import { toNumber } from "../format-number";

export const mapCoinDetails = (
  data?: CoinDetailsResult
): CoinDetailsMapped | undefined => {
  if (!data) {
    return undefined;
  }

  return {
    id: data.id,
    symbol: data.symbol || undefined,
    name: data.name || undefined,
    blockTimeInMinutes: toNumber(data.block_time_in_minutes),
    hashingAlgorithm: data.hashing_algorithm || undefined,
    categories: data.categories || undefined,
    description: { en: data.description?.en || undefined },
    links: data.links
      ? {
          homepage: data.links.homepage || undefined,
          blockchainSite: data.links.blockchain_site || undefined,
          officialForumUrl: data.links.official_forum_url || undefined,
          chatUrl: data.links.chat_url || undefined,
          announcementUrl: data.links.announcement_url || undefined,
          twitterScreenName: data.links.twitter_screen_name || undefined,
          facebookUsername: data.links.facebook_username || undefined,
          telegramChannelIdentifier:
            data.links.telegram_channel_identifier || undefined,
          bitcointalkThreadIdentifier:
            data.links.bitcointalk_thread_identifier || undefined,
          subredditUrl: data.links.subreddit_url || undefined,
          reposUrl: {
            github: data.links.repos_url?.github || undefined,
            bitbucket: data.links.repos_url?.bitbucket || undefined,
          },
        }
      : undefined,
    image: data.image
      ? {
          thumb: data.image.thumb || undefined,
          small: data.image.small || undefined,
          large: data.image.large || undefined,
        }
      : undefined,
    countryOrigin: data.country_origin || undefined,
    genesisDate: data.genesis_date ? new Date(data.genesis_date) : undefined,
    contractAddress: data.contract_address || undefined,
    sentimentVotesUpPercentage: toNumber(data.sentiment_votes_up_percentage),
    sentimentVotesDownPercentage: toNumber(
      data.sentiment_votes_down_percentage
    ),
    marketCapRank: toNumber(data.market_cap_rank),
    coingeckoRank: toNumber(data.coingecko_rank),
    coingeckoScore: toNumber(data.coingecko_score),
    developerScore: toNumber(data.developer_score),
    communityScore: toNumber(data.community_score),
    liquidityScore: toNumber(data.liquidity_score),
    publicInterestScore: toNumber(data.public_interest_score),
    marketData: data.market_data
      ? {
          currentPrice: data.market_data.current_price || undefined,
          ath: data.market_data.ath || undefined,
          athChangePercentage:
            data.market_data.ath_change_percentage || undefined,
          athDate: data.market_data.ath_date || undefined,
          atl: data.market_data.atl || undefined,
          atlChangePercentage:
            data.market_data.atl_change_percentage || undefined,
          atlDate: data.market_data.atl_date || undefined,
          marketCap: data.market_data.market_cap || undefined,
          marketCapRank: toNumber(data.market_data.market_cap_rank),
          fullyDilutedValuation:
            data.market_data.fully_diluted_valuation || undefined,
          totalVolume: data.market_data.total_volume || undefined,
          high24h: data.market_data.high_24h || undefined,
          low24h: data.market_data.low_24h || undefined,
          priceChange24h: toNumber(data.market_data.price_change_24h),
          priceChangePercentage24h: toNumber(
            data.market_data.price_change_percentage_24h
          ),
          priceChangePercentage7d: toNumber(
            data.market_data.price_change_percentage_7d
          ),
          priceChangePercentage14d: toNumber(
            data.market_data.price_change_percentage_14d
          ),
          priceChangePercentage30d: toNumber(
            data.market_data.price_change_percentage_30d
          ),
          priceChangePercentage60d: toNumber(
            data.market_data.price_change_percentage_60d
          ),
          priceChangePercentage200d: toNumber(
            data.market_data.price_change_percentage_200d
          ),
          priceChangePercentage1y: toNumber(
            data.market_data.price_change_percentage_1y
          ),
          marketCapChange24h: toNumber(data.market_data.market_cap_change_24h),
          marketCapChangePercentage24h: toNumber(
            data.market_data.market_cap_change_percentage_24h
          ),
          priceChange24hInCurrency:
            data.market_data.price_change_24h_in_currency || undefined,
          priceChangePercentage1hInCurrency:
            data.market_data.price_change_percentage_1h_in_currency ||
            undefined,
          priceChangePercentage24hInCurrency:
            data.market_data.price_change_percentage_24h_in_currency ||
            undefined,
          priceChangePercentage7dInCurrency:
            data.market_data.price_change_percentage_7d_in_currency ||
            undefined,
          priceChangePercentage14dInCurrency:
            data.market_data.price_change_percentage_14d_in_currency ||
            undefined,
          priceChangePercentage30dInCurrency:
            data.market_data.price_change_percentage_30d_in_currency ||
            undefined,
          priceChangePercentage60dInCurrency:
            data.market_data.price_change_percentage_60d_in_currency ||
            undefined,
          priceChangePercentage200dInCurrency:
            data.market_data.price_change_percentage_200d_in_currency ||
            undefined,
          priceChangePercentage1yInCurrency:
            data.market_data.price_change_percentage_1y_in_currency ||
            undefined,
          marketCapChange24hInCurrency:
            data.market_data.market_cap_change_24h_in_currency || undefined,
          marketCapChangePercentage24hInCurrency:
            data.market_data.market_cap_change_percentage_24h_in_currency ||
            undefined,
          totalSupply: toNumber(data.market_data.total_supply),
          maxSupply: toNumber(data.market_data.max_supply),
          circulatingSupply: toNumber(data.market_data.circulating_supply),
          sparkline7d: {
            price: data.market_data.sparkline_7d?.price || undefined,
          },
          lastUpdated: data.market_data.last_updated
            ? new Date(data.market_data.last_updated)
            : undefined,
        }
      : undefined,
    publicInterestStats: {
      alexaRank: toNumber(data.public_interest_stats?.alexa_rank),
    },
    lastUpdated: data.last_updated ? new Date(data.last_updated) : undefined,
  };
};
